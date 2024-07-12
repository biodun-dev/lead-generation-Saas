"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const synaptic_1 = require("synaptic");
const extractFeatures = (lead) => {
    return {
        feature1: lead.feature1,
        feature2: lead.feature2,
        feature3: lead.feature3,
    };
};
// Create the neural network
const inputLayer = new synaptic_1.Layer(3);
const hiddenLayer = new synaptic_1.Layer(5);
const outputLayer = new synaptic_1.Layer(1);
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);
const net = new synaptic_1.Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer,
});
// Dummy training data - replace with real training data
const trainingData = [
    { input: [0.1, 0.2, 0.3], output: [0.1] },
    { input: [0.4, 0.5, 0.6], output: [0.5] },
    { input: [0.7, 0.8, 0.9], output: [0.9] },
];
// Train the neural network
trainingData.forEach((data) => {
    net.activate(data.input);
    net.propagate(0.3, data.output);
});
const scoreLead = (lead) => {
    const features = extractFeatures(lead);
    const input = [features.feature1, features.feature2, features.feature3];
    const [score] = net.activate(input);
    return score;
};
exports.default = {
    scoreLead,
};
