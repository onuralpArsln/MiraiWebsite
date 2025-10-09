# EmailJS Setup Guide

## 📧 Setting Up Your EmailJS Template

Your contact form is ready! You just need to create a template in your EmailJS dashboard.

### Step 1: Log in to EmailJS
Go to [EmailJS Dashboard](https://dashboard.emailjs.com/) and log in to your account.

### Step 2: Create Email Template

1. Go to **Email Templates** in the left sidebar
2. Click **Create New Template**
3. Set the Template ID to: `template_mirai` (or update it in `/public/js/contact.js`)

### Step 3: Configure Template Content

Use these variables in your template:

#### Template Variables:
- `{{user_name}}` - Name of the person contacting
- `{{user_email}}` - Email address
- `{{company_name}}` - Company name (optional)
- `{{phone}}` - Phone number (optional)
- `{{message}}` - Message content

#### Sample Template Subject:
```
Yeni İletişim Formu Mesajı - {{user_name}}
```

#### Sample Template Body:
```html
<h2>Yeni İletişim Formu Mesajı</h2>

<p><strong>Ad Soyad:</strong> {{user_name}}</p>
<p><strong>E-posta:</strong> {{user_email}}</p>
<p><strong>Şirket:</strong> {{company_name}}</p>
<p><strong>Telefon:</strong> {{phone}}</p>

<h3>Mesaj:</h3>
<p>{{message}}</p>

<hr>
<p><em>Bu mesaj Mirai AI web sitesi iletişim formundan gönderilmiştir.</em></p>
```

### Step 4: Configure "To" Email
In the template settings:
- Set the **To Email** field to the email address where you want to receive contact form submissions
- Example: `info@mirai.ai` or your own email

### Step 5: Test Your Form

1. Save the template
2. Start your development server:
   ```bash
   npm run dev
   ```
3. Visit http://localhost:3000
4. Scroll to the contact section
5. Fill out and submit the form
6. Check your configured email for the message

### 🔧 Configuration Files

Your EmailJS settings are in `/public/js/contact.js`:

```javascript
const EMAILJS_SERVICE_ID = 'service_1rkzjra';
const EMAILJS_TEMPLATE_ID = 'template_mirai';
const EMAILJS_PUBLIC_KEY = 'OH6IvxL-FD3cYE6Fe';
```

### ✨ Features Included

- ✅ Form validation
- ✅ Loading state with spinner
- ✅ Success/error messages
- ✅ Auto-reset after successful submission
- ✅ Responsive design
- ✅ Turkish language support

### 🎨 Customization

**To change the template ID:**
Edit line 2 in `/public/js/contact.js`:
```javascript
const EMAILJS_TEMPLATE_ID = 'your_template_id';
```

**To add more form fields:**
1. Add input field in `/views/index.ejs`
2. Add the variable to `formData` object in `/public/js/contact.js`
3. Add the variable to your EmailJS template

### 📱 Auto-Reply Template (Optional)

You can create an auto-reply template to send confirmation emails to users:

1. Create a new template in EmailJS
2. Set subject: `Mesajınız Alındı - Mirai AI`
3. Body:
```html
<p>Merhaba {{user_name}},</p>

<p>Mesajınız başarıyla alındı. Ekibimiz en kısa sürede size dönüş yapacaktır.</p>

<p>İletişime geçtiğiniz için teşekkür ederiz!</p>

<p>Saygılarımızla,<br>Mirai AI Ekibi</p>
```

4. In your service settings, enable auto-reply with this template

### 🐛 Troubleshooting

**Form not sending?**
- Check browser console for errors (F12)
- Verify Service ID, Template ID, and Public Key are correct
- Make sure the template exists in your EmailJS dashboard
- Check EmailJS quota (free plan has monthly limits)

**Template not found error?**
- Ensure template ID in code matches exactly with EmailJS dashboard
- Template ID is case-sensitive

**Emails not arriving?**
- Check spam folder
- Verify "To Email" is set correctly in template settings
- Check EmailJS dashboard for delivery status

### 📊 Monitoring

View your email delivery statistics in the EmailJS dashboard:
- Go to **Auto Stats** to see delivery rates
- Check **Email Log** for detailed sending history

---

Need help? Check [EmailJS Documentation](https://www.emailjs.com/docs/)

