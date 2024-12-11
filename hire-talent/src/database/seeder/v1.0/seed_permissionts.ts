import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed_permissions() {
    await prisma.permission.createMany({
        data: [
            { permission_name: "", resource: "Invite", action: "create" }
        ],
    });
}

seed_permissions()
    .then(async () => {
        console.log("permission records inserted into table")
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
