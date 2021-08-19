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
            body += chunk.toString();
        })

        let payload = body;
        
        if (!payload.eventType) { return res.end() }

        return res.send(`${payload}`)
        
    } catch (err) {
        console.log(err)
        res.end()
    }
})