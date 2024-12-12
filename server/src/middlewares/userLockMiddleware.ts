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
        const currentLock = await redisService.checkLock(userId);
        
        // Se l'utente è bloccato da un altro client
        if (currentLock && currentLock !== clientId) {
            res.status(423).json({ 
                message: 'User is locked by another client',
                lockedBy: currentLock
            });
            return;
        }

        next();
    } catch (error) {
        next(error);
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

export const releaseUserLock = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const clientId = req.headers['x-client-id'] as string;

    if (!clientId) {
        res.status(400).json({ message: 'Client ID is required' });
        return;
    }

    try {
        await redisService.releaseLock(userId, clientId);
        next();
    } catch (error) {
        next(error);
    }
};
