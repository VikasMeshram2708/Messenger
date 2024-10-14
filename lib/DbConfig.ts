import { prismaInstance } from "./prismaInstance";

export async function DbConfig() {
  try {
    await prismaInstance.$connect();
  } catch (error) {
    console.error(`Something went wrong.Failed to connect to DB :${error}`);
  } finally {
    await prismaInstance.$disconnect();
  }
}
