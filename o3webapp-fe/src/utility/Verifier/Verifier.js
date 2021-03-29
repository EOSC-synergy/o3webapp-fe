import VerificationError from "./VerificationError.js"


/**
 * Verifies the latitude input
 * @param {number} lat_min - the lower latitude input
 * @param {number} lat_max - the upper latitude input
 */
export function verifyLatitude(lat_min, lat_max) {

    //catch undefined or null numbers
    if (lat_min === null || lat_min === undefined) {
        throw new VerificationError('Please enter a valid lower border (format:"lower, upper")');
    }
    if (lat_max === null || lat_max === undefined) {
        throw new VerificationError('Please enter a valid upper border (format:"lower, upper")');
    }

    //check if in valid boundry
    if (lat_min < -90 || lat_max > 90) {
        throw new VerificationError("Please enter a valid latitude!");
    }

    //check that max is bigger than min
    if (lat_min >= lat_max) {
        throw new VerificationError("Upper Latitude border must be bigger than lower border!");
    }
}

/**
 * Verify the year input
 * @param {number} begin - The lower year input
 * @param {number} end - The upper year input
 */
export function verifyYear(begin, end) {

    //catch undefined or null numbers
    if (isNaN(begin)) {
        throw new VerificationError('Please enter a valid start year!');
    }
    if (isNaN(end)) {
        throw new VerificationError('Please enter a valid end year!');
    }

    //check if in valid boundry
    if (begin < 1960) {
        throw new VerificationError("Only years from 1960 onwards are supported!");
    }
    if (end > 2100) {
        throw new VerificationError("Only years until 2100 are supported!");
    }

    // check that begin is smaller than end
    if (begin >= end) {
        throw new VerificationError("The upper year needs to be bigger than the lower!");
    }
    return true;
}

/**
 * Verify month input
 * @param {number[]} months 
 */
export function verifyMonths(months) {

    if (months.length === 0) {
        throw new VerificationError("Please enter at least one valid month!");
    }


    months.forEach(month => {
        if (!Number.isInteger(month)) {
            throw new VerificationError("Please enter a valid month");
        }

        if (month < 1 || month > 12) {
            throw new VerificationError("Only 1 to 12 are valid as values for a month");
        }
    });
}


export function verifyModels(models) {
    if (models.length === 0) {
        throw new VerificationError("Please select at least one model!");
    }
    return true;
}