const brain = require('brain.js');
const fs = require('fs');

const model = JSON.parse(fs.readFileSync('./neuralnet.json'));
const net = new brain.NeuralNetwork();
net.fromJSON(model);

const trainingData = require('../training/conversation-data.json');

const formatInput = (input) => {
    return trainingData.map(item => ({
        input: { [item.input.toLowerCase()]: 1},
        output: { [item.output.toLocaleLowerCase]: 1 }
    }));
};

const getResponse = (userInput) => {
    const formattedData = formatInput(userInput);
    
    const output = net.run({ [userInput.toLowerCase()]: 1 });
    
    const responseIndex = Object.keys(output).reduce((a, b) => output[a] > output[b] ? a : b);
    
    return trainingData.find(item => item.output.toLowerCase() === responseIndex).output;
};

const userInput = "quais exames vocês fazem ?";
const response = getResponse(userInput);

console.log("Usuario: ", userInput);
console.log("Bot", response);