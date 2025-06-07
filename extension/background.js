chrome.action.onClicked.addListener(tab => {
  if (!tab || !tab.url) {
    return;
  }
  const archiveUrl = `https://archive.ph/newest/${encodeURIComponent(tab.url)}`;
  chrome.tabs.update(tab.id, { url: archiveUrl });
});
