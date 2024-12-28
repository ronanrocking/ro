PROJECT REPORT

FLOW AND STRUCTURE OF THE CODE [JS]
  1. On Loading
      - Using the Wikipedia API, JS fetched the textcontent of a RANDOMLY chosen page from the entirety of wikipedia.
      - By, default first 30 words will be loaded. If the page doesn't have 30 words, then the page will be scrapped, and a new Wiki page will be targeted randomly. this will continue till an appropriate page loads
      - After a sufficiently long page is loaded, it is processed
          > Removal of non ascii characters
          > change of case [based on settings]
          > change of special chars and nums [based on settings]

  once it is loaded and ready for the test, the function halts and waits for user to type anything to start the test

  2. On Starting the Test
       - timer starts
       - every word is tracked separetly, once a word is typed out [followed by a space] it is appened to a list of types words.
       - the list is continuously compared with the list of impored wiki text; and WPM, accuracy is calculated
       - stats update on the page on every keypress
    
  3. Ending the Test
       - The test ends when pressed Enter, or when the end is reached
    
  4. Reloading
       - Chaning any setting [case / number toggle] will reload the page and fetch new data
       - The deditacted reload page, will simply refresh the page
    

PROBLEMS FACED (bohot saari :D)
1. Wiki API
     Using the Wiki API was new to me, and i still havent figured it out in its entirely, but got enough of a nudge to get it to work for this project [used GPT for assistance here]
     > Handling too short texts
     > Handling alot of special characters thatre not supported on the keyboard

2. Asynch and waiting
     The code must wait till the Text is loaded before processing it. This took alot of tries and learning for me to figure out, the asynch, await and .then functions.

3. Timing
     refreshing the page every X seconds while continously tracking for new keypresses seemed complicated and wasnt working, so i took the cheater's way and refresh the stats on every keypress (hehe)



NEW CONCEPTES LEarnt
  Wiki API
  Asyn / .then() / await
  Promises
  setInterval
  ..and alot of other things that fade in the background but add to experience in the long run
