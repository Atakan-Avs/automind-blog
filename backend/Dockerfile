# --- Backend Dockerfile ---

FROM node:18

# Timezone (cron ve loglar için)
ENV TZ=Europe/Istanbul
ENV NODE_ENV=production

WORKDIR /app

# package.json ve lock dosyasını kopyala
COPY package*.json ./

# Prod dependency'leri kur
RUN npm install --production

# Tüm backend kodunu kopyala
COPY . .

# Uygulama 4000 portundan dinliyor
EXPOSE 4000

# Server'ı başlat
CMD ["node", "src/index.js"]
