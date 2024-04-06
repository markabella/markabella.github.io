function submitQuestion() {
  const questionBox = document.getElementById('userQuestion');
  const responseElement = document.getElementById('response');
  const userQuestion = questionBox.value.trim();

 fetch(`https://scintillating-pika-68754f.netlify.app/.netlify/functions/yourFunction?q=${encodeURIComponent(userQuestion)}`)
.then(response => response.json())
.then(data => {
  console.log('API Response:', data); // Log the full response data
  // Assume 'data' should have a structure like { answer: "some text" }
  const answer = data.answer;
  console.log('Extracted Answer:', answer);
})
.catch(error => {
  console.error('Error fetching response:', error);
});

