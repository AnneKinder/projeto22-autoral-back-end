import { Router } from 'express';
import { logOut, signInPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter.post('/signin', validateBody(signInSchema), signInPost);
authenticationRouter.post('/logout', logOut)

export { authenticationRouter };
