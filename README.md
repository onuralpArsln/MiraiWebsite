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
- **Helmet.js** - Güvenlik başlıkları
- **Compression** - Gzip sıkıştırma
- **Express Rate Limit** - API hız sınırlama

## ✨ Yeni Özellikler

### 🌙 Dark Mode (Karanlık Tema)
- **Varsayılan olarak açık tema** - Yeni ziyaretçiler için
- Tam karanlık tema desteği
- localStorage ile kalıcı kayıt
- Manuel geçiş butonu (Sun/Moon icon)
- Klavye kısayolu: `Ctrl+Shift+D`
- Tüm bileşenler için özel dark mode stilleri
- Tema değişikliğinde animasyon efekti

### 🤖 İnteraktif AI Demo
- Gerçek zamanlı sohbet arayüzü
- Akıllı anahtar kelime tanıma
- Yazma animasyonları
- Markdown ve kod formatlaması
- Örnek sorular ile hızlı başlangıç
- Responsive tasarım

### 🏢 Referanslar Carousel
- Otomatik dönen sonsuz logo carousel
- Grayscale efekti (hover'da renkli)
- Pause on hover
- Dark mode desteği
- Responsive tasarım
- Kolay logo ekleme sistemi

### 📈 SEO Optimizasyonu
- Dinamik meta etiketleri
- Open Graph (Facebook) etiketleri
- Twitter Card desteği
- JSON-LD yapılandırılmış veri
- Otomatik sitemap.xml
- robots.txt yapılandırması

### ⚡ Performans & Güvenlik
- Helmet.js güvenlik başlıkları
- Gzip sıkıştırma
- Hız sınırlama (100 istek/15dk)
- İletişim formu için özel limit (5 istek/15dk)
- Cache control
- CSP (Content Security Policy)

### 🚫 Özel Hata Sayfaları
- Özel 404 sayfası
- Özel 500 sayfası
- Animasyonlu illüstrasyonlar
- Kolay navigasyon

## 🌐 Dil Değiştirici (Language Switcher)

### Mevcut Durum
- Navigation bar'da TR/EN dil değiştirici butonu eklenmiştir
- localStorage ile tercih kaydedilir
- Şu an placeholder olarak çalışır (bildirim gösterir)
- Gelecekte tam i18n desteği için hazır

### Tam Çok Dilli Destek İçin

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

## 🏢 Referans Logo Ekleme

Müşteri/partner logolarını eklemek için:

1. Logo dosyalarınızı `/public/assets/references/` klasörüne ekleyin
2. `/public/js/references.js` dosyasını açın
3. `referenceLogos` dizisine logo dosya adlarını ekleyin:

```javascript
const referenceLogos = [
    'client1.png',
    'client2.png',
    'client3.png',
    // Daha fazla logo ekleyin
];
```

**Önerilen logo formatı:**
- PNG (şeffaf arkaplan) veya SVG
- Genişlik: 300-500px
- Yükseklik: 100-200px
- Dosya boyutu: <50KB (optimize edilmiş)

Detaylı bilgi için: `/public/assets/references/README.md`

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

