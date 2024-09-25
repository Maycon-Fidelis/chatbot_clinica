const brain = require('brain.js');
const fs = require('fs');

// Carregar o modelo treinado
const model = JSON.parse(fs.readFileSync('./neuralnet.json', 'utf-8'));

const net = new brain.NeuralNetwork();
net.fromJSON(model);

// Função para preprocessar a entrada
function preprocessInput(input) {
    // Exemplo de pré-processamento simples
    const formattedInput = input.toLowerCase();
    const inputVector = new Array(61).fill(0); // Supondo que a entrada tenha 61 dimensões
    // Converta o texto para um vetor aqui (ex: utilizando one-hot encoding ou outro método)
    // Para fins de exemplo, vamos preencher o vetor com 1s na posição de letras encontradas
    for (let i = 0; i < formattedInput.length; i++) {
        const charCode = formattedInput.charCodeAt(i);
        if (charCode >= 97 && charCode <= 122) { // Letras a-z
            inputVector[charCode - 97] = 1; // Preencher a posição correspondente
        }
    }
    return inputVector;
}

// Função para obter a resposta do chatbot
function chatbotResponse(input) {
    const processedInput = preprocessInput(input);
    const output = net.run(processedInput);

    console.log("Saída da rede neural: ", output); // Log para inspecionar a saída

    if (output.some(isNaN)) {
        console.error("Erro na saída de rede: saída contém NaN", output);
        return "Desculpe, houve um erro ao processar sua pergunta.";
    }

    const highestOutputIndex = output.indexOf(Math.max(...output));
    const responses = [
        "Temos três especialistas: Dr. João Silva, Dra. Maria Costa e Dr. Pedro Santos.",
        "A clínica oftalmológica está localizada na Rua das Palmeiras, 456.",
        "Claro! Dr. João está disponível de segunda a sexta, das 7h às 13h. Para qual exame você gostaria de agendar?",
    ];
    
    return responses[highestOutputIndex] || "Desculpe, não consegui entender sua pergunta.";
}


// Exemplo de uso
const userInput = "Qual horario vocês funcionam ?";
const response = chatbotResponse(userInput);

console.log("Usuário: ", userInput);
console.log("Bot: ", response);
