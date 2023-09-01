import { useEffect, useState } from "react";

const Fib = () => {
  const [indexes, setIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");
  const [entry, setEntries] = useState([]);

  useEffect(() => {
    function func1() {
      if (index === "") {
        fetch("/api/values/current")
          .then((res) => res.json())
          .then((vals) => setValues(vals))
          .catch((err) => console.log(err));
      }
      // console.log(vals);
    }

    func1();
  }, [index]);

  useEffect(() => {
    function func2() {
      if (index === "") {
        fetch("/api/values/all")
          .then((res) => res.json())
          .then((inds) => setIndexes(inds))
          .catch((err) => console.log(err));
      }
    }

    func2();
  }, [index]);

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
