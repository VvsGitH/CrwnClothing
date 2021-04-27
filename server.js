const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

// Creo un nuovo server express sulla porta 5000 o su quella fornita da env
const app = express();
const port = process.env.PORT || 5000;

// Abilito il cross-origin HTTP request
app.use(cors());
// Imposto la compressione dei chunk js
app.use(compression());
// Converto tutte le richieste in json in automatico
app.use(express.json());
// Controllo che non ci siano caratteri invalidi per un url
app.use(express.urlencoded({ extended: true }));

console.log('Initializing server on ' + process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
	// Inizializzo un server statico connesso a client/build
	app.use(express.static(path.join(__dirname, 'client/build')));

	// Forzo la connessione https
	// trustProtoHeader: true serve per il corretto funzionamento in Heroku
	app.use(enforce.HTTPS({ trustProtoHeader: true }));

	// Connetto il file index.html in client/build
	app.get('/*', (_req, res) => {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
}

// Imposto il path per il service worker del client
app.get('service-worker.js', (_req, res) => {
	res.sendFile(path.resolve(__dirname, 'client/build', 'service-worker.js'));
});

// Metto il server in ascolto sulla porta specificata
app.listen(port, error => {
	if (error) throw error;
	console.log('Server running on port ' + port);
});

/*
########################

	STRIPE CONFIG 

########################
*/

// Inserisco la chiave segreta in process.env
//process.env.NODE_ENV !== 'production' && require('dotenv').config();
require('dotenv').config();
// Inizializzo Stripe con la chiave segreta
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Creo la payment route per la gestione dei pagamenti tramite Stripe
// La request (ricevuta dal client) contiene il token per Stripe
// La response (inviata al client) contiene il risultato dell'operazione
app.post('/payment', (req, res) => {
	const body = {
		source: req.body.token.id,
		amount: req.body.amount,
		currency: 'eur',
	};

	stripe.charges.create(body, (stripeErr, stripeRes) => {
		if (stripeErr) {
			res.status(500).send({ error: stripeErr });
		} else {
			res.status(200).send({ success: stripeRes });
		}
	});
});
