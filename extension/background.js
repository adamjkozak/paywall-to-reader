chrome.action.onClicked.addListener(tab => {
  if (!tab || !tab.url) {
    return;
  }
  const urlObj = new URL(tab.url);
  const baseUrl = `${urlObj.origin}${urlObj.pathname}`;
  const archiveUrl = `https://archive.ph/newest/${encodeURIComponent(baseUrl)}`;
  chrome.tabs.update(tab.id, { url: archiveUrl });
});
