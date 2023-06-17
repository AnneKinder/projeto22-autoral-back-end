import { Router } from 'express';
import { logOut, singInPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter.post('/signin', validateBody(signInSchema), singInPost);
authenticationRouter.post('/logout', logOut)

export { authenticationRouter };
