# Paywall to Reader

This project contains a simple Chrome extension that archives a web page using [Archive.is](https://archive.is) and then saves the archived version to your Readwise Reader reading list.

## Features

- Extension button opens a popup where you can enter a URL (pre-filled with the current tab).
- Retrieves the latest archived version of the URL from `https://archive.is/newest/<url>`.
- Adds the archived link to Readwise Reader using the Reader API.
- Stores your Readwise API token using Chrome's `storage.sync`.

## Installing

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `extension` folder in this repository.
4. Open the extension options page and enter your Readwise Reader API token.

## Usage

1. Browse to any article or provide a URL in the popup.
2. Click **Archive & Save**.
3. The extension fetches the latest archive snapshot and sends it to Readwise Reader.

## Notes

- The extension uses the endpoint `https://archive.is/newest/<url>` to resolve the most recent snapshot. Archive.is may block automated requests or require additional headers; in practice you might need to adjust the request or use a different Archive.today domain (such as archive.ph).
- The Readwise Reader API endpoint used is `https://readwise.io/api/v3/save/`. Provide your token on the options page.
- The repository omits icon files so the extension will display the default Chrome icon.

