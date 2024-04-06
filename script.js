function submitQuestion() {
  const questionBox = document.getElementById('userQuestion');
  const responseElement = document.getElementById('response');
  const userQuestion = questionBox.value.trim();

 fetch(`https://scintillating-pika-68754f.netlify.app/.netlify/functions/yourFunction?q=${encodeURIComponent(userQuestion)}`)
.then(response => response.json())
        .then(response => response.json())
        .then(data => {
            responseElement.innerText = `Answer: ${data.answer}`;
        })
        .catch(error => {
            console.error('Error:', error);
            responseElement.innerText = "Error fetching response.";
        });
}
