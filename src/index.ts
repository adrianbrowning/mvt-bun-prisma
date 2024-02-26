import humanizeDuration from "humanize-duration";
import {PrismaClient, PrismaPromise} from "@prisma/client";

const prismaClient = new PrismaClient();

const start = performance.now();

clearDB()
  .then(run)
  .catch(e => console.error(e))
  .then(closeDb)
  .then(_=>{
    console.log(`Ended: ${new Date}, took ${humanizeDuration(performance.now() - start)}`);
    return null;
  })
  .catch(e => {throw e;});

async function run(){
  console.log("run start");
  const user = await prismaClient.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  });
  console.log(user);
  console.log("run done");
}



export async function clearDB() {
  console.log("Clearing db start");
  const transactions: Array<PrismaPromise<unknown>> = [];
  // transactions.push(prismaClient.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`);

  const tablenames = await prismaClient.$queryRaw<
      Array<{ name: string; }>
  >`SELECT name FROM sqlite_master WHERE type='table';`;


  for (const T of tablenames) {
    const {name} = T;
    if (name === "_prisma_migrations") continue;

    try {
      transactions.push(prismaClient.$executeRawUnsafe(`DELETE FROM ${name};`));
    }
    catch (error) {
      console.log({ error });
    }

  }

  try {
    await prismaClient.$transaction(transactions);
  }
  catch (error) {
    console.error(error);
    throw error;
  }
  console.log("Clearing db done");
}

export async function closeDb() {
  console.log("closing db start");
  await prismaClient.$disconnect();
  console.log("closing db done");
}
