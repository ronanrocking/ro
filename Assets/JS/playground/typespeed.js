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
    
    text = text.replace(/[^\x00-\x7F]/g, ''); // Remove non-ASCII characters
    
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


////filter the words'list
function updateList(strings) {
    return strings
      .filter(str => str !== '')  // Remove empty strings
      .map(str => str.replace(/[\n\t\r]/g, ''));  // Remove \n, \t, \r, and similar characters
  }
  




//button functions
function number_toggle_function() {
    console.log("number toggle");
    text_container.innerHTML = "Loading..."; // Clear the container

    if(number_toggle_state == 0) {
        number_toggle_state = 1;
        document.getElementById('number_toggle').style.backgroundColor = "#8100005e";
        document.getElementById('number_toggle').style.border = "0px";

        fetchRandomArticleWords(time_toggle_state, number_toggle_state, case_toggle_state).then(firstXWords => {
            words_list = firstXWords.split(" ");
            number_toggle.removeEventListener('click', number_toggle_function);
            ready_for_test(firstXWords, words_list);

            
            return;
            
        });
    
    }else if(number_toggle_state == 1) {
        number_toggle_state = 0;
        document.getElementById('number_toggle').style.backgroundColor = "";
        document.getElementById('number_toggle').style.border = "";

        fetchRandomArticleWords(time_toggle_state, number_toggle_state, case_toggle_state).then(firstXWords => {
            words_list = firstXWords.split(" ");
            number_toggle.removeEventListener('click', number_toggle_function);
            ready_for_test(firstXWords, words_list);
            return;
        });
    }


}

function case_toggle_function() {
    console.log("case toggle");
    text_container.innerHTML = "Loading..."; // Clear the container

    if(case_toggle_state == 0) {
        case_toggle_state = 1;
        document.getElementById('case_toggle').style.backgroundColor = "#8100005e";
        document.getElementById('case_toggle').style.border = "0px";

        fetchRandomArticleWords(time_toggle_state, number_toggle_state, case_toggle_state).then(firstXWords => {
            words_list = firstXWords.split(" ");
            case_toggle.removeEventListener('click', case_toggle_function);
            ready_for_test(firstXWords, words_list);
            return;
        });
    
    }else if(case_toggle_state == 1) {
        case_toggle_state = 0;
        document.getElementById('case_toggle').style.backgroundColor = "";
        document.getElementById('case_toggle').style.border = "";

        fetchRandomArticleWords(time_toggle_state, number_toggle_state, case_toggle_state).then(firstXWords => {
            words_list = firstXWords.split(" ");
            case_toggle.removeEventListener('click', case_toggle_function);
            ready_for_test(firstXWords, words_list);
            return;
        });
    }
}

function time_toggle_function() {
    console.log("time toggle");
    text_container.innerHTML = "Loading..."; // Clear the container

    if(time_toggle_state == 25) {
        time_toggle_state = 50;
        document.getElementById('time_toggle_p').textContent = "long";
        fetchRandomArticleWords(time_toggle_state, number_toggle_state, case_toggle_state).then(firstXWords => {
            words_list = firstXWords.split(" ");
            time_toggle.removeEventListener('click', time_toggle_function);
            ready_for_test(firstXWords, words_list);
            return;
        });
    
    }else if(time_toggle_state == 50) {
        time_toggle_state = 25;
        document.getElementById('time_toggle_p').textContent = "short";
        fetchRandomArticleWords(time_toggle_state, number_toggle_state, case_toggle_state).then(firstXWords => {
            words_list = firstXWords.split(" ");
            time_toggle.removeEventListener('click', time_toggle_function);
            ready_for_test(firstXWords, words_list);
            return;
        });
    }
}


function typebar_active(){
    if (start_flag == 0) {
        start_time = new Date().getTime();
        start_flag = 1;

        current_index = 0;
        document.getElementById(`word-${current_index}`).style.background = "#8800005e"; 
    }
    if (start_flag == 1) {
        
    }
   

    
   

    
    
    current_text = type_input.value;
    current_index = typed_words.length;
    //console.log(current_text);

    //updating timer
    current_time = (new Date().getTime());
    timer = (current_time - start_time)/1000;
    timer_text.textContent = timer.toFixed(2);

    //waiting for one word to be typed
    if(current_text.endsWith(" ")) {
        typed_words.push(current_text.trim());
        if(typed_words[typed_words.length - 1] === ""){
            //typed_words.pop();
            
        }

        type_input.value = "";
        console.log(typed_words);
        current_highlight_index++;


    }

    
    accuracy = ((matches / typed_words.length) * 100).toFixed(1);
    wpm = ((matches / timer ) * 0.6 * accuracy).toFixed(2);
    wpm_container.textContent = wpm;
    accuracy_container.textContent = accuracy;

    console.log(current_index);

    //comparing matches
    if(typed_words[current_index] == words_list[current_index]){
        matches++;
        document.getElementById(`word-${current_index}`).style.color = "#880000";   
    }
    else{
    
        document.getElementById(`word-${current_highlight_index - 1}`).style.background = ""; 
        document.getElementById(`word-${current_highlight_index}`).style.background = "#8800005e"; 

    }

    //end condition
    if (current_index > words_list.length - 1) {
        console.log("end");
        end_test();

    }






    

        
}

