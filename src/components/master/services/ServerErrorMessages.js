/**
 * Convert Servers Error Object as javascript array
 * 
 * @param {object} errors 
 * 
 * @returns array
 */
export const convertServerErrorsArray = (errors) => {
    const errorsArray = [];

    if (Object.keys(errors).length > 0) {
        Object.keys(errors).map(errorKey => {
            const subErrors = errors[errorKey];

            subErrors.forEach(error => {
                errorsArray.push(error);
            });
        });
    }
    
    return errorsArray;
}

/**
 * Print Server error message with ul
 * 
 * @param {object} errors 
 * 
 * @returns string
 */
export const printErrorMessages = (errors) => {
    const errorsArray = convertServerErrorsArray(errors);

    let html = "";

    errorsArray.forEach(error => {
        html += error + "\r\n";
    });

    return html;
}