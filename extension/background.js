async function fetchArchiveUrl(url) {
  const response = await fetch(`https://archive.is/newest/${encodeURIComponent(url)}`, {
    redirect: 'follow'
  });
  return response.url; // final redirected url is the snapshot
}

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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'archive_and_save') {
    chrome.storage.sync.get(['readwiseToken'], async ({ readwiseToken }) => {
      if (!readwiseToken) {
        sendResponse({ error: 'No Readwise token set' });
        return;
      }
      try {
        const snapshotUrl = await fetchArchiveUrl(message.url);
        await saveToReadwise(snapshotUrl, readwiseToken);
        sendResponse({ success: true, snapshot: snapshotUrl });
      } catch (err) {
        sendResponse({ error: err.message });
      }
    });
    // Indicate we'll send a response asynchronously
    return true;
  }
});
