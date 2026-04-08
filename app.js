// Task 1: Push product data to GTM dataLayer on page load
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "productView",
  productName: document.getElementById("product-name").innerText,
  productPrice: parseFloat(document.getElementById("product-price").innerText), // Added parseFloat() here
});
console.log("dataLayer after push:", window.dataLayer);

// Task 2: Button click sends POST to httpbin.org using dataLayer values
document.getElementById("send-api-btn").addEventListener("click", function () {
  const dlData = window.dataLayer.find((e) => e.event === "productView");

  const payload = {
    productName: dlData.productName,
    productPrice: dlData.productPrice,
  };

  fetch("https://httpbin.org/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
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
