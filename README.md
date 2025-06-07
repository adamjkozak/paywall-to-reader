# Paywall to Reader

This project contains a simple Chrome extension that archives a web page using [Archive.is](https://archive.is) and then saves the archived version to your Readwise Reader reading list.

## Features

- Clicking the extension button automatically archives the current tab and saves it.
- Retrieves the latest archived version of the URL from `https://archive.is/newest/<url>`.
- Adds the archived link to Readwise Reader using the Reader API.
- Stores your Readwise API token using Chrome's `storage.sync`.

## Installing

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `extension` folder in this repository.
4. Open the extension options page and enter your Readwise Reader API token.

## Usage

1. Browse to any article you want to save.
2. Click the extension button.
3. The extension fetches the latest archive snapshot and sends it to Readwise Reader while displaying status.

## Notes

- The extension uses the endpoint `https://archive.is/newest/<url>` to resolve the most recent snapshot. If that fails, it falls back to `https://archive.ph`. Archive.today domains may block automated requests so you might need to adjust the request if it stops working.
- The Readwise Reader API endpoint used is `https://readwise.io/api/v3/save/`. Provide your token on the options page.
- The repository omits icon files so the extension will display the default Chrome icon.

