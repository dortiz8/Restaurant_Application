import {useState, useEffect} from 'react';

const baseUrl = "http://localhost:3000/";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function init() {
            try {
                const response = await fetch(baseUrl + url)
                // when fetching a response we need to make sure the response is ok.
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                }else{
                    throw response;
                }
            } catch (e) {
                setError(e)
            }finally{
                setLoading(false)
            }
        }
        init();
    }, [url])// if anyone passes a different url then a new call to fetch data will be call
    // second argument is a list of reasons that useEffect should re run. Dependency Array
    return {data, error, loading}
}
