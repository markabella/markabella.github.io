function submitQuestion() {

    const questionBox = document.getElementById('userQuestion');
    const userQuestion = questionBox.value.trim();
    const responseElement = document.getElementById('response');
    const ladderLoader = document.getElementById('ladderLoader');
    const submitButton = document.querySelector("button");

    // Clear previous response and disable the button
    responseElement.innerText = "";
    submitButton.disabled = true;
    ladderLoader.classList.remove('hidden');

    fetch(`https://scintillating-pika-68754f.netlify.app/.netlify/functions/answerQuestion?q=${encodeURIComponent(userQuestion)}`)
        .then(response => {
            if (!response.ok) {
                // If response from server is not OK, throw an error with status text
                throw new Error(`HTTP Error: ${response.statusText}`);
            }
            return response.json(); // Proceed to parse the response body as JSON only if the response was OK
        })
        .then(data => {
            console.log('API Response:', data); // Log the entire response for debugging
            // Use optional chaining and nullish coalescing to handle cases where data or data.answer might be undefined
            const answer = data?.answer ?? "No answer provided."; // Provide a default message if `data.answer` is undefined
            // replyNotice.style.display = 'none';
            // Hide the ladder loader
            ladderLoader.classList.add('hidden');
            responseElement.innerText = `Answer: ${answer}`;
            submitButton.disabled = false; // Re-enable button upon completion
        })
        .catch(error => {
            console.error('Error:', error);
            ladderLoader.classList.add('hidden');
            responseElement.innerText = `Error fetching response: ${error.message}`;
            submitButton.disabled = false;
        });
     
}

document.getElementById('userQuestion').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        // Prevent the default action to stop submitting the form
        event.preventDefault();
        // Call the submitQuestion function
        submitQuestion();
    }
});

document.getElementById('clearButton').addEventListener('click', function() {
            const userQuestionInput = document.getElementById('userQuestion');
            userQuestionInput.value = ''; // Clear the input
            userQuestionInput.focus(); // Set focus back to the input
});
