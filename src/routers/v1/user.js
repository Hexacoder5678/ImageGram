//after /users the remaining part of the url is handled here


import express from 'express';
import { getProfile } from '../../controllers/userController.js';
import { zodSignUpSchema } from '../../validators/zodSignUpSchema.js';
import {validate} from '../../validators/zodValidator.js';
import { signup ,signin} from '../../controllers/userController.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';

const router=express.Router();

router.get('/profile',getProfile);
router.post('/signup',validate(zodSignUpSchema),signup);
router.post('/signin',validate(zodSigninSchema),signin);

export default router;