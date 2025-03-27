document.getElementById("spamForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents page refresh

    // Fetch input values
    const messageValue = document.getElementById("messageValue").value;
    const sourceType = document.getElementById("sourceType").value;
    const sourceValue = document.getElementById("sourceValue").value;
    const orgType = document.getElementById("orgType").value;

    if (!messageValue || !sourceValue || !orgType) {
        alert("Fill all the columns!");
        return;
    }

    // Prepare Data
    const data = {
        "sourceType": sourceType,
        "sourceValue": sourceValue,
        "organisationType": orgType,
        "message": messageValue
    };

    // Send to Backend
    fetch("http://localhost:3000/save-spam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Server Response:", result.message);
        document.getElementById("outputBox").value = result.message; // Display in output box
    })
    .catch(error => console.error("Error:", error));
});
