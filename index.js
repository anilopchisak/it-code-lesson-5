const API_KEY = 'd071c7e9477641d1aa4113806252702';
const BASE_URL = `http://api.weatherapi.com/v1/current.json`;

const createUrl = (requestParams) => {
    let url = `${BASE_URL}?key=${API_KEY}`;
    Object.entries(requestParams).forEach(([key, value]) => {
        url += `&${key}=${value}`;
    });
    return url;
}

const fetchCurrentWeather = async (requestParams) => {
    const requestUrl =  createUrl(requestParams);
    try {
        const response = await fetch(requestUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch: ', error);
        throw error;
    }
}
