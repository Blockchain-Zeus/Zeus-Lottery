
FROM node:19


WORKDIR /truffle

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install -g truffle

# Copy the rest of the application code to the working directory
COPY . .
RUN chmod +x entrypoint.sh
COPY ./entrypoint.sh .
ENTRYPOINT ["./entrypoint.sh"]
