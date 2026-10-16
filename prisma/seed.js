import bcrypt from 'bcryptjs';
import prisma from '../src/config/prisma.js';

async function main() {
  console.log('🌱 Iniciando el seed de la base de datos...');

  const hashedPass = await bcrypt.hash('Password123', 10);

  const result = await prisma.user.createMany({
    data: [
      {
        email: 'admin@urbanfix.com',
        password: hashedPass,
        name: 'Admin UrbanFix',
        role: 'ADMIN',
        profession: null,
      },
      {
        email: 'cliente@test.com',
        password: hashedPass,
        name: 'María García',
        role: 'CLIENTE',
        profession: null,
      },
      {
        email: 'tecnico@test.com',
        password: hashedPass,
        name: 'Cristian Romero',
        role: 'TECNICO',
        profession: 'PLOMERO',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Seed completado exitosamente. Usuarios nuevos insertados: ${result.count}`);
}

main()
  .catch((error) => {
    console.error('❌ Error ejecutando el seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });