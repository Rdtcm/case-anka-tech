// Arquivo para criar um cliente

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateClientPage() {
  const [form, setForm] = useState({ name: '', email: '', status: 'ativo' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post('http://localhost:4000/clients', form);
      setSuccess(true);
      setForm({ name: '', email: '', status: 'ativo' });
    } catch (err) {
      setError('Erro ao cadastrar cliente. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Cadastrar Cliente</CardTitle>
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
              {loading ? 'Cadastrando...' : 'Cadastrar Cliente'}
            </Button>

            {success && (
              <p className="text-green-600 text-sm text-center">
                Cliente cadastrado com sucesso!
              </p>
            )}
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
