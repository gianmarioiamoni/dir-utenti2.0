import { createClient } from 'redis';
import logger from '../utils/logger';

class RedisService {
    private client;
    private static instance: RedisService;
    private readonly lockTTL = 300; // 5 minuti di timeout per il blocco

    private constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        });

        this.client.on('error', (err) => logger.error('Redis Client Error', err));
        this.client.connect();
    }

    public static getInstance(): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }

    private getLockKey(userId: string): string {
        return `user:lock:${userId}`;
    }

    /**
     * Tenta di acquisire un blocco per l'utente
     * @param userId ID dell'utente da bloccare
     * @param clientId ID del client che richiede il blocco
     * @returns true se il blocco è stato acquisito, false altrimenti
     */
    public async acquireLock(userId: string, clientId: string): Promise<boolean> {
        const lockKey = this.getLockKey(userId);
        
        try {
            // Utilizziamo SET con NX (set if not exists) e un timeout
            const result = await this.client.set(lockKey, clientId, {
                NX: true,
                EX: this.lockTTL
            });
            
            return result === 'OK';
        } catch (error) {
            logger.error('Error acquiring lock:', error);
            return false;
        }
    }

    /**
     * Rilascia il blocco per l'utente
     * @param userId ID dell'utente
     * @param clientId ID del client che ha il blocco
     * @returns true se il blocco è stato rilasciato, false altrimenti
     */
    public async releaseLock(userId: string, clientId: string): Promise<boolean> {
        const lockKey = this.getLockKey(userId);
        
        try {
            // Verifichiamo che il client che richiede il rilascio sia lo stesso che ha il blocco
            const currentHolder = await this.client.get(lockKey);
            if (currentHolder !== clientId) {
                return false;
            }

            await this.client.del(lockKey);
            return true;
        } catch (error) {
            logger.error('Error releasing lock:', error);
            return false;
        }
    }

    /**
     * Verifica se un utente è bloccato
     * @param userId ID dell'utente
     * @returns ID del client che ha il blocco, o null se l'utente non è bloccato
     */
    public async checkLock(userId: string): Promise<string | null> {
        const lockKey = this.getLockKey(userId);
        try {
            return await this.client.get(lockKey);
        } catch (error) {
            logger.error('Error checking lock:', error);
            return null;
        }
    }
}

export const redisService = RedisService.getInstance();
