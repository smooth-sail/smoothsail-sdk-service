FROM node:20.9.0-bullseye-slim

LABEL version="1.0"
LABEL description="Docker image for the SmoothSail SDK service"

WORKDIR /app
COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "start"]
