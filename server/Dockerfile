# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
<<<<<<< HEAD
CMD [ "node", "dist/main.js" ]
=======
CMD [ "node", "dist/main.js" ]
>>>>>>> a879fbbd857f29d181d12dc2d88123e1361025d4
