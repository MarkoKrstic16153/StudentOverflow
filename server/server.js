//allquestions set
//nova lista
//tagovi set
//pojedinacni tag lista
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

//#region GET
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
  });

  app.get('/tags', function (req, res) {
    redisClient.smembers("tags",(greska,rezultat) => {
        if (greska) {
            console.log(greska);
            throw greska;
        }
        console.log("Tags ->" + rezultat);
        res.send(rezultat);
    });
  });

  app.get('/newquestions', function (req, res) {
    redisClient.lrange("nova",0,-1,(greska,rezultat) => {
        if (greska) {
            console.log(greska);
            throw greska;
        }
        console.log("Nova pitanja naslovi ->" + rezultat);
        res.send(rezultat);
    });
  });

  app.get('/tag/:tagname', function (req, res) {
    var zahtev=req.params;
    console.log(zahtev.tagname);
    redisClient.lrange(zahtev.tagname,0,-1,(greska,rezultat) => {
        if (greska) {
            console.log(greska);
            throw greska;
        }
        console.log("Tags ->" + rezultat);
        res.send(JSON.parse(rezultat));
    });
  });

  app.get('/userquestions/:username', function (req, res) {
    var zahtev=req.params;
    //console.log(zahtev.username);
    redisClient.hget(zahtev.username,"Pitanja",(greska,rezultat) => {
        if (greska) {
            console.log(greska);
            throw greska;
        }
        //console.log("Getuje Userova Pitanja ->" + rezultat);
        res.send(JSON.parse(rezultat));
    });
  });

  app.get('/allquestions', function (req, res) {
    redisClient.smembers("allquestions",(greska,rezultat) => {
        if (greska) {
            console.log(greska);
            throw greska;
        }
        console.log("Svi naslovi su ->" + rezultat);
        res.send(rezultat);
    });
  });

//#region POST
app.post('/register', (req, res)=> {
    console.log(req.body);
    redisRegisterUser(req.body);
});

app.post('/question', function (req, res) {
    let naslov=req.body.naslov;

    redisClient.hgetall(naslov,(greska,rezultat) => {
        if (greska) {
            console.log(greska);
            throw greska;
        }

        console.log("GET-ovao ->" + rezultat);
        res.send(rezultat);
    });
  });

app.post('/addquestion',(req, res)=>{
    let question=req.body; 
    console.log(question);
    question.Tagovi.forEach(tag => {//pamti tagove
        redisClient.sismember("tags",tag,(greska,rezultat) => {
            if (greska) {
                console.log(greska);
                throw greska;
            }
            console.log("Is member ->" + rezultat);
            if(rezultat=="0"){
                redisClient.sadd("tags",tag);
            }
        });
    });
    //pamti pitanje
    redisClient.hset(question.Naslov,"Tekst",question.TekstPitanje);
    redisClient.hset(question.Naslov,"KoJePitao",question.KoJePitao);
    redisClient.hset(question.Naslov,"Tagovi",JSON.stringify(question.Tagovi));
    redisClient.hset(question.Naslov,"Upvotes",question.Upvotes);
    redisClient.hset(question.Naslov,"Odgovori",JSON.stringify(question.Odgovori));
    question.Tagovi.forEach(tag => {
        redisClient.lpush(tag,question.Naslov);
    });
    redisClient.lpush("nova",question.Naslov);
    redisClient.rpop("nova");
    redisClient.sadd("allquestions",question.Naslov);
    redisClient.hget(question.KoJePitao,"Pitanja",(greska,rezultat) => {
        if (greska) {
            console.log(greska);
            throw greska;
        }

        console.log("Pitanja Usera su ->" + rezultat);
        //res.send(rezultat);
        let nizPostavljenihPitanja=JSON.parse(rezultat);
        if(!nizPostavljenihPitanja.includes(question.Naslov))
            nizPostavljenihPitanja.unshift(question.Naslov);
        redisClient.hset(question.KoJePitao,"Pitanja",JSON.stringify(nizPostavljenihPitanja));
    });
});

app.post('/deletequestion', (req, res)=> {
    let naslov=req.body.naslov;
    redisClient.hgetall(naslov,(greska,rezultat) => {
        if (greska) {
            console.log(greska);
            throw greska;
        }
        let pitanje;
        pitanje=rezultat;
        deleteQuestionFromUser(naslov,pitanje.KoJePitao);
        deleteQuestionFromTags(naslov,JSON.parse(pitanje.Tagovi));
        deleteFromAll(naslov);
    });
    redisClient.del(naslov);
  });

  app.post('/addanswer', (req, res)=> {
    let zahtev=req.body;
    redisClient.hget(zahtev.naslov,"Odgovori",(greska,rezultat) => {
        if (greska) {
            console.log(greska);
            throw greska;
        }
        let odgovori=JSON.parse(rezultat);
        odgovori.push(zahtev.odgovor);
        redisClient.hset(zahtev.naslov,"Odgovori",JSON.stringify(odgovori));
    });
  });


app.listen(port, () => console.log(`Moji server listening on port ${port}!`))
//redisSet("1",JSON.stringify(jsonObjekat));//json u string za bazu
//redisClient.get("1", redisCallback);
function redisRegisterUser(user) {
   redisClient.hset(user.Username,"Password",user.Sifra);
   redisClient.hset(user.Username,"Rank",user.Rank);
   redisClient.hset(user.Username,"Ime",user.Ime);
   redisClient.hset(user.Username,"Prezime",user.Prezime);
   redisClient.hset(user.Username,"Pitanja","[]");
}

function deleteQuestionFromUser(question,user){
    redisClient.hget(user,"Pitanja",(greska,rezultat) => {
        if (greska) {
            console.log(greska);
            throw greska;
        }
        
        let nizUserPitanja=JSON.parse(rezultat);
        let index = nizUserPitanja.indexOf(question);
        if (index > -1) {
            nizUserPitanja.splice(index, 1);
        }
        redisClient.hset(user,"Pitanja",JSON.stringify(nizUserPitanja));
    });
}

function deleteQuestionFromTags(question,tags){
    tags.forEach((tag)=>{
        redisClient.lrem(tag,0,question);
    });
}

function deleteFromAll(naslov){
    redisClient.srem("allquestions",naslov);
}

 