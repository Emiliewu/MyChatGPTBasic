//express server that handle api requests coming in and respond back with a json object. it will use body parser and cors
// import { Configuration, OpenAIApi } from "openai";
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = 8080;

const configuration = new Configuration({
    organization: "org-qGAKteUQ6hLPWV9iTsDEz7ja",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();


app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        "model": "text-davinci-003",
        "prompt": `${message}`,
        "max_tokens": 10,
        "temperature": 0,
    });
    console.log(response);
    if(response.data) {
        if(response.data.choices) {
            res.json({
                message:response.data.choices[0].text
            });
        }
    }
   
});

app.listen(port, () => {
    console.log('listening to port ' + port);
});