import { TokenType, createSessionData } from "@/protocols";
import { Session } from "@prisma/client";
import { prisma } from "config/database";

async function create(data: createSessionData): Promise<Session> {
  return prisma.session.create({
    data,
  });
}

async function findBySession(token: string): Promise<Session> {
  return await prisma.session.findFirst({
    where: { token }
  })
}

async function endSession(token: string) {
  await prisma.session.delete({
    where: { token }
  })
}

const sessionRepository = {
  create,
  findBySession,
  endSession
};



export default sessionRepository;