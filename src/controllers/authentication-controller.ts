import { Request, Response } from 'express';
import httpStatus from 'http-status';
import authenticationService from '@/services/authentication-service';
import { SignInParams, TokenType } from '@/protocols';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function logOut(req: Request, res: Response) {
  const { token } = req.body as TokenType
  try {
    await authenticationService.endSessionByToken(token);
    res.sendStatus(httpStatus.OK)
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}


