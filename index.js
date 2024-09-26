const express = require('express');
const app = express();
const port = 3001;
const { getChatbotResponse } = require('./bot/chatbot');

app.get('/:pergunta', (req, res) => {
    const userInput = req.params.pergunta;
    const bestResponse = getChatbotResponse(userInput);
    if (bestResponse) {
        res.send({ response: bestResponse[0] });
    } else {
        res.status(500).send({ error: 'Erro ao obter resposta do chatbot.' });
    }
});

app.listen(port, () => {
    console.log("Server is listening on port", port);
});  
