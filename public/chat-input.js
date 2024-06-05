const chatInput = document.querySelector('.chat-input');
const sendBtn = document.querySelector('.send-btn');

chatInput.addEventListener('input', adjustHeight);
chatInput.addEventListener('keydown', handleKeyDown);
sendBtn.addEventListener('click', sendMessage);

function adjustHeight() {
  chatInput.style.height = 'auto';
  chatInput.style.height = `${chatInput.scrollHeight}px`;
}

function handleKeyDown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

function sendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    // Send the message (e.g., display it in the chat window or perform any other desired action)
    const chatContainer = document.querySelector('.chat-container');      
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML =  `<p class="message-content">${message}</p>`;
        chatContainer.appendChild(messageElement);
    adjustHeight();
    chatInput.value = '';
  }
}