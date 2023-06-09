import {prisma} from "config/database";
import { User } from "@prisma/client";
import { CreateUserParams } from "@/services";

async function create(data: CreateUserParams): Promise<User> {
  return prisma.user.create({
    data,
  });
}

async function findById(id: number): Promise<User> {
  return await prisma.user.findFirst({
    where: {id}
  })
}

async function findByEmail(email: string) {
 return await prisma.user.findUnique({
  where:{email}
 })
}

const userRepository={
    create,
    findById,
    findByEmail,
}

export default userRepository

export type CreateUserParamsWithId = Pick<User, 'id' |'name' | 'lastName' | 'email' | 'password'>;

  