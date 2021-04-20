const express = require('express');
const cors = require('cors');
const path = require('path');

// Posso accedere alla secret key solo in dev e test!
// In production, la chiave segreta sarà passata dal servizio di hosting
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
// Includo Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Creo una nuova app sulla port 5000 o sulla porta fornita dal servizio di deploy
const app = express();
const port = process.env.PORT || 5000;

// Converto tutte le richieste in json in automatico
// E controllo che non ci siano caratteri invalidi per un url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server: port 5000
// FrontEnd: port 3000
// Devo abilitare le richieste dalla porta 3000 alla porta 5000
app.use(cors());

// Dobbiamo servire il client
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));

	app.get('*', (_, res) => {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
}

// Metto il server in ascolto sulla porta specificata
app.listen(port, error => {
	if (error) throw error;
	console.log('Server running on port ' + port);
});

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
