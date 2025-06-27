// Close accordion details when clicking on the content area (not the summary)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".accordion details").forEach((details) => {
    details.addEventListener("click", function (e) {
      // Only close if clicking inside details but NOT on summary
      if (e.target.tagName.toLowerCase() !== "summary" && details.open) {
        details.open = false;
      }
    });
  });
});

// Generate Kaufland QR code using QRious
function generateQR(content, elementId) {
  if (window.QRious) {
    const qr = new QRious({
      value: content,
      size: 150,
      background: "#fafafa",
      foreground: "#000",
    });
    const container = document.getElementById(elementId);
    if (container) {
      container.innerHTML = ""; // Clear any placeholder
      container.appendChild(qr.image);
    }
  }
}
window.generateQR = generateQR;

// Example: generate Kaufland QR code
generateQR("KQR00001:203109971238", "kaufland-qr");
