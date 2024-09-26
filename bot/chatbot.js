const brain = require('brain.js');
const fs = require('fs');

const model = JSON.parse(fs.readFileSync('training/data/neuralnet.json'));
const net = new brain.NeuralNetwork();
net.fromJSON(model);

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
    return sortedResponses[0];
};

const getChatbotResponse = (userInput) => {
    return getResponse(userInput);
};

module.exports = { getChatbotResponse };