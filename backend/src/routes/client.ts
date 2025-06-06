import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../prisma';
import { createClientSchema, updateClientSchema } from '../schemas/client';
import { z } from 'zod';

export async function clientRoutes(app: FastifyInstance) {
  // endpoint para criar um cliente
  app.post('/clients', async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = createClientSchema.safeParse((request as any).body);

    if (!parsed.success) {
      return reply.status(400).send(parsed.error.format());
    }

    const { name, email, status } = parsed.data;
    const client = await prisma.client.create({ data: { name, email, status } });
    reply.code(201).send(client);
  });

  // endpoint para listar os clientes
  app.get('/clients', async (request, reply) => {
    const clients = await prisma.client.findMany();
    reply.send(clients);
  });

  // endpoint para atualizar dados de um cliente
  app.put('/clients/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const idParsed = z.string().transform(Number).safeParse((request as any).params.id);
    if (!idParsed.success) {
      return reply.status(400).send(idParsed.error.format());
    }
    const id = idParsed.data;

    const bodyParsed = updateClientSchema.safeParse((request as any).body);
    if (!bodyParsed.success) {
      return reply.status(400).send(bodyParsed.error.format());
    }

    const updated = await prisma.client.update({
      where: { id },
      data: bodyParsed.data,
    });

    reply.send(updated);
  });
  
  // endopoint para deletar um cliente do banco de dados
  // rdtcm notas: preciso deletar todos os ativos de um cliente 
  // quando eu for deletar um cliente, pois preciso manter a 
  // integridade referencial do banco de dados
  // endpoint para deletar um cliente
  app.delete('/clients/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const idParsed = z.string().transform(Number).safeParse((request as any).params.id)

    if (!idParsed.success) {
      return reply.status(400).send(idParsed.error.format())
    }

    const id = idParsed.data

    try {
      await prisma.client.delete({
        where: { id },
      })
      reply.status(204).send() // 204 = No Content
    } catch (error) {
      reply.status(404).send({ error: 'Cliente não encontrado.' })
    }
  })

}
