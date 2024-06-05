const chatInput = document.querySelector('.chat-input');
const problematicWords = {
  "teh": "the",
  "adn": "and",
  "recieve": "receive",
  "test": "test!!!!!!"
  // Add more problematic words and suggestions here
};

chatInput.addEventListener('input', handleInput);

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

document.addEventListener('mouseover', function(event) {
  if (event.target.classList.contains('tooltip')) {
    showTooltip(event.target.relatedTarget);
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
}

function hideTooltip() {
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) {
    tooltip.style.display = 'none';
  }
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
