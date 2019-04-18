const express=require('express');
const ApiService = require("moleculer-web");
const { ServiceBroker } = require("moleculer");
const service=require("./service");

//Instantiating a broker
const broker = new ServiceBroker({ logger: console });

//Initializing a service
const svc = broker.createService({
    mixins: [ApiService],

    settings: {
        middleware: true
    },

    name: "dijkstra",
    actions: {
        calc(ctx) {
            //call the service
            return service({query:ctx.params},{json:console.log})
        }
    }
});

// Create Express application
const app = express();

// Use ApiGateway as middleware
app.use("/api", svc.express());

// Listening
app.listen(3000);

// Start server
broker.start();
