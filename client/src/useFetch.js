import { useState, useEffect } from "react";
/* A fetch hook that deals with all three states of a request */
export default function useFetch(uri) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uri) return;
    fetch(uri)
      .then(data => data.json())
      .then(setData) //it's implicit that setData uses data as it's argument, because that's how .then() works (see promises)
      .then(() => setLoading(false))
      .catch(setError);
  }, [uri]);

  return {
    loading,
    data,
    error
  };
}