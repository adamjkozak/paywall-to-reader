# Paywall to Reader

This project contains a simple Chrome extension that archives a web page using [Archive.is](https://archive.is) and then saves the archived version to your Readwise Reader reading list.

## Features

- Clicking the extension button loads the most recent Archive.is snapshot of the current page.
- A small window opens with a **Save to Readwise** button for the loaded snapshot.
- Stores your Readwise API token using Chrome's `storage.sync`.

## Installing

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `extension` folder in this repository.
4. Open the extension options page and enter your Readwise Reader API token.

## Usage

1. Browse to any article you want to save.
2. Click the extension button.
   - The current tab navigates to `https://archive.is/newest/<url>` which resolves to the latest snapshot.
   - A popup window appears with a **Save to Readwise** button.
   - Complete any CAPTCHA if shown, then click **Save to Readwise** to send the loaded page to Reader.

## Notes

- The extension opens `https://archive.is/newest/<url>` to fetch the latest snapshot. If a CAPTCHA or 404 appears, resolve it in the tab before clicking **Save to Readwise**.
- The Readwise Reader API endpoint used is `https://readwise.io/api/v3/save/`. Provide your token on the options page.
- The repository omits icon files so the extension will display the default Chrome icon.

