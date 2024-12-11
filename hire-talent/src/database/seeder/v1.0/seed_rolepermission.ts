import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed_role_permission() {
    // Change the values. Dummy value
    await prisma.rolePermission.createMany({
        data: [
            { role_id: "45a72bd9-6d3f-4b73-8319-999fe9a08fbe", permission_id: "" },
            { role_id: "45a72bd9-6d3f-4b73-8319-999fe9a08fbe", permission_id: "" },
            { role_id: "45a72bd9-6d3f-4b73-8319-999fe9a08fbe", permission_id: "" },
            { role_id: "45a72bd9-6d3f-4b73-8319-999fe9a08fbe", permission_id: "" },
            { role_id: "45a72bd9-6d3f-4b73-8319-999fe9a08fbe", permission_id: "" },
            { role_id: "45a72bd9-6d3f-4b73-8319-999fe9a08fbe", permission_id: "" },
            { role_id: "45a72bd9-6d3f-4b73-8319-999fe9a08fbe", permission_id: "" },
            { role_id: "45a72bd9-6d3f-4b73-8319-999fe9a08fbe", permission_id: "" },
            { role_id: "45a72bd9-6d3f-4b73-8319-999fe9a08fbe", permission_id: "" },
            { role_id: "45a72bd9-6d3f-4b73-8319-999fe9a08fbe", permission_id: "" },
            { role_id: "45a72bd9-6d3f-4b73-8319-999fe9a08fbe", permission_id: "" },
            { role_id: "45a72bd9-6d3f-4b73-8319-999fe9a08fbe", permission_id: "" },

            { role_id: "6a81b8f3-992a-487b-a5bd-2dfdb443d91f", permission_id: "" },
            { role_id: "6a81b8f3-992a-487b-a5bd-2dfdb443d91f", permission_id: "" },
            { role_id: "6a81b8f3-992a-487b-a5bd-2dfdb443d91f", permission_id: "" },
            { role_id: "6a81b8f3-992a-487b-a5bd-2dfdb443d91f", permission_id: "" },
            { role_id: "6a81b8f3-992a-487b-a5bd-2dfdb443d91f", permission_id: "" },
            { role_id: "6a81b8f3-992a-487b-a5bd-2dfdb443d91f", permission_id: "" },
            { role_id: "6a81b8f3-992a-487b-a5bd-2dfdb443d91f", permission_id: "" },
            { role_id: "6a81b8f3-992a-487b-a5bd-2dfdb443d91f", permission_id: "" },
            { role_id: "6a81b8f3-992a-487b-a5bd-2dfdb443d91f", permission_id: "" }
        ]
    })
}

seed_role_permission()
    .then(async () => {
        console.log("rolepermission records inserted into table")
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
