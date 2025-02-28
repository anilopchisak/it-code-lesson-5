import { fetchDataHandler } from "./weather-api.js";
import { getDataFromResponseHandler } from "./dataHandler.js";
import { updateDOMHandler } from "./updateDOM.js";

let dataStorage = null;

const updateDataStorage = (data) => { dataStorage = data; }

// handle fetch and display, update data storage
const updateInfo = async (data = null) => {
    const response = await fetchDataHandler(data);
    if (response.error) alert(response.error.message);
    else {
        updateDataStorage(getDataFromResponseHandler(response));
        updateDOMHandler(dataStorage);
    }
}

export const updateInfoHandler = (data = null) => updateInfo(data);
