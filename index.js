const express = require('express');
const request = require('request');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port:", port)
})

app.get('/', (req, res) => {
    res.send('SES SNS TO HEROKU webapp quiet-falls')
})

app.post('/', async (req, res) => {
    try{
        let body = ''

        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        
        req.on('end', () => {
            let payload = JSON.parse(body)
        
            if (payload.Type === 'SubscriptionConfirmation') {
                const promise = new Promise((resolve, reject) => {
                const url = payload.SubscribeURL
        
                request(url, (error, response) => {
                  if (!error && response.statusCode == 200) {
                    console.log('Yess! We have accepted the confirmation from AWS')
                    return resolve()
                  } else {
                    return reject()
                  }
                })
              })
        
              promise.then(() => {
                res.end("ok")
              })
              .catch((err) => {
                  console.log(error)
              })
            }

            if (!payload.eventType) { return res.end() }

            console.log(payload)
        })     
    } catch (err) {
        console.log(err)
        res.end()
    }
})