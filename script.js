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
    id: "convert-to-Webp",
    title: "Download as Webp",
    contexts: ["image"],
  });

  // Listen for clicks on the context menu
  browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case "convert-to-png":
        browser.tabs.executeScript(tab.id, {
          code: `
            convertImage('${info.srcUrl}', 'png');
          `,
        });
        break;

      case "convert-to-jpeg":
        browser.tabs.executeScript(tab.id, {
          code: `
            convertImage('${info.srcUrl}', 'jpeg');
          `,
        });
        break;

      case "convert-to-Webp":
        browser.tabs.executeScript(tab.id, {
          code: `
            convertImage('${info.srcUrl}', 'webp');
          `,
        });
        break;

      default:
        break;
    }
  });
}

function convertImage(imageURL, format) {
  var img = new Image();
  img.crossOrigin = "Anonymous";

  img.src = imageURL;

  img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var fileNamee = document.title.split("/").pop().split(".").shift().trim();

    var imgData = canvas.toDataURL("image/" + format);
    console.log(imageURL);
    var link = document.createElement("a");
    link.href = imgData;
    link.download = fileNamee + "." + format;
    link.click();
  };
}
