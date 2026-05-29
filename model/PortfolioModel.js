import { portfolioData } from '../data/portfolioData.js';

/**
 * PortfolioModel Class
 * Manages the data state, dark/light theme options, and UI visibility states.
 */
export class PortfolioModel {
    constructor() {
        this.data = portfolioData;
        this.observers = {};
        
        // Initialize States
        this.theme = this._initializeTheme();
        this.isMobileMenuOpen = false;
        this.activeSection = '';
        this.activeSkillsCategory = 'All';
        this.activeCertsCategory = 'All';
        this.sfxEnabled = localStorage.getItem('sfxEnabled') === 'enabled';
        this.contactPreset = '';
    }

    /**
     * Registers an observer for a specific state change event.
     * @param {string} event - The event name (e.g. 'themeChange', 'menuChange', 'sectionChange')
     * @param {function} callback - Callback function to fire when state changes
     */
    addObserver(event, callback) {
        if (!this.observers[event]) {
            this.observers[event] = [];
        }
        this.observers[event].push(callback);
    }

    /**
     * Triggers all observers associated with an event.
     * @param {string} event - The event name
     * @param {any} data - Contextual data passed to observers
     */
    notify(event, data) {
        if (this.observers[event]) {
            this.observers[event].forEach(callback => callback(data));
        }
    }

    /**
     * Toggles the application theme between dark and light modes.
     */
    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('darkMode', this.theme === 'dark' ? 'enabled' : 'disabled');
        this.notify('themeChange', this.theme);
    }

    /**
     * Toggles SFX sound effects active state.
     */
    toggleSfx() {
        this.sfxEnabled = !this.sfxEnabled;
        localStorage.setItem('sfxEnabled', this.sfxEnabled ? 'enabled' : 'disabled');
        this.notify('sfxChange', this.sfxEnabled);
    }

    /**
     * Sets active category filter for skills.
     * @param {string} category 
     */
    setSkillsCategory(category) {
        if (this.activeSkillsCategory !== category) {
            this.activeSkillsCategory = category;
            this.notify('skillsCategoryChange', this.activeSkillsCategory);
        }
    }

    /**
     * Sets active category filter for certifications.
     * @param {string} category 
     */
    setCertsCategory(category) {
        if (this.activeCertsCategory !== category) {
            this.activeCertsCategory = category;
            this.notify('certsCategoryChange', this.activeCertsCategory);
        }
    }

    /**
     * Sets contact form input preset selection.
     * @param {string} presetType 
     */
    setContactPreset(presetType) {
        this.contactPreset = presetType;
        this.notify('contactPresetChange', this.contactPreset);
    }

    /**
     * Updates the mobile burger menu toggle state.
     * @param {boolean} isOpen 
     */
    setMobileMenuState(isOpen) {
        this.isMobileMenuOpen = isOpen;
        this.notify('menuChange', this.isMobileMenuOpen);
    }

    /**
     * Sets the current active scroll section in navigation headers.
     * @param {string} sectionId 
     */
    setActiveSection(sectionId) {
        if (this.activeSection !== sectionId) {
            this.activeSection = sectionId;
            this.notify('sectionChange', this.activeSection);
        }
    }

    /**
     * Private helper to read theme preferences from LocalStorage or system queries.
     */
    _initializeTheme() {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'enabled') {
            return 'dark';
        } else if (savedMode === 'disabled') {
            return 'light';
        }
        // Fall back to media query matching
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }
}
