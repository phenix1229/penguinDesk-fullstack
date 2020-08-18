FROM node:9-slim
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY client/package.json ./
COPY client/package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]
