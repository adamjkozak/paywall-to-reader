function $(id) { return document.getElementById(id); }

function archiveCurrentTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (!tabs[0] || !tabs[0].url) {
      $('status').textContent = 'Could not determine current tab URL.';
      return;
    }
    const url = tabs[0].url;
    $('status').textContent = 'Archiving current page...';
    chrome.runtime.sendMessage({ type: 'archive_and_save', url }, response => {
      if (response && response.success) {
        $('status').innerHTML =
          'Saved to Reader! <a href="' +
          response.snapshot +
          '" target="_blank">View archive</a>';
      } else {
        $('status').textContent = 'Error: ' + (response && response.error);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', archiveCurrentTab);
