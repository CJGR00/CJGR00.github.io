/**
 * PortfolioView Class - UI/UX Pro Max Edition
 * Handles highly aesthetic HTML generation, glassmorphic layout compiling,
 * interactive CSS device mockups, dynamic filters, sliding nav indicator,
 * and high-fidelity synthesizer-based audio effects (SFX).
 */
export class PortfolioView {
    constructor() {
        this.appContainer = document.getElementById('app');
        
        // Cache object elements
        this.header = null;
        this.htmlEl = document.documentElement;
        this.darkToggleBtn = null;
        this.sfxToggleBtn = null;
        this.menuToggleBtn = null;
        this.mobileMenu = null;
        this.scrollDownBtn = null;
        
        // Navigation cache
        this.desktopNavButtons = [];
        this.mobileNavButtons = [];
        this.navPillActive = null;
        
        // Interactive Elements Cache
        this.heroCTAButtons = [];
        this.skillsFilterButtons = [];
        this.certsFilterButtons = [];
        this.certsSearchInput = null;
        this.contactPresetButtons = [];
        this.contactSendBtn = null;
        this.terminalTabs = [];
        
        // Internal audio state
        this.sfxEnabled = false;
        
        // Synthesizer Audio Engine Context
        this.audioCtx = null;
    }

    /**
     * Renders the complete "UI/UX Pro Max" structural layout.
     * @param {object} data - Structured portfolio data
     */
    render(data) {
        this.appContainer.innerHTML = `
            <div class="min-h-screen bg-[#020817] text-slate-100 selection:bg-teal-500/30 selection:text-white transition-colors duration-500 relative overflow-x-hidden">
                <!-- Ambient Cosmic Background Blobs (WOW Factor) -->
                <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div class="absolute top-[10%] left-[5%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-gradient-to-tr from-teal-600/10 to-transparent blur-[120px] animate-glow-pulse"></div>
                    <div class="absolute top-[35%] right-[5%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-gradient-to-br from-blue-600/10 to-transparent blur-[110px] animate-glow-pulse [animation-delay:3s]"></div>
                    <div class="absolute bottom-[15%] left-[20%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-gradient-to-tr from-sky-600/8 to-transparent blur-[100px] animate-glow-pulse [animation-delay:6s]"></div>
                </div>
                
                <!-- Background Grid Overlay -->
                <div class="absolute inset-0 cyber-grid opacity-10 pointer-events-none z-0"></div>

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
            </div>
        `;

        // Cache elements and run presentation animations
        this._cacheElements();
        this._initScrollHeaderBehavior();
        this._initScrollRevealBehavior();
        this._initNavPillInteraction();
        this._initTerminalTabs();
        this._initProjectTabs();
        this._initAudioTriggers();
    }

    /**
     * Cache dynamically injected elements for later MVC manipulation
     */
    _cacheElements() {
        this.header = document.querySelector('header');
        this.darkToggleBtn = document.querySelector('button[aria-label="Toggle dark mode"]');
        this.sfxToggleBtn = document.querySelector('button[aria-label="Toggle audio effects"]');
        this.menuToggleBtn = document.querySelector('button[aria-label="Toggle menu"]');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.scrollDownBtn = document.querySelector('button[aria-label="Scroll down"]');
        
        // Nav items
        this.desktopNavButtons = document.querySelectorAll('header nav ul li button');
        this.mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
        this.navPillActive = document.querySelector('.nav-pill-active');
        
        // Actions
        this.heroCTAButtons = document.querySelectorAll('section:first-of-type button, section:first-of-type a');
        
        // Filters & Search
        this.skillsFilterButtons = document.querySelectorAll('.skills-filter-btn');
        this.certsFilterButtons = document.querySelectorAll('.certs-filter-btn');
        this.certsSearchInput = document.getElementById('certs-search');
        
        // Presets & Contact
        this.contactPresetButtons = document.querySelectorAll('.contact-preset-card');
        this.contactSendBtn = document.getElementById('contact-send-btn');
        
        // Terminal elements
        this.terminalTabs = document.querySelectorAll('.terminal-tab');
    }

    /**
     * Updates the DOM state to match the model's theme preference.
     * @param {string} theme - 'dark' | 'light'
     */
    updateTheme(theme) {
        if (theme === 'dark') {
            this.htmlEl.classList.add('dark');
            this.htmlEl.classList.remove('light');
            if (this.darkToggleBtn) {
                this.darkToggleBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun" aria-hidden="true">
                        <circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path>
                        <path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path>
                        <path d="M2 12h2"></path><path d="M20 12h2"></path>
                        <path d="M6.34 17.66l-1.41 1.41"></path><path d="M19.07 4.93l-1.41 1.41"></path>
                    </svg>
                `;
            }
            // Repaint variables in index container
            const container = this.appContainer.querySelector('.min-h-screen');
            if (container) {
                container.classList.add('bg-[#020817]', 'text-slate-100');
                container.classList.remove('bg-slate-50', 'text-slate-900');
            }
        } else {
            this.htmlEl.classList.remove('dark');
            this.htmlEl.classList.add('light');
            if (this.darkToggleBtn) {
                this.darkToggleBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon" aria-hidden="true">
                        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>
                    </svg>
                `;
            }
            const container = this.appContainer.querySelector('.min-h-screen');
            if (container) {
                container.classList.remove('bg-[#020817]', 'text-slate-100');
                container.classList.add('bg-slate-50', 'text-slate-900');
            }
        }
        
        // Trigger a tiny click noise
        this._playSFX('toggle');
    }

