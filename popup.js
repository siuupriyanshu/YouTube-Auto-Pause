const toggleButton = document.getElementById("toggleButton");

// Get the current state from chrome storage
chrome.storage.sync.get("isEnabled", (data) => {
  toggleButton.textContent = data.isEnabled === false ? "Turn On" : "Turn Off";
});

// When the button is clicked, toggle the extension's state
toggleButton.addEventListener("click", () => {
  chrome.storage.sync.get("isEnabled", (data) => {
    const isEnabled = !(data.isEnabled === false); // Toggle state

    // Save the new state
    chrome.storage.sync.set({ isEnabled: isEnabled }, () => {
      toggleButton.textContent = isEnabled ? "Turn Off" : "Turn On"; // Update button text
    });

    // Send the message to the background to update the state
    chrome.runtime.sendMessage({ action: "toggleExtension", isEnabled: isEnabled });
  });
});

