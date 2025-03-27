document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submitButton").addEventListener("click", function() {
                const sourceType = document.getElementById("sourceType").value;
                console.log(sourceType);
            if(sourceType == "spam-detector"){
                window.location.href = "spam.html"; 
            }else{
                window.location.href = "phishing.html"; 
            }
       
    });
});
