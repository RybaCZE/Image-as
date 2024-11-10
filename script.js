// script.js
if (typeof browser.contextMenus !== "undefined") {
  browser.contextMenus.create({
    id: "convert-to-png",
    title: "Download as PNG",
    contexts: ["image"],
  });
  browser.contextMenus.create({
    id: "convert-to-jpeg",
    title: "Download as JPEG",
    contexts: ["image"],
  });
  browser.contextMenus.create({
    id: "convert-to-webp",
    title: "Download as WebP",
    contexts: ["image"],
  });

  browser.contextMenus.onClicked.addListener((info, tab) => {
    const format = info.menuItemId.split("-").pop(); // png, jpeg, or webp
    browser.tabs.sendMessage(tab.id, {
      action: "convertImage",
      url: info.srcUrl,
      format: format,
    });
  });
} else {
  // Content script context
  browser.runtime.onMessage.addListener(async (message) => {
    if (message.action === "convertImage") {
      try {
        // Fetch the image first
        const response = await fetch(message.url);
        const blob = await response.blob();

        // Convert blob to data URL
        const reader = new FileReader();
        reader.onloadend = function () {
          const img = new Image();
          img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            // Get filename from URL or use default
            const fileName =
              message.url.split("/").pop().split("?")[0] || "image";

            // Convert and download
            canvas.toBlob((blob) => {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `${fileName}.${message.format}`;
              link.click();
              URL.revokeObjectURL(url);
            }, `image/${message.format}`);
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        alert("Could not download image. It might be protected.");
        console.error(error);
      }
    }
  });
}
