document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submitButton").addEventListener("click", function() {
        // Get input values
        const reportSpam = document.getElementById("report-spam").value;
        const sourceType = document.getElementById("sourceType").value;
        if (!reportSpam){
            alert("Fill all the columns!");
            return;
        }
        // Data to save
   
       const data = {
            "sourceType":sourceType,
            "id":reportSpam
            
        }
        console.log(data);
         // Send data to Node.js server
         fetch("http://localhost:3000/report-spammers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log("Response received:", response);
            return response.json();
        })
        .then(result => {
            console.log("Result:", result); // Check if this logs anything
            alert(result.message); // If it logs but no alert, check if `result.message` exists
        })
        .catch(error => {
            console.error("Error:", error);
        });
        
        
    });
});
