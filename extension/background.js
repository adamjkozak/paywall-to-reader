async function saveToReadwise(snapshotUrl, token) {
  const resp = await fetch('https://readwise.io/api/v3/save/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({ url: snapshotUrl })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Readwise error: ${resp.status} ${text}`);
  }
}

chrome.action.onClicked.addListener(tab => {
  if (!tab || !tab.url) {
    return;
  }
  const archiveUrl = `https://archive.is/newest/${encodeURIComponent(tab.url)}`;
  chrome.tabs.update(tab.id, { url: archiveUrl });
  chrome.windows.create({
    url: chrome.runtime.getURL('save.html') + `?tabId=${tab.id}`,
    type: 'popup',
    width: 360,
    height: 200
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'save_snapshot') {
    chrome.storage.sync.get(['readwiseToken'], async ({ readwiseToken }) => {
      if (!readwiseToken) {
        sendResponse({ error: 'No Readwise token set' });
        return;
      }
      try {
        await saveToReadwise(message.url, readwiseToken);
        sendResponse({ success: true });
      } catch (err) {
        sendResponse({ error: err.message });
      }
    });
    return true;
  }
});
