// Close accordion details when clicking on the content area (not the summary)
document.addEventListener("DOMContentLoaded", () => {
  JsBarcode(".barcode").init();

  document.querySelectorAll(".accordion details").forEach((details) => {
    details.addEventListener("click", function (e) {
      // Only close if clicking inside details but NOT on summary
      if (e.target.tagName.toLowerCase() !== "summary" && details.open) {
        details.open = false;
      }
    });
  });

  // Generate all QR codes from data-qr-content attributes
  document.querySelectorAll("[data-qr-content]").forEach((el) => {
    const content = el.getAttribute("data-qr-content");
    if (content) {
      generateQR(content, el);
    }
  });

  // Generate all barcodes from data-barcode-content attributes
  document.querySelectorAll("[data-barcode-content]").forEach((el) => {
    const content = el.getAttribute("data-barcode-content");
    if (content) {
      generateBarcode(content, el);
    }
  });
});

// Generate Kaufland QR code using QRious
function generateQR(content, element) {
  if (window.QRious && element) {
    const qr = new QRious({
      value: content,
      size: 150,
      background: "#fafafa",
      foreground: "#000",
    });
    element.innerHTML = "";
    element.appendChild(qr.image);
  }
}
window.generateQR = generateQR;

// Generate all barcodes from data-barcode-content attributes using JsBarcode
function generateBarcode(content, element) {
  if (window.JsBarcode && element) {
    element.innerHTML = ""; // Clear any placeholder
    const svg = document.createElement("svg");
    // EAN-13 requires 12 digits (JsBarcode adds checksum)
    let value = content;
    // Always use only the first 12 digits for EAN-13
    value = value.replace(/\D/g, "").slice(0, 12);
    if (value.length !== 12) {
      element.textContent = "Invalid EAN-13 code";
      return;
    }
    JsBarcode(svg, value, {
      format: "ean13",
      width: 2,
      height: 80,
      displayValue: true,
      margin: 10,
      flat: true,
    });
    element.appendChild(svg);
  }
}
window.generateBarcode = generateBarcode;
