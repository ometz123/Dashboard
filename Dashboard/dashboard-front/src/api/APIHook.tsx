import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface UseApiProps<T> {
  config: AxiosRequestConfig;
  processData?: (data: any) => T;
}

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

// Simple in-memory cache
const cache: { [url: string]: any } = {};

export function useApi<T>({ config, processData }: UseApiProps<T>): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = config.url as string;
      if (cache[cacheKey]) {
        setData(cache[cacheKey]);
        setLoading(false);
        return;
      }

      try {
        const response: AxiosResponse = await axios(config);
        const processedData = processData ? processData(response.data) : response.data;
        cache[cacheKey] = processedData; // Save to cache
        setData(processedData);
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config, processData]);

  return { data, loading, error };
}
