# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npx auth secret
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache openssl


COPY --from=build /app /app

EXPOSE 1234
CMD ["npm", "start"]