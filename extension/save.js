function $(id) { return document.getElementById(id); }

function getTabId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('tabId'), 10);
}

const tabId = getTabId();

document.getElementById('save').addEventListener('click', () => {
  $('status').textContent = 'Saving...';
  chrome.tabs.get(tabId, tab => {
    if (!tab || !tab.url) {
      $('status').textContent = 'Could not get tab URL.';
      return;
    }
    chrome.runtime.sendMessage({ type: 'save_snapshot', url: tab.url }, response => {
      if (response && response.success) {
        $('status').textContent = 'Saved to Reader!';
      } else {
        $('status').textContent = 'Error: ' + (response && response.error);
      }
    });
  });
});
