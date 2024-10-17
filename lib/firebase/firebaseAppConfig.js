// Initializes and exports firebase app for future use
const { initializeApp } = require('firebase/app');

const { firebaseConfig } = require('../../config.json');

const firebaseApp = initializeApp(firebaseConfig);

module.exports = {
	firebaseApp,
};