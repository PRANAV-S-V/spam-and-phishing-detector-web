const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const PORT = 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI("GOOGLE_API");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.use(express.json());
app.use(cors()); // Allow frontend requests

// Save phishing data to a file
app.post("/save-phishing", async(req, res) => {
    const websiteURL = req.body;
    const str = JSON.stringify(websiteURL);
    console.log(str);
     // Save to a file
     //fs.appendFileSync("phishing-urls.txt", str);
       // Send to Gemini AI for analysis
       const prompt = `Say whether the following URL and check whether its phishing or not: ${str}. Say yes its Phishing or its not Phishing only.`;
       const result = await model.generateContent(prompt);
       const output = result.response.text()
      // console.log(output);
     res.json({ message: output });
});

app.post("/save-spam", async(req, res) => {
    const websiteURL = req.body;
    const str = JSON.stringify(websiteURL);
    
     // Save to a file
     //fs.appendFileSync("spam-message.txt", str);
     const fs = require("fs");
     const filePath = "./scammers.txt"; 
     const secondPath = "./trusted.txt"; 
     const dataPath = "./data.txt";
     let data_content = "";
     let content = "";
     let trusted_list = ""

     try {
        content = fs.readFileSync(filePath, "utf-8");
    } catch (err) {
        console.error("Error reading file:", err);
    }
    try {
        trusted_list = fs.readFileSync(secondPath, "utf-8");
    } catch (err) {
        console.error("Error reading file:", err);
    }
    try {
        data_content = fs.readFileSync(dataPath, "utf-8");
    } catch (err) {
        console.error("Error reading file:", err);
    }
     const prompt = `Some spam data to refer: ${data_content} \n some trustworthy mailid, numbers: ${trusted_list}\n, 
     Here I provided some information and I have a doubt 
     whether the message is spam or not. 
     After analyzing the sender's name - if its real or madeup based on your knowledge, phone number, 
     and other details, including the message, 
     check whether it's spam or not: ${str}. If both trustworthy and scammer details include same name or value then compare how many times it appear in which section and based on the section 
     it appear a lot determine its whether scam or real 
     also provided a list of reported scammer 
     IDs based on our user's reports: ${content}. 
     First, check if the content makes sense or is 
     just meaningless blabbering—if it is blabbering, 
     return 'It's just blabbering.' Otherwise, 
     return only one of these exact responses: 
     'Yes, it's spam' or 'No, it's not spam.' No extra explanations or paragraphs.`;
     const result = await model.generateContent(prompt);
     const output = result.response.text().trim(); // Remove unwanted newlines
    //console.log("AI Output:", output);
    res.json({ message: output }); // Send cleaned response to frontend

});

app.post("/report-spammers", (req, res) => {
    const websiteURL = req.body;
    const str = JSON.stringify(websiteURL);
     // Save to a file
     fs.appendFileSync("scammers.txt", str);
     console.log("Success");
     res.json({ message: "Spammer list updated successfully!"});
});

app.post("/trusted-ones", (req, res) => {
    const websiteURL = req.body;
    const str = JSON.stringify(websiteURL);
    console.log("str");
     // Save to a file
     fs.appendFileSync("trusted.txt", str);
     console.log("Success");
     res.json({ message: "Trusted list updated successfully!"});
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
