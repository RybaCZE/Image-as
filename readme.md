# Image As

A Firefox extension that allows you to download images as PNG, JPEG or Webp.

## How to use

1. Right-click on an image
2. Select "Download as" and then the desired format (PNG, JPEG or Webp)

## Installation

1. Clone the repository
2. Build the extension by running `npm install` and then `npm run build`
3. Load the extension in Firefox by going to `about:debugging`, clicking "Load Temporary Add-on" and selecting the `manifest.json` file in the cloned repository

## Known issues

- The extension does not work for images that are not served with the `cross-origin` attribute
- The extension does not work for images that are not loaded from the same origin as the page
- The extension does not work for images that are not publicly accessible

## Roadmap

- Add support for other image formats
- Add support for downloading images from other sources (e.g. from links)
- Add support for downloading images in bulk
- Improve the user interface

## Contributing

Contributions are welcome! Please open a pull request with your changes.
