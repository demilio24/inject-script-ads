// Extract query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Extract location_id, email, and context from the URL
const locationId = getQueryParam('location_id');
const userEmail = getQueryParam('email');
const businessContext = getQueryParam('context');

console.log("Extracted location_id:", locationId);
console.log("Extracted email:", userEmail);
console.log("Extracted business_context:", businessContext);

// Function to set the values after the form has fully loaded
function setFieldValues() {
    let locationField = document.querySelector("input[data-q='location_id_(ghl_account_id)']");
    let emailField = document.querySelector("input[data-q='email']");
    let contextField = document.querySelector("input[data-q='business_context_for_ads']");

    if (locationField) {
        locationField.value = locationId;
        locationField.setAttribute("value", locationId); // Ensures persistence
        locationField.dispatchEvent(new Event('input', { bubbles: true })); // Forces form recognition
        console.log("✅ Successfully set location_id:", locationId);
    } else {
        console.error("❌ Hidden field for location_id not found! Retrying...");
        setTimeout(setFieldValues, 500); // Retry after 500ms
    }

    if (emailField) {
        emailField.value = userEmail;
        emailField.setAttribute("value", userEmail);
        emailField.dispatchEvent(new Event('input', { bubbles: true }));
        console.log("✅ Successfully set email:", userEmail);
    } else {
        console.error("❌ Hidden field for email not found! Retrying...");
        setTimeout(setFieldValues, 500); // Retry after 500ms
    }

    if (contextField) {
        contextField.value = businessContext;
        contextField.setAttribute("value", businessContext);
        contextField.dispatchEvent(new Event('input', { bubbles: true }));
        console.log("✅ Successfully set business_context:", businessContext);
    } else {
        console.error("❌ Hidden field for business_context not found! Retrying...");
        setTimeout(setFieldValues, 500); // Retry after 500ms
    }
}

// Ensure fields are fully loaded before updating
setTimeout(setFieldValues, 1500);

// Ensure values persist before submission
document.addEventListener("submit", function () {
    setFieldValues();
});
