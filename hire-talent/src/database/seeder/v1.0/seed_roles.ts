import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed_roles() {
    await prisma.role.createMany({
        data: [
            { role_name: "SuperAdmin" },
            { role_name: "Freelancer" },
            { role_name: "Employer" }
        ],
    });
}


async function run() {
    await seed_roles();
}

run()
    .then(async () => {
        console.log("roles records inserted into table")
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
