import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from './errors';
import userRepository from '@/repositories/user-repository';

export async function createUser({ name, lastName, email, password }: CreateUserParams): Promise<User> {

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    name,
    lastName,
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<User, 'name' | 'lastName' | 'email' | 'password'>;

const userService = {
  createUser,
};

export * from './errors';
export default userService;
