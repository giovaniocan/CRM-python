# Use a imagem oficial do Node.js
FROM node:20

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de gerenciamento de pacotes
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia o código-fonte do frontend para o container
COPY . .

# A porta 3000 será exposta (o docker-compose fará o mapeamento)
EXPOSE 3000