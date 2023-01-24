const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    loading()
    // Pick a random quote from api array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank
    if (!quote.author) {
        authorText.textContent = "Unknown";
    }else{
        authorText.textContent = quote.author;
    }
    // check quote lenght
    if (quote.text.length > 150){
        quoteText.classList.add("long-quote");
        authorText.classList.add("long-quote-author")
    }else{
        quoteText.classList.remove("long-quote")
        authorText.classList.remove("long-quote-author")
    }
    // Set quote, hide loader    
    quoteText.textContent = quote.text;
    complete()
}

// Get Quotes from API
async function getQuotes() {
    loading()
    const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote()
    }catch (error){
        // catch error here
        console.log(error)
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Eventlisteners
newQuoteBtn.addEventListener("click", newQuote)
twitterBtn.addEventListener("click", tweetQuote)

// On load
getQuotes();
