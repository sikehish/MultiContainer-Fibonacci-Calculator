import { useEffect, useState } from "react";

const Fib = () => {
  const [indexes, setIndexes] = useState([]);
  const [values, setValues] = useState([]);
  const [index, setIndex] = useState("");
  const [entry, setEntries] = useState([]);

  useEffect(() => {
    async function func1() {
      const values = await fetch("/api/values/current");
      setValues(values);
    }

    func1();
  }, []);

  useEffect(() => {
    async function func2() {
      const seenIndexes = await fetch("/api/values/all");
      setIndexes(seenIndexes);
    }

    func2();
  }, []);

  // useEffect(() => {
  //   function renderVals() {
  //     const entries = [];
  //     for (const key in values) {
  //       entries.push(
  // <div key={key}>
  //   For index {key} Fibonacci value is {values[key]}
  // </div>
  //       );
  //     }
  //     setEntries(entries);
  //   }

  //   renderVals();
  // }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/values", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index }),
    });
    setIndex("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter the index:</label>
        <input
          type="text"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Indexes computed:</h3>
      {indexes &&
        indexes.length > 0 &&
        indexes.map(({ number }) => number).join(",")}

      <h3>Calculated values:</h3>
      {Object.keys(values).map((key) => (
        <div key={key}>
          For index {key} Fibonacci value is {values[key]}
        </div>
      ))}
    </div>
  );
};

export default Fib;
