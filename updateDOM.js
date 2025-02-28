const doc = document;
let currentCard = doc.getElementById('current-weather');
let detailsCard = doc.getElementById('details-weather');
let forecastCard = doc.getElementById('forecast-weather');

const getCurrent = (data) => data.current;
const getDetails = (data) => data.details;
const getForecast = (data) => data.forecast;

const currentHeaderLayout = (current) => {
    const header = doc.createElement('div');
    header.classList.add('current-weather__header');
    header.innerHTML = 
                `<h1 class="current-weather__week-day">${current.weekday}</h1>
                <p class="current-weather__date">${current.date}</p>
                <div class="current-weather__location">
                    <i class="fi fi-rr-marker"></i>
                    <p class="location-text">
                        <span>${current.city},</span>
                        <span>${current.country}</span>
                    </p>
                </div>`;
    return header;
}

const currentFooterLayout = (current) => {
    const footer = doc.createElement('div');
    footer.classList.add('current-weather__footer');
    footer.innerHTML = 
                `<h1 class="current-weather__temp">${current.temp} °C</h1>
                <div class="current-weather__desc">
                    <h3>${current.weather_desc}</h3>
                    <img src='${current.weather_icon}' />
                </div>`;
    return footer;
}

const detailsLayout = (detail, value) => {
    const div = doc.createElement('div');
    div.classList.add('weather-detail');
    div.innerHTML = `<p class="detail_name">${detail}</p>
            <p class="detail_value">${value.value} ${value.symb}</p>`;
    return div;
}

const forecastLayout = () => {
    
}

const updateCurrentWeather = (data) => {
    currentCard.innerHTML = '';
    const header = currentHeaderLayout(data);
    currentCard.append(header);
    const footer = currentFooterLayout(data);
    currentCard.append(footer);
}

const updateDetails = (data) => {
    detailsCard.innerHTML = '';
    Object.entries(data).forEach(([detail, value]) => {
        const layout = detailsLayout(detail, value);
        detailsCard.append(layout);
    })
}

const updateForecast = (data) => {
    forecastCard.innerHTML = '';
    const layout = forecastLayout(data);
    forecastCard.append(layout);
}

const updateDOM = (data) => {
    updateCurrentWeather(getCurrent(data));
    updateDetails(getDetails(data));
    // updateForecast(getForecast(data));
}

export const updateDOMHandler = (data) => updateDOM(data);
