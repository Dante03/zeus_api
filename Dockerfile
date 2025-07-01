# Imagen base
FROM node:20

# Directorio de trabajo
WORKDIR /usr/src/app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 4000

# Comando para iniciar la app
CMD [ "node", "src/index.js" ]