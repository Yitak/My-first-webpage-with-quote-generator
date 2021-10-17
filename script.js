const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const instaBtn = document.getElementById('insta')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

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

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
    complete();
}

// Insta link
function followInsta() {
    const instaURL = 'https://www.instagram.com/iamytl_';
    window.open(instaURL, '_blank');
}

// Tweet quote
function tweetQuote() {
    const twitterURL = 'https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}';
    window.open(twitterURL, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
instaBtn.addEventListener('click', followInsta);

// On Load
getQuotes();