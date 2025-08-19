const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const METHOD_FORECAST = import.meta.env.VITE_METHOD_FORECAST;

const getRequestParams = (data = null, days = null) => {
    const result = {
        'q': 'auto:ip',
        'lang': 'en',
        // 'aqi': 'yes',
    };
    if (days !== null) result.days = days;
    if (data !== null) 
        Object.entries(data).forEach(([key, value]) => {
            result[key] = value;
        }); 
    return result;
}

const createUrl = (requestParams, method) => {
    let url = `${BASE_URL}${method}?key=${API_KEY}`;
    Object.entries(requestParams).forEach(([key, value]) => {
        if (value) url += `&${key}=${value}`;
    });
    return url;
}

const fetchWeather = async (requestParams, method) => {
    const requestUrl = createUrl(requestParams, method);
    try {
        const response = await fetch(requestUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch forecast: ', error);
        throw error;
    }
}

const fetchForecastHandler = async (data = null) => {
    const requestParams = getRequestParams(data, 4);
    const response = await fetchWeather(requestParams, METHOD_FORECAST);
    return response;
}

export const fetchDataHandler = (data = null) => fetchForecastHandler(data);
