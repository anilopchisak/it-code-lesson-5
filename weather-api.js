import {API_KEY, BASE_URL, METHOD_CURRENT, METHOD_FORECAST} from './consts.js';

const getRequestParams = (data = null, days = null) => {
    const result = {
        'q': 'auto:ip',
        'lang': 'ru',
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

const fetchForecastHandler = async (data) => {
    const requestParams = getRequestParams(data, 3);
    const response = await fetchWeather(requestParams, METHOD_FORECAST);
    return response;
}

const fetchCurrentWeatherHandler = async (data) => {
    const requestParams = getRequestParams(data);
    const response = await fetchWeather(requestParams, METHOD_CURRENT);
    return response;
}

// const data = {
//     'q': 'Ufa'
// }

// const response = await fetchCurrentWeatherHandler(data);
// const response = await fetchForecastHandler(data);

// console.log(response);
