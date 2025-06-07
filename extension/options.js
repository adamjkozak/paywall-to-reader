document.getElementById('save').addEventListener('click', () => {
  const token = document.getElementById('token').value.trim();
  chrome.storage.sync.set({ readwiseToken: token }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Saved!';
    setTimeout(() => status.textContent = '', 2000);
  });
});

// Load saved token
chrome.storage.sync.get(['readwiseToken'], ({ readwiseToken }) => {
  if (readwiseToken) {
    document.getElementById('token').value = readwiseToken;
  }
});
