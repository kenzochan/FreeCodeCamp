document.getElementById('survey-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting traditionally

  // Capture the form data
  let formData = new FormData(document.getElementById('survey-form'));

  // Convert FormData to a plain object
  let formObject = {};
  formData.forEach((value, key) => {
    // If the key already exists (e.g., for checkboxes), convert it to an array
    if (formObject[key]) {
        formObject[key] = Array.isArray(formObject[key]) 
            ? [...formObject[key], value] 
            : [formObject[key], value];
    } else {
        formObject[key] = value;
    }
});

  // Use fetch to send the form data to your server
  fetch('http://localhost:3000/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObject)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});