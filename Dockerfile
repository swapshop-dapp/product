FROM node:16.16.0-alpine
RUN apk add curl
WORKDIR /app
COPY package*.json ./
COPY dist ./dist
COPY node_modules ./node_modules
COPY config ./config
COPY prisma ./prisma
RUN rm -rf node_modules/sharp
RUN npm install --platform=linuxmusl --arch=x64 --force sharp
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
