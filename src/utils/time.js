// library
import spacetime from "spacetime";

// returns a formatted time string (HH:MM)
export function getHoursAndMinutes(unixTime, timezone) {
    let date = new spacetime(unixTime * 1000, timezone);
    return date.unixFmt("H:mm");
}

export function getDayOfWeek(date) {
    const days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };
    let dayOfWeek = new Date(date * 1000).getDay();
    return days[dayOfWeek];
}

const timeUtils = {
    getDayOfWeek,
    getHoursAndMinutes
};

export default timeUtils;
