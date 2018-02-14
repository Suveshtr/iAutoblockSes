const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
var aws = require('aws-sdk')
const fromemail = config.fromemail
const toemail = config.toemail

aws.config.loadFromPath(__dirname + '/config.json')
// Instantiate SES.
var ses = new aws.SES();

const app = express()

var allowedOrigins = [config.allowedOrigin]

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}))

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})

app.post('/contactus', bodyParser.json(), (req, res) => {
  const { name, email, message } = req.body

  if (name && email) {    
    console.log('name and email:', name, email)
    
    
    var params = {
        
        Destination: {
          ToAddresses: [toemail]
        },
        Message: {
          Body: { 
            Html: {
              Charset: "UTF-8", 
              Data: "Info requested by : " + sender + " " + senderEmail
             },          
           Text: {
            Charset: "UTF-8", 
            Data: message
           }
          }, 
          Subject: {
           Charset: "UTF-8", 
           Data: "iAutoblock Contactus message"
          }
         },   
         Source: fromemail      
    };
    
    ses.sendRawEmail(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        }           
    });
  } else {
    res.status(403).send({
      error: 'Please provide both a name and email address'
    })
  }
})
