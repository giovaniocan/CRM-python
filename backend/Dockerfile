# Use a imagem oficial do Python
FROM python:3.12-slim

# Define o diretório de trabalho
WORKDIR /app

# Instala as dependências do Django
# (Baseado no seu README.md e na necessidade do Postgres)
RUN pip install \
    django==5.2.7 \
    djangorestframework==3.16.1 \
    django-cors-headers==4.9.0 \
    psycopg2-binary

# Copia o código-fonte do backend para o container
COPY . .

# A porta 8000 será exposta (o docker-compose fará o mapeamento)
EXPOSE 8000