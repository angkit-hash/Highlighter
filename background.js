let highlights = []; // Array to store highlighted text

// Listen for messages from the content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Save the highlighted text
  if (message.action === "saveHighlight") {
    highlights.push(message.text); // Add the new highlight
    console.log("New Highlight Added:", message.text); // Debugging
    sendResponse({ success: true });
  }

  // Get the saved highlights
  if (message === "getHighlights") {
    console.log("Sending Highlights:", highlights); // Debugging
    sendResponse(highlights);
  }

  // Clear the highlights
  if (message === "clearHighlights") {
    highlights = [];
    console.log("Highlights Cleared"); // Debugging
    sendResponse({ success: true });
  }
});
