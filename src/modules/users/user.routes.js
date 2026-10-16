import { Router } from 'express';
import { getMe, updateMe } from './user.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validateSchema } from '../../middlewares/validateData.js';
import { updateProfileSchema } from './user.schema.js';

const router = Router();

router.get('/me', authenticate, getMe);
router.patch('/me', authenticate, validateSchema(updateProfileSchema), updateMe);

export default router;