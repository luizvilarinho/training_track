FROM node:16-bullseye-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 3005

# Start the application
CMD ["npm", "run", "dev"]
