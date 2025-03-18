// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Hero Section Animation
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    gsap.from(heroContent, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
}

// Particle Effect
const particlesContainer = document.getElementById('particles-js');
if (particlesContainer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    particlesContainer.appendChild(renderer.domElement);
    
    const particles = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.5
        });
        const particle = new THREE.Mesh(geometry, material);
        
        particle.position.x = Math.random() * 40 - 20;
        particle.position.y = Math.random() * 40 - 20;
        particle.position.z = Math.random() * 40 - 20;
        
        particles.push({
            mesh: particle,
            speed: Math.random() * 0.02 + 0.01
        });
        
        scene.add(particle);
    }
    
    camera.position.z = 30;
    
    function animate() {
        requestAnimationFrame(animate);
        
        particles.forEach(particle => {
            particle.mesh.position.y -= particle.speed;
            if (particle.mesh.position.y < -20) {
                particle.mesh.position.y = 20;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Scroll Animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Feature Cards Animation
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Update organizersData
const organizersData = [
    {
        name: 'HassanJaved/WarNightOG',
        role: 'Founder & Lead Developer',
        description: 'Leading our diverse digital universe with expertise in gaming, development, and community building',
        email: 'hassanjavedelt@gmail.com',
        phone: '92+ 03344148636'
    }
];

const organizersGrid = document.querySelector('.organizers-grid');
if (organizersGrid) {
    organizersData.forEach(organizer => {
        const card = document.createElement('div');
        card.className = 'organizer-card';
        card.innerHTML = `
            <div class="organizer-info">
                <h3>${organizer.name}</h3>
                <p class="role">${organizer.role}</p>
                <a href="mailto:${organizer.email}">${organizer.email}</a>
                <p>${organizer.phone}</p>
            </div>
        `;
        organizersGrid.appendChild(card);
    });
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
    observer.observe(element);
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-grid > div');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Magnetic Buttons
document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
    const area = wrap.querySelector('.magnetic-area');
    const button = area.querySelector('a');

    wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        button.style.transform = `translate(${deltaX * 0.2}px, ${deltaY * 0.2}px)`;
    });

    wrap.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Parallax Cards
document.querySelectorAll('.parallax-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        card.style.transform = `perspective(1000px) rotateY(${deltaX * 10}deg) rotateX(${-deltaY * 10}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.documentElement.style.setProperty('--scroll', scrolled + '%');
});

// Matrix Rain Effect
function createMatrixRain() {
    const matrix = document.querySelector('.matrix-bg');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    for(let i = 0; i < columns; i++) {
        const drop = document.createElement('span');
        drop.className = 'matrix-rain';
        drop.style.left = i * fontSize + 'px';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.textContent = characters[Math.floor(Math.random() * characters.length)];
        matrix.appendChild(drop);
    }
}

// Website Cards Data
const websitesData = [
    {
        title: 'Gaming Hub',
        description: 'Your gateway to gaming excellence',
        features: ['Multiple Games', 'Competitive Leagues', 'Community Events'],
        link: '#',
        category: 'gaming'
    },
    {
        title: 'Creator Studio',
        description: 'Professional editing and content creation',
        features: ['Video Editing', 'Streaming Tools', 'Asset Library'],
        link: '#',
        category: 'editing'
    },
    {
        title: 'Entertainment Zone',
        description: 'Free shows and streaming content',
        features: ['Live Streams', 'On-Demand Content', 'Exclusive Shows'],
        link: '#',
        category: 'entertainment'
    }
];

// Enhanced Website Card Loading
function loadWebsites() {
    const grid = document.querySelector('.websites-grid');
    websitesData.forEach(site => {
        const card = document.createElement('div');
        card.className = 'website-card';
        card.innerHTML = `
            <h3>${site.title}</h3>
            <p>${site.description}</p>
            <ul class="feature-list">
                ${site.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
            </ul>
            <a href="${site.link}" class="cta-button pulse">Explore Now</a>
        `;
        
        // Add hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 20px 40px rgba(0, 255, 255, 0.3)'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
            });
        });
        
        grid.appendChild(card);
    });
}

// Add CTA Button Hover Effect
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Add Floating Animation to Feature Tags
document.querySelectorAll('.feature-tag').forEach((tag, index) => {
    gsap.to(tag, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.2
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createMatrixRain();
    loadWebsites();
    
    // Animate stats on scroll
    gsap.from('.stat-item', {
        scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    });
    
    // Animate team highlights
    gsap.from('.highlight-item', {
        scrollTrigger: {
            trigger: '.team-highlights',
            start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });
}); 
