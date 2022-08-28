import { useState } from "react";

const useApi = (apiFunc) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetData = () => setData([]);

    const request = async (...args) => {
        setLoading(true);
        const response = await apiFunc(...args);
        setLoading(false);
        if (!response.ok) setError(response?.data?.responseMessage || true);
        if (response.data) setData(response.data.data);
        return response;
    };

    return { data, error, loading, setLoading, resetData, request };
};


export default useApi;