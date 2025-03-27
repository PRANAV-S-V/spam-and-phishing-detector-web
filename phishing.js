document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("spamForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents form submission from refreshing the page

        // Fetch input values
        const websiteURL = document.getElementById("websiteurl").value;

        if (!websiteURL) {
            alert("Fill all the fields!");
            return;
        }

        // Prepare Data
        const data = {
             "websiteURL": websiteURL, 
            };

        // Send request to Backend
        fetch("http://localhost:3000/save-phishing", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log("Server Response:", result.message);
            document.getElementById("outputBox").value = result.message; // Display response in textarea
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("outputBox").value = "Error: Could not check the message.";
        });
    });
});
