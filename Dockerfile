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


COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/prisma /app/prisma

EXPOSE 5001
CMD ["npm", "start"]