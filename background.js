let isEnabled = true;

// Initialize extension state from storage
chrome.storage.sync.get("isEnabled", (data) => {
  if (data.isEnabled !== undefined) {
    isEnabled = data.isEnabled;
  } else {
    // Default value if no state is stored
    chrome.storage.sync.set({ isEnabled: true });
  }
  console.log("Extension initial state:", isEnabled ? "Enabled" : "Disabled");
});

// Listen for toggle messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleExtension") {
    isEnabled = request.isEnabled;
    console.log("Extension state changed to:", isEnabled ? "Enabled" : "Disabled");

    // Save the state in chrome.storage.sync
    chrome.storage.sync.set({ isEnabled: isEnabled });
  }
});

// Listen for tab activation (when switching tabs)
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && tab.url.includes("youtube.com")) {
      // Send message to content script to pause or play video based on state
      chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        func: (isEnabled) => {
          const video = document.querySelector('video');
          if (video) {
            if (isEnabled) {
              video.play(); // Resume video if enabled
            } else {
              video.pause(); // Pause video if disabled
            }
          }
        },
        args: [isEnabled]
      });
    }
  });
});
