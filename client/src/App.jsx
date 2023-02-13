import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        account={account}
        setAccount={setAccount}
      />
      <Transfer setBalance={setBalance} account={account} />
    </div>
  );
}

export default App;
