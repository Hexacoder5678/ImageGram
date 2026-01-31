//after /users the remaining part of the url is handled here


import express from 'express';
import { getProfile } from '../../controllers/userController.js';
import { zodSignUpSchema } from '../../validators/zodSignUpSchema.js';
import {validate} from '../../validators/zodValidator.js';
import { signup } from '../../controllers/userController.js';

const router=express.Router();

router.get('/profile',getProfile);
router.post('/signup',validate(zodSignUpSchema),signup);

export default router;