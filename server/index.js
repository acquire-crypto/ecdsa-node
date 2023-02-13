const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const crypto = require("./crypto");

app.use(cors());
app.use(express.json());

const balances = new Map();

app.post("/deposit", (req, res) => {
  const { account, balance } = req.body;
  balances.set(account, balance);

});

app.get("/balance/:account", (req, res) => {
  const { account } = req.params;
  const balance = balances.get(account) || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, signature } = req.body;
  const { recipient, amount } = message;


  // Get public key and sender
  const pubKey = crypto.signatureToPubKey(message, signature);
  console.log(pubKey);
  const sender = crypto.pubKeyToAccount(pubKey);
  console.log(sender);


  setInitialBalance(sender);
  setInitialBalance(recipient);
  
  if (balances.get(sender) < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances.set(sender, balances.get(sender) - amount);
    balances.set(recipient, balances.get(recipient) + amount);
    res.send({ balance: balances.get(sender) });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(account) {
  if (!balances[account]) {
    balances[account] = 0;
  }
}
