const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false})); 

app.get('/', (req, res) =>{

    //send to '/' the text hello word
    res.send('Hello World')
});

app.get('/welcome',middlewareTest, (req, res) =>{

    //send to '/' the text hello word
    res.send('Hello World')
});

let session = false;  // example of expired session

function middlewareTest(req, res, next){
    //message to check if session is expired
    console.log('middleware accessed');
// qimulate an expired session - send a status code or a message to the user
    if(!session){
        res.send('Your session expired');
    } // if (session === false)
    else{
        next(); // in case the session is not expired, go ahead in the route
        // next method is used when
    }
}
let users = [
    {id: 1, name: 'Joe'},
    {id: 2, name: 'Dylan'},
    {id: 3, name: 'Alice'}
];

app.post('/user',validateParams,( req, res)=>{

    console.log('The route /user was accessed');
    console.log(
        'id:' + req.body.id,
        'name:' + req.body.name);
    users.push({id: req.body.id, name: req.body.name});
    res.send('User was inserted')
});

app.get('/users', (req, res)=>{

    res.send(users)
})
function validateParams (req, res, next) {
    
    let id = req.body.id;
    let userExists = false;

    for(let i = 0; i<users.length; i++){
        if(users[i].id == id){
            userExists = true;
            break;
        }
    }

    if(userExists){
        res.send('User already exists')
    } else{
        next();
    }

    
}


//start the application 
run().catch(console.dir);   
    // code used to start our application 

async function run() { 
    try {  
        app.listen(3000); 
    } catch (err) { 
        console.log(err.stack); 
    } 
} 
