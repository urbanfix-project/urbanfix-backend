import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Extraemos el pool de conexiones nativa de PostgreSQL
const { Pool } = pg;

// Configura la conexión usando la URL guardada en .env
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// Envolve el pool en el adaptador oficial de Prisma
const adapter = new PrismaPg(pool);

// Instancia el cliente pasándole el adaptador
const prisma = new PrismaClient({ adapter });

export default prisma;