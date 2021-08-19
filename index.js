const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port:", port)
})

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/', (req, res) => {
    try{
        const body = JSON.parse(req.body.Message)

        if (!body.eventType) { return res.end() }

        console.log(body)
        
        return res.end()
    } catch (err) {
        console.log(err)
        res.end()
    }
})