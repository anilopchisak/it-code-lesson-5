const dayOfWeek = (date, weekday = 'long') => {
    const newDate = new Date(date);
    const result = newDate.toLocaleDateString('en-GB', { weekday: weekday });
    return result;
}

const formattedDate = (date) => {
    const newDate = new Date(date);
    const result = newDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(',', ''); 
    return result;
}

const getDataFromResponse = (response) => {
    const result = {
        current: {
            'city': response.location.name,
            'weekday': dayOfWeek(response.current.last_updated, 'long'),
            'date': formattedDate(response.current.last_updated),
            'region': response.location.region,
            'country': response.location.country,
            'weather_icon': response.current.condition.icon,
            'temp': response.current.temp_c,
            'weather_desc': response.current.condition.text,
        },
        details: {
            'preciptration': {
                value: response.current.precip_mm,
                symb: '%'
            },
            'humidity': {
                value: response.current.humidity,
                symb: '%'
            },
            'wind': {
                value: response.current.wind_kph,
                symb: 'km/h'
            }
        },
        forecast: [],
    }
    response.forecast.forecastday.slice(1).forEach((day) => {
        result.forecast.push({
            'weekday_short': dayOfWeek(day.date, 'short'),
            'weather_icon': day.day.condition.icon,
            'temp': day.day.avgtemp_c,
        });
    });

    return result;
}

export const getDataFromResponseHandler = (response) => getDataFromResponse(response);
