FROM node:18.15.0-alpine3.16

WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN export DATABASE_URL=mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
RUN npm install
RUN npx prisma generate
COPY . .
RUN chmod +x ./start.sh


EXPOSE 3000
CMD ["npm", "run", "dev"]
