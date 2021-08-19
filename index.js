const express = require('express');
const got = require('got');
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
        
        const url = req.body;
        if (req.is('text/*')){
            if (url.SubscribeURL) {
                console.log(url.SubscribeURL)
                await got(url.SubscribeURL)
                return res.end()
            }
        }
    
        if (!url.eventType) { return res.end() }

        console.log(drip)
        
        return res.end()
    } catch (err) {
        console.log(err)
        res.end()
    }
})