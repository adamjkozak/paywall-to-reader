function $(id) { return document.getElementById(id); }

// Prefill URL with current tab
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  if (tabs[0] && tabs[0].url) {
    $('#url').value = tabs[0].url;
  }
});

$('#archive').addEventListener('click', () => {
  const url = $('#url').value.trim();
  if (!url) return;
  $('#status').textContent = 'Archiving...';
  chrome.runtime.sendMessage({ type: 'archive_and_save', url }, response => {
    if (response && response.success) {
      $('#status').textContent = 'Saved to Reader!';
    } else {
      $('#status').textContent = 'Error: ' + (response && response.error);
    }
  });
});
