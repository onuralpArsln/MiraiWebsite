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

### 🎨 İnteraktif Çözüm Kartları
- **Göz İkonu** (Computer Vision):
  - 2x göz kırpma animasyonu
  - Göz bebeği sağa-sola bakma hareketi
  - Dış göz sabıt kalıyor
  - 3 saniyelik smooth animasyon
- **Sohbet İkonu** (NLP/Müşteri Hizmetleri):
  - 4 gerçek sohbet balonu (kuyruklu)
  - Sol ve sağdan dönüşümlü konuşma görüntüsü
  - Aşağıdan yukarı yükselen animasyon
  - Her balon kendi kuyruğu ile
  - Yavaşça kaybolan efekt
- **Grafik İkonu** (Tahminsel Analitik):
  - İki farklı veri eğrisi arası geçiş
  - Dinamik veri değişimi görüntüsü
  - Veri noktaları pulse animasyonu
  - Sonsuz döngü (infinite loop)

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

## 🌐 Çok Dilli Destek (Multi-language i18n)

### ✅ Tam TR/EN Desteği Aktif!

Website artık **Türkçe ve İngilizce** dillerini destekliyor:

**Özellikler:**
- ✅ **Anında Dil Değiştirme** - Sayfa yenilenmeden dil değişir
- ✅ **localStorage ile Kalıcı** - Tercih kaydedilir
- ✅ **Kapsamlı Çeviri** - Tüm ana bölümler çevrilmiştir
- ✅ **Bildirim Sistemi** - Dil değişikliği bildirimi

**Çevrilen Bölümler:**
- Navigation menü
- Hero section (başlık, açıklama, butonlar, istatistikler)
- Özellikler bölümü (6 özellik)
- Referanslar başlığı
- Çözümler başlığı
- CTA bölümü
- Demo bölümü
- İletişim formu (tüm etiketler)
- Footer

**Çeviri Dosyaları:**
- `/public/locales/tr.json` - Türkçe
- `/public/locales/en.json` - İngilizce

**Kullanım:**
1. Sağ üst köşede **[TR]** butonuna tıklayın
2. Dil **EN** olarak değişir ve sayfa İngilizce'ye çevrilir
3. Tekrar tıklayın, Türkçe'ye döner
4. Tercih otomatik kaydedilir

### Çeviri Ekleme/Düzenleme

JSON dosyalarını düzenleyin:

**1. Türkçe:** `/public/locales/tr.json`
```json
{
  "nav": {
    "home": "Ana Sayfa",
    "features": "Özellikler"
  }
}
```

**2. İngilizce:** `/public/locales/en.json`
```json
{
  "nav": {
    "home": "Home",
    "features": "Features"
  }
}
```

Değişiklikler otomatik olarak yüklenir!

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

