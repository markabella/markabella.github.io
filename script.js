// Simulated database of responses
const responses = {
    "humility": "Humility is the first step of the ladder. It is the foundation of our spiritual journey towards God.",
    "pride": "Pride is described as the denial of God, an invention of the devil, and contempt for men.",
    "obedience": "Obedience is the burial of the will and the resurrection of humility.",
    "default": "I'm sorry, I don't have a specific answer for that. Can you try asking something else?"
};

function submitQuestion() {
    const questionBox = document.getElementById('userQuestion');
    const responseElement = document.getElementById('response');
    const userQuestion = questionBox.value.trim().toLowerCase();

    // Find a response that matches any keyword in the user's question
    const answerKey = Object.keys(responses).find(key => userQuestion.includes(key));
    const answer = responses[answerKey] || responses['default'];

    if (userQuestion) {
        responseElement.innerText = `Answer: ${answer}`;
    } else {
        responseElement.innerText = "Please enter a question.";
    }
}

