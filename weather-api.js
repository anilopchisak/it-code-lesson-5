const API_KEY = 'd071c7e9477641d1aa4113806252702';
const BASE_URL = 'http://api.weatherapi.com/v1/';
const METHOD_FORECAST = 'forecast.json';

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
