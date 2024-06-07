const chatInput = document.querySelector('.chat-input');
const sendButton = document.querySelector('.send-button');
const chatHistory = document.querySelector('.chat-history');
const speakerSelect = document.querySelector('.speaker-select');

const problematicWords = {
  "teh": "the",
  "adn": "and",
  "recieve": "receive",
  "frims":"firms",
  "transparancy":"transparency",  
  "settel":"settle",
  // Add more problematic words and suggestions here
};

dialogueHistory = [
  { speaker: "User1", message: "It was great meeting you at the Tech Innovation Conference today. Your insights on AI were really impressive!" },
  { speaker: "User2", message: "Likewise! I enjoyed our discussion about potential collaborations." },
];

const predefinedDialogue = [
  { speaker: "User1", message: "I'm excited about the potential partnership between our frims. With our upcoming AI-driven language translation software and your vast customer base, I believe we could create a powerful market presence." },
  { speaker: "User2", message: "That sounds promising, but let's be quick. I've got a tight schedule today." },
  { speaker: "User1", message: "Sure, let's dive in. We propose integrating our AI translation software into your existing language learning platform. Given our substantial R&D costs, we suggest a 60/40 revenue split on sales of the new integrated product, with us taking the larger share." },
  { speaker: "User2", message: "60/40 seems a bit off considering we're providing the platform and access to our loyal customer base, as well as our marketing efforts. We believe a 70% share would be more equitable." },
  { speaker: "User1", message: "I understand your perspective, and it's important that the revenue split reflects our respective contributions. However, we believe that our AI-driven translation software brings significant value that justifies the 60/40 split. To sweeten the deal, we have another promising idea in mind. Considering the growing trend for wearable tech, we could jointly explore a new niche market: real-time language translation earphones. Our AI software would be an ideal fit for this innovative product." },
  { speaker: "User2", message: "That's an interesting idea. Real-time translation earphones could indeed be a novel product and open up a promising new market. While I'm intrigued by the potential, I need some assurances. If we agree to the 60/40 split, I would require a detailed roadmap for the development and launch of these earphones, as well as a commitment to shared marketing efforts. Can we make this work?" },
  { speaker: "User1", message: "Great! Let's focus on a dual strategy. First, we integrate our software into your platform with the proposed 60/40 revenue split. Second, we jointly develop the real-time translation earphones, with a separate revenue agreement that we can negotiate. This approach not only leverages our strengths but also opens up a new revenue stream for both of us. Can we move forward with this plan?" },
  { speaker: "User2", message: "That sounds more reasonable. It gives us a chance to test our partnership and see how we work together on both projects. But I'm still concerned about the timeline." },
  { speaker: "User1", message: "I understand your concern. How about we aim for a streamlined timeline, focusing on key milestones? For the software integration, we propose a two-month ramp-up period. For the real-time translation earphones, we could start R&D immediately and aim for a prototype within six months." },
  { speaker: "User2", message: "That timeline sounds more doable. This discussion has taken a turn for the better. Let's reconnect soon to iron out the finer details." },
  { speaker: "User1", message: "Absolutely, I'm glad we could find a potential path forward. Looking forward to our next discussion." }
];
const improperWords = {};


chatInput.addEventListener('input', handleInput);
sendButton.addEventListener('click', sendMessage);
//enter key

chatInput.addEventListener('keydown', function(event) {
  if (!event.shiftKey &&event.key === 'Enter') {
    event.preventDefault();
    const message = chatInput.innerText;
    const suggestion = showAutocompleteSuggestions(message);
    chatInput.innerHTML = suggestion;
    console.log(suggestion);
    placeCaretAtEnd(chatInput);
  }
});



chatInput.addEventListener('keydown', function(event) {
  if (event.shiftKey && event.key === 'Enter') {
    event.preventDefault();
    gray2black();
  }
});

function gray2black(){
  const spans = document.querySelectorAll('span');
  spans.forEach(span => {
    span.style.color = 'black';
  });
}


// chatInput.addEventListener('keydown', function(event) {
//   if (event.key === 'Enter') {
//     sendMessage();
//   }
// });

function handleInput() {
  // clearTimeout(autocompleteTimeout);
  const message = chatInput.innerText;
  // console.log(message);
  const highlightedMessage = highlightProblematicWords(message);
  chatInput.innerHTML = highlightedMessage;

  placeCaretAtEnd(chatInput);
}

function showAutocompleteSuggestions(inputText) {
  const words = inputText.split(' ');
  if (words.length === 0) return;

  const lastWord = words[words.length - 1].toLowerCase();
  let suggestion = '';

  predefinedDialogue.forEach(entry => {
    const messageWords = entry.message.split(' ');
    messageWords.forEach((word, index) => {
      if (word.toLowerCase().startsWith(lastWord) && lastWord !== '') {
        suggestion = messageWords.slice(index+1, index + 3).join(' '); // Suggest next 3 words
        return;
      }
    });
  });

  if (suggestion) {
    const suggestionText = chatInput.innerText + ` <span style="color: gray;">${suggestion}</span>`;
    return suggestionText;
  }
  return '';
}


function highlightProblematicWords(message) {
  let highlightedMessage = message;
  for (const word in problematicWords) {
    const regex = new RegExp(`\\b(${word})\\b`, 'gi');
    highlightedMessage = highlightedMessage.replace(regex, `<span class="problematic" data-suggestion="${problematicWords[word]}">$1</span>`);
    // console.log(highlightedMessage);
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
  element.innerHTML = suggestion;
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
    messageElement.classList.add('chat-message' , entry.speaker);
    messageElement.innerHTML = `<strong>${entry.speaker}:</strong> ${highlightProblematicWords(entry.message)}`;
    chatHistory.appendChild(messageElement);
  });
  chatHistory.scrollTop = chatHistory.scrollHeight;
}



initializeChatHistory(dialogueHistory );

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
  setTimeout(sendUser2Message, 4000); // Delay User2's message by 2 seconds  
  // setTimeout(sendUser1Message, 4000); // Delay User1's message by 4 seconds
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
  // console.log(text);  
  const event = new Event('input');  
  function typeNextCharacter() {  
    if (index < text.length) {  
      chatInput.innerHTML += text.charAt(index) === ' ' ? '<pre> </pre>' : text.charAt(index);  //

      chatInput.dispatchEvent(event);  
      placeCaretAtEnd(chatInput);  
      index++;  
      setTimeout(typeNextCharacter, 10); // Adjust typing speed here (100ms per character)  
    } else {  
      if (callback){
        //wait 2s
        setTimeout(callback, 5000);
      }
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
    autoTypeUser1Input(nextMessage.value.message);
  }
}

sendUser1Message();








