const http = require("http");
var SteamUser = require('steam-user')
var client = new SteamUser();
const express = require("express");
const app = express();

var UserInfo = {
  accountName: process.env.user,
  password: process.env.password
}


app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
  console.log("Up")
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);



client.logOn(UserInfo);
client.on('loggedOn', () => {
  client.setPersona(SteamUser.EPersonaState.Online);
  client.gamesPlayed([730]);
  console.log("Logged On.");
});