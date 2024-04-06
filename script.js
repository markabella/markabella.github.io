function submitQuestion() {
  const questionBox = document.getElementById('userQuestion');
  const responseElement = document.getElementById('response');
  const userQuestion = questionBox.value.trim();

 fetch(`https://scintillating-pika-68754f.netlify.app/.netlify/functions/yourFunction?q=${encodeURIComponent(userQuestion)}`)
    .then(response => {
      if (!response.ok) {
        // When the server response is not okay,
        // throw an error with the status text, which will be caught by .catch()
        throw new Error(`Error: ${response.statusText} (Status ${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      responseElement.innerText = `Answer: ${data.answer}`;
    })
    .catch(error => {
      console.error('Error:', error);
      // Display the exact error message in the text of 'responseElement'
      responseElement.innerText = `Error fetching response: ${error.message}`;
    });
}
