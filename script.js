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

  // Generate Kaufland QR code using QRious
  if (window.QRious) {
    const qr = new QRious({
      value: "KQR00001:203109971238",
      size: 150,
      background: "#fafafa",
      foreground: "#000",
    });
    const container = document.getElementById("kaufland-qr");
    if (container) {
      container.innerHTML = ""; // Clear any placeholder
      container.appendChild(qr.image);
    }
  }
});
