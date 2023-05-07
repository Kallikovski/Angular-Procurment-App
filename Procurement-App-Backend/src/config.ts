/** Contains all global process constants*/
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "thisismysecret"
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/procurment-app';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    mongodb_uri: MONGODB_URI,
    jwt_secret: JWT_SECRET
};

const config = {
    server: SERVER
}

export default config;