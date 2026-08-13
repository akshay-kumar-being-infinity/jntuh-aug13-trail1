var users = [
    {
        "name": "John Doe",
        "gender": "Male",
        "image": "john.png"
    },
    {
        "name": "Jane Doe",
        "gender": "Female",
        "image": "jane.png"
    }
]

var curId = 0;

function toggleUser(){
    var userImage = document.getElementById("user-image");
    var userName = document.getElementById("user-name");
    var userGender = document.getElementById("user-gender");

    curId = (curId + 1) % users.length;

    userImage.src = users[curId].image;
    userName.innerHTML = users[curId].name;
    userGender.innerHTML = users[curId].gender;
}

function randomUser(){
    var userImage = document.getElementById("user-image");
    var userName = document.getElementById("user-name");
    var userGender = document.getElementById("user-gender");

    fetch("https://randomuser.me/api/")
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            userImage.src = data.results[0].picture.large;
            userName.innerHTML = data.results[0].name.first + " " + data.results[0].name.last;
            userGender.innerHTML = data.results[0].gender;
        })
        .catch(function(err){
            console.log("Error occured : " + err);
        })

}

// This one calls OUR OWN api (the one we wrote in server.js)
// instead of somebody else's public api.
function myRandomUser(){
    var userImage = document.getElementById("user-image");
    var userName = document.getElementById("user-name");
    var userGender = document.getElementById("user-gender");

    fetch("/api/users/random-user")
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            userImage.src = data.image;
            userName.innerHTML = data.name;
            userGender.innerHTML = data.gender;
        })
        .catch(function(err){
            console.log("Error occured : " + err);
        })
}