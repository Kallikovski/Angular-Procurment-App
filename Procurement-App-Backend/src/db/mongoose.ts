import mongoose from "mongoose";
import config from "../config"

/** Initilize database connection */
export const mongo = () => {
    if (!config.server.mongodb_uri) {
        console.log("No mongo connection string. Set MONGODB_URI environment variable.");
        process.exit(1);
    }
    const connection = mongoose.connection;
    connection.on("connected", () => {
        console.log("Mongo Connection Established");
    });
    connection.on("reconnected", () => {
        console.log("Mongo Connection Reestablished");
    });
    connection.on("disconnected", () => {
        console.log("Mongo Connection Disconnected");
        console.log("Trying to reconnect to Mongo ...");
        setTimeout(() => {
            mongoose.connect(config.server.mongodb_uri, {
                autoReconnect: false,
                keepAlive: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                socketTimeoutMS: 3000,
                connectTimeoutMS: 3000
            });
        }, 3000);
    });
    connection.on("close", () => {
        console.log("Mongo Connection Closed");
    });
    connection.on("error", (error: Error) => {
        console.log("Mongo Connection ERROR: " + error);
    });
    const run = async () => {
        try {
            await mongoose.connect(config.server.mongodb_uri, {
                autoReconnect: false,
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        } catch (error) {
            console.error(error)
        }
    };
    run();
}