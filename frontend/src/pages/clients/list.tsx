'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Client = {
  id: string
  name: string
  email: string
  status: 'ativo' | 'inativo'
}

async function fetchClients(): Promise<Client[]> {
  const response = await axios.get('http://localhost:4000/clients')
  return response.data
}

async function deleteClient(id: string) {
  await axios.delete(`http://localhost:4000/clients/${id}`)
}

export default function ClientsPage() {
  const queryClient = useQueryClient()

  const { data: clients, isLoading, isError } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
  })

  const mutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })

  if (isLoading) return <p className="text-center mt-4">Carregando...</p>
  if (isError) return <p className="text-center mt-4 text-red-500">Erro ao carregar clientes.</p>

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Clientes Cadastrados</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients?.map((client) => (
          <Card key={client.id}>
            <CardHeader>
              <CardTitle>{client.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Status:</strong> {client.status === 'ativo' ? 'Ativo' : 'Inativo'}</p>

              <div className="flex flex-col gap-2 mt-4">
                <Link href={`/clients/edit?id=${client.id}`}>
                  <Button className="w-full bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded">
                    Editar
                  </Button>
                </Link>

                <Button
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => mutation.mutate(client.id)}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Excluindo...' : 'Excluir'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}

