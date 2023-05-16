export const download = (link, filename) => {
    // Create an anchor, and set the href value to our data URL
    const createEl = document.createElement('a');
    createEl.href = link;

    // This is the name of our downloaded file
    createEl.download = filename;

    // Click the download button, causing a download, and then remove it
    createEl.click();
    createEl.remove();
  }