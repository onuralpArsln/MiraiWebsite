# Mirai - Yapay Zeka Çözümleri Web Sitesi

Modern ve ölçeklenebilir bir Express.js uygulaması. EJS template engine kullanılarak geliştirilmiştir.

## 🚀 Başlangıç

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm

### Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Sunucuyu başlatın:

**Geliştirme modu (otomatik yeniden başlatma):**
```bash
npm run dev
```

**Üretim modu:**
```bash
npm start
```

3. Tarayıcınızda açın: http://localhost:3000

## 📁 Proje Yapısı

```
MiraiWebsite/
├── server.js              # Express sunucu yapılandırması
├── package.json           # Proje bağımlılıkları
├── views/                 # EJS şablonları
│   ├── index.ejs         # Ana sayfa
│   └── partials/         # Yeniden kullanılabilir bileşenler
│       ├── header.ejs    # Başlık ve navigasyon
│       └── footer.ejs    # Alt bilgi
└── public/               # Statik dosyalar
    ├── css/              # Stil dosyaları
    │   └── styles.css
    ├── js/               # JavaScript dosyaları
    │   └── script.js
    └── assets/           # Görseller ve diğer medya dosyaları
```

## 🛠️ Teknolojiler

- **Express.js** - Web framework
- **EJS** - Template engine
- **Nodemon** - Geliştirme sırasında otomatik yeniden başlatma
- **EmailJS** - İletişim formu e-posta entegrasyonu

## 🌐 Çok Dilli Destek

EJS yapısı sayesinde kolayca çok dilli destek eklenebilir. Gelecekte Türkçe/İngilizce dil desteği için:

1. `locales/` klasörü oluşturun
2. Dil dosyalarını ekleyin (tr.json, en.json)
3. Middleware ile dil tespiti yapın
4. EJS'e dil verilerini gönderin

Örnek:
```javascript
app.get('/', (req, res) => {
    const lang = req.query.lang || 'tr';
    res.render('index', {
        pageTitle: 'Mirai AI',
        lang: lang,
        t: require(`./locales/${lang}.json`)
    });
});
```

## 📝 Yeni Sayfa Ekleme

1. `views/` klasöründe yeni bir `.ejs` dosyası oluşturun
2. `server.js` dosyasına yeni route ekleyin:

```javascript
app.get('/hakkimizda', (req, res) => {
    res.render('about', {
        pageTitle: 'Hakkımızda - Mirai'
    });
});
```

3. Header'daki navigasyon linklerini güncelleyin

## 📧 İletişim Formu Kurulumu

İletişim formu EmailJS ile entegre edilmiştir. Kurulum için:

1. **EMAILJS_SETUP.md** dosyasındaki adımları takip edin
2. EmailJS dashboard'unuzda `template_mirai` adında bir şablon oluşturun
3. Şablonda şu değişkenleri kullanın:
   - `{{user_name}}` - Ad Soyad
   - `{{user_email}}` - E-posta
   - `{{company_name}}` - Şirket Adı
   - `{{phone}}` - Telefon
   - `{{message}}` - Mesaj

Detaylı kurulum talimatları için `EMAILJS_SETUP.md` dosyasını inceleyin.

## 🔧 Geliştirme

Geliştirme sırasında `npm run dev` kullanın. Nodemon, dosya değişikliklerini otomatik olarak algılar ve sunucuyu yeniden başlatır.

## 📄 Lisans

ISC

