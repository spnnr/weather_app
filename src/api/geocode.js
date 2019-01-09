import axios from "axios";

export default async function geocode(requestParams) {
    let response = {};
    try {
        response = await axios.get("/geocode", requestParams);
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        const location = response.data.results[0].formatted_address;

        return {
            lat,
            lng,
            location
        };
    } catch (error) {
        console.log(response.data.error_message);
        return {
            errorMessage: response.data.error_message
        };
    }
}
