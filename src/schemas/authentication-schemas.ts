import Joi from 'joi';
import { UserAuth } from '@/protocols';

export const signInSchema = Joi.object<UserAuth>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
