# --- Frontend Dockerfile (Vite/React SPA için örnek) ---

# Build aşaması
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Eğer projede "build" script'i varsa:
RUN npm run build

# Prod aşaması: Nginx ile statik servis
FROM nginx:alpine

# Build çıktısını nginx'in root'una kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]