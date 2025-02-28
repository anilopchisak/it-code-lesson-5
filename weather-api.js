import {API_KEY, BASE_URL, METHOD_CURRENT, METHOD_FORECAST, METHOD_IP} from './consts.js';

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

const getRegion = (response) => response.region;

const fetchCurrentWeatherByIP = async (requestParams) => {
    const requestUrl =  createUrl(requestParams, METHOD_IP);
    try {
        const response = await fetch(requestUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch weather by ip: ', error);
        throw error;
    }
}

const fetchCurrentWeather = async (requestParams) => {
    const requestUrl =  createUrl(requestParams, METHOD_CURRENT);
    try {
        const response = await fetch(requestUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch current weather: ', error);
        throw error;
    }
}

const fetchForecast = async (requestParams) => {
    const requestUrl =  createUrl(requestParams, METHOD_FORECAST);
    try {
        const response = await fetch(requestUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch forecast: ', error);
        throw error;
    }
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
    const response = await fetchForecast(requestParams, METHOD_FORECAST);
    return response;
}

const fetchCurrentWeatherHandler = async (data) => {
    const requestParams = getRequestParams(data);
    const response = await fetchCurrentWeather(requestParams, METHOD_CURRENT);
    return response;
}

const fetchCurrentWeatherByIpHandler = async () => {
    const requestParams_ip = getRequestParams(); 
    const response_ip = await fetchWeather(requestParams_ip, METHOD_IP);
    // create data for fetch weather by ip
    const region_ip = getRegion(response_ip);
    const requestParams_weather = getRequestParams(region_ip);
    // fetch weather by ip
    const response_weather = await fetchCurrentWeatherHandler(requestParams_weather);
    return response_weather;
}

// const data = {
//     'q': 'Ufa'
// }

// const response = await fetchForecastHandler(data);

// console.log(response);
