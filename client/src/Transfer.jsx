import { useState } from "react";
import server from "./server";
import wallet from "./MetaMask";

function Transfer({ account, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const message = {
      sender: account,
      amount: parseInt(sendAmount),
      recipient,
    };

    console.log(message);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, message);
      setBalance(balance);

    } catch (ex) {
      alert(ex);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <select onChange={setValue(setRecipient)} value={recipient}>
          <option value="">-----Select Recipient------</option>
            {wallet.ACCOUNTS.map((a, i) => (
              <option key={i} value={a}>
                {a}
              </option>
            ))
            }
         </select> 
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
