import { useEffect, useState } from "react";

export default Fib = () => {
  const [indexes, setIndexes] = useState([]);
  const [values, setValues] = useState([]);
  const [index, setIndex] = useState("");

  useEffect(() => {
    async function func1() {
      const values = await fetch("/api/values/current");
      setValues(values);
    }

    func1();
  });

  useEffect(() => {
    async function func2() {
      const seenIndexes = await fetch("/api/values/current");
      setIndexes(seenIndexes);
    }

    func2();
  });
};
