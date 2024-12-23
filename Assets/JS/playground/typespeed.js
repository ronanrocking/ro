async function fetchRandomArticleWords(X, allowSpecialAndNumbers, setCapitalization) {
    const apiUrlIntro = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=random&exintro=1&explaintext=1&grnnamespace=0&origin=*';
    const apiUrlFull = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=random&explaintext=1&grnnamespace=0&origin=*';

    try {
        let result = await fetchArticle(X, apiUrlIntro, apiUrlFull, allowSpecialAndNumbers, setCapitalization);
        
        // Retry if the page is too short
        while (result.split(' ').length < X) {
            console.log('Page is too short, retrying...');
            result = await fetchArticle(X, apiUrlIntro, apiUrlFull, allowSpecialAndNumbers, setCapitalization);
        }
        
        return result; // Return the result as a string
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null in case of error
    }
}

// Helper function to fetch an article and return the first X words
async function fetchArticle(X, apiUrlIntro, apiUrlFull, allowSpecialAndNumbers, setCapitalization) {
    const responseIntro = await fetch(apiUrlIntro);
    const dataIntro = await responseIntro.json();

    // Extract page details
    const pageIntro = Object.values(dataIntro.query.pages)[0]; // Random page intro
    let extract = pageIntro.extract;

    // If the intro doesn't provide enough words, fetch the full page
    if (extract.split(' ').length < X) {
        console.log('Intro is too short, fetching full page...');
        const responseFull = await fetch(apiUrlFull);  // Fetch the full page content
        const dataFull = await responseFull.json();
        
        const pageFull = Object.values(dataFull.query.pages)[0]; // Full page content
        extract = pageFull.extract;  // Get full page extract
    }

    // Process text based on arguments
    return processText(extract, X, allowSpecialAndNumbers, setCapitalization);
}

// Function to process text: handle special characters, numbers, and capitalization
function processText(text, X, allowSpecialAndNumbers, setCapitalization) {
    // Remove special characters and numbers if required
    if (allowSpecialAndNumbers === 0) {
        text = text.replace(/[^\w\s]/g, ''); // Remove special characters (keep letters and numbers)
        text = text.replace(/\d+/g, ''); // Remove numbers
    }

    // Convert to lowercase if setCapitalization is low
    if (setCapitalization === 0) {
        text = text.toLowerCase();
    }

    // Get the first X words
    return getFirstXWords(text, X);
}

// Function to extract the first X words
function getFirstXWords(text, X) {
    const words = text.split(' ');  // Split the text into an array of words
    const wordCount = words.length;  // Get the number of words in the text

    // Return either all the words or the first X words, whichever is less
    return words.slice(0, Math.min(X, wordCount)).join(' ');
}

// Define the main function after it's used
function main_function(text, words_list) {
    console.log(words_list);
    console.log(text);

    const search_input = document.getElementById('typebar');  // Correct variable name here
    const text_output = document.getElementById('text_output');

    text_output.textContent = text;

    search_input.addEventListener('input', () => {
        const currentText = search_input.value; 
        console.log(currentText);  
    });
}

let words; 

// Example usage
fetchRandomArticleWords(75, 0, 1).then(firstXWords => {
    let words_list = firstXWords.split(" ");
    main_function(firstXWords, words_list);
});
