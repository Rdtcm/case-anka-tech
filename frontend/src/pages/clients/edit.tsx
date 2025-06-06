import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function EditClientPage() {
  const router = useRouter()
  const { id } = router.query

  const [form, setForm] = useState({ name: '', email: '', status: 'ativo' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/clients/${id}`)
          setForm(res.data)
        } catch (err) {
          setError('Erro ao carregar dados do cliente.')
        }
      }
      fetchClient()
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await axios.put(`http://localhost:4000/clients/${id}`, form)
      setSuccess(true)
    } catch (err) {
      setError('Erro ao atualizar cliente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Atualizar Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label>Nome</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Status</Label>
              <select
                className="w-full border border-input rounded-md h-10 px-3"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Atualizando...' : 'Atualizar Cliente'}
            </Button>

            {success && (
              <p className="text-green-600 text-sm text-center">
                Cliente atualizado com sucesso!
              </p>
            )}
            
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
