// checks for empty object
export function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

const otherUtils = {
    isEmpty
};

export default otherUtils;
