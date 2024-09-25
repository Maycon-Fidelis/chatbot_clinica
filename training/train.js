const fs = require('fs');
const brain = require('brain.js');

// Carrega os dados de treinamento do arquivo JSON
const trainingData = require('./conversation-data.json');
const net = new brain.NeuralNetwork();

// Formata os dados para treinamento
const formattedData = trainingData.nlu.flatMap(item => 
    item.examples.map(example => ({
        input: { [example]: 1 }, // Representação do input
        output: { [item.intent]: 1 } // Representação do output
    }))
);

// Treina a rede neural
net.train(formattedData, {
    log: true,
    logPeriod: 100,
    iterations: 20000,
    errorThresh: 0.005,
});

// Salva o modelo treinado
const trainedModel = net.toJSON();
fs.writeFileSync('trainedModel.json', JSON.stringify(trainedModel));

console.log("Modelo treinado e salvo com sucesso!");