function end_test() {
    document.getElementById(`word-${current_highlight_index}`).style.background = ""; 
    document.getElementById(`word-${current_highlight_index - 1}`).style.background = ""; 

    type_input.value = "test over";
    type_input.removeEventListener('input', typebar_active);

    type_input.style.backgroundColor = "#1B1717";
    type_input.style.color = "#EEEBDD";
    type_input.style.fontWeight = "light";
    type_input.style.border = "solid 1px";

    //text_container.innerHTML = "Test Over!";
    text_container.style.backgroundColor = "#1B1717";
    text_container.style.border = "solid 1px";
    text_container.style.color = "#EEEBDD";

    elements = document.querySelectorAll('.score');
    elements.forEach(element => {
        
        element.style.backgroundColor = "#e6ddb5"; // Example: Change text color
        element.style.borderRadius = "25px"; // Example: Change font weight

        const childParagraphs = element.querySelectorAll('p');
        childParagraphs.forEach(p => {
            p.style.color = "#1B1717"; // Example: Change text color
            p.style.fontWeight = "bold"; // Example: Change font weight
        });
    });
}







function ready_for_test(text, words_list_dummy) {
    /*document.querySelectorAll('*').forEach(element => {
        element.style.cssText = ''; // Clear inline styles
        
      });*/



    //resetting the variables
    timer = 0;
    wpm = 0;
    accuracy = 0;
    start_flag = 0;
    start_time = 0;
    current_index = 0;
    current_highlight_index = 0;
    matches = 0;
    total_words = words_list.length;
    current_index = 0;

    wpm_container.textContent = wpm;
    accuracy_container.textContent = accuracy;

    type_input.removeEventListener('input', typebar_active);
    timer_text.textContent = "--";
    type_input.value = "";

    typed_words = [];
    console.log("test loaded!");
    text_container.innerHTML = ""; // Clear the container
    
    //if(change parameters) -> reload test
    const number_toggle = document.getElementById('number_toggle');
    const case_toggle = document.getElementById('case_toggle');
    const time_toggle = document.getElementById('time_toggle');
    const restart_button = document.getElementById('restart');
    
    number_toggle.addEventListener('click', number_toggle_function);
    case_toggle.addEventListener('click', case_toggle_function);
    time_toggle.addEventListener('click', time_toggle_function);
    restart_button.addEventListener('click', () => {location.reload();});
    

    
    //adding text output
    text_output.textContent = ""; //removing "loading..."

    words_list = updateList(words_list); // Filter the words list
    console.log(words_list);

    words_list.forEach((item, index) => {
        const p = document.createElement('p'); // Create a new <p> element
        p.textContent = item; // Set its text content
        p.id = `word-${index}`; // Assign a unique ID
        text_container.appendChild(p); // Append it to the container

        // Log for tracking purposes
        
    });

    //typing and reading the input
    type_input.addEventListener('input', typebar_active);

    type_input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            type_input.value = "";
            end_test();
            
        }
    });

    



    

    

    
}


//ON LOAD

//Default text load [75 words, no special characters, capitalization]
let words; 
let number_toggle_state = 0;
let case_toggle_state = 0;
let time_toggle_state = 25;
let current_text = "";

let start_time = 0;
let timer = 0;
let wpm = 0;
let accuracy = 0;
let start_flag = 0;

let typed_words = [];

let matches = 0;
let total_words;

let current_index = 0;
let current_highlight_index = 0;
let words_list = [];

const type_input = document.getElementById('typebar');  
const text_output = document.getElementById('text_output');
const text_container = document.getElementById('text');

const timer_text = document.getElementById('timer');
const wpm_container = document.getElementById('WPM');
const accuracy_container = document.getElementById('accuracy');



fetchRandomArticleWords(35, 0, 0).then(firstXWords => {
    words_list = firstXWords.split(" ");
    ready_for_test(firstXWords, words_list);
});
