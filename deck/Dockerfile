FROM node:11

# Create app directory
RUN mkdir -p /code
WORKDIR /code

# Install app dependencies
COPY package.json /code/
COPY yarn.lock /code/

RUN yarn install
COPY webpack.config.js /code/

# Bundle app source
COPY ./src /code/src

EXPOSE 3005
CMD ["yarn", "dev"]
