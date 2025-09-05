
// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id = a.getAttribute('href');
    if(id.length>1){
      e.preventDefault();
      document.querySelector(id).scrollIntoView({behavior:'smooth'});
    }
  })
});

// Form handler for Google Sheets submission
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    try {
      // Disable the submit button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Get form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        age: formData.get('age'),
        message: formData.get('message')
      };
      
      // Replace with your deployed web app URL after deploying the Apps Script
      const webAppUrl = 'YOUR_WEB_APP_URL';
      
      // Send data to Google Apps Script
      const response = await fetch(webAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      // Show success message
      alert('Thank you! Your enquiry has been submitted successfully.');
      form.reset();
      
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form. Please try again or contact us directly.');
    } finally {
      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}
