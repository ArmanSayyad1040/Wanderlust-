//Bootstrap ka by default 
// Form submit karte time invalid fields ki validation check karne ke liye
(() => {
  'use strict' // JavaScript ke strict rules follow karne ke liye

  // Saare needs-validation class wale forms select karta hai
  const forms = document.querySelectorAll('.needs-validation')

  // Har form par submit event listener lagata hai
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {

      // Check karta hai ki form ke saare inputs valid hain ya nahi
      if (!form.checkValidity()) {

        // Agar form invalid hai toh submission rok deta hai
        event.preventDefault()

        // Event ko parent elements tak propagate hone se rokta hai
        event.stopPropagation()
      }

      // Bootstrap ki validation styling show karta hai
      form.classList.add('was-validated')

    }, false) // Event bubbling phase mein listener register karta hai
  })
})() // Function ko turant execute karta hai