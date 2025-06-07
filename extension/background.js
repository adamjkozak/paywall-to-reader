async function fetchArchiveUrl(url) {
  const domains = ['https://archive.is', 'https://archive.ph'];
  let lastError = 'Unable to fetch archive URL';
  for (const domain of domains) {
    try {
      const resp = await fetch(`${domain}/newest/${encodeURIComponent(url)}`, {
        redirect: 'follow'
      });
      if (resp.ok) {
        return resp.url; // final redirected url is the snapshot
      }
      lastError = `${domain} responded ${resp.status}`;
    } catch (err) {
      lastError = err.message;
    }
  }
  throw new Error(lastError);
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
