const brain = require('brain.js');
const fs = require('fs');

const trainingData = require('./conversation-data.json');

const net = new brain.NeuralNetwork();

const formattedData = trainingData.map(item =>({
    input: item.input.toLowerCase(),
    output: item.output.toLocaleLowerCase()
}));

net.train(formattedData,{
    interations: 200000,
    log: true,
    logPeriod: 100
});

const model = net.toJSON();

fs.writeFileSync('./neuralnet.json', JSON.stringify(model));

console.log("Rede neural treinada e salva!");