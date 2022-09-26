/**
 * 
 * @param {string} text 
 * @returns toCapitalized
 */
export const toCapitalized = (text) => {

    //split the above string into an array of strings 
    //whenever a blank space is encountered
    const arr = text.split(" ");

    //loop through each element of the array and capitalize the first letter.
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    const result = arr.join(" ");
    return result
}