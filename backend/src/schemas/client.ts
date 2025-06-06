// validacoes para clientes

import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  status: z.enum(['ativo', 'inativo']),
});

export const updateClientSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  status: z.enum(['ativo', 'inativo']).optional(),
});