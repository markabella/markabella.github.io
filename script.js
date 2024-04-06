function submitQuestion() {
    const questionBox = document.getElementById('userQuestion');
    const response = document.getElementById('response');
    const userQuestion = questionBox.value.trim();

    // Placeholder for future backend integration
    const answer = "This is a placeholder answer. Future integration will provide responses based on 'The Ladder of Divine Ascent.'";

    if (userQuestion) {
        response.innerText = `Answer: ${answer}`;
    } else {
        response.innerText = "Please enter a question.";
    }
}
