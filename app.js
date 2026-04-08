// Task 1: Push product data to GTM dataLayer on page load
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "productView",
  productName: document.getElementById("product-name").innerText,
  productPrice: parseFloat(document.getElementById("product-price").innerText),
});
console.log("dataLayer after push:", window.dataLayer);
// Task 2: Button click sends POST to httpbin.org using dataLayer values
document.getElementById("send-api-btn").addEventListener("click", function () {
  const dlData = window.dataLayer.find((e) => e.event === "productView");
  // ✅ ERROR HANDLING: Stop if productView is missing from dataLayer
  if (!dlData) {
    console.error("API Error: productView event not found in dataLayer.");
    document.getElementById("api-status").textContent = "API call failed. Product data missing from dataLayer.";
    return;
  }
  const payload = {
    productName: dlData.productName,
    productPrice: dlData.productPrice,
  };
  fetch("https://httpbin.org/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      // ✅ ERROR HANDLING: fetch won't auto-reject on 4xx/5xx
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log("Response JSON object:", data.json);
      document.getElementById("api-status").textContent =
        "API call successful! Check console.";
    })
    .catch((err) => {
      console.error("API error:", err);
      document.getElementById("api-status").textContent = "API call failed.";
    });
});
