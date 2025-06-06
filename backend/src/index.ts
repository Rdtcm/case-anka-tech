import Fastify from 'fastify';
import fastifyEnv from '@fastify/env';
import cors from '@fastify/cors';
import prisma from './prisma';
import { clientRoutes } from './routes/client';
import { assetRoutes } from './routes/asset';

const app = Fastify({ logger: true });

// carregar variaveis de ambiente
const schema = {
  type: 'object',
  required: ['DATABASE_URL'],
  properties: {
    DATABASE_URL: { type: 'string' }
  }
};
app.register(fastifyEnv, { schema, dotenv: true });

// CORS (permitir requisições do frontend)
app.register(cors, { origin: true });

// Rotas
app.register(clientRoutes);
app.register(assetRoutes);

const start = async () => {
  try {
    await app.listen({ port: 4000, host: '0.0.0.0' });
    app.log.info(`Servidor rodando em http://0.0.0.0:4000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();