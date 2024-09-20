


// Select all actor items within the main div
const actorItems = document.querySelectorAll('.main-div .actor-item');
let selectedActor = '';
const yesButton = document.querySelector('.yes-button');
const noButton = document.querySelector('.no-button');
const resetButton = document.querySelector('.reset-button');

// Variable to keep track of the current alternate div index
let currentDivIndex = 0;

const alternateDivs = document.querySelectorAll('.alternate-div');

// Array to store user responses
let userResponses = [];

// Add event listener to each actor item in the main div
actorItems.forEach(actor => {
    actor.addEventListener('click', () => {
        // Store the clicked actor's name in the variable
        selectedActor = actor.textContent;

      
        document.querySelector('.main-div').style.display = 'none';
        document.querySelector('h3').textContent = 'IS Your Selected Actor Appeared In This';

        yesButton.disabled = false;
        noButton.disabled = false;

        // Reset the responses and start with the first div
        userResponses = [];
        currentDivIndex = 0;
        showCurrentDiv();
    });
});

// Function to show the current alternate div
function showCurrentDiv() {
   
    alternateDivs.forEach(div => div.style.display = 'none');

    // Show the current alternate div
    if (alternateDivs[currentDivIndex]) {
        alternateDivs[currentDivIndex].style.display = 'flex';
    }
}

yesButton.addEventListener('click', () => {
    if (selectedActor) {
        const currentDiv = alternateDivs[currentDivIndex];
        const actorsInDiv = Array.from(currentDiv.querySelectorAll('.actor-item')).map(actor => actor.textContent);
   
        userResponses[currentDivIndex] = {
            divContainsActor: actorsInDiv.includes(selectedActor),
            response: 'Yes'
        };

        // Move to the next div
        currentDivIndex++;
        if (currentDivIndex < alternateDivs.length) {
            showCurrentDiv();
        } else {
            displayResults();
        }
    } 
});

// Add event listener to the No button
noButton.addEventListener('click', () => {
    if (selectedActor) {
        const currentDiv = alternateDivs[currentDivIndex];
        const actorsInDiv = Array.from(currentDiv.querySelectorAll('.actor-item')).map(actor => actor.textContent);

        // Store the response (No)
        userResponses[currentDivIndex] = {
            divContainsActor: actorsInDiv.includes(selectedActor),
            response: 'No'
        };

        // Move to the next div
        currentDivIndex++;
        if (currentDivIndex < alternateDivs.length) {
            showCurrentDiv();
        } else {
            displayResults();
        }
    } else {
        alert('Please select an actor first.');
    }
});

// Function to display the results after all divs are processed
function displayResults() {
    // Check if responses match the actual presence of the actor
    let correct = true;
    userResponses.forEach((response, index) => {
        const div = alternateDivs[index];
        const actorsInDiv = Array.from(div.querySelectorAll('.actor-item')).map(actor => actor.textContent);
        const actualPresence = actorsInDiv.includes(selectedActor);

        if ((response.response === 'Yes' && !actualPresence) || (response.response === 'No' && actualPresence)) {
            correct = false;
        }
    });

    // Provide the result to the user
    const resultMessage = document.createElement('p');
    resultMessage.style.cssText = `
    font-size: 30px;
    text-align: center;
    color: white;
    font-weight: 600;
    margin-bottom: 150px;
`;

    resultMessage.id = 'result-message';
    if (correct) {
        resultMessage.textContent = `Your Favourite Actor is "${selectedActor}"`;

    } else {
        resultMessage.textContent = `I Think You Made a Wrong Guess`;
    }

    document.body.appendChild(resultMessage);

    // Disable the Yes and No buttons
    yesButton.disabled = true;
    noButton.disabled = true;
}

// Add event listener to the Reset button
resetButton.addEventListener('click', () => {
    selectedActor = '';
    currentDivIndex = 0;
    userResponses = [];

    // Hide all alternate divs and reset button states
    alternateDivs.forEach(div => div.style.display = 'none');
    yesButton.disabled = true;
    noButton.disabled = true;

    // Show the main div again for a new selection
    document.querySelector('.main-div').style.display = 'block';

    // Remove the result message if it exists
    const existingResultMessage = document.getElementById('result-message');
    if (existingResultMessage) {
        existingResultMessage.remove();
    }
});
