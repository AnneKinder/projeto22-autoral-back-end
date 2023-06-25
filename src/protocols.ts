import { Dreams, Tasks, User } from "@prisma/client";

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type UserCreate = {
  name: string,
  lastName: string,
  email: string,
  password: string
};

export type UserAuth = {
  email: string;
  password: string;
};

export type ErrorReturn = {
  name: string;
  message: string;
};

export type SignInParams = Pick<User, 'email' | 'password'>;

export type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

export type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

export type createSessionData = {
  token: string;
  userId: number;
};

export type ApplicationError = {
  name: string;
  message: string;
};

export type createDream =  Omit<Dreams, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateTask=  Omit<Tasks, 'id' | 'createdAt' | 'updatedAt'>;

export type tasktWithoutDreamId = Omit<Tasks, 'id' | 'dreamId' | 'createdAt' | 'updatedAt'>

export type TokenType = {
  token: string
}