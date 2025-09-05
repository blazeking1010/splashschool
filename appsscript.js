// This function will be called when the form is submitted
function doPost(e) {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/18Qlojr9XJKo359kytWNpPgDCsgO4Nq5ZnxF2G2hnk74/edit?usp=sharing";
  const ss = SpreadsheetApp.openByUrl(sheetUrl);
  const sheet = ss.getActiveSheet();
  
  // Get the form data
  const formData = JSON.parse(e.postData.contents);
  
  // Prepare the data to be added to the sheet
  const timestamp = new Date();
  const rowData = [
    timestamp,
    formData.name,
    formData.phone,
    formData.email,
    formData.age,
    formData.message
  ];
  
  // Add the data to the sheet
  sheet.appendRow(rowData);
  
  // Return a success response
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Form submitted successfully!"
  })).setMimeType(ContentService.MimeType.JSON);
}

// This function is required for the web app to be accessible
function doGet() {
  return HtmlService.createHtmlOutput('This is a web app that processes form submissions.');
}
