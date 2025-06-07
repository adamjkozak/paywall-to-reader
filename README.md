# Archive Opener

This repository contains a tiny Chrome extension that opens the most recent archived version of the current page using [Archive.today](https://archive.ph).

## Features

- Clicking the extension button navigates the current tab to `https://archive.ph/newest/<url>`.

## Installing

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `extension` folder in this repository.

## Usage

1. Browse to any web page.
2. Click the extension button to view the latest Archive.today snapshot of that page.

## Notes

- If `archive.ph` is unavailable you can change the URL in `background.js` to `archive.is`.
- The repository omits icon files so the extension will display the default Chrome icon.
