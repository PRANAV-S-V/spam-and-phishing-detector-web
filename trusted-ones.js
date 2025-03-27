document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submitButton").addEventListener("click", function() {
        // Get input values
        const trustedOne = document.getElementById("trusted-one").value;
        const sourceType = document.getElementById("sourceType").value;
        if (!trustedOne){
            alert("Fill all the columns!");
            return;
        }
        // Data to save
   
       const data = {
            "sourceType":sourceType,
            "id":trustedOne
            
        }
        console.log(data);
         // Send data to Node.js server
         fetch("http://localhost:3000/trusted-ones", {
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
