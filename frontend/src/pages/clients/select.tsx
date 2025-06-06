'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'

interface Client {
  id: string
  name: string
  email: string
  status: string
}

export default function SelectClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const action = searchParams.get('action') || 'list'

  const { data, isLoading, error } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:4000/clients')
      return res.data as Client[]
    }
  })

  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao carregar clientes.</p>

  const handleSelect = (clientId: string) => {
    if (action === 'create') {
      router.push(`/clients/${clientId}/assets/create`)
    } else if ( action === 'list') {
      router.push(`/clients/${clientId}/assets`)
    } else {
      router.push(`/clients/edit?id=${clientId}`)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Selecione um Cliente</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {data?.map((client) => (
            <Button
              key={client.id}
              className="w-full"
              variant="ghost"
              onClick={() => handleSelect(client.id)}
            >
              {client.name}
            </Button>
          ))}
        </CardContent>
      </Card>
    </main>
  )
}


