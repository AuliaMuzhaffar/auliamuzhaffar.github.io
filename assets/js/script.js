// --- LOGIKA PRE-LOADER ---
// Menyembunyikan layar loading hitam setelah aset utama dimuat.
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Jalankan saat semua aset (gambar, dll) selesai dimuat
window.addEventListener('load', hideLoader);

// Fail-safe: Sembunyikan loader setelah 2 detik meskipun belum semua aset selesai (mencegah stuck)
setTimeout(hideLoader, 2000);

// --- EFEK TYPEWRITER (MESIN TIK) ---
// Membuat teks pada bagian Hero mengetik secara otomatis untuk kesan interaktif.
const typewriterElement = document.getElementById('typewriter');
const words = ["Intelligence", "Insights", "Solutions", "Impact"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
        typeSpeed = 100;
    } else {
        charIndex++;
        typeSpeed = 150;
    }

    typewriterElement.textContent = currentWord.substring(0, charIndex);

    // Kontrol Kecepatan: Berhenti sejenak saat kata selesai, dan hapus lebih cepat.
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Jeda 2 detik saat kata lengkap
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// --- EFEK NAVIGASI & SCROLL ---
const progressBar = document.getElementById('progress-bar');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section, header');

window.addEventListener('scroll', () => {
    // 1. Reading Progress Bar: Menghitung sejauh mana user telah men-scroll halaman.
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";

    // 2. Navbar Sticky Style: Menambahkan bayangan saat navbar mulai meninggalkan posisi atas.
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // 3. Scroll Spy: Menandai link navigasi yang sedang aktif berdasarkan posisi scroll.
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- INISIALISASI SETELAH DOM SIAP ---
document.addEventListener('DOMContentLoaded', () => {
    type(); // Mulai efek mesin tik

    // --- FILTER PROYEK ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const viewMoreBtn = document.getElementById('view-more-btn');
    const viewMoreContainer = document.getElementById('view-more-container');

    let currentFilter = 'all';
    let isExpanded = false;

    function updateProjectDisplay() {
        let totalMatches = 0;
        let shownCount = 0;

        // Hitung total proyek yang cocok dengan filter yang dipilih
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            if (currentFilter === 'all' || categories.includes(currentFilter)) {
                totalMatches++;
            }
        });

        // Tampilkan kartu proyek sesuai logika filter dan status 'View More'
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            const matchesFilter = currentFilter === 'all' || categories.includes(currentFilter);

            if (matchesFilter) {
                if (!isExpanded && shownCount >= 3) {
                    card.style.display = 'none';
                } else {
                    card.style.display = 'flex';
                    shownCount++;

                    // Efek Fade-In saat memfilter
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = 'opacity 0.3s ease';
                    }, 10);
                }
            } else {
                card.style.display = 'none';
            }
        });

        // Tampilkan/Sembunyikan tombol 'View More' jika proyek lebih dari 3
        if (!isExpanded && totalMatches > 3) {
            viewMoreContainer.style.display = 'block';
        } else {
            viewMoreContainer.style.display = 'none';
        }
    }

    // Event listener untuk tombol filter kategori
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentFilter = button.getAttribute('data-filter');
            isExpanded = false; // Reset status ekspansi
            updateProjectDisplay();
        });
    });

    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            isExpanded = true;
            updateProjectDisplay();
        });
    }

    updateProjectDisplay();

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Penyesuaian agar tidak tertutup navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- FORM KONTAK (DEMO) ---
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Terima kasih! (Pesan Anda telah terkirim - Mode Demo)');
            contactForm.reset();
        });
    }

    // --- INISIALISASI SWIPER (SERTIFIKAT) ---
    const certSwiper = new Swiper('.cert-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        loopedSlides: 4,
        grabCursor: true,
        navigation: {
            nextEl: '.cert-next',
            prevEl: '.cert-prev',
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });

    // --- PROGRESS TIMELINE VERTIKAL ---
    // Menggerakkan garis progress pada bagian Education & Experience saat di-scroll.
    const timeline = document.querySelector('.timeline');
    const timelineProgress = document.querySelector('.timeline-progress-bar');
    const timelineItems = document.querySelectorAll('.timeline-item');

    function updateTimelineProgress() {
        if (!timeline || !timelineProgress) return;

        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Menghitung seberapa jauh user telah men-scroll melewati bagian atas timeline
        let progress = (windowHeight / 2 - rect.top) / rect.height;
        progress = Math.max(0, Math.min(1, progress)); // Batasi 0-100%
        
        timelineProgress.style.height = (progress * 100) + "%";

        // Efek 'Active Point' pada setiap item timeline
        timelineItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            if (itemRect.top < windowHeight / 2) {
                item.classList.add('active-point');
            } else {
                item.classList.remove('active-point');
            }
        });
    }

    window.addEventListener('scroll', updateTimelineProgress);
    updateTimelineProgress();

    // --- REVEAL ON SCROLL (ANIMASI MUNCUL) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
});
