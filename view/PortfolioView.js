/**
 * PortfolioView Class - Editorial Design
 * Clean typography, asymmetric layouts, generous whitespace.
 * Dark mode only design.
 */
export class PortfolioView {
    constructor() {
        this.appContainer = document.getElementById('app');
        
        this.header = null;
        this.htmlEl = document.documentElement;
        this.sfxToggleBtn = null;
        this.menuToggleBtn = null;
        this.mobileMenu = null;
        this.scrollDownBtn = null;
        
        this.desktopNavButtons = [];
        this.mobileNavButtons = [];
        
        this.heroCTAButtons = [];
        this.skillsFilterButtons = [];
        this.certsFilterButtons = [];
        this.certsSearchInput = null;
        this.contactPresetButtons = [];
        this.contactSendBtn = null;
        this.terminalTabs = [];
        
        this.sfxEnabled = false;
        this.audioCtx = null;
    }

    render(data) {
        this.appContainer.innerHTML = `
            <div class="min-h-screen bg-bg text-text font-sans selection:bg-accent/20 selection:text-white transition-colors duration-500 relative overflow-x-hidden">
                <div class="scroll-progress" id="scroll-progress"></div>
                <canvas id="particle-canvas" class="fixed inset-0 z-0 pointer-events-none"></canvas>
                <div class="relative z-10">
                    ${this._createHeaderHTML(data.profile)}
                    ${this._createMobileMenuHTML(data.profile)}
                    
                    <main>
                        ${this._createHeroHTML(data.profile)}
                        ${this._createAboutHTML(data.about)}
                        ${this._createSkillsHTML(data.skills)}
                        ${this._createProjectsHTML(data.projects)}
                        ${this._createCertificationsHTML(data.certifications)}
                        ${this._createContactHTML(data.profile)}
                    </main>
                    
                    ${this._createFooterHTML(data.profile)}
                </div>
                
                <!-- University Modal -->
                <div id="university-modal" class="modal-overlay">
                    <div class="modal-content">
                        <p class="modal-title">Visit University Website</p>
                        <p class="modal-text">Would you like to visit the Cavite State University - Imus Campus website?</p>
                        <div class="modal-buttons">
                            <button id="modal-yes" class="modal-btn modal-btn-primary">Yes, Take Me There</button>
                            <button id="modal-no" class="modal-btn modal-btn-secondary">No, Thanks</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this._cacheElements();
        this._initScrollHeaderBehavior();
        this._initScrollRevealBehavior();
        this._initTerminalTabs();
        this._initProjectTabs();
        this._initAudioTriggers();
        this._initGradientMesh();
        this._initCertsViewAll();
        this._initScrollProgress();
        this._initTextReveal();
        this._initTiltCards();
        this._initParallax();
        this._initUniversityModal();
    }

    _cacheElements() {
        this.header = document.querySelector('header');
        this.sfxToggleBtn = document.querySelector('button[aria-label="Toggle audio effects"]');
        this.menuToggleBtn = document.querySelector('button[aria-label="Toggle menu"]');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.scrollDownBtn = document.querySelector('button[aria-label="Scroll down"]');
        
        this.desktopNavButtons = document.querySelectorAll('header nav ul li button');
        this.mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
        
        this.heroCTAButtons = document.querySelectorAll('section:first-of-type button, section:first-of-type a');
        
        this.skillsFilterButtons = document.querySelectorAll('.skills-filter-btn');
        this.certsFilterButtons = document.querySelectorAll('.certs-filter-btn');
        this.certsSearchInput = document.getElementById('certs-search');
        this.certsViewAllBtn = document.getElementById('certs-view-all');
        
        this.contactPresetButtons = document.querySelectorAll('.contact-preset-card');
        this.contactSendBtn = document.getElementById('contact-send-btn');
        
        this.terminalTabs = document.querySelectorAll('.terminal-tab');
    }

    updateSfx(enabled) {
        this.sfxEnabled = enabled;
        if (this.sfxToggleBtn) {
            if (enabled) {
                this.sfxToggleBtn.innerHTML = `
                    <div class="flex gap-[2px] items-end h-3 px-[2px]">
                        <span class="sound-bar"></span><span class="sound-bar"></span>
                        <span class="sound-bar"></span><span class="sound-bar"></span>
                        <span class="sound-bar"></span>
                    </div>
                `;
                this.sfxToggleBtn.classList.add('text-accent');
            } else {
                this.sfxToggleBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x" aria-hidden="true">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="22" y1="9" x2="16" y2="15"></line><line x1="16" y1="9" x2="22" y2="15"></line>
                    </svg>
                `;
                this.sfxToggleBtn.classList.remove('text-accent');
            }
        }
        this._playSFX('toggle');
    }

    updateMobileMenu(isOpen) {
        if (!this.mobileMenu || !this.menuToggleBtn) return;

        if (isOpen) {
            this.mobileMenu.classList.remove('hidden');
            this.menuToggleBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
            document.body.style.overflow = 'hidden';
        } else {
            this.mobileMenu.classList.add('hidden');
            this.menuToggleBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu" aria-hidden="true">
                    <path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path>
                </svg>
            `;
            document.body.style.overflow = '';
        }
        this._playSFX('click');
    }

    updateActiveSection(activeSection) {
        const sections = ['about', 'skills', 'projects', 'certifications', 'contact'];
        
        this.desktopNavButtons.forEach((btn, index) => {
            const isCurrent = sections[index] === activeSection;
            if (isCurrent) {
                btn.classList.add('text-accent');
                btn.classList.remove('text-text-secondary', 'text-text-secondary');
            } else {
                btn.classList.remove('text-accent');
                btn.classList.add('text-text-secondary', 'text-text-secondary');
            }
        });

        this.mobileNavButtons.forEach(btn => {
            const target = btn.getAttribute('data-target');
            const isCurrent = target === activeSection;
            if (isCurrent) {
                btn.classList.add('text-accent', 'pl-4');
                btn.classList.remove('text-text-secondary', 'text-text-secondary');
            } else {
                btn.classList.remove('text-accent', 'pl-4');
                btn.classList.add('text-text-secondary', 'text-text-secondary');
            }
        });
    }

    updateSkillsFilter(category) {
        this.skillsFilterButtons.forEach(btn => {
            const val = btn.getAttribute('data-category');
            if (val === category) {
                btn.classList.add('bg-surface-light', 'text-accent', 'text-text');
                btn.classList.remove('bg-border-light', 'border-border-light', 'text-text-secondary', 'text-text-secondary', 'border-border', 'border-border');
            } else {
                btn.classList.remove('bg-surface-light', 'text-accent', 'text-text');
                btn.classList.add('bg-border-light', 'border-border-light', 'text-text-secondary', 'text-text-secondary', 'border-border', 'border-border');
            }
        });

        const skillCards = document.querySelectorAll('.skill-category-card');
        skillCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (category === 'All' || cardCat.toLowerCase().includes(category.toLowerCase())) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(8px)';
                setTimeout(() => card.classList.add('hidden'), 200);
            }
        });
        
        this._playSFX('click');
    }

    updateCertsFilter(category, searchQuery = '') {
        this.certsFilterButtons.forEach(btn => {
            const val = btn.getAttribute('data-category');
            if (val === category) {
                btn.classList.add('bg-surface-light', 'text-accent', 'text-text');
                btn.classList.remove('bg-border-light', 'border-border-light', 'text-text-secondary', 'text-text-secondary');
            } else {
                btn.classList.remove('bg-surface-light', 'text-accent', 'text-text');
                btn.classList.add('bg-border-light', 'border-border-light', 'text-text-secondary', 'text-text-secondary');
            }
        });

        const certCards = document.querySelectorAll('.cert-card-wrapper');
        const showAll = this.showAllCerts || false;
        let visibleIndex = 0;
        
        certCards.forEach(card => {
            const certTitle = card.getAttribute('data-title').toLowerCase();
            const certIssuer = card.getAttribute('data-issuer').toLowerCase();
            
            const matchesSearch = certTitle.includes(searchQuery) || certIssuer.includes(searchQuery);
            const matchesCategory = category === 'All' || certIssuer.toLowerCase().includes(category.toLowerCase());

            if (matchesSearch && matchesCategory) {
                if (!showAll && visibleIndex >= 8) {
                    card.classList.add('hidden');
                } else {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                    visibleIndex++;
                }
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(8px)';
                setTimeout(() => card.classList.add('hidden'), 200);
            }
        });
        
        this._updateViewAllButton();
    }

    _updateViewAllButton() {
        const btn = document.getElementById('certs-view-all');
        if (!btn) return;
        
        const totalCerts = document.querySelectorAll('.cert-card-wrapper').length;
        if (totalCerts <= 8) {
            btn.style.display = 'none';
            return;
        }
        
        btn.textContent = this.showAllCerts ? 'Hide Certifications' : 'View All Certifications';
    }

    updateContactPreset(presetType, profile) {
        const subjectEl = document.getElementById('contact-subject');
        const messageEl = document.getElementById('contact-message');
        
        if (!subjectEl || !messageEl) return;
        
        let subject = '';
        let message = '';
        
        if (presetType === 'internship') {
            subject = 'BSCS Internship Opportunity';
            message = `Hi Christian,\n\nWe are looking for a Computer Science intern with software development and database management skills. We loved looking at your POS and SmartQueue projects!\n\nLet's coordinate a schedule to talk.`;
        } else if (presetType === 'collab') {
            subject = 'Software System Collaboration Proposal';
            message = `Hi Christian,\n\nI have a project idea and would love to collaborate with you. Let me know if you are open to discuss web apps or GUI integrations!`;
        } else if (presetType === 'hello') {
            subject = 'Saying Hello!';
            message = `Hi Christian,\n\nJust stumbled upon your beautiful MVC Portfolio website. Great design! Wishing you all the best with your BSCS degree. Let's stay in touch!`;
        }

        this.contactPresetButtons.forEach(btn => {
            const cardPreset = btn.getAttribute('data-preset');
            if (cardPreset === presetType) {
                btn.classList.add('border-accent', 'bg-accent/5');
                btn.classList.remove('border-border', 'border-border');
            } else {
                btn.classList.remove('border-accent', 'bg-accent/5');
                btn.classList.add('border-border', 'border-border');
            }
        });

        subjectEl.value = subject;
        
        messageEl.value = '';
        let index = 0;
        clearInterval(this.typingInterval);
        
        this._playSFX('success');
        
        this.typingInterval = setInterval(() => {
            if (index < message.length) {
                messageEl.value += message[index];
                index++;
                if (index % 4 === 0) {
                    this._playSFX('hover');
                }
            } else {
                clearInterval(this.typingInterval);
                this._rebuildGmailLink(profile.email);
            }
        }, 12);
    }

    scrollToSection(targetId) {
        this._playSFX('click');
        
        if (targetId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // --- CONTROLLER BINDINGS ---

    bindSfxToggle(handler) {
        if (this.sfxToggleBtn) {
            this.sfxToggleBtn.addEventListener('click', handler);
        }
    }

    bindMobileMenuToggle(handler) {
        if (this.menuToggleBtn) {
            this.menuToggleBtn.addEventListener('click', () => {
                const willOpen = this.mobileMenu.classList.contains('hidden');
                handler(willOpen);
            });
        }
    }

    bindMobileNavClick(handler) {
        this.mobileNavButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.getAttribute('data-target');
                handler(target);
            });
        });
    }

    bindDesktopNavClick(handler) {
        const sections = ['about', 'skills', 'projects', 'certifications', 'contact'];
        this.desktopNavButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                handler(sections[index]);
            });
        });
    }

    bindLogoClick(handler) {
        const logoBtn = document.querySelector('header nav button');
        if (logoBtn) {
            logoBtn.addEventListener('click', () => handler('top'));
        }
    }

    bindScrollDownClick(handler) {
        if (this.scrollDownBtn) {
            this.scrollDownBtn.addEventListener('click', () => handler('about'));
        }
    }

    bindHeroCTAViewProjects(handler) {
        if (this.heroCTAButtons.length >= 1) {
            this.heroCTAButtons[0].addEventListener('click', () => handler('projects'));
        }
    }

    bindHeroCTAContactMe(handler) {
        if (this.heroCTAButtons.length >= 2) {
            this.heroCTAButtons[1].addEventListener('click', () => handler('contact'));
        }
    }

    bindSkillsFilter(handler) {
        this.skillsFilterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                handler(category);
            });
        });
    }

    bindCertsFilter(handler) {
        this.certsFilterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                const searchVal = this.certsSearchInput ? this.certsSearchInput.value.toLowerCase().trim() : '';
                handler(category, searchVal);
            });
        });

        if (this.certsSearchInput) {
            this.certsSearchInput.addEventListener('input', (e) => {
                const searchVal = e.target.value.toLowerCase().trim();
                const activeBtn = document.querySelector('.certs-filter-btn.bg-accent, .certs-filter-btn.dark\\:bg-accent');
                const activeCat = activeBtn ? activeBtn.getAttribute('data-category') : 'All';
                handler(activeCat, searchVal);
            });
        }
    }

    bindCertsViewAll(handler) {
        if (this.certsViewAllBtn) {
            this.certsViewAllBtn.addEventListener('click', () => {
                handler();
            });
        }
    }

    bindContactPreset(handler) {
        this.contactPresetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const preset = btn.getAttribute('data-preset');
                handler(preset);
            });
        });
    }

    bindScrollSectionActive(handler) {
        const sections = [...document.querySelectorAll('section[id]')];
        let activeSection = '';

        const updateActiveSection = () => {
            const viewportTarget = window.scrollY + (window.innerHeight * 0.35);
            const currentSection = sections.reduce((current, section) => (
                section.offsetTop <= viewportTarget ? section : current
            ), sections[0]);

            if (currentSection && currentSection.id !== activeSection) {
                activeSection = currentSection.id;
                handler(activeSection);
            }
        };

        window.addEventListener('scroll', updateActiveSection, { passive: true });
        window.addEventListener('resize', updateActiveSection);
        updateActiveSection();
    }

    // --- DOM PRESENTATION-LAYER DETAILS ---

    _initScrollHeaderBehavior() {
        if (!this.header) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                this.header.classList.remove('bg-transparent', 'py-5');
                this.header.classList.add('bg-bg/90', 'bg-bg/90', 'backdrop-blur-sm', 'border-b', 'border-border', 'border-border', 'py-3');
            } else {
                this.header.classList.add('bg-transparent', 'py-5');
                this.header.classList.remove('bg-bg/90', 'bg-bg/90', 'backdrop-blur-sm', 'border-b', 'border-border', 'border-border', 'py-3');
            }
        });
    }

    _initScrollRevealBehavior() {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.dataset.delay || 0;
                    
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, delay);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: "0px 0px -30px 0px"
        });

        // Animate sections on scroll
        document.querySelectorAll('section[data-animate]').forEach((section) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            revealObserver.observe(section);
        });

        // Animate cards with subtle stagger
        document.querySelectorAll('[data-animate-card]').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            card.dataset.delay = String(index * 60);
            revealObserver.observe(card);
        });
    }

    _initCertsViewAll() {
        this.showAllCerts = false;
        
        if (this.certsViewAllBtn) {
            this.certsViewAllBtn.addEventListener('click', () => {
                this.showAllCerts = !this.showAllCerts;
                
                const activeBtn = document.querySelector('.certs-filter-btn.bg-surface-light');
                const activeCat = activeBtn ? activeBtn.getAttribute('data-category') : 'All';
                const searchVal = this.certsSearchInput ? this.certsSearchInput.value.toLowerCase().trim() : '';
                
                this.updateCertsFilter(activeCat, searchVal);
            });
        }
    }

    _initScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }, { passive: true });
    }

    _initTextReveal() {
        const headings = document.querySelectorAll('section h2');
        headings.forEach(heading => {
            const text = heading.textContent;
            heading.innerHTML = '';
            heading.classList.add('text-reveal');
            
            const inner = document.createElement('span');
            inner.classList.add('text-reveal-inner');
            inner.textContent = text;
            heading.appendChild(inner);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.text-reveal').forEach(el => observer.observe(el));
    }

    _initTiltCards() {
        if (window.innerWidth < 768) return;

        const cards = document.querySelectorAll('.tilt-card');
        cards.forEach(card => {
            const inner = card.querySelector('.tilt-card-inner') || card;
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -5;
                const rotateY = (x - centerX) / centerX * 5;
                
                inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    _initParallax() {
        if (window.innerWidth < 768) return;

        const parallaxElements = document.querySelectorAll('.parallax-bg');
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            parallaxElements.forEach(el => {
                const speed = 0.3;
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }, { passive: true });
    }

    _initUniversityModal() {
        const modal = document.getElementById('university-modal');
        const yesBtn = document.getElementById('modal-yes');
        const noBtn = document.getElementById('modal-no');
        const universityCard = document.querySelector('[data-university="true"]');

        if (!modal || !yesBtn || !noBtn || !universityCard) return;

        universityCard.addEventListener('click', () => {
            modal.classList.add('active');
        });

        yesBtn.addEventListener('click', () => {
            window.open('https://www.cvsu-imus.edu.ph/', '_blank');
            modal.classList.remove('active');
        });

        noBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    _initTerminalTabs() {
        this.terminalTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetTab = e.currentTarget;
                const tabName = targetTab.getAttribute('data-tab');
                
                this.terminalTabs.forEach(t => {
                    t.classList.remove('border-b-2', 'border-accent', 'text-gray-200');
                    t.classList.add('text-gray-500');
                });
                
                targetTab.classList.add('border-b-2', 'border-accent', 'text-gray-200');
                targetTab.classList.remove('text-gray-500');
                
                const codePanels = document.querySelectorAll('.terminal-code-panel');
                codePanels.forEach(panel => {
                    if (panel.id === `code-${tabName}`) {
                        panel.classList.remove('hidden');
                    } else {
                        panel.classList.add('hidden');
                    }
                });
                
                this._playSFX('click');
            });
        });
    }

    _initProjectTabs() {
        const tabButtons = document.querySelectorAll('.project-tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetBtn = e.currentTarget;
                const previewSrc = targetBtn.getAttribute('data-preview');
                const projectKey = targetBtn.getAttribute('data-project');
                
                const imgEl = document.getElementById(`preview-${projectKey}`);
                if (imgEl) {
                    imgEl.src = previewSrc;
                }
                
                const siblingBtns = document.querySelectorAll(`.project-tab-btn[data-project="${projectKey}"]`);
                siblingBtns.forEach(b => {
                    b.classList.remove('bg-surface-light', 'text-text');
                    b.classList.add('bg-border-light', 'bg-surface', 'text-text-secondary', 'text-text-secondary');
                });
                
                targetBtn.classList.add('bg-surface-light', 'text-text');
                targetBtn.classList.remove('bg-border-light', 'bg-surface', 'text-text-secondary', 'text-text-secondary');
                
                this._playSFX('click');
            });
        });
    }

    _initAudioTriggers() {
        const interactiveElements = document.querySelectorAll('button, a, .card-hover, .contact-preset-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (el !== this.sfxToggleBtn) {
                    this._playSFX('hover');
                }
            });
            el.addEventListener('click', () => {
                if (el !== this.sfxToggleBtn) {
                    this._playSFX('click');
                }
            });
        });

        const subjectEl = document.getElementById('contact-subject');
        const messageEl = document.getElementById('contact-message');
        if (subjectEl && messageEl) {
            const formChangeHandler = () => {
                const emailBtn = document.getElementById('contact-send-btn');
                if (emailBtn) {
                    const recipient = emailBtn.getAttribute('data-email');
                    this._rebuildGmailLink(recipient);
                }
            };
            subjectEl.addEventListener('input', formChangeHandler);
            messageEl.addEventListener('input', formChangeHandler);
        }
    }

    _rebuildGmailLink(emailAddress) {
        const subjectEl = document.getElementById('contact-subject');
        const messageEl = document.getElementById('contact-message');
        if (!subjectEl || !messageEl || !this.contactSendBtn) return;
        
        const subject = encodeURIComponent(subjectEl.value);
        const body = encodeURIComponent(messageEl.value);
        this.contactSendBtn.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${subject}&body=${body}`;
    }

    _playSFX(type) {
        if (!this.sfxEnabled) return;
        
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            
            if (!this.audioCtx) {
                this.audioCtx = new AudioContext();
            }
            
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }

            const ctx = this.audioCtx;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            if (type === 'hover') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(950, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1250, ctx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.008, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
                osc.start();
                osc.stop(ctx.currentTime + 0.05);
            } else if (type === 'click') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(550, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.12);
                gain.gain.setValueAtTime(0.04, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.12);
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } else if (type === 'success') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, ctx.currentTime);
                osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.06);
                osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.12);
                osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.22);
                gain.gain.setValueAtTime(0.02, ctx.currentTime);
                gain.gain.setValueAtTime(0.025, ctx.currentTime + 0.06);
                gain.gain.setValueAtTime(0.03, ctx.currentTime + 0.12);
                gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.28);
                osc.start();
                osc.stop(ctx.currentTime + 0.28);
            } else if (type === 'toggle') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(320, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.15);
                gain.gain.setValueAtTime(0.015, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                osc.start();
                osc.stop(ctx.currentTime + 0.15);
            }
        } catch (err) {
            console.warn('Synthesizer blocked or unsupported', err);
        }
    }

    _initGradientMesh() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        const mouse = { x: width / 2, y: height / 2 };
        const target = { x: width / 2, y: height / 2 };
        const isMobile = width < 768;
        const orbRadius = isMobile ? 200 : 350;
        const opacity = isMobile ? 0.08 : 0.12;
        
        const animate = () => {
            mouse.x += (target.x - mouse.x) * 0.05;
            mouse.y += (target.y - mouse.y) * 0.05;
            
            ctx.clearRect(0, 0, width, height);
            
            const gradient = ctx.createRadialGradient(
                mouse.x, mouse.y, 0,
                mouse.x, mouse.y, orbRadius
            );
            gradient.addColorStop(0, `rgba(201, 162, 39, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(201, 162, 39, ${opacity * 0.4})`);
            gradient.addColorStop(1, 'rgba(201, 162, 39, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        window.addEventListener('mousemove', (e) => {
            target.x = e.clientX;
            target.y = e.clientY;
        });
        
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                target.x = e.touches[0].clientX;
                target.y = e.touches[0].clientY;
            }
        }, { passive: true });
        
        window.addEventListener('touchend', () => {
            target.x = width / 2;
            target.y = height / 2;
        });
        
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }

    // --- TEMPLATE GENERATORS ---

    _createHeaderHTML(profile) {
        return `
        <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-5 font-sans">
            <nav class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between relative">
                <button class="flex items-center gap-3 group select-none">
                    <img src="pic/website logo.png" alt="CJGR Logo" class="w-10 h-10 object-contain transition-all duration-300 group-hover:brightness-125" style="filter: sepia(100%) saturate(500%) hue-rotate(5deg) brightness(0.9);">
                    <div class="hidden sm:block">
                        <p class="font-serif font-bold text-lg tracking-tight text-primary leading-none">CJGR</p>
                        <p class="text-[9px] font-medium text-accent uppercase tracking-[0.2em] leading-none mt-1">Portfolio</p>
                    </div>
                </button>
                
                <div class="hidden md:block">
                    <ul class="flex items-center gap-8">
                        <li><button class="text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200">About</button></li>
                        <li><button class="text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200">Skills</button></li>
                        <li><button class="text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200">Projects</button></li>
                        <li><button class="text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200">Certifications</button></li>
                        <li><button class="text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200">Contact</button></li>
                    </ul>
                </div>
                
                <div class="flex items-center gap-3">
                    <button aria-label="Toggle audio effects" class="p-2 rounded text-text-secondary hover:text-accent transition-colors duration-200 h-9 w-9 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x" aria-hidden="true">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="22" y1="9" x2="16" y2="15"></line><line x1="16" y1="9" x2="22" y2="15"></line>
                        </svg>
                    </button>
                    
                    <button class="md:hidden p-2 rounded text-text-secondary hover:text-accent transition-colors duration-200" aria-label="Toggle menu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu" aria-hidden="true">
                            <path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path>
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
        `;
    }

    _createMobileMenuHTML(profile) {
        return `
        <div id="mobile-menu" class="hidden fixed inset-0 top-16 z-40 bg-bg/95/95 backdrop-blur-sm md:hidden transition-all duration-300 border-b border-border">
            <nav class="flex flex-col p-6 gap-3 font-sans">
                <button data-target="about" class="mobile-nav-btn text-left py-3 text-lg font-medium text-text-secondary hover:text-accent transition-all duration-200">About</button>
                <button data-target="skills" class="mobile-nav-btn text-left py-3 text-lg font-medium text-text-secondary hover:text-accent transition-all duration-200">Skills</button>
                <button data-target="projects" class="mobile-nav-btn text-left py-3 text-lg font-medium text-text-secondary hover:text-accent transition-all duration-200">Projects</button>
                <button data-target="certifications" class="mobile-nav-btn text-left py-3 text-lg font-medium text-text-secondary hover:text-accent transition-all duration-200">Certifications</button>
                <button data-target="contact" class="mobile-nav-btn text-left py-3 text-lg font-medium text-text-secondary hover:text-accent transition-all duration-200">Contact</button>
            </nav>
        </div>
        `;
    }

    _createHeroHTML(profile) {
        const statsHTML = profile.stats.map((s) => {
            return `
            <div class="px-6 py-4 border border-border bg-surface text-center flex-1 min-w-[120px] cursor-default">
                <p class="text-3xl sm:text-4xl font-serif font-bold text-accent">${s.value}</p>
                <p class="text-[10px] text-text-secondary mt-1 font-medium uppercase tracking-widest">${s.label}</p>
            </div>
        `}).join('');

        return `
        <section class="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden z-10 pt-20">
            <div class="absolute inset-0 parallax-container pointer-events-none">
                <div class="parallax-bg absolute inset-0 opacity-5">
                    <div class="absolute top-20 left-10 w-64 h-64 border border-accent/20 rotate-45"></div>
                    <div class="absolute bottom-40 right-20 w-48 h-48 border border-accent/20 rotate-12"></div>
                    <div class="absolute top-1/2 left-1/3 w-32 h-32 border border-accent/20 -rotate-12"></div>
                </div>
            </div>
            <div class="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-16 items-center">
                
                <div class="lg:col-span-7 space-y-8 text-left">
                    <div class="space-y-2">
                        <p class="text-sm font-medium text-accent uppercase tracking-widest hero-animate hero-animate-delay-1">Portfolio</p>
                        <h1 class="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight leading-[1.1] text-primary hero-animate hero-animate-delay-2">
                            ${profile.firstName}
                        </h1>
                        <h2 class="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight leading-[1.1] text-primary hero-animate hero-animate-delay-3">
                            ${profile.lastName}
                        </h2>
                    </div>
                    
                    <p class="text-lg text-text-secondary font-medium leading-relaxed max-w-xl hero-animate hero-animate-delay-4">
                        ${profile.title}
                    </p>
                    
                    <p class="text-base text-text-secondary leading-relaxed max-w-xl hero-animate hero-animate-delay-4">
                        ${profile.description}
                    </p>
                    
                    <div class="flex flex-wrap gap-4 pt-2 hero-animate hero-animate-delay-5">
                        <button class="inline-flex items-center gap-2 px-6 py-3 bg-surface-light text-text font-medium text-sm hover:bg-accent hover:text-white transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-terminal"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                            View Projects
                        </button>
                        
                        <button class="inline-flex items-center gap-2 px-6 py-3 border border-border text-text font-medium text-sm hover:bg-accent hover:text-white transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.99 5.7a1.94 1.94 0 0 1-2.02 0L2 7"></path></svg>
                            Contact Me
                        </button>
                        
                        <a href="${profile.resumeUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-secondary font-medium text-sm hover:border-accent hover:text-accent transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-down"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M12 18v-6"></path><path d="m9 15 3 3 3-3"></path></svg>
                            Resume
                        </a>
                    </div>
                </div>

                <div class="lg:col-span-5 w-full max-w-lg mx-auto">
                    <div class="w-full border border-border bg-surface overflow-hidden">
                        <div class="bg-surface-light px-4 py-3 flex items-center justify-between">
                            <div class="flex items-center gap-1.5 select-none">
                                <span class="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                                <span class="w-3 h-3 rounded-full bg-[#eab308]"></span>
                                <span class="w-3 h-3 rounded-full bg-[#22c55e]"></span>
                            </div>
                            
                            <div class="flex gap-2">
                                <button data-tab="profile" class="terminal-tab px-3 py-1 text-[10px] font-bold font-mono transition-all duration-200 bg-gray-700 text-gray-200 flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>portfolio.sh
                                </button>
                                <button data-tab="logs" class="terminal-tab px-3 py-1 text-[10px] font-bold font-mono transition-all duration-200 text-gray-400 hover:text-gray-200 flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>system.log
                                </button>
                                <button data-tab="json" class="terminal-tab px-3 py-1 text-[10px] font-bold font-mono transition-all duration-200 text-gray-400 hover:text-gray-200 flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>cv.json
                                </button>
                            </div>
                        </div>

                        <div class="p-6 h-[260px] overflow-y-auto font-mono text-[10px] sm:text-xs leading-relaxed text-gray-400 bg-gray-900">
                            
                            <div id="code-profile" class="terminal-code-panel space-y-3">
                                <div>
                                    <span class="text-gray-500">guest@cvsu-imus:~$</span> <span class="text-accent">./view-skills.sh</span>
                                </div>
                                <div class="text-gray-600 text-[10px]">[INFO] Fetching skill matrix... Success.</div>
                                <div class="space-y-1.5 text-gray-400 pl-4 border-l border-gray-700">
                                    <p><span class="text-gray-200 font-bold">Programming:</span> Java, Python, C++, JavaScript, TypeScript</p>
                                    <p><span class="text-gray-200 font-bold">Web Stack:</span> HTML, CSS, PHP, Next.js, Node.js</p>
                                    <p><span class="text-gray-200 font-bold">Databases:</span> MySQL, SQLite, Prisma ORM, JSON</p>
                                    <p><span class="text-gray-200 font-bold">Frameworks:</span> Java Swing, Tkinter, Botpress, Chart.js</p>
                                </div>
                                <div>
                                    <span class="text-gray-500">guest@cvsu-imus:~$</span> <span class="console-cursor border-r border-gray-400 pr-[1px] font-bold"></span>
                                </div>
                            </div>

                            <div id="code-logs" class="terminal-code-panel space-y-1 text-gray-400 hidden">
                                <p class="text-green-500">[2026-05-29] Booting portfolio system v3.1...</p>
                                <p>[INFO] Instantiating MVC Pattern Controllers...</p>
                                <p>[INFO] Hydrating data model from config files...</p>
                                <p class="text-accent">[INFO] Location: Cavite State University - Imus Campus</p>
                                <p>[INFO] Academic Status: Expected Graduation 2027</p>
                                <p>[INFO] Network status: Connected to CvSU Campus Wifi</p>
                                <p class="text-yellow-500">[WARN] Intern status: Open for internships & projects.</p>
                                <p class="text-gray-500">[DEBUG] Audio Synthesis context: Active & Nominal</p>
                                <p class="text-green-500">[SUCCESS] Redesign complete. Portfolio is fully active.</p>
                            </div>

                            <div id="code-json" class="terminal-code-panel text-gray-400 hidden">
<pre class="text-gray-300">{
  <span class="text-accent">"developer"</span>: "${profile.fullName}",
  <span class="text-accent">"education"</span>: {
    <span class="text-accent">"university"</span>: "Cavite State University",
    <span class="text-accent">"degree"</span>: "BS Computer Science"
  },
  <span class="text-accent">"tech_stack"</span>: [
    "Next.js 16", "TypeScript", "Prisma ORM",
    "Node.js", "SQLite", "Java", "Python"
  ],
  <span class="text-accent">"active_interests"</span>: [
    "Software Systems", "Web Apps",
    "Database Architectures", "Cybersecurity"
  ],
  <span class="text-accent">"open_to_work"</span>: <span class="text-green-400">true</span>
}</pre>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div class="max-w-6xl mx-auto w-full flex flex-wrap gap-4 sm:gap-6 mt-16 pt-10 border-t border-border font-sans">
                ${statsHTML}
            </div>


        </section>
        `;
    }

    _createAboutHTML(about) {
        const paragraphsHTML = about.paragraphs.map(p => `<p class="leading-relaxed">${p}</p>`).join('');
        
        const widgetsHTML = about.widgets.map(w => {
            if (w.type === 'interests') {
                const tagsHTML = w.value.map(tag => `
                    <span class="px-3 py-1.5 text-xs font-medium border border-border text-text-secondary">${tag}</span>
                `).join('');
                return `
                <div class="border border-border p-6 bg-surface about-widget">
                    <p class="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-3">${w.label}</p>
                    <div class="flex flex-wrap gap-2">
                        ${tagsHTML}
                    </div>
                </div>
                `;
            } else {
                const isUniversity = w.label === 'University';
                return `
                <div class="border border-border p-6 bg-surface flex items-start gap-4 about-widget" ${isUniversity ? 'data-university="true"' : ''}>
                    <div class="mt-0.5 text-accent">
                        ${w.icon}
                    </div>
                    <div>
                        <p class="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">${w.label}</p>
                        <p class="font-medium text-primary text-sm leading-snug">${w.value}</p>
                    </div>
                </div>
                `;
            }
        }).join('');

        return `
        <section id="about" class="py-24 px-6 scroll-mt-20" data-animate>
            <div class="max-w-5xl mx-auto">
                <div class="text-left mb-12">
                    <p class="text-xs font-bold text-accent uppercase tracking-widest mb-3">About</p>
                    <h2 class="text-3xl sm:text-4xl font-serif font-bold tracking-tight leading-tight text-primary">Student Profile</h2>
                </div>
                
                <div class="grid md:grid-cols-12 gap-12 items-start">
                    <div class="md:col-span-4 flex justify-center md:justify-start">
                        <div class="relative">
                            <div class="absolute -top-2 -left-2 w-20 h-20 border-t-2 border-l-2 border-accent"></div>
                            <div class="absolute -bottom-2 -right-2 w-20 h-20 border-b-2 border-r-2 border-accent"></div>
                            <div class="w-48 h-48 md:w-56 md:h-56 border border-border overflow-hidden relative z-10">
                                <img src="ProfilePicture/profilepic.png" alt="Christian Jae Remulla" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                    
                    <div class="md:col-span-8 space-y-6 text-text-secondary text-base leading-relaxed">
                        ${paragraphsHTML}
                    </div>
                </div>
                
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                    ${widgetsHTML}
                </div>
            </div>
        </section>
        `;
    }

    _createSkillsHTML(skills) {
        const tabs = ["All", "Programming", "Web", "Databases", "Frameworks", "Tools", "Concepts"];
        const filterTabsHTML = tabs.map(t => {
            const isAll = t === "All";
            const btnClass = isAll 
                ? "bg-surface-light text-text" 
                : "bg-border-light text-text-secondary border border-border";
            return `<button data-category="${t}" class="skills-filter-btn px-4 py-2 text-xs font-medium transition-colors duration-200 ${btnClass}">${t}</button>`;
        }).join('');

        const categoriesHTML = skills.map(cat => {
            const tagsHTML = cat.items.map(item => `
                <span class="px-2.5 py-1.5 text-xs font-medium border border-border text-text-secondary">${item}</span>
            `).join('');

            return `
            <div data-category="${cat.category}" class="skill-category-card border border-border bg-surface p-6 transition-all duration-300">
                <div class="mb-5">
                    <h3 class="font-serif font-bold text-sm text-primary tracking-wide">${cat.category}</h3>
                </div>
                <div class="flex flex-wrap gap-2.5">
                    ${tagsHTML}
                </div>
            </div>
            `;
        }).join('');

        return `
        <section id="skills" class="py-24 px-6 scroll-mt-20" data-animate>
            <div class="max-w-5xl mx-auto">
                
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div class="text-left">
                        <p class="text-xs font-bold text-accent uppercase tracking-widest mb-3">Skills</p>
                        <h2 class="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-primary">Capabilities Matrix</h2>
                    </div>
                    
                    <div class="flex flex-wrap gap-2">
                        ${filterTabsHTML}
                    </div>
                </div>
                
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${categoriesHTML}
                </div>
            </div>
        </section>
        `;
    }

    _createProjectsHTML(projects) {
        const cardsHTML = projects.map(proj => {
            const bulletsHTML = proj.bullets.map(b => `
                <li class="flex items-center gap-2.5 text-xs text-text-secondary leading-snug">
                    <span class="w-1.5 h-1.5 bg-accent flex-shrink-0"></span>
                    ${b}
                </li>
            `).join('');

            const tagsHTML = proj.tags.map(t => `
                <span class="px-2.5 py-1 text-[10px] font-medium border border-border text-text-secondary">${t}</span>
            `).join('');

            let mockUpHTML = "";
            const titleLower = proj.title.toLowerCase();
            
            if (titleLower.includes("dcs-sfms")) {
                mockUpHTML = `
                <div class="border border-border overflow-hidden bg-surface">
                    <div class="bg-surface-light px-4 py-2 flex items-center justify-between">
                        <div class="flex items-center gap-1.5 select-none">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></span>
                        </div>
                        <span class="text-[10px] text-gray-400 font-mono">DCS-SFMS</span>
                    </div>
                    <div class="bg-gray-100 p-0 h-[220px] overflow-hidden flex items-center justify-center">
                        <img id="preview-dcs-sfms" src="pic/DCS-SFMS/landing.png" class="w-full h-full object-cover object-top" alt="DCS-SFMS Landing Page">
                    </div>
                </div>
                `;
            } else if (titleLower.includes("smartqueue")) {
                mockUpHTML = `
                <div class="border border-border overflow-hidden bg-surface">
                    <div class="bg-surface-light px-4 py-2 flex items-center justify-between">
                        <div class="flex items-center gap-1.5 select-none">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></span>
                        </div>
                        <span class="text-[10px] text-gray-400 font-mono">SmartQueue</span>
                    </div>
                    <div class="bg-border-light px-4 py-2 border-b border-border flex flex-wrap gap-1.5 select-none">
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-surface-light text-text"
                                data-preview="pic/SMARTQUEUE/studentdashboard.PNG"
                                data-project="smartqueue">
                            Student Dash
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-border-light text-text-secondary"
                                data-preview="pic/SMARTQUEUE/registrar dashboard.PNG"
                                data-project="smartqueue">
                            Registrar Dash
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-border-light text-text-secondary"
                                data-preview="pic/SMARTQUEUE/chatbot.PNG"
                                data-project="smartqueue">
                            AI Chatbot
                        </button>
                    </div>
                    <div class="bg-gray-100 p-0 h-[220px] overflow-hidden flex items-center justify-center">
                        <img id="preview-smartqueue" src="pic/SMARTQUEUE/studentdashboard.PNG" class="w-full h-full object-cover object-top" alt="SmartQueue Screenshot">
                    </div>
                </div>
                `;
            } else if (titleLower.includes("rentaready")) {
                mockUpHTML = `
                <div class="border border-border overflow-hidden bg-surface">
                    <div class="bg-surface-light px-4 py-2 flex items-center justify-between">
                        <div class="flex items-center gap-1.5 select-none">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></span>
                        </div>
                        <span class="text-[10px] text-gray-400 font-mono">RentaReady</span>
                    </div>
                    <div class="bg-border-light px-4 py-2 border-b border-border flex flex-wrap gap-1.5 select-none">
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-surface-light text-text"
                                data-preview="pic/VEHICLE RENTA/admin dashboard.PNG"
                                data-project="rentaready">
                            Dashboard
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-border-light text-text-secondary"
                                data-preview="pic/VEHICLE RENTA/admin vehicle management.PNG"
                                data-project="rentaready">
                            Vehicles
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-border-light text-text-secondary"
                                data-preview="pic/VEHICLE RENTA/vehicle rental.PNG"
                                data-project="rentaready">
                            Rentals
                        </button>
                    </div>
                    <div class="bg-gray-100 p-0 h-[220px] overflow-hidden flex items-center justify-center">
                        <img id="preview-rentaready" src="pic/VEHICLE RENTA/admin dashboard.PNG" class="w-full h-full object-cover object-top" alt="RentaReady Screenshot">
                    </div>
                </div>
                `;
            } else if (titleLower.includes("cre4my")) {
                mockUpHTML = `
                <div class="border border-border overflow-hidden bg-surface">
                    <div class="bg-surface-light px-4 py-2 flex items-center justify-between">
                        <div class="flex items-center gap-1.5 select-none">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></span>
                        </div>
                        <span class="text-[10px] text-gray-400 font-mono">CRE4MY LATER</span>
                    </div>
                    <div class="bg-border-light px-4 py-2 border-b border-border flex flex-wrap gap-1.5 select-none">
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-surface-light text-text"
                                data-preview="pic/POS/dashboard1.png"
                                data-project="cre4mylater">
                            POS Menu
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-border-light text-text-secondary"
                                data-preview="pic/POS/cart.png"
                                data-project="cre4mylater">
                            POS Cart
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-border-light text-text-secondary"
                                data-preview="pic/POS/inventory.png"
                                data-project="cre4mylater">
                            Inventory
                        </button>
                    </div>
                    <div class="bg-gray-100 p-0 h-[220px] overflow-hidden flex items-center justify-center">
                        <img id="preview-cre4mylater" src="pic/POS/dashboard1.png" class="w-full h-full object-cover object-top" alt="CRE4MY LATER POS Screenshot">
                    </div>
                </div>
                `;
            } else {
                mockUpHTML = `
                <div class="border border-border overflow-hidden bg-surface">
                    <div class="bg-surface-light px-4 py-2 flex items-center justify-between">
                        <div class="flex items-center gap-1.5 select-none">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></span>
                        </div>
                        <span class="text-[10px] text-gray-400 font-mono">TrustFactor</span>
                    </div>
                    <div class="bg-border-light px-4 py-2 border-b border-border flex flex-wrap gap-1.5 select-none">
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-surface-light text-text"
                                data-preview="pic/2FA/sign in.PNG"
                                data-project="trustfactor">
                            Sign In
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-border-light text-text-secondary"
                                data-preview="pic/2FA/google app auth.PNG"
                                data-project="trustfactor">
                            Google Auth
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-border-light text-text-secondary"
                                data-preview="pic/2FA/email auth.PNG"
                                data-project="trustfactor">
                            Email OTP
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 font-bold font-mono bg-border-light text-text-secondary"
                                data-preview="pic/2FA/admin dashboard.PNG"
                                data-project="trustfactor">
                            Admin Panel
                        </button>
                    </div>
                    <div class="bg-gray-100 p-0 h-[220px] overflow-hidden flex items-center justify-center">
                        <img id="preview-trustfactor" src="pic/2FA/sign in.PNG" class="w-full h-full object-cover object-top" alt="TrustFactor Screenshot">
                    </div>
                </div>
                `;
            }

            return `
            <article class="border border-border bg-surface overflow-hidden transition-all duration-300 flex flex-col group card-hover tilt-card">
                <div class="h-1 w-full bg-accent"></div>
                
                <div class="p-6 sm:p-8 flex flex-col flex-1">
                    
                    <h3 class="text-2xl font-serif font-bold mb-1.5 text-primary leading-tight">${proj.title}</h3>
                    <p class="text-[10px] text-text-secondary mb-4 font-bold tracking-widest uppercase">${proj.subtitle}</p>
                    
                    <p class="text-sm text-text-secondary leading-relaxed mb-6">
                        ${proj.description}
                    </p>
                    
                    <div class="w-full mb-6">
                        ${mockUpHTML}
                    </div>
                    
                    <ul class="mb-6 space-y-2">
                        ${bulletsHTML}
                    </ul>
                    
                    <div class="flex flex-wrap gap-2 mb-6 select-none">
                        ${tagsHTML}
                    </div>
                    
                    <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 justify-center px-5 py-3 bg-surface-light text-text font-medium text-sm transition-colors duration-200 hover:bg-accent hover:text-white mt-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                        View Code
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right opacity-60"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                    </a>
                </div>
            </article>
            `;
        }).join('');

        return `
        <section id="projects" class="py-24 px-6 scroll-mt-20" data-animate>
            <div class="max-w-5xl mx-auto">
                <div class="text-left mb-12">
                    <p class="text-xs font-bold text-accent uppercase tracking-widest mb-3">Projects</p>
                    <h2 class="text-3xl sm:text-4xl font-serif font-bold tracking-tight leading-tight text-primary">Featured Projects</h2>
                </div>
                
                <div class="grid md:grid-cols-2 gap-8">
                    ${cardsHTML}
                </div>
            </div>
        </section>
        `;
    }

    _createCertificationsHTML(certs) {
        const categories = ["All", "Cisco NetAcad", "ISC2", "AWS Academy", "Data Analytics Philippines", "Cavite State University"];
        const filterBtnsHTML = categories.map(cat => {
            const isAll = cat === "All";
            const btnClass = isAll 
                ? "bg-surface-light text-text" 
                : "bg-border-light text-text-secondary";
            return `<button data-category="${cat}" class="certs-filter-btn px-4 py-2 text-xs font-medium transition-colors duration-200 ${btnClass}">${cat}</button>`;
        }).join('');

        const certsHTML = certs.map((c, index) => `
        <div data-title="${c.title}" data-issuer="${c.issuer}" class="cert-card-wrapper flex flex-col justify-between border border-border bg-surface p-6 transition-all duration-300 ${index >= 8 ? 'hidden' : ''}">
            <div>
                <p class="font-serif font-bold text-sm text-primary leading-snug">${c.title}</p>
                <p class="text-xs text-text-secondary mt-2 font-mono font-bold uppercase tracking-widest">${c.issuer}</p>
            </div>
            <a href="${c.file}" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></svg>
                View Certificate
            </a>
        </div>
        `).join('');

        const showMore = certs.length > 8;

        return `
        <section id="certifications" class="py-24 px-6 scroll-mt-20" data-animate>
            <div class="max-w-5xl mx-auto">
                
                <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                    <div class="text-left">
                        <p class="text-xs font-bold text-accent uppercase tracking-widest mb-3">Certifications</p>
                        <h2 class="text-3xl sm:text-4xl font-serif font-bold tracking-tight leading-tight text-primary">Accreditation Deck</h2>
                    </div>
                    
                    <div class="flex flex-wrap items-center gap-4">
                        <div class="relative w-full sm:w-48">
                            <input type="text" id="certs-search" placeholder="Search certs..." class="w-full pl-8 pr-3.5 py-2 text-xs bg-bg text-text border border-border focus:outline-none focus:border-accent transition-colors" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                        
                        <div class="flex flex-wrap gap-1.5">
                            ${filterBtnsHTML}
                        </div>
                    </div>
                </div>
                
                <div id="certs-grid" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    ${certsHTML}
                </div>
                
                ${showMore ? `
                <div class="mt-8 text-center">
                    <button id="certs-view-all" class="px-6 py-3 border border-border text-text-secondary text-sm font-medium hover:border-accent hover:text-accent transition-colors duration-200">
                        View All Certifications
                    </button>
                </div>
                ` : ''}
            </div>
        </section>
        `;
    }

    _createContactHTML(profile) {
        return `
        <section id="contact" class="py-24 px-6 scroll-mt-20" data-animate>
            <div class="max-w-5xl mx-auto">
                <div class="text-center mb-12">
                    <p class="text-xs font-bold text-accent uppercase tracking-widest mb-3">Contact</p>
                    <h2 class="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-primary">Get In Touch</h2>
                    <p class="text-text-secondary mt-4 max-w-lg mx-auto">
                        I'm currently seeking internship opportunities and entry-level software development roles. Select a template preset or drop your message below to connect!
                    </p>
                </div>
                
                <div class="grid lg:grid-cols-12 gap-8 items-start">
                    
                    <div class="lg:col-span-4 space-y-4">
                        <p class="text-xs font-mono font-bold text-accent uppercase tracking-widest pl-1 mb-2 select-none">Quick Template Presets</p>
                        
                        <div data-preset="internship" class="contact-preset-card border border-border bg-surface p-4 transition-all duration-300 cursor-pointer select-none">
                            <div>
                                <p class="font-medium text-primary text-sm">Internship Offer</p>
                                <p class="text-[10px] text-text-secondary mt-1 leading-relaxed">BSCS student internship coordinator draft.</p>
                            </div>
                        </div>

                        <div data-preset="collab" class="contact-preset-card border border-border bg-surface p-4 transition-all duration-300 cursor-pointer select-none">
                            <div>
                                <p class="font-medium text-primary text-sm">System Collaboration</p>
                                <p class="text-[10px] text-text-secondary mt-1 leading-relaxed">Collaborate on a software/web system.</p>
                            </div>
                        </div>

                        <div data-preset="hello" class="contact-preset-card border border-border bg-surface p-4 transition-all duration-300 cursor-pointer select-none">
                            <div>
                                <p class="font-medium text-primary text-sm">Say Hello!</p>
                                <p class="text-[10px] text-text-secondary mt-1 leading-relaxed">General connection or nice comments.</p>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-8">
                        <div class="border border-border bg-surface p-6 sm:p-8 space-y-6">
                            
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-2">From Name (Optional)</label>
                                    <input type="text" placeholder="Your Name" class="w-full px-4 py-3 bg-bg text-text border border-border focus:outline-none focus:border-accent transition-colors" />
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-2">Subject Theme</label>
                                    <input type="text" id="contact-subject" placeholder="What are we building?" class="w-full px-4 py-3 bg-bg text-text border border-border focus:outline-none focus:border-accent transition-colors" />
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-2">Mail Transmission Content</label>
                                <textarea id="contact-message" rows="5" placeholder="Dear Christian, let's discuss..." class="w-full px-4 py-3 bg-bg text-text border border-border focus:outline-none focus:border-accent transition-colors leading-relaxed"></textarea>
                            </div>
                            
                            <a id="contact-send-btn" href="${profile.socials.email}" data-email="${profile.email}" class="inline-flex w-full items-center gap-2 justify-center px-6 py-4 bg-surface-light text-text font-medium transition-colors duration-200 hover:bg-accent hover:text-white text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                                Launch Mail Client
                            </a>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap justify-center gap-8 sm:gap-14 mt-16 select-none">
                    <a href="${profile.socials.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="flex flex-col items-center gap-2 group">
                        <div class="w-14 h-14 border border-border bg-surface flex items-center justify-center text-text-secondary group-hover:border-accent group-hover:text-accent transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                        </div>
                        <span class="text-xs font-medium text-text-secondary group-hover:text-accent transition-colors">GitHub</span>
                    </a>
                    
                    <a href="${profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="flex flex-col items-center gap-2 group">
                        <div class="w-14 h-14 border border-border bg-surface flex items-center justify-center text-text-secondary group-hover:border-accent group-hover:text-accent transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </div>
                        <span class="text-xs font-medium text-text-secondary group-hover:text-accent transition-colors">LinkedIn</span>
                    </a>
                    
                    <a href="${profile.socials.email}" target="_blank" rel="noopener noreferrer" aria-label="Email" class="flex flex-col items-center gap-2 group">
                        <div class="w-14 h-14 border border-border bg-surface flex items-center justify-center text-text-secondary group-hover:border-accent group-hover:text-accent transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.99 5.7a1.94 1.94 0 0 1-2.02 0L2 7"></path></svg>
                        </div>
                        <span class="text-xs font-medium text-text-secondary group-hover:text-accent transition-colors">Email</span>
                    </a>
                </div>

            </div>
        </section>
        `;
    }

    _createFooterHTML(profile) {
        return `
        <footer class="border-t border-border py-10 px-6 select-none">
            <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
                <p>&copy; 2026 ${profile.fullName} &middot; Cavite State University</p>
                <div class="flex items-center gap-1.5 font-mono">
                    <span class="w-2 h-2 bg-accent"></span>
                    <p>Architecture: Pure JS MVC Module</p>
                </div>
            </div>
        </footer>
        `;
    }
}
