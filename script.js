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

// Dynamic Content Loading for Organizers
const organizersData = [
    {
        name: 'HassanJaved/WarNightOG',
        role: 'Founder/Creator/Developer',
        image: 'WarNightOG.png',
        email: 'hassanjavedelt@gmail.com',
        phone: '92+ 03344148636'
    },
    {
        name: 'UsmanFahd/ProGamer2123',
        role: 'PublicServer-Founder/Admin',
        image: 'ProGamer2123',
        email: 'usmanfahad2013microsoft@gmail.com',
        phone: '+92 03344148636'
    },
    {
        name: 'MaryamRabeeb/XxSilentProxX',
        role: 'GamingWebsiteResearcher',
        image: 'XxSilentProxX',
        email: 'iamsilent999@gmail.com',
        phone: '+92 03356566933'
    }
        {
        name: '',
        role: 'GamingWebsiteResearcher',
        image: 'XxSilentProxX',
        email: 'iamsilent999@gmail.com',
        phone: '+92 03356566933'
    }
];

const organizersGrid = document.querySelector('.organizers-grid');
if (organizersGrid) {
    organizersData.forEach(organizer => {
        const card = document.createElement('div');
        card.className = 'organizer-card';
        card.innerHTML = `
            <div class="organizer-image">
                <img src="${organizer.image}" alt="${organizer.name}">
                <div class="organizer-overlay">
                    <div class="organizer-details">
                        <h3>${organizer.name}</h3>
                        <p>${organizer.role}</p>
                        <a href="mailto:${organizer.email}">${organizer.email}</a>
                        <p>${organizer.phone}</p>
                    </div>
                </div>
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
