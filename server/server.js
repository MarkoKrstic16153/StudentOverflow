var redis = require('redis');
var redisClient = redis.createClient(); 

redisClient.on('connect', function() {
    console.log("Spreman za Upotrebu!");
});

redisClient.on('error', function (err) {
    console.log('Greska ' + err);
});

const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}) );


app.get('/', (req, res) => res.send('Hello Marko World!'))

app.get('/login/:username', function (req, res) {
    var zahtev=req.params;
    console.log(zahtev.username);
    redisClient.hget(zahtev.username,"Password",(greska,rezultat) => {
        if (greska) {
            console.log(greska);
            throw greska;
        }
        console.log("GET-ovao ->" + rezultat);
        res.send({password:rezultat});
    });
  })

app.post('/register', (req, res)=> {
    console.log(req.body);
    redisRegisterUser(req.body);
});
//Ime:this.signUpName,Prezime:this.signUpSurname,Sifra:this.signUpPassword,Username:this.signUpUsername,Rank:0
app.listen(port, () => console.log(`Moji server listening on port ${port}!`))
//redisSet("1",JSON.stringify(jsonObjekat));//json u string za bazu
//redisClient.get("1", redisCallback);
function redisRegisterUser(user) {
   // redisClient.hmset(user.Username,{Sifra:user.Sifra},{Ime:user.Ime},{Prezime:user.Prezime},{Rank:user.Rank});
   redisClient.hset(user.Username,"Password",user.Sifra);
   redisClient.hset(user.Username,"Rank",user.Rank);
   redisClient.hset(user.Username,"Ime",user.Ime);
   redisClient.hset(user.Username,"Prezime",user.Prezime);
   //redisClient.hset(user.Username,"Password",user.Sifra);
}
 