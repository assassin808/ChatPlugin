const highlightedElements = document.querySelectorAll('.highlight');  
  
highlightedElements.forEach(element => {  
  element.addEventListener('mouseenter', function() {  
    const suggestion = this.getAttribute('data-suggestion');  
    const suggestionBox = document.createElement('div');  
    suggestionBox.textContent = suggestion;  
    suggestionBox.style.position = 'absolute';  
    suggestionBox.style.right = '0';  
    suggestionBox.style.backgroundColor = '#fff';  
    suggestionBox.style.border = '1px solid #000';  
    this.appendChild(suggestionBox);  
  });  
  
  element.addEventListener('mouseleave', function() {  
    this.removeChild(this.lastChild);  
  });  
});  
