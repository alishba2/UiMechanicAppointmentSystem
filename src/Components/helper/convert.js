export default function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader(); // Capitalize 'FileReader'
        fileReader.readAsDataURL(file);
        fileReader.onload = () => { // Use lowercase 'onload' instead of 'onLoad'
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => { // Use lowercase 'onerror' instead of 'onError'
            reject(error);
        };
    });
}
