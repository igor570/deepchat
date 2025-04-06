import { Router } from 'express';
import { createUser, loginUser } from './handlers/user';

const router = Router();

// Registration Route
router.post('/create-user', createUser);

// Login Route
router.post('/login-user', loginUser);

export default router;
