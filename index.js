const SteamUser = require('steam-user');
const client = new SteamUser();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
var port = 1111 || process.env.PORT

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.render('dashboard');
});

app.post('/loggin', async function (req, res) {
  res.render('login_success');
  client.logOn({ accountName: req.body.username, password: req.body.password, twoFactorCode: req.body.steamGuard });
  client.on('loggedOn', () => {
    client.setPersona(SteamUser.EPersonaState.Online);
    client.gamesPlayed({ game_id: req.body.gameID});
    console.log('[+] Successfully logged in! Selected game is already running. To stop close the terminal.');
  });
});

app.listen(port, () => {
  console.log(`[!] SteamIdler started!\nPlease enter here to login: http://localhost:${port}`);
});