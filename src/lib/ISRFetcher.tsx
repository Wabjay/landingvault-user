// components/ISRFetcher.tsx
import React, { useEffect, useState } from "react";

interface ISRFetcherProps<T> {
  url: string; // API endpoint to fetch data from
  render: (data: T) => JSX.Element; // Render function for the data
  fallback?: JSX.Element; // Optional loading fallback
  errorFallback?: JSX.Element; // Optional error fallback
}

const ISRFetcher = <T,>({
  url,
  render,
  fallback = <div>Loading...</div>,
  errorFallback = <div>Something went wrong.</div>,
}: ISRFetcherProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://ideal-palm-tree-two.vercel.app/api/v1/${url}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        // console.log(result.page)
        setData(result);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);
  if (loading) return fallback;
  if (error || !data) return errorFallback;

  return render(data);
};

export default ISRFetcher;
