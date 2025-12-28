import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
    const email = 'admin@maalcrypto.com';
    const password = 'Admin@1234';
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Super Admin',
            password: hashedPassword,
            role: 'admin',
            image: 'https://ui-avatars.com/api/?name=Admin+User&background=22c55e&color=fff',
        },
    });

    console.log({ admin });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
