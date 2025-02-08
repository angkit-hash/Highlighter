// popup.js
const highlightList = document.getElementById('highlightList');
const downloadButton = document.getElementById('downloadHighlights');
const clearButton = document.getElementById('clearHighlights');

// Function to display highlights in the popup
function displayHighlights() {
  chrome.runtime.sendMessage("getHighlights", function (highlights) {
    console.log("Received Highlights in Popup: ", highlights); // Debugging
    highlightList.innerHTML = ''; // Clear current list
    if (highlights.length === 0) {
      highlightList.innerHTML = '<p>No highlights yet</p>';
    } else {
      highlights.forEach((highlight) => {
        const p = document.createElement('p');
        p.textContent = highlight;
        highlightList.appendChild(p);
      });
    }
  });
}

// Function to download the highlighted text as a .txt file
downloadButton.addEventListener('click', function () {
  chrome.runtime.sendMessage("getHighlights", function (highlights) {
    console.log("Highlights for Downloading: ", highlights); // Debugging

    if (highlights.length === 0) {
      alert('No highlights to download!');
    } else {
      // Create a Blob of the highlights as text
      const blob = new Blob([highlights.join("\n\n")], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      // Create an anchor element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'highlights.txt'; // File name for download
      link.click(); // Trigger the download
      URL.revokeObjectURL(url); // Release the blob URL
    }
  });
});

// Function to clear the highlights
clearButton.addEventListener('click', function () {
  console.log("Clearing Highlights..."); // Debugging
  chrome.runtime.sendMessage("clearHighlights", function (response) {
    console.log("Response from clearHighlights:", response); // Debugging
    displayHighlights(); // Refresh the highlights after clearing
  });
});

// Initially display highlights when popup is opened
displayHighlights();
