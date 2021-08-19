const express = require('express');
const got = require('got');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port:", port)
})

app.get('/', (req, res) => {
    res.send('SES SNS TO HEROKU')
})

app.post('/', async (req, res) => {
    try{
        const url = JSON.parse(req.body)
        if (url.SubscribeURL) {
            console.log(url.SubscribeURL)
            await got(url.SubscribeURL)
            return res.end()
        }

        const body = JSON.parse(req.body.Message)

        if (!body.eventType) { return res.end() }

        console.log(body)
        
        return res.end()
    } catch (err) {
        console.log(err)
        res.end()
    }
})