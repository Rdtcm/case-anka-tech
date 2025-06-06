// pagina para criar um ativo para um cliente

import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


export default function CreateAssetPage() {
  const router = useRouter()
  const { id } = router.query

  const [assetName, setAssetName] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await axios.post('http://localhost:4000/assets', {
        assetName,
        value: Number(value),
        clientId: Number(id),
      })

      setSuccess(true)
      setAssetName('')
      setValue('')
    } catch (err) {
      setError('Erro ao criar ativo. Verifique os dados.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Novo Ativo</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label>Nome do Ativo</Label>
              <Input
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Valor (R$)</Label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Criando...' : 'Criar Ativo'}
            </Button>

            {success && (
              <p className="text-green-600 text-sm text-center">
                Ativo criado com sucesso!
              </p>
            )}
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
