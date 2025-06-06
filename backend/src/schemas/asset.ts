// validacoes para os assets

import { z } from 'zod';

export const createAssetSchema = z.object({
  assetName: z.string().min(3),
  value: z.number(),
  clientId: z.number().positive(),
});