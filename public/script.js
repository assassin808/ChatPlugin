const chatInput = document.querySelector('.chat-input');
const sendButton = document.querySelector('.send-button');
const chatHistory = document.querySelector('.chat-history');
const speakerSelect = document.querySelector('.speaker-select');

const problematicWords = {
  "teh": "the",
  "adn": "and",
  "recieve": "receive",
  "test": "TESTFUCK!!!!",
  // Add more problematic words and suggestions here
};

const predefinedDialogue = [
  { speaker: "User1", message: "Hi! As the CEO of TechNova, I'm excited about the potential partnership between our firms. With our upcoming AI-driven language translation software and your vast customer base, I believe we could create a strong market presence." },
  { speaker: "User2", message: "That sounds promising, but let's be quick. I've got a tight schedule today." },
  { speaker: "User1", message: "Sure, let's dive in. We propose integrating our AI translation software into your existing language learning platform. We're suggesting a revenue split on the basis of our inputs. We propose a 60/40 split on sales of the new integrated product, with us taking the larger share. This takes into account the substantial R&D costs we've incurred developing the AI software." },
  { speaker: "User2", message: "Hold on, 60/40? We're providing the platform and access to our dedicated customer base, along with our marketing efforts. We won't settle for less than 70%." },
  { speaker: "User1", message: "I understand your viewpoint, but 70% seems high given our significant investment in software development. How about we meet halfway with a 50/50 split? This would more accurately represent our joint input and shared risk in this venture." },
  { speaker: "User2", message: "You drive a hard bargain! Ok fine, 50/50 it is. But we need to maintain transparency and fairness moving forward." },
  { speaker: "User1", message: "Absolutely, transparency is key. Now, about the project timeline..." },
  { speaker: "User2", message: "Timeline? I thought we were rolling out tomorrow!" },
  { speaker: "User1", message: "Tomorrow? That's a bit premature. We were considering a three-month ramp-up period to ensure a seamless integration of our software into your platform and to iron out any potential customer pain points." },
  { speaker: "User2", message: "Three-month ramp-up? This is the first time I'm hearing of this. Are you just trying to delay?" },
  { speaker: "User1", message: "Maybe we should take a short break and continue this discussion when we're both a bit more relaxed?" },
  { speaker: "User2", message: "Fine, I'm logging off for now. This is turning out to be quite complex." }
];

chatInput.addEventListener('input', handleInput);
sendButton.addEventListener('click', sendMessage);
//enter key
chatInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function handleInput() {
  const message = chatInput.innerText;
  const highlightedMessage = highlightProblematicWords(message);
  chatInput.innerHTML = highlightedMessage;
  placeCaretAtEnd(chatInput);
}

function highlightProblematicWords(message) {
  let highlightedMessage = message;
  for (const word in problematicWords) {
    const regex = new RegExp(`\\b(${word})\\b`, 'gi');
    highlightedMessage = highlightedMessage.replace(regex, `<span class="problematic" data-suggestion="${problematicWords[word]}">$1</span>`);
  }
  return highlightedMessage;
}

document.addEventListener('mouseover', function(event) {
  if (event.target.classList.contains('problematic')) {
    showTooltip(event.target);
  }
});

document.addEventListener('mouseout', function(event) {
  if (event.target.classList.contains('problematic')) {
    hideTooltip();
  }
});

function showTooltip(element) {
  let tooltip = document.querySelector('.tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    document.body.appendChild(tooltip);
  }
  tooltip.textContent = element.dataset.suggestion;
  const rect = element.getBoundingClientRect();
  tooltip.style.left = `${rect.left + window.pageXOffset}px`;
  tooltip.style.top = `${rect.bottom + window.pageYOffset}px`;
  tooltip.style.display = 'block';

  tooltip.addEventListener('mouseover', function() {
    tooltip.style.display = 'block';
  });

  tooltip.addEventListener('mouseout', function() {
    hideTooltip();
  });

  tooltip.addEventListener('click', function() {
    replaceWord(element, tooltip.textContent);
  });
}

function hideTooltip() {
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) {
    tooltip.style.display = 'none';
  }
}

function replaceWord(element, suggestion) {
  element.outerHTML = suggestion;
  hideTooltip();
}

function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

function sendMessage() {
  const message = chatInput.innerText;
  const speaker = speakerSelect.value;
  if (message.trim() !== '') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<strong>${speaker}:</strong> ${highlightProblematicWords(message)}`;
    chatHistory.appendChild(messageElement);
    chatInput.innerHTML = '';
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }
}

function initializeChatHistory(dialogue) {
  dialogue.forEach(entry => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<strong>${entry.speaker}:</strong> ${highlightProblematicWords(entry.message)}`;
    chatHistory.appendChild(messageElement);
  });
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// initializeChatHistory(predefinedDialogue);

const predefinedDialogueUser2=predefinedDialogue.filter((item)=>item.speaker==="User2");
const predefinedDialogueUser1=predefinedDialogue.filter((item)=>item.speaker==="User1");

let user2Iterator = predefinedDialogueUser2[Symbol.iterator]();  
let user1Iterator = predefinedDialogueUser1[Symbol.iterator]();
  
function sendMessage() {  
  const message = chatInput.innerText;  
  const speaker = speakerSelect.value;  
  if (message.trim() !== '') {  
    const messageElement = document.createElement('div');  
    messageElement.classList.add('chat-message', speaker);  
    messageElement.innerHTML = `<strong>${speaker}:</strong> ${highlightProblematicWords(message)}`;  
    chatHistory.appendChild(messageElement);  
    chatInput.innerHTML = '';  
    chatHistory.scrollTop = chatHistory.scrollHeight;  
  }  
  setTimeout(sendUser2Message, 2000); // Delay User2's message by 2 seconds  
  setTimeout(sendUser1Message, 4000); // Delay User1's message by 4 seconds
}  
  
function sendUser2Message() {  
  const nextMessage = user2Iterator.next();  
  if (!nextMessage.done) {  
    const messageElement = document.createElement('div');  
    messageElement.classList.add('chat-message', nextMessage.value.speaker);  
    messageElement.innerHTML = `<strong>${nextMessage.value.speaker}:</strong> ${highlightProblematicWords(nextMessage.value.message)}`;  
    chatHistory.appendChild(messageElement);  
    chatHistory.scrollTop = chatHistory.scrollHeight;  
  }  
}  


function autoTypeUser1Input(text, callback) {
  chatInput.innerHTML = ''; // Clear the input box
  let index = 0;
  console.log(text);

  function typeNextCharacter() {
    if (index < text.length) {
      chatInput.innerHTML += text.charAt(index);
      // placeCaretAtEnd(chatInput);
      index++;
      setTimeout(typeNextCharacter, 20); // Adjust typing speed here (100ms per character)
    } else {
      if (callback) callback(); // Execute the callback function after typing is done
    }
  }

  typeNextCharacter();
}

function pressEnterKey() {
  const event = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    which: 13,
    keyCode: 13,
    bubbles: true
  });
  chatInput.dispatchEvent(event);
}

function sendUser1Message() {
  const nextMessage = user1Iterator.next();
  if (!nextMessage.done) {
    autoTypeUser1Input(nextMessage.value.message, pressEnterKey);
  }
}

sendUser1Message()


