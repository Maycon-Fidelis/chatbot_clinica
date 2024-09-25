const brain = require('brain.js');
const fs = require('fs');

const model = JSON.parse(fs.readFileSync('./neuralnet.json'));
const net = new brain.NeuralNetwork();
net.fromJSON(model);

const trainingData = require('../training/trainedModel.json');

const formatInput = (input) => {
    const formattedInput = {};
    input.toLowerCase().split(' ').forEach(word => {
        formattedInput[word] = 1;
    });
    return formattedInput;
};

const getResponse = (input) => {
    const formattedInput = formatInput(input);
    const output = net.run(formattedInput);
    
    const sortedResponses = Object.entries(output).sort(([, a], [, b]) => b - a);
    return sortedResponses[0]; // [resposta, probabilidade]
};

const userInput = "Como posso agendar uma consulta?";
const [bestResponse, probability] = getResponse(userInput);

console.log("Usuario: ", userInput);
console.log("Bot: ", bestResponse);
console.log("Probabilidade: ", probability);
