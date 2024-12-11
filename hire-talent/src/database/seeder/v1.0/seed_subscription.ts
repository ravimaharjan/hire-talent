import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed_subscriptions() {
    await prisma.subscription.createMany({
        data: [
            { plan_name: "Free", price_permonth: 0 },
            { plan_name: "Professional", price_permonth: 5000 },
            { plan_name: "Enterprise", price_permonth: 10000 }
        ],
    });
}

seed_subscriptions()
    .then(async () => {
        console.log("permission records inserted into table")
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
