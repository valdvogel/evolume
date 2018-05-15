var express = require('express');

//Create our app
var app  = express();
//Heroku port
const PORT = process.env.PORT || 3001;


app.use(function(req,res,next){
    if(req.headers['x-forwarded-proto'] === 'https'){
        res.redirect('http://' + req.hostname + req.url);
    }
    else{
        next();
    }
});


app.use(express.static('public'));

/*

LOCAL PORT
app.listen(3000, function() {
    console.log('Express server is up on port 3001');

});
*/

app.listen(PORT, function() {
    console.log('Express server is up on port ', PORT);

});
