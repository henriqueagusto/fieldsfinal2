/**
 * FinanceFlow - Sistema de Gestão Financeira
 * main.js - Script principal do site
 * @version 1.0.0
 * @license MIT
 */

// Configuração inicial
const CONFIG = {
  scrollOffset: 100, // Offset para scroll suave
  animationOffset: 100, // Offset para animações
  animationDuration: 600, // Duração das animações em ms
  faqTransition: 300, // Duração da transição do FAQ
  tabTransition: 200 // Duração da transição das tabs
};

// Módulo principal
const FinanceFlow = (() => {
  // Elementos DOM
  const DOM = {
    navigation: document.getElementById('navigation'),
    faqItems: document.querySelectorAll('.faq-item'),
    visualTabs: document.querySelectorAll('.visual-tab'),
    anchorLinks: document.querySelectorAll('a[href^="#"]'),
    animatedElements: document.querySelectorAll('.feature-card, .stat-card, .testimonial-card')
  };

  // Estado da aplicação
  const state = {
    lastScrollPosition: 0,
    isScrollingDown: false,
    resizeTimeout: null
  };

  // Inicialização
  const init = () => {
    _setupEventListeners();
    _initializeAnimations();
    _checkScrollDirection();
    console.log('FinanceFlow initialized successfully');
  };

  // Configura listeners de eventos
  const _setupEventListeners = () => {
    // Scroll events
    window.addEventListener('scroll', _throttle(_handleScroll, 100));
    window.addEventListener('resize', _debounce(_handleResize, 200));

    // FAQ toggle
    DOM.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => _toggleFAQ(item));
    });

    // Tab system
    DOM.visualTabs.forEach(tab => {
      tab.addEventListener('click', () => _switchTab(tab));
    });

    // Smooth scrolling
    DOM.anchorLinks.forEach(link => {
      link.addEventListener('click', _smoothScroll);
    });
  };

  // Inicializa animações
  const _initializeAnimations = () => {
    DOM.animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity ${CONFIG.animationDuration}ms ease, transform ${CONFIG.animationDuration}ms ease`;
    });
  };

  // Manipulador de scroll
  const _handleScroll = () => {
    _checkScrollDirection();
    _toggleNavbar();
    _animateOnScroll();
  };

  // Verifica direção do scroll
  const _checkScrollDirection = () => {
    const currentScrollPosition = window.pageYOffset;
    state.isScrollingDown = currentScrollPosition > state.lastScrollPosition;
    state.lastScrollPosition = currentScrollPosition;
  };

  // Alterna classe da navbar no scroll
  const _toggleNavbar = () => {
    if (window.scrollY > 50) {
      DOM.navigation.classList.add('scrolled');
    } else {
      DOM.navigation.classList.remove('scrolled');
    }
  };

  // Animação ao scroll
  const _animateOnScroll = () => {
    const screenPosition = window.innerHeight - CONFIG.animationOffset;

    DOM.animatedElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;

      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Alterna FAQ item
  const _toggleFAQ = (item) => {
    const isActive = item.classList.contains('active');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');

    // Fecha todos os outros itens primeiro
    if (!isActive) {
      DOM.faqItems.forEach(i => {
        if (i !== item && i.classList.contains('active')) {
          i.classList.remove('active');
          i.querySelector('.faq-answer').style.maxHeight = '0';
          i.querySelector('.faq-toggle').style.transform = 'rotate(0)';
        }
      });
    }

    // Alterna o item atual
    item.classList.toggle('active');

    if (item.classList.contains('active')) {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
      toggle.style.transform = 'rotate(45deg)';
    } else {
      answer.style.maxHeight = '0';
      toggle.style.transform = 'rotate(0)';
    }
  };

  // Alterna tabs
  const _switchTab = (tab) => {
    const tabName = tab.dataset.tab;
    const tabContainer = tab.closest('.highlight-visual');
    
    // Remove active class de todas as tabs e items
    tabContainer.querySelectorAll('.visual-tab').forEach(t => t.classList.remove('active'));
    tabContainer.querySelectorAll('.visual-item').forEach(i => i.classList.remove('active'));
    
    // Adiciona active class à tab clicada
    tab.classList.add('active');
    
    // Mostra o conteúdo correspondente
    const targetTab = tabContainer.querySelector(`#${tabName}-tab`);
    if (targetTab) {
      targetTab.classList.add('active');
    }
  };

  // Scroll suave
  const _smoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - CONFIG.scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  // Manipulador de resize
  const _handleResize = () => {
    // Ajusta a altura dos FAQs abertos
    DOM.faqItems.forEach(item => {
      if (item.classList.contains('active')) {
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  };

  // Debounce para otimização de performance
  const _debounce = (func, wait) => {
    return (...args) => {
      clearTimeout(state.resizeTimeout);
      state.resizeTimeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // Throttle para otimização de performance
  const _throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  // API pública
  return {
    init
  };
})();

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  FinanceFlow.init();
});

// Fallback para browsers antigos
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    let el = this;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// Polyfill para NodeList.forEach
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}