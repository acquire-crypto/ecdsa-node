import server from "./server";
// import wallet of accounts from MetaMask
import wallet from "./MetaMask";
// import UseState from react
import { useState } from "react";

function Wallet({ account, setAccount, balance, setBalance }) {

  const [deposit, setDeposit] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function onSelectAccount(evt) {
    
    const account = evt.target.value;
    setAccount(account);

    if (account) {
      const {
        data: { balance },
      } = await server.get(`balance/${account}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  /**
   * Function to generate new account
   * Create a new account to map of accounts
   * Post the address and starting balance to the server
   */
  async function onGenerate(evt){
    evt.preventDefault();

    // Generate a new Account and its keys
    wallet.newAccount();

    // Pull the new account from last position in array of accounts
    const newAccount = wallet.ACCOUNTS.at(-1);
    
    let newDeposit = parseInt(deposit);

    // Package the new account and deposit payload
    const addAccount = {
        account: newAccount, 
        balance: newDeposit,
      };

    // Reset deposit to 0
    setDeposit(0);

    try {
      const {
        data: { balance },
      } = await server.post(`deposit`, addAccount);
      setBalance(balance);
    } catch (ex) {
      alert(ex);
    }


  }

  return (
    // Select account option or create new wallet with starting balance
    <div className="container">

      <div className="wallet">
        <h1>Wallet</h1>
          <select onChange={onSelectAccount} value={account}>
            <option value="">-----Select Account------</option>
            {wallet.ACCOUNTS.map((a, i) => (
              <option key={i} value={a}>
                {a}
              </option>
            ))}
          </select>
        <div className="balance">Balance: {balance}</div>
      </div>

      <form className="transfer" onSubmit={onGenerate}>
        <label> Create Account
          <input placeholder="Enter initial deposit"
          value={deposit} 
          onChange={setValue(setDeposit)}></input>
          <input type="submit" className="button" value="Generate"></input>
        </label>
      </form>
    </div>
    
  );
}

export default Wallet;
