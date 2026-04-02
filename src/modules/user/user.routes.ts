import express from 'express';
import { registerUser } from './user.controller';


const router = express.Router();


router.post('/register', registerUser);

export const UserRoutes = router;