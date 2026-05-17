/**
 * PortfolioView Class
 * Responsible for rendering HTML templates, managing DOM nodes,
 * and mapping native browser events to Controller bindings.
 */
export class PortfolioView {
    constructor() {
        this.appContainer = document.getElementById('app');
        
        // Caches for dynamic interactive DOM elements
        this.header = null;
        this.htmlEl = document.documentElement;
        this.darkToggleBtn = null;
        this.menuToggleBtn = null;
        this.mobileMenu = null;
        this.scrollDownBtn = null;
        this.desktopNavButtons = [];
        this.mobileNavButtons = [];
        this.heroCTAButtons = [];
    }

    /**
     * Initial render of the static shell and structural components.
     * @param {object} data - Structured portfolio data
     */
    render(data) {
        // Compile all sections dynamically using template literals
        this.appContainer.innerHTML = `
            <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
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
        `;

        // Cache interactive DOM nodes
        this._cacheElements();
        
        // Initialize independent presentation-layer listeners
        this._initScrollHeaderBehavior();
        this._initScrollRevealBehavior();
    }

    /**
     * Cache dynamically injected elements for later MVC manipulation
     */
    _cacheElements() {
        this.header = document.querySelector('header');
        this.darkToggleBtn = document.querySelector('button[aria-label="Toggle dark mode"]');
        this.menuToggleBtn = document.querySelector('button[aria-label="Toggle menu"]');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.scrollDownBtn = document.querySelector('button[aria-label="Scroll down"]');
        this.desktopNavButtons = document.querySelectorAll('header nav ul li button');
        this.mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
        this.heroCTAButtons = document.querySelectorAll('section:first-of-type button, section:first-of-type a');
    }

