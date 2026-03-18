# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

# 1. Copiamos el código compilado
COPY --from=builder /app/dist ./dist

# 2. ¡ESTA ES LA LÍNEA QUE FALTA! 
# Copiamos la carpeta de documentos para que la API la encuentre al arrancar
COPY --from=builder /app/docs ./docs

EXPOSE 3000

CMD ["npm", "start"]