    /**
     * Updates SFX Sound Effects status.
     * @param {boolean} enabled 
     */
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
                this.sfxToggleBtn.classList.add('text-teal-500', 'border-teal-500/25', 'bg-teal-500/5');
            } else {
                this.sfxToggleBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x" aria-hidden="true">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="22" y1="9" x2="16" y2="15"></line><line x1="16" y1="9" x2="22" y2="15"></line>
                    </svg>
                `;
                this.sfxToggleBtn.classList.remove('text-teal-500', 'border-teal-500/25', 'bg-teal-500/5');
            }
        }
        this._playSFX('toggle');
    }

    /**
     * Updates mobile menu visibility states.
     * @param {boolean} isOpen 
     */
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

    /**
     * Updates active navigation state styling.
     * @param {string} activeSection 
     */
    updateActiveSection(activeSection) {
        const sections = ['about', 'skills', 'projects', 'certifications', 'contact'];
        
        // Desktop nav highlighting
        this.desktopNavButtons.forEach((btn, index) => {
            const isCurrent = sections[index] === activeSection;
            if (isCurrent) {
                btn.classList.add('text-teal-600', 'dark:text-teal-400');
                btn.classList.remove('text-slate-600', 'dark:text-slate-400', 'text-slate-900', 'dark:text-slate-100');
                
                // Reposition absolute sliding pill
                this._positionNavPill(btn);
            } else {
                btn.classList.remove('text-teal-600', 'dark:text-teal-400');
                btn.classList.add('text-slate-600', 'dark:text-slate-400');
            }
        });

        if (!activeSection || activeSection === 'top') {
            this._hideNavPill();
        }

        // Mobile nav highlighting
        this.mobileNavButtons.forEach(btn => {
            const target = btn.getAttribute('data-target');
            const isCurrent = target === activeSection;
            if (isCurrent) {
                btn.classList.add('text-teal-500', 'dark:text-teal-400', 'border-l-4', 'border-teal-500', 'pl-4');
                btn.classList.remove('text-slate-600', 'dark:text-slate-400');
            } else {
                btn.classList.remove('text-teal-500', 'dark:text-teal-400', 'border-l-4', 'border-teal-500', 'pl-4');
                btn.classList.add('text-slate-600', 'dark:text-slate-400');
            }
        });
    }

    /**
     * Repaint the skills display when category is filtered.
     * @param {string} category - 'All' | 'Programming' | etc.
     */
    updateSkillsFilter(category) {
        // Toggle active states on tabs
        this.skillsFilterButtons.forEach(btn => {
            const val = btn.getAttribute('data-category');
            if (val === category) {
                btn.classList.add('bg-teal-600', 'text-white', 'shadow-lg', 'shadow-teal-500/25');
                btn.classList.remove('bg-slate-100', 'dark:bg-slate-900/50', 'text-slate-600', 'dark:text-slate-400', 'border-slate-200/50', 'dark:border-slate-800/50');
            } else {
                btn.classList.remove('bg-teal-600', 'text-white', 'shadow-lg', 'shadow-teal-500/25');
                btn.classList.add('bg-slate-100', 'dark:bg-slate-900/50', 'text-slate-600', 'dark:text-slate-400', 'border-slate-200/50', 'dark:border-slate-800/50');
            }
        });

        // Filter actual elements dynamically
        const skillCards = document.querySelectorAll('.skill-category-card');
        skillCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (category === 'All' || cardCat.toLowerCase().includes(category.toLowerCase())) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => card.classList.add('hidden'), 200);
            }
        });
        
        this._playSFX('click');
    }

    /**
     * Repaint certifications cards based on active filters and search queries.
     * @param {string} category - 'All' | 'ISC2' | etc.
     * @param {string} searchQuery - term to match
     */
    updateCertsFilter(category, searchQuery = '') {
        // Handle filter buttons highlights
        this.certsFilterButtons.forEach(btn => {
            const val = btn.getAttribute('data-category');
            if (val === category) {
                btn.classList.add('bg-teal-600', 'text-white', 'shadow-lg', 'shadow-teal-500/25');
                btn.classList.remove('bg-slate-100', 'dark:bg-slate-900/50', 'text-slate-600', 'dark:text-slate-400');
            } else {
                btn.classList.remove('bg-teal-600', 'text-white', 'shadow-lg', 'shadow-teal-500/25');
                btn.classList.add('bg-slate-100', 'dark:bg-slate-900/50', 'text-slate-600', 'dark:text-slate-400');
            }
        });

        const certCards = document.querySelectorAll('.cert-card-wrapper');
        certCards.forEach(card => {
            const certTitle = card.getAttribute('data-title').toLowerCase();
            const certIssuer = card.getAttribute('data-issuer').toLowerCase();
            
            const matchesSearch = certTitle.includes(searchQuery) || certIssuer.includes(searchQuery);
            const matchesCategory = category === 'All' || certIssuer.includes(category.toLowerCase()) || (category === 'Essentials' && certTitle.includes('essentials'));

            if (matchesSearch && matchesCategory) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => card.classList.add('hidden'), 200);
            }
        });
    }

    /**
     * Refill contact fields dynamically on Preset click.
     * @param {string} presetType - 'internship' | 'collab' | 'hello'
     * @param {object} profile - contact data
     */
    updateContactPreset(presetType, profile) {
        const subjectEl = document.getElementById('contact-subject');
        const messageEl = document.getElementById('contact-message');
        
        if (!subjectEl || !messageEl) return;
        
        // Define texts
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
            message = `Hi Christian,\n\nJust stumbled upon your beautiful MVC Portfolio website. Great UI/UX design! Wishing you all the best with your BSCS degree. Let's stay in touch!`;
        }

        // Toggle Preset Card Highlights
        this.contactPresetButtons.forEach(btn => {
            const cardPreset = btn.getAttribute('data-preset');
            if (cardPreset === presetType) {
                btn.classList.add('border-teal-500', 'bg-teal-500/10', 'scale-[1.02]');
                btn.classList.remove('border-slate-200/60', 'dark:border-slate-800/60');
            } else {
                btn.classList.remove('border-teal-500', 'bg-teal-500/10', 'scale-[1.02]');
                btn.classList.add('border-slate-200/60', 'dark:border-slate-800/60');
            }
        });

        // Set inputs
        subjectEl.value = subject;
        
        // Simulate organic keyboard typing animation for the message field! (UX PRO MAX SPEC)
        messageEl.value = '';
        let index = 0;
        clearInterval(this.typingInterval);
        
        this._playSFX('success');
        
        this.typingInterval = setInterval(() => {
            if (index < message.length) {
                messageEl.value += message[index];
                index++;
                // Play tiny tick click sound every 4 characters to sound like a keyboard typing
                if (index % 4 === 0) {
                    this._playSFX('hover');
                }
            } else {
                clearInterval(this.typingInterval);
                this._rebuildMailtoLink(profile.email);
            }
        }, 12);
    }

    /**
     * Scroll smoothly to target element.
     * @param {string} targetId 
     */
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

    bindThemeToggle(handler) {
        if (this.darkToggleBtn) {
            this.darkToggleBtn.addEventListener('click', handler);
        }
    }

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
        // Category Buttons
        this.certsFilterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                const searchVal = this.certsSearchInput ? this.certsSearchInput.value.toLowerCase().trim() : '';
                handler(category, searchVal);
            });
        });

        // Search Input Trigger
        if (this.certsSearchInput) {
            this.certsSearchInput.addEventListener('input', (e) => {
                const searchVal = e.target.value.toLowerCase().trim();
                const activeBtn = document.querySelector('.certs-filter-btn.bg-teal-600');
                const activeCat = activeBtn ? activeBtn.getAttribute('data-category') : 'All';
                handler(activeCat, searchVal);
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
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "-12% 0px -48% 0px"
        };

        const activeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    handler(entry.target.id);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            activeObserver.observe(section);
        });
    }

    // --- DOM PRESENTATION-LAYER DETAILS ---

    _initScrollHeaderBehavior() {
        if (!this.header) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                this.header.classList.remove('bg-transparent', 'py-4');
                this.header.classList.add('bg-[#020817]/80', 'light:bg-white/80', 'backdrop-blur-xl', 'border-b', 'border-slate-200/10', 'light:border-slate-200', 'shadow-lg', 'shadow-black/20', 'py-3');
            } else {
                this.header.classList.add('bg-transparent', 'py-4');
                this.header.classList.remove('bg-[#020817]/80', 'light:bg-white/80', 'backdrop-blur-xl', 'border-b', 'border-slate-200/10', 'light:border-slate-200', 'shadow-lg', 'shadow-black/20', 'py-3');
            }
        });
    }

    _initScrollRevealBehavior() {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: "0px 0px -30px 0px"
        });

        document.querySelectorAll('section').forEach(section => {
            section.classList.add('transition-all', 'duration-1000', 'ease-out');
            revealObserver.observe(section);
        });
    }

    _initNavPillInteraction() {
        this.desktopNavButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this._positionNavPill(btn);
                this._playSFX('hover');
            });
        });

        const navList = document.querySelector('header nav ul');
        if (navList) {
            navList.addEventListener('mouseleave', () => {
                const activeBtn = Array.from(this.desktopNavButtons).find(btn => 
                    btn.classList.contains('text-teal-600') || btn.classList.contains('dark:text-teal-400')
                );
                if (activeBtn) {
                    this._positionNavPill(activeBtn);
                } else {
                    this._hideNavPill();
                }
            });
        }
    }

    _positionNavPill(btn) {
        if (!this.navPillActive) return;
        const rect = btn.getBoundingClientRect();
        const parentRect = btn.parentElement.parentElement.getBoundingClientRect();
        
        this.navPillActive.classList.remove('hidden');
        this.navPillActive.style.left = `${rect.left - parentRect.left}px`;
        this.navPillActive.style.width = `${rect.width}px`;
        this.navPillActive.style.height = `${rect.height}px`;
        this.navPillActive.style.opacity = '1';
    }

    _hideNavPill() {
        if (!this.navPillActive) return;
        this.navPillActive.style.opacity = '0';
    }

    _initTerminalTabs() {
        this.terminalTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetTab = e.currentTarget;
                const tabName = targetTab.getAttribute('data-tab');
                
                // Toggle active styles on tabs
                this.terminalTabs.forEach(t => {
                    t.classList.remove('border-b-2', 'border-teal-500', 'bg-slate-800/40', 'text-slate-100');
                    t.classList.add('text-slate-500', 'bg-slate-900/40');
                });
                
                targetTab.classList.add('border-b-2', 'border-teal-500', 'bg-slate-800/40', 'text-slate-100');
                targetTab.classList.remove('text-slate-500', 'bg-slate-900/40');
                
                // Switch visible console content panel
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
                
                // Update image preview src
                const imgEl = document.getElementById(`preview-${projectKey}`);
                if (imgEl) {
                    imgEl.src = previewSrc;
                }
                
                // Toggle tab highlights for this specific project
                const siblingBtns = document.querySelectorAll(`.project-tab-btn[data-project="${projectKey}"]`);
                siblingBtns.forEach(b => {
                    b.classList.remove('bg-teal-600', 'text-white');
                    b.classList.add('bg-slate-800/80', 'light:bg-slate-200', 'text-slate-300', 'light:text-slate-700');
                });
                
                targetBtn.classList.add('bg-teal-600', 'text-white');
                targetBtn.classList.remove('bg-slate-800/80', 'light:bg-slate-200', 'text-slate-300', 'light:text-slate-700');
                
                this._playSFX('click');
            });
        });
    }

    _initAudioTriggers() {
        // Generic UI sound hooks for extreme UX polish
        const interactiveElements = document.querySelectorAll('button, a, .glow-card, .contact-preset-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (el !== this.sfxToggleBtn) {
                    this._playSFX('hover');
                }
            });
            el.addEventListener('click', () => {
                if (el !== this.sfxToggleBtn && el !== this.darkToggleBtn) {
                    this._playSFX('click');
                }
            });
        });

        // Set up email composition listener
        const subjectEl = document.getElementById('contact-subject');
        const messageEl = document.getElementById('contact-message');
        if (subjectEl && messageEl) {
            const formChangeHandler = () => {
                const emailBtn = document.getElementById('contact-send-btn');
                if (emailBtn) {
                    const recipient = emailBtn.getAttribute('data-email');
                    this._rebuildMailtoLink(recipient);
                }
            };
            subjectEl.addEventListener('input', formChangeHandler);
            messageEl.addEventListener('input', formChangeHandler);
        }
    }

    _rebuildMailtoLink(emailAddress) {
        const subjectEl = document.getElementById('contact-subject');
        const messageEl = document.getElementById('contact-message');
        if (!subjectEl || !messageEl || !this.contactSendBtn) return;
        
        const subject = encodeURIComponent(subjectEl.value);
        const body = encodeURIComponent(messageEl.value);
        this.contactSendBtn.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    }

    /**
     * Audio Engine - Synthesizes retro-modern digital chimes and ticks on demand (zero assets required)
     */
    _playSFX(type) {
        if (!this.sfxEnabled) return;
        
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            
            // Re-use or instantiate audio context
            if (!this.audioCtx) {
                this.audioCtx = new AudioContext();
            }
            
            // Resume suspended context (browser standard for user gestures)
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }

            const ctx = this.audioCtx;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            if (type === 'hover') {
                // Highly subtle, soft, rapid digital click
                osc.type = 'sine';
                osc.frequency.setValueAtTime(950, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1250, ctx.currentTime + 0.05);
                
                gain.gain.setValueAtTime(0.008, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.05);
            } else if (type === 'click') {
                // Snappy, warm tech click
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(550, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.12);
                
                gain.gain.setValueAtTime(0.04, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.12);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } else if (type === 'success') {
                // Elegant cascading synth chime
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.06); // E5
                osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.12); // G5
                osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.22); // C6
                
                gain.gain.setValueAtTime(0.02, ctx.currentTime);
                gain.gain.setValueAtTime(0.025, ctx.currentTime + 0.06);
                gain.gain.setValueAtTime(0.03, ctx.currentTime + 0.12);
                gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.28);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.28);
            } else if (type === 'toggle') {
                // Elegant frequency sweep
                osc.type = 'sine';
                osc.frequency.setValueAtTime(320, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.15);
                
                gain.gain.setValueAtTime(0.015, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.15);
            }
        } catch (err) {
            console.warn('Synthesizer blocked or unsupported in current browser state', err);
        }
    }

    // --- TEMPLATE GENERATORS ---

    _createHeaderHTML(profile) {
        return `
        <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-4 font-jakarta">
            <nav class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">
                <!-- Glowing Logo -->
                <button class="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-teal-400 via-sky-400 to-blue-400 bg-clip-text text-transparent hover:opacity-85 transition-opacity duration-200 relative select-none">
                    ${profile.logoText}
                    <span class="absolute -right-3 -top-1 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                </button>
                
                <!-- Desktop Nav Navigation Wrapper -->
                <div class="hidden md:block relative px-1 py-1 rounded-xl bg-slate-950/20 border border-slate-200/5 light:border-slate-800/5 backdrop-blur-md">
                    <!-- Sliding active pill background -->
                    <div class="nav-pill-active hidden"></div>
                    
                    <ul class="flex items-center gap-1 relative z-10">
                        <li><button class="px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:text-white transition-colors duration-200">About</button></li>
                        <li><button class="px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:text-white transition-colors duration-200">Skills</button></li>
                        <li><button class="px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:text-white transition-colors duration-200">Projects</button></li>
                        <li><button class="px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:text-white transition-colors duration-200">Certifications</button></li>
                        <li><button class="px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:text-white transition-colors duration-200">Contact</button></li>
                    </ul>
                </div>
                
                <div class="flex items-center gap-2 relative z-10">
                    <!-- Synthesis SFX Audio Toggle -->
                    <button aria-label="Toggle audio effects" class="p-2.5 rounded-xl border border-slate-200/10 light:border-slate-200 text-slate-400 hover:text-white hover:bg-slate-900/50 light:hover:bg-slate-100 transition-all duration-200 h-9 w-9 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x" aria-hidden="true">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="22" y1="9" x2="16" y2="15"></line><line x1="16" y1="9" x2="22" y2="15"></line>
                        </svg>
                    </button>

                    <!-- Themes Switcher -->
                    <button aria-label="Toggle dark mode" class="p-2.5 rounded-xl border border-slate-200/10 light:border-slate-200 text-slate-400 hover:text-white hover:bg-slate-900/50 light:hover:bg-slate-100 transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon" aria-hidden="true">
                            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>
                        </svg>
                    </button>
                    
                    <!-- Mobile Menu Hamburger -->
                    <button class="md:hidden p-2.5 rounded-xl border border-slate-200/10 light:border-slate-200 hover:bg-slate-900/50 light:hover:bg-slate-100 text-slate-400 hover:text-white transition-colors duration-200" aria-label="Toggle menu">
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
        <div id="mobile-menu" class="hidden fixed inset-0 top-16 z-40 bg-[#020817]/95 light:bg-white/95 backdrop-blur-xl md:hidden transition-all duration-300 border-t border-slate-200/10 light:border-slate-200">
            <nav class="flex flex-col p-6 gap-3 font-jakarta">
                <button data-target="about" class="mobile-nav-btn text-left py-3 text-lg font-bold text-slate-400 hover:text-white transition-all duration-200">About</button>
                <button data-target="skills" class="mobile-nav-btn text-left py-3 text-lg font-bold text-slate-400 hover:text-white transition-all duration-200">Skills</button>
                <button data-target="projects" class="mobile-nav-btn text-left py-3 text-lg font-bold text-slate-400 hover:text-white transition-all duration-200">Projects</button>
                <button data-target="certifications" class="mobile-nav-btn text-left py-3 text-lg font-bold text-slate-400 hover:text-white transition-all duration-200">Certifications</button>
                <button data-target="contact" class="mobile-nav-btn text-left py-3 text-lg font-bold text-slate-400 hover:text-white transition-all duration-200">Contact</button>
            </nav>
        </div>
        `;
    }

    _createHeroHTML(profile) {
        const statsHTML = profile.stats.map((s, idx) => {
            const glowColors = ["group-hover:text-teal-400", "group-hover:text-blue-400", "group-hover:text-cyan-400"];
            return `
            <div class="px-6 py-4 rounded-2xl glass-panel border border-slate-200/5 hover:border-slate-200/15 hover:scale-105 transition-all duration-300 text-center flex-1 min-w-[120px] group cursor-default">
                <p class="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">${s.value}</p>
                <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-semibold uppercase tracking-wider ${glowColors[idx]} transition-colors duration-200">${s.label}</p>
            </div>
        `}).join('');

        return `
        <section class="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden z-10 pt-20">
            <!-- Content Grid Layout -->
            <div class="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
                
                <!-- Left Hand Text & Intro Block -->
                <div class="lg:col-span-6 space-y-6 text-left relative">
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wide">
                        <span class="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                        <span class="w-1.5 h-1.5 rounded-full bg-green-500 absolute left-[19px]"></span>
                        ${profile.status}
                    </div>
                    
                    <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight font-jakarta">
                        Hi, I'm <span class="bg-gradient-to-r from-teal-400 via-sky-400 to-blue-400 bg-clip-text text-transparent glow-text-teal">${profile.firstName}</span>
                    </h1>
                    
                    <p class="text-lg sm:text-xl text-slate-300 light:text-slate-700 font-semibold font-jakarta leading-relaxed">
                        ${profile.title}
                    </p>
                    
                    <p class="text-base text-slate-400 light:text-slate-600 max-w-xl leading-relaxed font-jakarta">
                        ${profile.description}
                    </p>
                    
                    <!-- Call To Action Panel -->
                    <div class="flex flex-wrap gap-4 pt-2 font-jakarta">
                        <button class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-lg shadow-teal-500/30 transition-all duration-300 hover:scale-105 active:scale-95 group/btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-terminal group-hover/btn:translate-x-1 transition-transform"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                            View Projects
                        </button>
                        
                        <button class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/50 light:bg-white border border-slate-200/10 light:border-slate-200 hover:border-teal-500/50 hover:bg-teal-500/5 light:hover:bg-slate-100 font-bold transition-all duration-300 hover:scale-105 active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.99 5.7a1.94 1.94 0 0 1-2.02 0L2 7"></path></svg>
                            Contact Me
                        </button>
                        
                        <a href="${profile.resumeUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200/10 light:border-slate-200 hover:border-cyan-500/50 hover:bg-cyan-500/5 light:hover:bg-slate-100 font-bold transition-all duration-300 hover:scale-105 active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-down"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M12 18v-6"></path><path d="m9 15 3 3 3-3"></path></svg>
                            Resume
                        </a>
                    </div>
                </div>

                <!-- Right Hand Gorgeous Shell Terminal Console (UX PRO MAX SPEC) -->
                <div class="lg:col-span-6 w-full max-w-lg mx-auto">
                    <div class="w-full rounded-2xl glass-panel border border-slate-200/10 overflow-hidden shadow-2xl shadow-black/80 hover:shadow-teal-500/10 hover:border-slate-200/25 transition-all duration-300 group/terminal">
                        
                        <!-- Console Header -->
                        <div class="bg-slate-950/80 px-4 py-3 flex items-center justify-between border-b border-slate-200/5">
                            <div class="flex items-center gap-1.5 select-none">
                                <span class="w-3 h-3 rounded-full bg-[#ef4444] shadow-md shadow-[#ef4444]/30 cursor-pointer"></span>
                                <span class="w-3 h-3 rounded-full bg-[#eab308] shadow-md shadow-[#eab308]/30 cursor-pointer"></span>
                                <span class="w-3 h-3 rounded-full bg-[#22c55e] shadow-md shadow-[#22c55e]/30 cursor-pointer"></span>
                            </div>
                            
                            <!-- Interactive Tabs -->
                            <div class="flex gap-2">
                                <button data-tab="profile" class="terminal-tab px-3 py-1 rounded-md text-[10px] font-bold font-mono transition-all duration-200 border-b-2 border-teal-500 bg-slate-800/40 text-slate-100 flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-teal-500"></span>portfolio.sh
                                </button>
                                <button data-tab="logs" class="terminal-tab px-3 py-1 rounded-md text-[10px] font-bold font-mono transition-all duration-200 text-slate-500 bg-slate-900/40 hover:text-slate-300 flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-slate-600"></span>system.log
                                </button>
                                <button data-tab="json" class="terminal-tab px-3 py-1 rounded-md text-[10px] font-bold font-mono transition-all duration-200 text-slate-500 bg-slate-900/40 hover:text-slate-300 flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-slate-600"></span>cv.json
                                </button>
                            </div>
                        </div>

                        <!-- Console Code View Area -->
                        <div class="p-6 h-[260px] overflow-y-auto font-mono text-[11px] sm:text-xs leading-relaxed text-slate-300 bg-slate-950/40">
                            
                            <!-- Tab 1: portfolio.sh -->
                            <div id="code-profile" class="terminal-code-panel space-y-3">
                                <div>
                                    <span class="text-cyan-400">guest@cvsu-imus:~$</span> <span class="text-teal-400 animate-pulse">./view-skills.sh</span>
                                </div>
                                <div class="text-slate-500 text-[10px]">[INFO] Fetching skill matrix... Success.</div>
                                <div class="space-y-1.5 text-slate-400 pl-4 border-l-2 border-teal-500/20">
                                    <p>⚡ <span class="text-slate-200 font-bold">Programming:</span> Java, Python, C++, JavaScript</p>
                                    <p>🌐 <span class="text-slate-200 font-bold">Web Stack:</span> HTML5, CSS3, PHP, Apache (XAMPP)</p>
                                    <p>💾 <span class="text-slate-200 font-bold">Databases:</span> MySQL Workbench, SQL, CRUD Engine</p>
                                    <p>⚙️ <span class="text-slate-200 font-bold">Frameworks:</span> Java Swing, Tkinter (GUI), Botpress AI</p>
                                </div>
                                <div>
                                    <span class="text-cyan-400">guest@cvsu-imus:~$</span> <span class="console-cursor border-r-2 border-slate-300 pr-[1px] font-bold"></span>
                                </div>
                            </div>

                            <!-- Tab 2: system.log -->
                            <div id="code-logs" class="terminal-code-panel space-y-1 text-slate-400 hidden">
                                <p class="text-emerald-500">[2026-05-29] Booting portfolio system v3.1...</p>
                                <p>[INFO] Instantiating MVC Pattern Controllers...</p>
                                <p>[INFO] Hydrating data model from config files...</p>
                                <p class="text-teal-400">[INFO] Location: Cavite State University - Imus Campus</p>
                                <p class="text-cyan-400">[INFO] Academic Status: Expected Graduation 2027</p>
                                <p>[INFO] Network status: Connected to CvSU Campus Wifi</p>
                                <p class="text-yellow-400">[WARN] Intern status: Open for internships & projects.</p>
                                <p class="text-slate-500">[DEBUG] Audio Synthesis context: Active & Nominal</p>
                                <p class="text-emerald-500">[SUCCESS] Redesign complete. Portfolio is fully active.</p>
                            </div>

                            <!-- Tab 3: cv.json -->
                            <div id="code-json" class="terminal-code-panel text-slate-400 hidden">
<pre class="text-teal-300">{
  <span class="text-cyan-400">"developer"</span>: "${profile.fullName}",
  <span class="text-cyan-400">"education"</span>: {
    <span class="text-cyan-400">"university"</span>: "Cavite State University",
    <span class="text-cyan-400">"degree"</span>: "BS Computer Science"
  },
  <span class="text-cyan-400">"active_interests"</span>: [
    "Software Systems", "Web Apps",
    "Database Architectures", "Cybersecurity"
  ],
  <span class="text-cyan-400">"open_to_work"</span>: <span class="text-emerald-400">true</span>
}</pre>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <!-- Stats Bar Section -->
            <div class="max-w-6xl mx-auto w-full flex flex-wrap gap-4 sm:gap-6 mt-16 pt-10 border-t border-slate-200/5 light:border-slate-200 font-jakarta">
                ${statsHTML}
            </div>

            <!-- Scrolling bounce indicator -->
            <button class="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-teal-400 transition-colors animate-float" aria-label="Scroll down">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"></path></svg>
            </button>
        </section>
        `;
    }

    _createAboutHTML(about) {
        const paragraphsHTML = about.paragraphs.map(p => `<p class="leading-relaxed">${p}</p>`).join('');
        
        const widgetsHTML = about.widgets.map(w => {
            if (w.type === 'interests') {
                const tagsHTML = w.value.map(tag => `
                    <span class="px-3 py-1.5 text-xs font-bold rounded-xl bg-teal-500/5 border border-teal-500/15 text-teal-400 group-hover/widget:border-teal-500/40 group-hover/widget:scale-105 transition-all duration-300 font-jakarta">${tag}</span>
                `).join('');
                return `
                <div class="rounded-2xl border border-slate-200/5 light:border-slate-200 p-6 bg-slate-900/10 backdrop-blur-sm hover:border-slate-200/15 hover:shadow-lg transition-all duration-300 group/widget">
                    <p class="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-3 font-mono">⚡ ${w.label}</p>
                    <div class="flex flex-wrap gap-2">
                        ${tagsHTML}
                    </div>
                </div>
                `;
            } else {
                return `
                <div class="rounded-2xl border border-slate-200/5 light:border-slate-200 p-6 bg-slate-900/10 backdrop-blur-sm flex items-start gap-4 hover:border-teal-500/20 hover:shadow-lg transition-all duration-300 group/widget">
                    <div class="mt-0.5 p-2 rounded-xl bg-teal-500/5 text-teal-400 border border-teal-500/10 group-hover/widget:bg-teal-500/10 transition-colors duration-200">
                        ${w.icon}
                    </div>
                    <div>
                        <p class="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1 font-mono">${w.label}</p>
                        <p class="font-bold text-slate-300 light:text-slate-700 text-sm leading-snug">${w.value}</p>
                    </div>
                </div>
                `;
            }
        }).join('');

        return `
        <section id="about" class="py-28 px-4 opacity-0 translate-y-8 scroll-mt-20">
            <div class="max-w-5xl mx-auto">
                <div class="text-left mb-12">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/5 border border-teal-500/15 text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>
                        About Me
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">Student Profile</h2>
                </div>
                
                <div class="grid md:grid-cols-2 gap-12 items-start">
                    <div class="space-y-6 text-slate-400 light:text-slate-600 text-base leading-relaxed font-jakarta">
                        ${paragraphsHTML}
                    </div>
                    
                    <div class="space-y-4 font-jakarta">
                        ${widgetsHTML}
                    </div>
                </div>
            </div>
        </section>
        `;
    }

    _createSkillsHTML(skills) {
        // Build filters
        const tabs = ["All", "Programming", "Web", "Databases", "Frameworks", "Tools", "Concepts"];
        const filterTabsHTML = tabs.map(t => {
            const isAll = t === "All";
            const btnClass = isAll 
                ? "bg-teal-600 text-white shadow-lg shadow-teal-500/25" 
                : "bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:text-white border border-slate-200/50 dark:border-slate-800/50";
            return `<button data-category="${t}" class="skills-filter-btn px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${btnClass}">${t}</button>`;
        }).join('');

        // Build list cards
        const categoriesHTML = skills.map(cat => {
            const tagsHTML = cat.items.map(item => `
                <span class="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-950/20 light:bg-slate-100 text-slate-400 light:text-slate-600 border border-slate-200/5 light:border-slate-200 group-hover:border-teal-500/30 group-hover:text-teal-400 transition-all duration-300 cursor-default select-none">${item}</span>
            `).join('');

            // Customize glowing HSL accent colors for card visual tags
            let glowBorder = "hover:border-teal-500/20 from-teal-600/5 to-transparent";
            let tagBadge = "🛡️";
            
            if (cat.category.toLowerCase().includes("web")) {
                glowBorder = "hover:border-orange-500/20 from-orange-600/5 to-transparent";
                tagBadge = "🌐";
            } else if (cat.category.toLowerCase().includes("database")) {
                glowBorder = "hover:border-emerald-500/20 from-emerald-600/5 to-transparent";
                tagBadge = "🗄️";
            } else if (cat.category.toLowerCase().includes("framework")) {
                glowBorder = "hover:border-violet-500/20 from-blue-600/5 to-transparent";
                tagBadge = "📦";
            } else if (cat.category.toLowerCase().includes("tool")) {
                glowBorder = "hover:border-rose-500/20 from-rose-600/5 to-transparent";
                tagBadge = "🔧";
            } else if (cat.category.toLowerCase().includes("concept")) {
                glowBorder = "hover:border-cyan-500/20 from-cyan-600/5 to-transparent";
                tagBadge = "🧠";
            } else {
                tagBadge = "💻";
            }

            return `
            <div data-category="${cat.category}" class="skill-category-card rounded-2xl border border-slate-200/5 light:border-slate-200 bg-gradient-to-br ${glowBorder} bg-slate-900/10 backdrop-blur-sm p-6 hover:shadow-xl hover:shadow-teal-500/5 hover:-translate-y-1.5 group transition-all duration-300">
                <div class="flex items-center gap-3.5 mb-5 select-none">
                    <span class="text-2xl group-hover:scale-115 transition-transform duration-300">${tagBadge}</span>
                    <h3 class="font-extrabold text-sm text-slate-300 light:text-slate-700 tracking-wide">${cat.category}</h3>
                </div>
                <div class="flex flex-wrap gap-2.5">
                    ${tagsHTML}
                </div>
            </div>
            `;
        }).join('');

        return `
        <section id="skills" class="py-28 px-4 opacity-0 translate-y-8 scroll-mt-20">
            <div class="max-w-5xl mx-auto">
                
                <!-- Section Header with filters -->
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div class="text-left">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/5 border border-teal-500/15 text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                            Technical Skills
                        </div>
                        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Capabilities Matrix</h2>
                    </div>
                    
                    <!-- Filters Deck -->
                    <div class="flex flex-wrap gap-2 font-jakarta">
                        ${filterTabsHTML}
                    </div>
                </div>
                
                <!-- Grid layout of Categories -->
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 font-jakarta">
                    ${categoriesHTML}
                </div>
            </div>
        </section>
        `;
    }

    _createProjectsHTML(projects) {
        // Generate Mockups matching each specific project architecture (Safari web browser mockup vs Desktop app windows)
        const cardsHTML = projects.map(proj => {
            const bulletsHTML = proj.bullets.map(b => `
                <li class="flex items-center gap-2.5 text-xs text-slate-400 light:text-slate-500 leading-snug">
                    <span class="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0 animate-pulse"></span>
                    ${b}
                </li>
            `).join('');

            const tagsHTML = proj.tags.map(t => `
                <span class="px-2.5 py-1 text-[10px] font-bold rounded-lg border bg-teal-500/5 text-teal-400 border-teal-500/15 group-hover:border-teal-500/30 transition-colors">${t}</span>
            `).join('');

            let mockUpHTML = "";
            const titleLower = proj.title.toLowerCase();
            
            // 1. SmartQueue (Web Browser Mockup)
            if (titleLower.includes("smartqueue")) {
                mockUpHTML = `
                <div class="browser-mockup relative">
                    <div class="browser-header">
                        <div class="browser-dots select-none">
                            <span class="browser-dot dot-red"></span><span class="browser-dot dot-yellow"></span><span class="browser-dot dot-green"></span>
                        </div>
                        <div class="browser-address-bar select-none">https://github.com/CJGR00/SmartQueue</div>
                    </div>
                    <!-- Mockup Tab Navigation -->
                    <div class="bg-slate-905/60 light:bg-slate-100 px-4 py-2 border-b border-slate-200/5 light:border-slate-200 flex flex-wrap gap-1.5 select-none z-20 relative">
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-teal-600 text-white"
                                data-preview="pic/SMARTQUEUE/studentdashboard.PNG"
                                data-project="smartqueue">
                            Student Dash
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-700/80"
                                data-preview="pic/SMARTQUEUE/registrar dashboard.PNG"
                                data-project="smartqueue">
                            Registrar Dash
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-700/80"
                                data-preview="pic/SMARTQUEUE/chatbot.PNG"
                                data-project="smartqueue">
                            AI Chatbot
                        </button>
                    </div>
                    <!-- Screenshot Container -->
                    <div class="browser-content bg-[#0c0a1c] p-0 h-[220px] overflow-hidden flex items-center justify-center relative">
                        <img id="preview-smartqueue" src="pic/SMARTQUEUE/studentdashboard.PNG" class="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-500" alt="SmartQueue Screenshot">
                    </div>
                </div>
                `;
            } 
            // 2. RentaReady (macOS Desktop Mockup)
            else if (titleLower.includes("rentaready")) {
                mockUpHTML = `
                <div class="desktop-mockup relative">
                    <div class="desktop-header select-none">
                        <div class="flex items-center gap-1.5">
                            <span class="browser-dot dot-red"></span><span class="browser-dot dot-yellow"></span><span class="browser-dot dot-green"></span>
                        </div>
                        <span class="desktop-title">RentaReady Java Client (JDBC v1.0)</span>
                        <span class="text-[10px] text-slate-600 font-bold font-mono">✖</span>
                    </div>
                    <!-- Mockup Tab Navigation -->
                    <div class="bg-slate-950/60 light:bg-slate-100 px-4 py-2 border-b border-slate-200/5 light:border-slate-200 flex flex-wrap gap-1.5 select-none z-20 relative">
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-teal-600 text-white"
                                data-preview="pic/VEHICLE RENTA/admin dashboard.PNG"
                                data-project="rentaready">
                            Dashboard
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-700/80"
                                data-preview="pic/VEHICLE RENTA/admin vehicle management.PNG"
                                data-project="rentaready">
                            Vehicles
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-700/80"
                                data-preview="pic/VEHICLE RENTA/vehicle rental.PNG"
                                data-project="rentaready">
                            Rentals
                        </button>
                    </div>
                    <!-- Screenshot Container -->
                    <div class="desktop-body bg-[#0f172a] p-0 h-[220px] overflow-hidden flex items-center justify-center relative">
                        <img id="preview-rentaready" src="pic/VEHICLE RENTA/admin dashboard.PNG" class="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-500" alt="RentaReady Screenshot">
                    </div>
                </div>
                `;
            } 
            // 3. CRE4MY LATER (Windows POS Mockup)
            else if (titleLower.includes("cre4my")) {
                mockUpHTML = `
                <div class="desktop-mockup relative">
                    <div class="desktop-header select-none">
                        <div class="flex items-center gap-1.5">
                            <span class="browser-dot dot-red"></span><span class="browser-dot dot-yellow"></span><span class="browser-dot dot-green"></span>
                        </div>
                        <span class="desktop-title">CRE4MY LATER POS - Patisserie Client v2.1</span>
                        <span class="text-[10px] text-slate-600 font-bold font-mono">✖</span>
                    </div>
                    <!-- Mockup Tab Navigation -->
                    <div class="bg-slate-950/60 light:bg-slate-100 px-4 py-2 border-b border-slate-200/5 light:border-slate-200 flex flex-wrap gap-1.5 select-none z-20 relative">
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-teal-600 text-white"
                                data-preview="pic/POS/dashboard1.png"
                                data-project="cre4mylater">
                            POS Menu
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-700/80"
                                data-preview="pic/POS/cart.png"
                                data-project="cre4mylater">
                            POS Cart
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-700/80"
                                data-preview="pic/POS/inventory.png"
                                data-project="cre4mylater">
                            Inventory
                        </button>
                    </div>
                    <!-- Screenshot Container -->
                    <div class="desktop-body bg-[#170f1a] p-0 h-[220px] overflow-hidden flex items-center justify-center relative">
                        <img id="preview-cre4mylater" src="pic/POS/dashboard1.png" class="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-500" alt="CRE4MY LATER POS Screenshot">
                    </div>
                </div>
                `;
            }
            // 4. TrustFactor 2FA (Web Browser Mockup)
            else {
                mockUpHTML = `
                <div class="browser-mockup relative">
                    <div class="browser-header">
                        <div class="browser-dots select-none">
                            <span class="browser-dot dot-red"></span><span class="browser-dot dot-yellow"></span><span class="browser-dot dot-green"></span>
                        </div>
                        <div class="browser-address-bar select-none">https://github.com/CJGR00/2FA</div>
                    </div>
                    <!-- Mockup Tab Navigation -->
                    <div class="bg-slate-950/60 light:bg-slate-100 px-4 py-2 border-b border-slate-200/5 light:border-slate-200 flex flex-wrap gap-1.5 select-none z-20 relative">
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-teal-600 text-white"
                                data-preview="pic/2FA/sign in.PNG"
                                data-project="trustfactor">
                            Sign In
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-700/80"
                                data-preview="pic/2FA/google app auth.PNG"
                                data-project="trustfactor">
                            Google Auth
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-700/80"
                                data-preview="pic/2FA/email auth.PNG"
                                data-project="trustfactor">
                            Email OTP
                        </button>
                        <button class="project-tab-btn text-[9px] px-2 py-0.5 rounded font-bold font-mono transition-all active:scale-95 bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-700/80"
                                data-preview="pic/2FA/admin dashboard.PNG"
                                data-project="trustfactor">
                            Admin Panel
                        </button>
                    </div>
                    <!-- Screenshot Container -->
                    <div class="browser-content bg-[#0a0815] p-0 h-[220px] overflow-hidden flex items-center justify-center relative">
                        <img id="preview-trustfactor" src="pic/2FA/sign in.PNG" class="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-500" alt="TrustFactor Screenshot">
                    </div>
                </div>
                `;
            }

            return `
            <article class="rounded-3xl border border-slate-200/5 light:border-slate-200 bg-slate-900/10 backdrop-blur-md overflow-hidden hover:shadow-2xl hover:shadow-teal-500/5 transition-all duration-500 hover:-translate-y-2 flex flex-col group relative">
                <!-- Visual Top Gradient -->
                <div class="h-1.5 w-full bg-gradient-to-r ${proj.gradient}"></div>
                
                <div class="p-6 sm:p-8 flex flex-col flex-1">
                    
                    <!-- SVG Emoji Custom Background -->
                    <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${proj.iconBg} mb-6 shadow-xl relative select-none group-hover:scale-105 transition-transform duration-300">
                        <span class="text-2xl z-10">${proj.emoji}</span>
                        <div class="absolute inset-0 rounded-2xl bg-white/10 blur-[1px] group-hover:blur-[3px] transition-all"></div>
                    </div>
                    
                    <h3 class="text-2xl font-extrabold mb-1.5 group-hover:text-teal-400 transition-colors duration-200 font-jakarta leading-tight">${proj.title}</h3>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400 mb-4 font-extrabold tracking-wider uppercase leading-snug font-mono">${proj.subtitle}</p>
                    
                    <p class="text-sm text-slate-400 light:text-slate-600 leading-relaxed mb-6 font-jakarta">
                        ${proj.description}
                    </p>
                    
                    <!-- Architecture Device Frame Mockup -->
                    <div class="w-full mb-6 relative">
                        ${mockUpHTML}
                    </div>
                    
                    <ul class="mb-6 space-y-2 font-jakarta">
                        ${bulletsHTML}
                    </ul>
                    
                    <!-- Tag badge Deck -->
                    <div class="flex flex-wrap gap-2 mb-6 select-none font-jakarta">
                        ${tagsHTML}
                    </div>
                    
                    <!-- GitHub action button -->
                    <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 justify-center px-5 py-3 rounded-2xl bg-slate-900 light:bg-slate-200 hover:bg-slate-800 light:hover:bg-slate-300 text-white light:text-slate-900 text-sm font-bold transition-all duration-200 hover:gap-3.5 group/btn font-jakarta">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                        View Code
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right opacity-60 group-hover/btn:opacity-100 transition-opacity"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                    </a>
                </div>
            </article>
            `;
        }).join('');

        return `
        <section id="projects" class="py-28 px-4 opacity-0 translate-y-8 scroll-mt-20">
            <div class="max-w-5xl mx-auto">
                <div class="text-left mb-12">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/5 border border-teal-500/15 text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        Featured Projects
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">Featured Projects</h2>
                </div>
                
                <div class="grid md:grid-cols-2 gap-8">
                    ${cardsHTML}
                </div>
            </div>
        </section>
        `;
    }

    _createCertificationsHTML(certs) {
        // Categories list
        const categories = ["All", "Cisco", "ISC2", "AWS", "Essentials"];
        const filterBtnsHTML = categories.map(cat => {
            const isAll = cat === "All";
            const btnClass = isAll 
                ? "bg-teal-600 text-white shadow-lg shadow-teal-500/25" 
                : "bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:text-white";
            return `<button data-category="${cat}" class="certs-filter-btn px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${btnClass}">${cat}</button>`;
        }).join('');

        const certsHTML = certs.map(c => `
        <div data-title="${c.title}" data-issuer="${c.issuer}" class="cert-card-wrapper flex flex-col justify-between rounded-2xl border border-slate-200/5 light:border-slate-200 bg-gradient-to-br ${c.gradient} bg-slate-900/10 backdrop-blur-sm p-6 hover:shadow-xl hover:border-teal-500/20 hover:-translate-y-1.5 transition-all duration-300 group">
            <span class="text-3xl select-none group-hover:scale-115 transition-transform duration-300 mb-4 inline-block w-fit">${c.emoji}</span>
            <div>
                <p class="font-extrabold text-sm text-slate-300 light:text-slate-700 leading-snug group-hover:text-teal-400 transition-colors duration-250">${c.title}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono font-bold uppercase tracking-wider">${c.issuer}</p>
            </div>
        </div>
        `).join('');

        return `
        <section id="certifications" class="py-28 px-4 opacity-0 translate-y-8 scroll-mt-20">
            <div class="max-w-5xl mx-auto">
                
                <!-- Section Title & Filters/Search -->
                <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                    <div class="text-left">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/5 border border-teal-500/15 text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                            Certifications
                        </div>
                        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">Accreditation Deck</h2>
                    </div>
                    
                    <!-- Certifications Tools Deck -->
                    <div class="flex flex-wrap items-center gap-4">
                        <!-- Search Bar -->
                        <div class="relative w-full sm:w-48 font-jakarta">
                            <input type="text" id="certs-search" placeholder="Search certs..." class="w-full pl-8 pr-3.5 py-2 text-xs rounded-xl bg-slate-900/50 light:bg-white text-slate-300 light:text-slate-700 border border-slate-200/5 light:border-slate-200 focus-ring-glow transition-all" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                        
                        <!-- Filter categories buttons -->
                        <div class="flex flex-wrap gap-1.5 font-jakarta">
                            ${filterBtnsHTML}
                        </div>
                    </div>
                </div>
                
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 font-jakarta">
                    ${certsHTML}
                </div>
            </div>
        </section>
        `;
    }

    _createContactHTML(profile) {
        return `
        <section id="contact" class="py-28 px-4 opacity-0 translate-y-8 scroll-mt-20">
            <div class="max-w-5xl mx-auto">
                <div class="text-center mb-12">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/5 border border-teal-500/15 text-teal-400 text-xs font-bold uppercase tracking-widest mb-3 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.99 5.7a1.94 1.94 0 0 1-2.02 0L2 7"></path></svg>
                        Get In Touch
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-center">Get In Touch</h2>
                    <p class="text-slate-400 light:text-slate-600 mt-4 max-w-lg mx-auto font-jakarta">
                        I'm currently seeking internship opportunities and entry-level software development roles. Select a template preset or drop your message below to connect!
                    </p>
                </div>
                
                <div class="grid lg:grid-cols-12 gap-8 items-start">
                    
                    <!-- Left: Presets Option Panel (UX PRO MAX SPEC) -->
                    <div class="lg:col-span-4 space-y-4">
                        <p class="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest pl-1 mb-2 select-none">Quick Template Presets</p>
                        
                        <div data-preset="internship" class="contact-preset-card rounded-2xl border border-slate-200/5 light:border-slate-200 bg-slate-900/10 backdrop-blur-sm p-4 hover:border-slate-200/15 hover:shadow-lg transition-all duration-300 cursor-pointer flex gap-3.5 group select-none">
                            <span class="text-2xl mt-0.5 group-hover:scale-110 transition-transform">💼</span>
                            <div>
                                <p class="font-bold text-slate-300 light:text-slate-700 text-sm">Internship Offer</p>
                                <p class="text-[10px] text-slate-500 mt-1 font-jakarta leading-relaxed">BSCS student internship coordinator draft.</p>
                            </div>
                        </div>

                        <div data-preset="collab" class="contact-preset-card rounded-2xl border border-slate-200/5 light:border-slate-200 bg-slate-900/10 backdrop-blur-sm p-4 hover:border-slate-200/15 hover:shadow-lg transition-all duration-300 cursor-pointer flex gap-3.5 group select-none">
                            <span class="text-2xl mt-0.5 group-hover:scale-110 transition-transform">🤝</span>
                            <div>
                                <p class="font-bold text-slate-300 light:text-slate-700 text-sm">System Collaboration</p>
                                <p class="text-[10px] text-slate-500 mt-1 font-jakarta leading-relaxed">Collaborate on a software/web system.</p>
                            </div>
                        </div>

                        <div data-preset="hello" class="contact-preset-card rounded-2xl border border-slate-200/5 light:border-slate-200 bg-slate-900/10 backdrop-blur-sm p-4 hover:border-slate-200/15 hover:shadow-lg transition-all duration-300 cursor-pointer flex gap-3.5 group select-none">
                            <span class="text-2xl mt-0.5 group-hover:scale-110 transition-transform">👋</span>
                            <div>
                                <p class="font-bold text-slate-300 light:text-slate-700 text-sm">Say Hello!</p>
                                <p class="text-[10px] text-slate-500 mt-1 font-jakarta leading-relaxed">General connection or nice comments.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Gorgeous Contact Form Console -->
                    <div class="lg:col-span-8">
                        <div class="rounded-3xl border border-slate-200/5 light:border-slate-200 bg-slate-900/10 backdrop-blur-sm p-6 sm:p-8 space-y-6">
                            
                            <div class="grid sm:grid-cols-2 gap-4 font-jakarta">
                                <div>
                                    <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">From Name (Optional)</label>
                                    <input type="text" placeholder="Your Name" class="w-full px-4 py-3 rounded-xl bg-slate-900/50 light:bg-white text-slate-300 light:text-slate-700 border border-slate-200/5 light:border-slate-200 focus-ring-glow transition-all" />
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Subject Theme</label>
                                    <input type="text" id="contact-subject" placeholder="What are we building?" class="w-full px-4 py-3 rounded-xl bg-slate-900/50 light:bg-white text-slate-300 light:text-slate-700 border border-slate-200/5 light:border-slate-200 focus-ring-glow transition-all" />
                                </div>
                            </div>
                            
                            <div class="font-jakarta">
                                <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Mail Transmission Content</label>
                                <textarea id="contact-message" rows="5" placeholder="Dear Christian, let's discuss..." class="w-full px-4 py-3 rounded-xl bg-slate-900/50 light:bg-white text-slate-300 light:text-slate-700 border border-slate-200/5 light:border-slate-200 focus-ring-glow transition-all leading-relaxed"></textarea>
                            </div>
                            
                            <!-- Mailto transmission launcher button -->
                            <a id="contact-send-btn" href="mailto:${profile.email}" data-email="${profile.email}" class="inline-flex w-full items-center gap-2 justify-center px-6 py-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-lg shadow-teal-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-95 text-center font-jakarta">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                                Launch Mail Client
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Footer details of socials -->
                <div class="flex flex-wrap justify-center gap-8 sm:gap-14 mt-16 font-jakarta select-none">
                    <a href="${profile.socials.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="flex flex-col items-center gap-2 group">
                        <div class="w-14 h-14 rounded-2xl border border-slate-200/5 light:border-slate-200 bg-slate-900/20 light:bg-white flex items-center justify-center text-slate-400 group-hover:border-teal-500 group-hover:text-teal-400 group-hover:shadow-xl group-hover:shadow-teal-500/10 transition-all duration-300 group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                        </div>
                        <span class="text-xs font-bold text-slate-500 group-hover:text-teal-400 transition-colors">GitHub</span>
                    </a>
                    
                    <a href="${profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="flex flex-col items-center gap-2 group">
                        <div class="w-14 h-14 rounded-2xl border border-slate-200/5 light:border-slate-200 bg-slate-900/20 light:bg-white flex items-center justify-center text-slate-400 group-hover:border-teal-500 group-hover:text-teal-400 group-hover:shadow-xl group-hover:shadow-teal-500/10 transition-all duration-300 group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </div>
                        <span class="text-xs font-bold text-slate-500 group-hover:text-teal-400 transition-colors">LinkedIn</span>
                    </a>
                    
                    <a href="mailto:${profile.email}" aria-label="Email" class="flex flex-col items-center gap-2 group">
                        <div class="w-14 h-14 rounded-2xl border border-slate-200/5 light:border-slate-200 bg-slate-900/20 light:bg-white flex items-center justify-center text-slate-400 group-hover:border-teal-500 group-hover:text-teal-400 group-hover:shadow-xl group-hover:shadow-teal-500/10 transition-all duration-300 group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.99 5.7a1.94 1.94 0 0 1-2.02 0L2 7"></path></svg>
                        </div>
                        <span class="text-xs font-bold text-slate-500 group-hover:text-teal-400 transition-colors">Email</span>
                    </a>
                </div>

            </div>
        </section>
        `;
    }

    _createFooterHTML(profile) {
        return `
        <footer class="border-t border-slate-200/5 light:border-slate-200 py-10 px-4 font-jakarta select-none">
            <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <p>&copy; 2026 ${profile.fullName} &middot; Cavite State University</p>
                <div class="flex items-center gap-1.5 font-mono">
                    <span class="w-2 h-2 rounded-full bg-teal-500"></span>
                    <p>Architecture: Pure JS MVC Module</p>
                </div>
            </div>
        </footer>
        `;
    }
}

