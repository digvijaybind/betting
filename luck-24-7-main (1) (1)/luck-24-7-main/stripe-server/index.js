require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const hostname = '0.0.0.0';
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/pay', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount)
      return res.status(400).json({ message: 'Please enter amount' });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      payment_method_types: ['card'],
      metadata: { amount },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: 'Payment initiated', clientSecret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post("/withdrawal", async (req, res) => {
  try {
    const { amount,account } = req.body;
    if (!amount&& !account)
      return res.status(400).json({ message: "Invalid amount or account" });
      const transfer = await stripe.transfers.create({
        amount: amount,
        currency: "inr",
        destination: "{{CONNECTED_STRIPE_ACCOUNT_ID}}",
      });
      res.json({ message: "Payment initiated", clientSecret });

    // const clientSecret = paymentIntent.client_secret;
    // res.json({ message: "Payment initiated", clientSecret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.get('/', async (req, res) => {
  try {
    return res.status(200).json({ message: 'Hello world' });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
