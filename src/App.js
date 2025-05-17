import { useState } from "react";
import "./style.css";

export default function App() {
  return (
    <div className="app">
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [myPercentage, setMyPercentage] = useState(0);
  const [friendPercentage, setFriendPercentage] = useState(0);

  function handleReset() {
    setBill("");
    setMyPercentage(0);
    setFriendPercentage(0);
  }

  return (
    <div className="container">
      <BillInput bill={bill} onSetBill={setBill} />

      <SelectPercentage
        percentage={myPercentage}
        onSetPercentage={setMyPercentage}
      >
        How did you like the service?
      </SelectPercentage>

      <SelectPercentage
        percentage={friendPercentage}
        onSetPercentage={setFriendPercentage}
      >
        How did your friend like the service?
      </SelectPercentage>

      <Output
        bill={bill}
        myPercentage={myPercentage}
        friendPercentage={friendPercentage}
      />
      <ResetButton onReset={handleReset} />
    </div>
  );
}

// ----------------------BillInput Component----------------------
function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill? </label>
      <input
        type="number"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onSetBill(e.target.value)}
        min="0"
      />
    </div>
  );
}

// ----------------------SelectPercentage Component----------------------
function SelectPercentage({ children, label, percentage, onSetPercentage }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSetPercentage(Number(e.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

// ----------------------Output Component----------------------
function Output({ bill, myPercentage, friendPercentage }) {
  if (bill <= 0) return null;

  const averagePercentage = (myPercentage + friendPercentage) / 2;
  const tip = (bill * averagePercentage) / 100;
  const total = Number(bill) + tip;

  return (
    <h3>
      You pay ${total} (${bill} + ${tip.toFixed(2)} tip)
    </h3>
  );
}

// ----------------------ResetButton Component----------------------
function ResetButton({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
