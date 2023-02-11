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
   * TODO: Add async function to create new account
   * Create a new account to map of accounts
   * Post the address and starting balance to the server
   */

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

      <form className="transfer">
        <h1>Create Account</h1>
          <input placeholder="Enter initial deposit"
          value={deposit} 
          onChange={setValue(setDeposit)}></input>
          <input type="submit" className="button" value="Generate"></input>
      </form>
    </div>
    
  );
}

export default Wallet;
