var swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

var doc = {
    info: {
        title: "Users API",
        description: "The users API we built in class"
    },
    servers: [{ url: "/" }]
};

// Generate the docs from server.js, then start the server
swaggerAutogen("./swagger-output.json", ["./server.js"], doc).then(function () {
    require("./server.js");
});