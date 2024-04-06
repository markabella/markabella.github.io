function submitQuestion() {
    const replyNotice = document.getElementById('replyNotice');
    const questionBox = document.getElementById('userQuestion');
    const responseElement = document.getElementById('response');
    const userQuestion = questionBox.value.trim();

    // Show the 'Replies may take a moment' message
    replyNotice.style.display = 'block';

    fetch(`https://scintillating-pika-68754f.netlify.app/.netlify/functions/yourFunction?q=${encodeURIComponent(userQuestion)}`)
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
            replyNotice.style.display = 'none';
            responseElement.innerText = `Answer: ${answer}`;
        })
        .catch(error => {
            console.error('Error:', error);
            // Display a more informative error message, including the error caught
            replyNotice.style.display = 'none';
            responseElement.innerText = `Error fetching response: ${error.message}`;
        });
}
