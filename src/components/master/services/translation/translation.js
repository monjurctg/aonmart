import dataset from "./dataset";

export function translate(key) {
    if (process.browser && key.length > 0) {
        const lang = localStorage.getItem('lang') || 'en';

        const translatedDataSet = dataset;

        const data = translatedDataSet.filter(translateObj => translateObj.key.trim() == key.trim());

        if (data.length > 0) {
            if (typeof data[0][lang] !== 'undefined' && data[0][lang] === '') {
                return key;
            }

            return data[0][lang];
        }

        return key;
    }

    return key;
}