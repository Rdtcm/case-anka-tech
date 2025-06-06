# Usar imagem oficial do Node.js
FROM node:18-slim

# Instalar OpenSSL 1.1 e dependências
RUN apt-get update && \
    apt-get install -y openssl libssl-dev && \ 
    rm -rf /var/lib/apt/lists/*

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package.json .

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expor porta
EXPOSE 4000

# Comando padrão
CMD ["npm", "run", "start"]