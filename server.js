const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(express.static("frontend"));

app.listen(port, function(){
    console.log("app is running on http://localhost:"+port);
});

var users = [
    {
        "id" : 1,
        "name" : "John Doe",
        "gender" : "Male",
        "image" : "john.png"
    },
    {
        "id" : 2,
        "name" : "Jane Doe",
        "gender" : "Female",
        "image" : "jane.png"
    }
]

var nextId = 3;

function findIndex(id){
    for(var i = 0; i < users.length; i++){
        if(users[i].id === id){
            return i;
        }
    }
    return -1;
}

//GET all users
app.get("/api/users", function(req, res){
    // #swagger.summary = "Get all users"
    return res.json(users);
});

app.get("/api/users/random-user", function(req, res){
    // #swagger.summary = "Get a random user"
    if(users.length === 0){
        return res.status(404).json({"message" : "No user found"});
    }
    var randomId = Math.floor(Math.random() * users.length);
    res.json(users[randomId]);
});


//GET user by ID
app.get("/api/users/:id", function(req, res){
    // #swagger.summary = "Get a user by id"
    var id = Number(req.params.id);
    var index = findIndex(id);
    if(index === -1){
        return res.status(404).json({"message" : "User not found with id " + id});
    }
    return res.json(users[index]);
})

app.post("/api/users", function(req, res){
    // #swagger.summary = "Create a new user"
    if(!req.body.name || !req.body.gender){
        return res.status(200).json({"message" : "name and gender are mandatory"});
    }
    var newUser = {
        "id" : nextId,
        "name" : req.body.name,
        "gender" : req.body.gender,
        "image" : req.body.image || "default.png"
    };

    nextId = nextId + 1;

    users.push(newUser);

    return res.status(201).json(newUser);
});

app.put("/api/users/:id", function(req, res){
    // #swagger.summary = "Update a user with id"
    var id = Number(req.params.id);
    var index = findIndex(id);
    if(index === -1){
        return res.status(404).json({"message" : "User not found with id : " + id});
    }
    if(req.body.name){
        users[index].name = req.body.name;
    }
    if(req.body.gender){
        users[index].gender = req.body.gender;
    }
    if(req.body.image){
        users[index].image = req.body.image;
    }

    return res.json(users[index]);
});

app.delete("/api/users/:id", function(req, res){
    // #swagger.summary = "Delete a user with id"
    var id = Number(req.params.id);
    var index = findIndex(id);
    if(index === -1){
        return res.status(404).json({"message" : "User not found with id : " + id});
    }
    var user = users[index];
    users.splice(index, 1);
    return res.json({"message" : "User deleted successfully", "user" : user});
});

