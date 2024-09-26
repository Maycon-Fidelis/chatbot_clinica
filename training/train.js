const brain = require('brain.js');
const fs = require('fs');

const trainingData = require('./conversation-data.json');
const net = new brain.NeuralNetwork();

const vocabulary = Array.from(new Set(
    trainingData.flatMap(item => item.input.toLowerCase().split(' '))
));

const formattedData = trainingData.map(item => ({
    input: vocabulary.reduce((acc, word) => {
        acc[word] = item.input.toLowerCase().includes(word) ? 1 : 0;
        return acc;
    }, {}),
    output: { [item.output.toLowerCase()]: 1 }
}));

net.train(formattedData, {
    iterations: 200000,
    log: true,
    logPeriod: 100
});

const model = net.toJSON();
fs.writeFileSync('./data/neuralnet.json', JSON.stringify(model));
fs.writeFileSync('./data/vocabulary.json', JSON.stringify(vocabulary));

console.log("Rede neural treinada e salva!");
