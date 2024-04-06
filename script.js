function submitQuestion() {
  const questionBox = document.getElementById('userQuestion');
  const responseElement = document.getElementById('response');
  const userQuestion = questionBox.value.trim();

  if (userQuestion) {
    // Replace YOUR_NETLIFY_SITE with your actual Netlify site domain
    fetch(`https://scintillating-pika-68754f.netlify.app/.netlify/functions/yourFunction?q=${encodeURIComponent(userQuestion)}`)
      .then(response => response.json())
      .then(data => {
        responseElement.innerText = `Answer: ${data.answer}`;
      })
      .catch(error => {
        console.error('Error:', error);
        responseElement.innerText = "Error fetching response.";
      });
  } else {
    responseElement.innerText = "Please enter a question.";
  }
}
