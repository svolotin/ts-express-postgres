FROM node:20.12.1

WORKDIR /usr/src/app

RUN npm install -g typescript

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 5000

#Build to project
RUN npm run build

# Run node server
CMD npm run start