    /**
     * Updates the DOM state to match the model's theme preference.
     * @param {string} theme - 'dark' | 'light'
     */
    updateTheme(theme) {
        if (theme === 'dark') {
            this.htmlEl.classList.add('dark');
            if (this.darkToggleBtn) {
                this.darkToggleBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun" aria-hidden="true">
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2"></path>
                        <path d="M12 20v2"></path>
                        <path d="M4.93 4.93l1.41 1.41"></path>
                        <path d="M17.66 17.66l1.41 1.41"></path>
                        <path d="M2 12h2"></path>
                        <path d="M20 12h2"></path>
                        <path d="M6.34 17.66l-1.41 1.41"></path>
                        <path d="M19.07 4.93l-1.41 1.41"></path>
                    </svg>
                `;
            }
        } else {
            this.htmlEl.classList.remove('dark');
            if (this.darkToggleBtn) {
                this.darkToggleBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon" aria-hidden="true">
                        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>
                    </svg>
                `;
            }
        }
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
            document.body.style.overflow = 'hidden';
        } else {
            this.mobileMenu.classList.add('hidden');
            this.menuToggleBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu" aria-hidden="true">
                    <path d="M4 5h16"></path>
                    <path d="M4 12h16"></path>
                    <path d="M4 19h16"></path>
                </svg>
            `;
            document.body.style.overflow = '';
        }
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
                btn.classList.add('text-indigo-600', 'dark:text-indigo-400', 'bg-indigo-50/50', 'dark:bg-indigo-950/30');
                btn.classList.remove('text-gray-600', 'dark:text-gray-400');
            } else {
                btn.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'bg-indigo-50/50', 'dark:bg-indigo-950/30');
                btn.classList.add('text-gray-600', 'dark:text-gray-400');
            }
        });

        // Mobile nav highlighting
        this.mobileNavButtons.forEach(btn => {
            const target = btn.getAttribute('data-target');
            const isCurrent = target === activeSection;
            if (isCurrent) {
                btn.classList.add('text-indigo-600', 'dark:text-indigo-400');
                btn.classList.remove('text-gray-600', 'dark:text-gray-400');
            } else {
                btn.classList.remove('text-indigo-600', 'dark:text-indigo-400');
                btn.classList.add('text-gray-600', 'dark:text-gray-400');
            }
        });
    }

    /**
     * Scrolls smoothly to a target DOM element.
     * @param {string} targetId 
     */
    scrollToSection(targetId) {
        if (targetId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // --- CONTROLLER BINDING METHODS ---

    bindThemeToggle(handler) {
        if (this.darkToggleBtn) {
            this.darkToggleBtn.addEventListener('click', handler);
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

    /**
     * Binds scroll visibility observation to notify Controller which section is in view.
     * @param {function} handler 
     */
    bindScrollSectionActive(handler) {
        const observerOptions = {
            threshold: 0.25, // Require 25% visibility
            rootMargin: "-10% 0px -40% 0px" // Restrict scan window
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

    // --- DOM PRESENTATION-LAYER UTILITIES ---

    _initScrollHeaderBehavior() {
        if (!this.header) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                this.header.classList.remove('bg-transparent');
                this.header.classList.add('bg-white/80', 'dark:bg-gray-950/80', 'backdrop-blur-md', 'border-b', 'border-gray-100', 'dark:border-gray-900', 'shadow-sm');
            } else {
                this.header.classList.add('bg-transparent');
                this.header.classList.remove('bg-white/80', 'dark:bg-gray-950/80', 'backdrop-blur-md', 'border-b', 'border-gray-100', 'dark:border-gray-900', 'shadow-sm');
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
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        document.querySelectorAll('section').forEach(section => {
            section.classList.add('transition-all', 'duration-1000', 'ease-out');
            revealObserver.observe(section);
        });
    }

    // --- TEMPLATE RENDERING GENERATORS ---

    _createHeaderHTML(profile) {
        return `
        <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
            <nav class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <button class="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                    ${profile.logoText}
                </button>
                <ul class="hidden md:flex items-center gap-1">
                    <li><button class="px-3 py-1.5 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">About</button></li>
                    <li><button class="px-3 py-1.5 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Skills</button></li>
                    <li><button class="px-3 py-1.5 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Projects</button></li>
                    <li><button class="px-3 py-1.5 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Certifications</button></li>
                    <li><button class="px-3 py-1.5 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Contact</button></li>
                </ul>
                
                <div class="flex items-center gap-2">
                    <button aria-label="Toggle dark mode" class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon" aria-hidden="true">
                            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>
                        </svg>
                    </button>
                    
                    <button class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle menu">
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
        <div id="mobile-menu" class="hidden fixed inset-0 top-16 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md md:hidden transition-all duration-300 border-t border-gray-100 dark:border-gray-900">
            <nav class="flex flex-col p-6 gap-4 font-jakarta">
                <button data-target="about" class="mobile-nav-btn text-left py-2.5 text-lg font-semibold border-b border-gray-100 dark:border-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">About</button>
                <button data-target="skills" class="mobile-nav-btn text-left py-2.5 text-lg font-semibold border-b border-gray-100 dark:border-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Skills</button>
                <button data-target="projects" class="mobile-nav-btn text-left py-2.5 text-lg font-semibold border-b border-gray-100 dark:border-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Projects</button>
                <button data-target="certifications" class="mobile-nav-btn text-left py-2.5 text-lg font-semibold border-b border-gray-100 dark:border-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Certifications</button>
                <button data-target="contact" class="mobile-nav-btn text-left py-2.5 text-lg font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contact</button>
            </nav>
        </div>
        `;
    }

    _createHeroHTML(profile) {
        const statsHTML = profile.stats.map(s => `
            <div class="text-center">
                <p class="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">${s.value}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-semibold uppercase tracking-wider">${s.label}</p>
            </div>
        `).join('');

        return `
        <section class="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div class="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1.5s]"></div>
                <div class="absolute top-3/4 left-1/2 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-cyan-500/3 dark:bg-cyan-500/8 rounded-full blur-3xl animate-pulse [animation-delay:3s]"></div>
            </div>
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:56px_56px] opacity-20 dark:opacity-5 pointer-events-none"></div>
            
            <div class="relative z-10 max-w-3xl mx-auto pt-16">
                <div class="mx-auto mb-8 relative w-fit">
                    <div class="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-2xl ring-4 ring-white dark:ring-gray-900 ring-offset-2 ring-offset-white dark:ring-offset-gray-950 mx-auto select-none">
                        ${profile.initials}
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white dark:border-gray-950 flex items-center justify-center shadow-md">
                        <span class="text-white text-xs font-bold font-jakarta">✓</span>
                    </div>
                </div>
                
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 tracking-wide select-none">
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    ${profile.status}
                </div>
                
                <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                    Hi, I'm <span class="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">${profile.firstName}</span>
                </h1>
                
                <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-3 font-semibold font-jakarta">
                    ${profile.title}
                </p>
                <p class="text-base text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
                    ${profile.description}
                </p>
                
                <div class="flex flex-wrap justify-center gap-3">
                    <button class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-105 active:scale-100 hover:shadow-indigo-500/40">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-xml" aria-hidden="true">
                            <path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path>
                        </svg>
                        View Projects
                    </button>
                    <button class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 font-semibold transition-all duration-200 hover:scale-105 active:scale-100 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail" aria-hidden="true">
                            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        </svg>
                        Contact Me
                    </button>
                    <a href="${profile.resumeUrl}" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 font-semibold transition-all duration-200 hover:scale-105 active:scale-100 bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link" aria-hidden="true">
                            <path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        </svg>
                        Download Resume
                    </a>
                </div>
                
                <div class="flex flex-wrap justify-center gap-8 sm:gap-14 mt-16 pt-10 border-t border-gray-100 dark:border-gray-900/60 font-jakarta">
                    ${statsHTML}
                </div>
            </div>
            
            <button class="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-600 animate-bounce hover:text-indigo-500 transition-colors" aria-label="Scroll down">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down" aria-hidden="true">
                    <path d="m6 9 6 6 6-6"></path>
                </svg>
            </button>
        </section>
        `;
    }

    _createAboutHTML(about) {
        const paragraphsHTML = about.paragraphs.map(p => `<p>${p}</p>`).join('');
        
        const widgetsHTML = about.widgets.map(w => {
            if (w.type === 'interests') {
                const tagsHTML = w.value.map(tag => `
                    <span class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">${tag}</span>
                `).join('');
                return `
                <div class="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-gray-900/50 hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-900/40 transition-all duration-200">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">${w.label}</p>
                    <div class="flex flex-wrap gap-2">
                        ${tagsHTML}
                    </div>
                </div>
                `;
            } else {
                return `
                <div class="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-gray-900/50 flex items-start gap-4 hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-900/40 transition-all duration-200">
                    <span class="mt-0.5 text-indigo-500 flex-shrink-0">
                        ${w.icon}
                    </span>
                    <div>
                        <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">${w.label}</p>
                        <p class="font-semibold text-gray-800 dark:text-gray-200 text-sm">${w.value}</p>
                    </div>
                </div>
                `;
            }
        }).join('');

        return `
        <section id="about" class="py-24 px-4 transition-all duration-700 opacity-0 translate-y-8 scroll-mt-10">
            <div class="max-w-5xl mx-auto">
                <div>
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3 uppercase tracking-widest">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap" aria-hidden="true">
                            <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                            <path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                        </svg>
                        About Me
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">About Me</h2>
                </div>
                
                <div class="grid md:grid-cols-2 gap-12 items-start mt-12">
                    <div class="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed font-jakarta">
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
        const categoriesHTML = skills.map(cat => {
            const tagsHTML = cat.items.map(item => `
                <span class="px-2.5 py-1 text-xs font-medium rounded-md bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors">${item}</span>
            `).join('');

            // Harmonious custom border gradient styles to retain a gorgeous dark premium look
            let borderStyle = "border-blue-200/50 dark:border-blue-900/40 from-blue-500/5 to-indigo-500/5";
            if (cat.category.includes("Web")) borderStyle = "border-orange-200/50 dark:border-orange-900/40 from-orange-500/5 to-amber-500/5";
            if (cat.category.includes("Databases")) borderStyle = "border-green-200/50 dark:border-green-900/40 from-green-500/5 to-emerald-500/5";
            if (cat.category.includes("Frameworks")) borderStyle = "border-violet-200/50 dark:border-violet-900/40 from-violet-500/5 to-purple-500/5";
            if (cat.category.includes("Tools")) borderStyle = "border-rose-200/50 dark:border-rose-900/40 from-rose-500/5 to-pink-500/5";
            if (cat.category.includes("Concepts")) borderStyle = "border-cyan-200/50 dark:border-cyan-900/40 from-cyan-500/5 to-teal-500/5";

            return `
            <div class="rounded-2xl border ${borderStyle} bg-gradient-to-br bg-white dark:bg-gray-900 p-6 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 hover:-translate-y-1 group">
                <div class="flex items-center gap-3 mb-4">
                    <span class="text-2xl group-hover:scale-110 transition-transform duration-200 select-none">${cat.emoji}</span>
                    <h3 class="font-bold text-sm text-gray-700 dark:text-gray-300">${cat.category}</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                    ${tagsHTML}
                </div>
            </div>
            `;
        }).join('');

        return `
        <section id="skills" class="py-24 px-4 bg-gray-50/80 dark:bg-gray-900/30 border-y border-gray-100 dark:border-gray-900/60 transition-all duration-700 opacity-0 translate-y-8 scroll-mt-10">
            <div class="max-w-5xl mx-auto">
                <div>
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3 uppercase tracking-widest">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-xml" aria-hidden="true">
                            <path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path>
                        </svg>
                        Technical Skills
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Technical Skills</h2>
                </div>
                
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 font-jakarta">
                    ${categoriesHTML}
                </div>
            </div>
        </section>
        `;
    }

    _createProjectsHTML(projects) {
        const cardsHTML = projects.map(proj => {
            const bulletsHTML = proj.bullets.map(b => `
                <li class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>
                    ${b}
                </li>
            `).join('');

            const tagsHTML = proj.tags.map(t => `
                <span class="px-2 py-0.5 text-[10px] font-semibold rounded-md border bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/60">${t}</span>
            `).join('');

            return `
            <article class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:-translate-y-2 flex flex-col group">
                <div class="h-1 w-full bg-gradient-to-r ${proj.gradient}"></div>
                <div class="p-6 flex flex-col flex-1">
                    <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${proj.iconBg} mb-5 shadow-lg select-none">
                        <span class="text-xl">${proj.emoji}</span>
                    </div>
                    <h3 class="text-xl font-bold mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${proj.title}</h3>
                    <p class="text-[10px] text-gray-400 dark:text-gray-500 mb-3 font-semibold leading-snug font-jakarta">${proj.subtitle}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1 font-jakarta">
                        ${proj.description}
                    </p>
                    <ul class="mb-4 space-y-1.5 font-jakarta">
                        ${bulletsHTML}
                    </ul>
                    <div class="flex flex-wrap gap-1.5 mb-5 select-none font-jakarta">
                        ${tagsHTML}
                    </div>
                    <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 justify-center px-4 py-2.5 rounded-xl bg-gray-900 dark:bg-white/10 hover:bg-gray-700 dark:hover:bg-white/20 text-white text-sm font-semibold transition-all duration-200 hover:gap-3 group/btn font-jakarta">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github" aria-hidden="true">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                            <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg>
                        View on GitHub
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right opacity-60 group-hover/btn:opacity-100 transition-opacity" aria-hidden="true">
                            <path d="M7 7h10v10"></path><path d="M7 17 17 7"></path>
                        </svg>
                    </a>
                </div>
            </article>
            `;
        }).join('');

        return `
        <section id="projects" class="py-24 px-4 transition-all duration-700 opacity-0 translate-y-8 scroll-mt-10">
            <div class="max-w-5xl mx-auto">
                <div>
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3 uppercase tracking-widest">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase" aria-hidden="true">
                            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                        </svg>
                        Featured Projects
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Featured Projects</h2>
                </div>
                
                <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
                    ${cardsHTML}
                </div>
            </div>
        </section>
        `;
    }

    _createCertificationsHTML(certs) {
        const certsHTML = certs.map(c => `
        <div class="flex flex-col gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br ${c.gradient} bg-white dark:bg-gray-900 p-5 hover:shadow-md dark:hover:shadow-gray-900/50 hover:-translate-y-1 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-200">
            <span class="text-2xl select-none">${c.emoji}</span>
            <div>
                <p class="font-bold text-sm text-gray-800 dark:text-gray-200 leading-snug">${c.title}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1.5">${c.issuer}</p>
            </div>
        </div>
        `).join('');

        return `
        <section id="certifications" class="py-24 px-4 bg-gray-50/80 dark:bg-gray-900/30 border-y border-gray-100 dark:border-gray-900/60 transition-all duration-700 opacity-0 translate-y-8 scroll-mt-10">
            <div class="max-w-5xl mx-auto">
                <div>
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3 uppercase tracking-widest">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award" aria-hidden="true">
                            <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                            <circle cx="12" cy="8" r="6"></circle>
                        </svg>
                        Certifications
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Certifications</h2>
                </div>
                
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 font-jakarta">
                    ${certsHTML}
                </div>
            </div>
        </section>
        `;
    }

    _createContactHTML(profile) {
        return `
        <section id="contact" class="py-24 px-4 transition-all duration-700 opacity-0 translate-y-8 scroll-mt-10">
            <div class="max-w-2xl mx-auto text-center">
                <div class="text-center">
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3 uppercase tracking-widest mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail" aria-hidden="true">
                            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        </svg>
                        Get In Touch
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-center">Get In Touch</h2>
                </div>
                
                <p class="text-gray-500 dark:text-gray-400 mt-4 mb-12 leading-relaxed max-w-lg mx-auto font-jakarta">
                    I'm currently open to internship opportunities and entry-level software development roles. Whether you have a project in mind, a question, or just want to connect — feel free to reach out!
                </p>
                
                <div class="flex justify-center gap-6 mb-12 font-jakarta">
                    <a href="${profile.socials.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="flex flex-col items-center gap-2 group">
                        <div class="w-14 h-14 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:border-indigo-400 dark:group-hover:border-indigo-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-all duration-200 group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github" aria-hidden="true">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                <path d="M9 18c-4.51 2-5-2-7-2"></path>
                            </svg>
                        </div>
                        <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">GitHub</span>
                    </a>
                    
                    <a href="${profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="flex flex-col items-center gap-2 group">
                        <div class="w-14 h-14 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:border-indigo-400 dark:group-hover:border-indigo-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-all duration-200 group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin" aria-hidden="true">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </div>
                        <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">LinkedIn</span>
                    </a>
                    
                    <a href="mailto:${profile.email}" aria-label="Email" class="flex flex-col items-center gap-2 group">
                        <div class="w-14 h-14 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:border-indigo-400 dark:group-hover:border-indigo-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-all duration-200 group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail" aria-hidden="true">
                                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            </svg>
                        </div>
                        <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Email</span>
                    </a>
                </div>
                
                <div class="rounded-3xl border border-indigo-200/50 dark:border-indigo-800/40 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 p-8 backdrop-blur-sm font-jakarta">
                    <p class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Let's Build Something Together</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Currently seeking internship and entry-level software development opportunities.</p>
                    <a href="mailto:${profile.email}" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-105 active:scale-100 hover:shadow-indigo-500/40">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail" aria-hidden="true">
                            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        </svg>
                        ${profile.email}
                    </a>
                </div>
            </div>
        </section>
        `;
    }

    _createFooterHTML(profile) {
        return `
        <footer class="border-t border-gray-200 dark:border-gray-800 py-8 px-4 font-jakarta">
            <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400 dark:text-gray-600">
                <p>&copy; 2026 ${profile.fullName}</p>
                <p>Built with HTML, CSS, and JavaScript (MVC)</p>
            </div>
        </footer>
        `;
    }
}
