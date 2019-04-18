const ApiService = require("moleculer-web");
const { ServiceBroker } = require("moleculer");
const service=require("./service");

//Instantiating a broker
const broker = new ServiceBroker({ logger: console });

// Create a service
broker.createService({
    name: "dijkstra",
    actions: {
        calc(ctx) {
            return service({query:ctx.params},{json:console.log})
        }
    }
});

// Load API Gateway
broker.createService(ApiService);

// Start server
broker.start();
