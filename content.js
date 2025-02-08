// content.js
let highlightedText = [];

// Listen for selection and highlight text
document.addEventListener("mouseup", function () {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    highlightedText.push(selectedText); // Add the selected text to the array
    chrome.runtime.sendMessage({ action: "saveHighlight", text: selectedText });
  }
});
