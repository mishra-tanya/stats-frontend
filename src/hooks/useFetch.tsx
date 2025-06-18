import { useEffect, useState } from "react";
import apiClient from "@/services/axios";

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(endpoint: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient.get(endpoint)
      .then((response) => {
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch data");
        }
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading, error };
}

export default useFetch;
