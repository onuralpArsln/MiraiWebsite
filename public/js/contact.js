// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_1rkzjra';
const EMAILJS_TEMPLATE_ID = 'template_mirai'; // You'll need to create this in EmailJS dashboard
const EMAILJS_PUBLIC_KEY = 'OH6IvxL-FD3cYE6Fe';

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const btnText = contactForm.querySelector('.btn-text');
    const btnLoading = contactForm.querySelector('.btn-loading');
    const formMessage = contactForm.querySelector('.form-message');
    const submitBtn = contactForm.querySelector('.btn-submit');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        formMessage.style.display = 'none';

        // Get form data
        const formData = {
            user_name: document.getElementById('user_name').value,
            user_email: document.getElementById('user_email').value,
            company_name: document.getElementById('company_name').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Send email using EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                formMessage.textContent = '✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';

                // Reset form
                contactForm.reset();

                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                
                // Show error message
                formMessage.textContent = '❌ Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';

                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            });
    });
});

