'use client'

// Arquivo para editar os dados de um cliente


import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: z.boolean(),
})

type FormData = z.infer<typeof formSchema>

export default function EditClientPage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    async function fetchClient() {
      try {
        const res = await axios.get(`http://localhost:4000/clients/${id}`)
        const { name, email, status } = res.data
        setValue('name', name)
        setValue('email', email)
        setValue('status', status)
      } catch (err) {
        console.error('Erro ao carregar cliente', err)
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [id, setValue])

  const onSubmit = async (data: FormData) => {
    try {
      await axios.put(`http://localhost:4000/clients/${id}`, data)
      router.push('/clients')
    } catch (err) {
      console.error('Erro ao atualizar cliente', err)
    }
  }

  if (loading) return <p className="text-center mt-10">Carregando...</p>

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">Editar Cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Nome</Label>
          <Input {...register('name')} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Label>Email</Label>
          <Input {...register('email')} />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <Label>Status Ativo</Label>
          <Switch {...register('status')} />
        </div>

        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </div>
  )
}
