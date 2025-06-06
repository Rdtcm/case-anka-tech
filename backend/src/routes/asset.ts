import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../prisma';
import { createAssetSchema } from '../schemas/asset';

export async function assetRoutes(app: FastifyInstance) {
  // Lista todos os ativos
  app.get('/assets', async (request, reply: FastifyReply) => {
    const assets = await prisma.asset.findMany();
    reply.send(assets);
  });

  // Lista ativos de um cliente específico
  app.get('/clients/:id/assets', async (request, reply) => {
    const clientId = Number((request.params as any).id);

    if (isNaN(clientId)) {
      return reply.status(400).send({ error: 'ID inválido' });
    }

    const assets = await prisma.asset.findMany({
      where: { clientId },
    });

    reply.send(assets);
  });

  // Cria um novo ativo
  app.post('/assets', async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = createAssetSchema.safeParse((request as any).body);

    if (!parsed.success) {
      return reply.status(400).send(parsed.error.format());
    }

    const { assetName, value, clientId } = parsed.data;

    const asset = await prisma.asset.create({
      data: { assetName, value, clientId },
    });

    reply.code(201).send(asset);
  });

  // endopint que deleta um ativo pelo ID
  app.delete('/assets/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const id = Number((request.params as any).id);

    if (isNaN(id)) {
      return reply.status(400).send({ error: 'ID inválido' });
    }

    try {
      await prisma.asset.delete({
        where: { id },
      });
      reply.code(204).send(); // No Content
    } catch (error) {
      reply.status(404).send({ error: 'Ativo não encontrado' });
    }
  });
}

