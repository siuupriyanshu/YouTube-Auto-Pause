chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const video = document.querySelector("video");
    if(request.action === "play" && video && video.paused) {
        video.play();
    }
});