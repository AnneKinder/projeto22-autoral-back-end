import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { invalidCredentialsError } from './errors';
import { exclude } from '@/utils/prisma-utils';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/session-repository';
import { GetUserOrFailResult, SignInParams, SignInResult, TokenType } from '@/protocols';
import { unauthorizedError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  if(!email) throw badRequestError()
  if(!password) throw badRequestError()
  
  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });


  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function findSessiondByToken(token: string) {
  const session = await sessionRepository.findBySession(token)
  if (!session) throw unauthorizedError()

  return session
}

async function endSessionByToken(token: string) {
  await sessionRepository.endSession(token)
}


const authenticationService = {
  signIn,
  findSessiondByToken,
  endSessionByToken
};

export default authenticationService;
export * from './errors';
