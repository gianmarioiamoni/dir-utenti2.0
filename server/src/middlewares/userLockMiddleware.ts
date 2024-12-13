import { Request, Response, NextFunction } from 'express';
import { redisService } from '../services/redisService';

export const checkUserLock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params.id;
    const clientId = req.headers['x-client-id'] as string;

    if (!clientId) {
        res.status(400).json({ message: 'Client ID is required' });
        return;
    }

    try {
        console.log("checkUserLock - userId:", userId);
        const currentLockHolder = await redisService.checkLockHolder(userId);
        console.log(`checkUserLock - currentLockHolder: ${currentLockHolder}`);
        
        if (currentLockHolder && currentLockHolder !== clientId) {
            res.status(423).json({ 
                message: 'User is locked by another client',
                lockedBy: currentLockHolder
            });
            return;
        }

        // Se non è bloccato o è bloccato dallo stesso client, proviamo ad acquisire/rinnovare il lock
        const lockAcquired = await redisService.acquireLock(userId, clientId);
        console.log(`checkUserLock - lockAcquired: ${lockAcquired}`);
        if (lockAcquired) {
            res.status(200).json({ message: 'Lock acquisito con successo' });
        } else {
            res.status(423).json({ message: 'Non è stato possibile acquisire il lock' });
        }
    } catch (error) {
        console.error('Error in checkUserLock:', error);
        res.status(500).json({ message: 'Errore durante il controllo del lock' });
    }
};

export const acquireUserLock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params.id;
    const clientId = req.headers['x-client-id'] as string;

    if (!clientId) {
        res.status(400).json({ message: 'Client ID is required' });
        return;
    }

    try {
        const lockAcquired = await redisService.acquireLock(userId, clientId);
        
        if (!lockAcquired) {
            res.status(423).json({ 
                message: 'Failed to acquire lock on user',
                userId
            });
            return;
        }

        next();
    } catch (error) {
        next(error);
    }
};

export const verifyLockOwnership = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params.id;
    const clientId = req.headers['x-client-id'] as string;

    if (!clientId) {
        res.status(400).json({ message: 'Client ID is required' });
        return;
    }

    try {
        const currentLockHolder = await redisService.checkLockHolder(userId);
        
        // Se non c'è un lock o il client non è il proprietario del lock
        if (!currentLockHolder || currentLockHolder !== clientId) {
            res.status(423).json({ 
                message: 'Non hai il lock per questo utente',
                currentLockHolder
            });
            return;
        }

        // Il client ha il lock, può procedere
        next();
    } catch (error) {
        console.error('Error in verifyLockOwnership:', error);
        res.status(500).json({ message: 'Errore durante la verifica del lock' });
    }
};

export const releaseUserLock = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const clientId = req.headers['x-client-id'] as string;

    if (!clientId) {
        console.log('releaseUserLock - Client ID mancante');
        next();
        return;
    }

    try {
        console.log(`releaseUserLock - Rilascio lock per userId: ${userId}, clientId: ${clientId}`);
        await redisService.releaseLock(userId, clientId);
        console.log('releaseUserLock - Lock rilasciato con successo');
        next();
    } catch (error) {
        console.error('releaseUserLock - Errore nel rilascio del lock:', error);
        // Continuiamo comunque con il next anche in caso di errore nel rilascio del lock
        next();
    }
};
