import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/ui/header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Funcionalidades</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/clients/list">
              <Button className="w-full">Listar Clientes</Button>
            </Link>

            <Link href="/clients/create">
              <Button className="w-full" variant="secondary">
                Cadastrar Cliente
              </Button>
            </Link>

            <Link href="/clients/select?action=create">
              <Button className="w-full">Gerenciar Ativos por Cliente</Button>
            </Link>

            <Link href="/clients/select?action=list"> 
              <Button className="w-full" variant="secondary">
                Ativos por Cliente
              </Button>
            </Link>
            <Link href="/clients/select?action=edit"> 
              <Button className="w-full" >
                Gerenciar Clientes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </>
  );
}


