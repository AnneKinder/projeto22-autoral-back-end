import Joi from 'joi';
import { CreateUserParams } from '@/services/users-service';

export const createUserSchema = Joi.object<CreateUserParams>({
  name: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
