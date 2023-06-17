import { createSessionData } from "@/protocols";
import { Session } from "@prisma/client";
import { prisma } from "config/database";

async function create(data: createSessionData): Promise<Session> {
  return prisma.session.create({
    data,
  });
}

async function findBySession(token: string){
  return await prisma.session.findFirst({
    where:{token}
  })
}


const sessionRepository = {
  create,
  findBySession
};



export default sessionRepository;