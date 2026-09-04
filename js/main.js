class UIController {
    constructor() {
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        // Avvia il ciclo vitale dell'interfaccia
        this.runPreloader();
        this.bindScrollNav();
    }

    runPreloader() {
        const preloader = document.getElementById('preloader');
        const lockSvg = document.getElementById('lock-logo');
        const logoWrapper = document.getElementById('logo-wrapper');
        const navAnchor = document.getElementById('nav-logo-anchor');
        const smartNav = document.getElementById('smart-nav');

        // Fase 1: Disegna l'archetto
        requestAnimationFrame(() => {
            setTimeout(() => {
                lockSvg.classList.add('is-drawing');
            }, 300);
        });

        // Fase 2: Chiusura scatto (1.4s dopo) e calcolo FLIP
        setTimeout(() => {
            lockSvg.classList.add('is-locked');
            
            // Calcolo coordinate di partenza (centro) e arrivo (navbar)
            const startRect = logoWrapper.getBoundingClientRect();
            const endRect = navAnchor.getBoundingClientRect();
            
            const deltaX = endRect.left - startRect.left;
            const deltaY = endRect.top - startRect.top;
            const scale = endRect.width / startRect.width;

            // Transizione FLIP: Migrazione verso la navbar
            logoWrapper.style.transition = 'transform 1s cubic-bezier(0.77, 0, 0.175, 1)';
            logoWrapper.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
            
            // Dissolvi lo sfondo nero e mostra la nav
            preloader.classList.add('fade-out');
            setTimeout(() => {
                smartNav.classList.remove('hidden');
            }, 600);

        }, 1800);
    }

    bindScrollNav() {
        const navbar = document.getElementById('smart-nav');
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Nascondi se si scrolla in basso oltre i 60px, mostra se si risale
            if (currentScrollY > 60 && currentScrollY > this.lastScrollY) {
                navbar.classList.add('scroll-hide');
            } else {
                navbar.classList.remove('scroll-hide');
            }
            
            this.lastScrollY = currentScrollY;
        }, { passive: true });
    }
}

// Inizializzazione pulita
document.addEventListener('DOMContentLoaded', () => {
    new UIController();
});