# 🔍 Code Dissection: Deep Dive

Gunakan panduan ini untuk memahami fungsi teknis dari setiap blok kode utama di website Anda.

````carousel
```html
<!-- 1. THE BRAIN (HEAD SECTION) -->
<head>
    <!-- SEO: Memberitahu Google tentang website Anda -->
    <title>CS Graduate | Data Science & AI Portfolio</title>
    
    <!-- Link External: Meminjam fitur dari pihak ketiga -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" /> <!-- Slider -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" /> <!-- Icons -->
    
    <!-- Link Internal: Gaya buatan sendiri -->
    <link rel="stylesheet" href="./assets/css/style.css">
</head>
```
<!-- slide -->
```css
/* 2. THE DESIGN TOKENS (ROOT) */
:root {
    --main: #FFD100;       /* Warna utama (Kuning) */
    --border: 4px solid #000; /* Garis tepi tebal khas Neobrutalism */
    --shadow: 8px 8px 0px #000; /* Bayangan tajam (bukan blur) */
}

/* Utilitas: Class yang bisa dipakai berulang kali */
.neo-card {
    background: var(--white);
    border: var(--border);
    box-shadow: var(--shadow);
    transition: all 0.2s ease; /* Membuat gerakan halus saat di-hover */
}
```
<!-- slide -->
```javascript
/* 3. THE TYPEWRITER LOGIC */
function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        charIndex--; // Hapus huruf satu-satu
    } else {
        charIndex++; // Tambah huruf satu-satu
    }

    // Update teks di layar
    typewriterElement.textContent = currentWord.substring(0, charIndex);

    // Cek: Apakah kata sudah selesai diketik?
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true; // Mulai hapus
        typeSpeed = 2000;  // Berhenti sebentar di akhir kata
    }
}
```
<!-- slide -->
```javascript
/* 4. THE FILTER LOGIC (The "Sieve") */
function updateProjectDisplay() {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        // Logika: Tampilkan jika filter 'all' ATAU kategori cocok
        const matchesFilter = currentFilter === 'all' || category === currentFilter;
        
        if (matchesFilter) {
            card.style.display = 'flex'; // Tampilkan
        } else {
            card.style.display = 'none'; // Sembunyikan
        }
    });
}
```
````

---

## 🛠️ Ringkasan untuk Project Manager (PM)

### Mengapa struktur ini bagus?
1.  **Modular**: Komponen dipisah (HTML/CSS/JS) sehingga jika ada error di desain, tidak akan merusak data di HTML.
2.  **Scalable**: Ingin menambah kategori proyek baru? Cukup tambah satu baris tombol di HTML dan beri label di kartu proyeknya. JavaScript akan menanganinya secara otomatis.
3.  **Modern**: Menggunakan *Intersection Observer* dan *CSS Variables* yang merupakan standar industri saat ini.

### Tantangan Masa Depan:
*   Jika jumlah proyek mencapai 50+, kita mungkin perlu menambahkan sistem **Pagination** agar halaman tidak terlalu berat saat pertama kali dibuka.
