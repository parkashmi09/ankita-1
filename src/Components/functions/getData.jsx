import { useState } from "react";

const useGetData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const fetchData = async (url, errorMessage, successMessage) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(errorMessage);
      }
      const jsonData = await response.json();
      console.log(jsonData, "jsonData")
      setData(jsonData);
      setSuccessMessage(successMessage);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, successMessage, fetchData };
};

export default useGetData;
