import { createSessionData } from "@/protocols";
import { Session } from "@prisma/client";
import { prisma } from "config/database";

async function create(data: createSessionData): Promise<Session> {
  return prisma.session.create({
    data,
  });
}

const sessionRepository = {
  create,
};

export default sessionRepository;