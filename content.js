// Check the state of the extension and pause or play the video
chrome.storage.sync.get("isEnabled", (data) => {
  const isEnabled = data.isEnabled === false ? false : true;
  const video = document.querySelector('video');

  if (video) {
    if (isEnabled) {
      video.play(); // Play video if extension is enabled
    } else {
      video.pause(); // Pause video if extension is disabled
    }
  }
});
