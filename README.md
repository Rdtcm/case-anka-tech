# 💼 Sistema de Gerenciamento de Clientes e Ativos Financeiros

Este projeto foi desenvolvido como parte de um **desafio técnico** com o objetivo de construir uma aplicação web fullstack que gerencie **clientes** e seus **ativos financeiros** estaticos, com cadastro, exibição e associação entre eles.

## 📌 Funcionalidades

* Cadastro de **clientes** (nome, email, status: ativo/inativo)
* Cadastro de **ativos financeiros estáticos** (nome do ativo e valor atual)
* Associação de ativos a clientes
* Listagem de todos os clientes
* Listagem de ativos por cliente

### Exemplo de CRUD de clientes no frontend
* Criação de um cliente
  ![Screenshot from 2025-06-05 19-08-41](https://github.com/user-attachments/assets/1597601b-ec18-4734-8d89-08664ffd0748)



* Listagem de clientes
  ![Screenshot from 2025-06-05 19-08-54](https://github.com/user-attachments/assets/58e67c93-0eac-4cb7-ae3e-38a15909d8f8)

* Edição de dados de clientes
  ![Screenshot from 2025-06-05 19-09-22](https://github.com/user-attachments/assets/db9b92a4-6528-4ff9-ac88-341ec4cd85fa)


* Listagem de ativos por cliente. Cada cliente tem seus próprios ativos
![Screenshot from 2025-06-05 19-11-37](https://github.com/user-attachments/assets/ecd0f8f3-fff6-4077-941c-aff7ec21f0a6)

* Listagem com mais clientes
  ![Screenshot from 2025-06-05 19-12-37](https://github.com/user-attachments/assets/9676be7d-4f0d-4cb5-a116-c7d04f2b2931)

* Obs: A exclusão de um cliente pode ser feita no botão de excluir na listagem
### Exemplo de tratamento de entrada de dados no frontend
* Tentando criar um cliente com um email inválido
![Screenshot from 2025-06-05 19-13-15](https://github.com/user-attachments/assets/f6ae6f41-63e0-4de3-928b-cbbab9fd4f27)




---
## 🧱 Estrutura do Projeto

```
case-anka-tech/
├── backend/
│ ├── src/
| | ├── node_modules/
| | ├── prisma/
│ │ │ ├── migrations
│ │ │ ├── schema.prisma
│ │ ├── routes/
│ │ │ ├── clients.ts
│ │ │ └── assets.ts
│ │ ├── schemas/
│ │ │ ├── assets.ts
│ │ │ └── client.ts
│ │ | prisma.ts
│ │ └── index.ts
│ ├── prisma/
│ │ ├── migrations/
│ │ └── schema.prisma
│ ├── tsconfig.json
│ ├── package-lock.json
│ ├── docker-compose.yml
│ ├── .env
│ ├── Dockerfile
│ ├── package.json
│ └── tsconfig.json
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Componentes UI
│ │ │ └── ui/ # Componentes ShadCN personalizados
│ │ │ ├── button.tsx
│ │ │ ├── card.tsx
│ │ │ ├── header.tsx
│ │ │ ├── input.tsx
│ │ │ ├── label.tsx
│ │ │ └── switch.tsx
│ │ ├── lib/ # Utilitários e configurações
│ │ │ ├── api.ts # Configuração do Axios
│ │ │ └── utils.ts # Funções auxiliares
│ │ ├── pages/ # Rotas da aplicação
│ │ │ ├── api/ # API routes do Next.js
│ │ │ │ └── hello.ts
│ │ │ ├── clients/ # Páginas de clientes
│ │ │ │ ├── [id]/ # Páginas dinâmicas por ID de cliente
│ │ │ │ │ ├── assets/ # Página para criar ativo para o cliente
│ │ │ │ │ │ └── create.tsx
│ │ │ │ │ ├── assets.tsx # Lista de ativos do cliente
│ │ │ │ │ └── edit.tsx # Editar cliente
│ │ │ │ ├── create.tsx # Criar novo cliente
│ │ │ │ ├── edit.tsx # Editar cliente (alternativo?)
│ │ │ │ └── list.tsx # Listar todos os clientes
│ │ │ ├── select.tsx # Página de seleção
│ │ │ ├── _app.tsx # Componente principal do Next.js
│ │ │ ├── _document.tsx # Documento HTML customizado
│ │ │ ├── index.tsx # Página inicial
│ │ │ └── assets.tsx # Lista geral de ativos
│ │ └── styles/ # Estilos CSS
│ │ ├── Assets.module.css
│ │ ├── globals.css
│ │ ├── Home.module.css
│ │ └── Login.module.css
│ ├── .gitignore
│ ├── components.json # Configuração de componentes (ShadCN)
│ ├── eslint.config.mjs # Configuração ESLint
│ ├── next-env.d.ts # Tipos do Next.js
│ ├── next.config.ts # Configuração do Next.js
│ ├── package-lock.json
│ ├── package.json
│ ├── postcss.config.mjs # Configuração PostCSS
│ ├── README.md # README do frontend (opcional)
│ └── tsconfig.json # Configuração TypeScript
│
├── docker-compose.yml # Configuração Docker
└── README.md # README principal do projeto
```

---

## Estrutura do projeto e docker representados graficamente

![image](https://github.com/user-attachments/assets/29f26d31-936a-446e-bd8a-26e972e3f0fa)

---
## 🛠️ Tecnologias Utilizadas

### Backend

* **Node.js**
* **Fastify**
* **Prisma ORM**
* **MySQL**
* **Zod** – Validação de entrada
* **Docker e Docker Compose**
* **TypeScript**

### Frontend

* **Next.js (com Pages Router)**
* **React**
* **Axios** – para requisições HTTP
* **CSS Modules**

---
## ⚙️ Como Executar o Projeto

### 📦 Backend (com Docker)

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Suba os containers (API e banco de dados):

```bash
docker compose up --build
```

3. Acesse o container:

```bash
docker compose exec backend sh
```

4. Execute as migrações Prisma:

```bash
npx prisma migrate dev --name init
```

> Isso criará as tabelas `Client` e `Asset` no banco de dados MySQL.

---
### 🖥️ Frontend

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o frontend:

```bash
npm run dev
```

4. Acesse no navegador:

```
http://localhost:3000
```

---
## 🔗 Endpoints da API

### Clientes

* `GET /clients` – Listar todos os clientes
* `POST /clients` – Criar cliente
* `PUT /clients/:id` – Atualizar cliente

### Ativos

* `GET /assets` – Listar todos os ativos
* `GET /assets/:clientId` – Listar ativos de um cliente
* `POST /assets` – Criar ativo vinculado a um cliente

---

## Exemplo de requisicoes para a API
```json
POST /clients
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "status": "ativo"
}
```
---

## Exemplo de resposta da API
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "status": "ativo"
}
```
---
## Testes da API com Postman

![Screenshot from 2025-06-01 20-27-14](https://github.com/user-attachments/assets/72008d63-afaf-4f01-8e54-129799240ebf)
![Screenshot from 2025-06-01 20-26-30](https://github.com/user-attachments/assets/17f7cf87-ecac-4e2a-9731-21ee41f76b7f)
![Screenshot from 2025-06-01 20-26-00](https://github.com/user-attachments/assets/cdd024b3-5f63-446f-8ed9-7295aee76a1f)

---
## 📊 Modelagem do Banco (Prisma)

### MER do banco de dados
![Screenshot from 2025-06-02 00-15-49](https://github.com/user-attachments/assets/2a072597-79b2-45fb-adfd-34976ace24c5)

### Client

```prisma
model Client {
  id     Int     @id @default(autoincrement())
  name   String
  email  String  @unique
  status String
  assets Asset[] @relation("ClientAssets", onDelete: Cascade)
}
```

### Asset

```prisma
model Asset {
  id         Int     @id @default(autoincrement())
  assetName  String
  value      Float
  clientId   Int
  client     Client  @relation("ClientAssets", fields: [clientId], references: [id])
}
```

---
## 🥯 Testes Realizados

* Testado via **Postman** (API)
* Testado no **navegador** (Frontend)
* Banco de dados corretamente populado com as relações entre clientes e ativos
* Requisições integradas com **Axios** no frontend

---
## 📂 Scripts importantes

### Prisma (dentro do container backend)

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---
## 📎 Observações Finais

* **Não foi necessário containerizar o frontend**, conforme descrito no desafio.
* Todo o backend foi feito com validações utilizando **Zod**.
* Toda a comunicação frontend ↔ backend é feita com **Axios**, conforme especificado.
  

---
## Notas adicionais

### Sobre o Docker

O frontend atualmente é executado localmente para facilitar o desenvolvimento, conforme indicado no documento. Para uma implantação completa em produção, basta adicionar um Dockerfile ao frontend e atualizar o docker-compose.yml. Além disso, o frontend não foi o foco principal, como sugeriu o documento.

### Sobre persistir Assets no banco de dados

Optei por implementar um CRUD completo de ativos com persistência no banco porque:

1. O requisito de "visualizar as alocações para cada cliente" exige armazenamento específico por cliente
2. Sistemas reais de gestão financeira precisam de histórico de ativos
3. Permite atualização dinâmica de valores

Embora o case mencione "lista fixa", entendi que essa referência era ao exemplo inicial, não a uma limitação técnica.

### Sobre a seguranca

Alguns arquivos eu subi no repositorio e deveriam estar no .gitignore, mas resolvi deixar pois os avaliadores podem analisar tudo o que eu fiz. 


---
## 👨‍💻 Autor

* Nome: **Ryan**
* Curso: Ciência da Computação – 3º semestre
* Status do Projeto: ✅ Concluído (backend e frontend integrados)

---

