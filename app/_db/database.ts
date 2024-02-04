import { PrismaClient } from "@prisma/client";

//Singleton design pattern to ensure only 1 instance of Prisma client is created
class Database {
  //only allows prisma client to be accessed through getInstance function.
  private static instance: PrismaClient;

  private constructor() {}

  //getInstance functions checks and returns the prisma client if it is already created.
  //or else, it will create a new prisma client, set it to the instance variable and then return the newly created prisma client
  static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient();
    }
    return Database.instance;
  }
}

export const prismaClient = Database.getInstance();