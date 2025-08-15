document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.querySelector('.mobile-menu-toggle').classList.remove('active');
                document.querySelector('.nav-menu').classList.remove('active');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Typing Animation
    const typedText = document.querySelector('.typing-animation');
    if (typedText) {
        const texts = ["e cresça com segurança", "e maximize seus lucros", "e tome decisões inteligentes"];
        let count = 0;
        let index = 0;
        let currentText = '';
        let letter = '';
        
        (function type() {
            if (count === texts.length) {
                count = 0;
            }
            
            currentText = texts[count];
            letter = currentText.slice(0, ++index);
            
            typedText.textContent = letter;
            
            if (letter.length === currentText.length) {
                count++;
                index = 0;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        })();
    }

    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    document.querySelector('.slider-next').addEventListener('click', () => {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonialCards.length) nextIndex = 0;
        showTestimonial(nextIndex);
    });
    
    document.querySelector('.slider-prev').addEventListener('click', () => {
        let prevIndex = currentTestimonial - 1;
        if (prevIndex < 0) prevIndex = testimonialCards.length - 1;
        showTestimonial(prevIndex);
    });
    
    // Auto rotate testimonials
    setInterval(() => {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonialCards.length) nextIndex = 0;
        showTestimonial(nextIndex);
    }, 5000);

    // Form Validation and Submission
    const consultoriaForm = document.getElementById('consultoriaForm');
    if (consultoriaForm) {
        consultoriaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            enviarFormulario();
        });
    }

    // Phone Mask
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            if (value.length > 0) {
                value = value.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3');
            }
            
            e.target.value = value;
        });
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: "#D4AF37" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: false },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card, .diff-item, .service-card, .process-step').forEach(el => {
        observer.observe(el);
    });
});

function enviarFormulario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value;

    if (!nome || !email || !telefone || !servico) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    // Simulate form submission (in a real scenario, you would send this to a server)
    const dadosFormulario = {
        nome,
        email,
        telefone,
        servico,
        mensagem
    };

    console.log('Dados do formulário:', dadosFormulario);
    
    // Prepare WhatsApp message
    const servicoTexto = {
        'classic': 'Plano Classic',
        'gold': 'Plano Gold', 
        'premium': 'Plano Premium',
        'consultoria': 'Consultoria gratuita',
        'outro': 'Outro serviço'
    };

    const whatsappMessage = `Olá! Meu nome é ${nome} e tenho interesse no ${servicoTexto[servico]}.

📧 Email: ${email}
📱 Telefone: ${telefone}
${mensagem ? `\n💬 Mensagem: ${mensagem}` : ''}

Gostaria de agendar uma consultoria gratuita!`;

    const whatsappURL = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Show success message
    alert('Obrigado pelo seu interesse! Você será redirecionado para o WhatsApp para finalizar seu agendamento.');
    
    // Clear form
    document.getElementById('consultoriaForm').reset();
    
    // Redirect to WhatsApp after a small delay
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1000);
}