import server from "./server";
// TODO: import wallet of accounts from MetaMask
import wallet from "./MetaMask";
// TODO: import UseState from react
import { useState } from "react";

function Wallet({ account, setAccount, balance, setBalance }) {

  const [deposit, setDeposit] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function onSelectAccount(evt) {
    const selectedAccount = evt.target.value;
    setAccount(selectedAccount);
    if (selectedAccount) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
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
    console.log(wallet.ACCOUNTS);
    
    const addAccount = {
        account: newAccount, 
        balance: parseInt(deposit)
      };

    setDeposit(0);

    // TODO: Package the new account and deposit payload

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
        <div className="balance">Account: {wallet.getAddress(account)}</div>
        <div className="balance">Balance: {balance}</div>
      </div>

      <form className="transfer" onSubmit={onGenerate}>
        <h1>Create Account</h1>
        <label> Starting Balance
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
