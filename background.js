chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];
  
    if (activeTab.url.includes("youtube.com")) {
      // Send a message to content.js to play the video
      chrome.tabs.sendMessage(activeTab.id, { action: "play" });
    } else {
      // Find all open YouTube tabs and pause them
      chrome.tabs.query({ url: "*://www.youtube.com/*" }, (youtubeTabs) => {
        youtubeTabs.forEach((tab) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
              const video = document.querySelector("video");
              if (video && !video.paused) {
                video.pause();
              }
            },
          });
        });
      });
    }
  });