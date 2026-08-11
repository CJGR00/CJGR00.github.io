/**
 * PortfolioController Class
 * Bridges user interactions from the View to state modifications in the Model,
 * and updates the View when the Model notifies of state changes.
 */
export class PortfolioController {
    /**
     * @param {PortfolioModel} model 
     * @param {PortfolioView} view 
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    /**
     * Bootstraps the application bindings and initial renders.
     */
    init() {
        // 1. Tell View to compile structural templates using Model data
        this.view.render(this.model.data);

        // 2. Load and present initial application states
        this.view.updateSfx(this.model.sfxEnabled);
        this.view.updateActiveSection(this.model.activeSection);
        this.view.updateSkillsFilter(this.model.activeSkillsCategory);
        this.view.updateCertsFilter(this.model.activeCertsCategory);

        // 3. Register state observers on the Model
        this.model.addObserver('sfxChange', (enabled) => this.view.updateSfx(enabled));
        this.model.addObserver('menuChange', (isOpen) => this.view.updateMobileMenu(isOpen));
        this.model.addObserver('sectionChange', (sectionId) => this.view.updateActiveSection(sectionId));
        this.model.addObserver('skillsCategoryChange', (category) => this.view.updateSkillsFilter(category));
        this.model.addObserver('certsCategoryChange', (category) => {
            const searchVal = this.view.certsSearchInput ? this.view.certsSearchInput.value.toLowerCase().trim() : '';
            this.view.updateCertsFilter(category, searchVal);
        });
        this.model.addObserver('contactPresetChange', (preset) => this.view.updateContactPreset(preset, this.model.data.profile));

        // 4. Bind UI interactions from the View to Model mutations
        this.view.bindSfxToggle(() => this.model.toggleSfx());
        this.view.bindMobileMenuToggle((isOpen) => this.model.setMobileMenuState(isOpen));

        this.view.bindDesktopNavClick((targetSection) => {
            this.view.scrollToSection(targetSection);
            this.model.setActiveSection(targetSection);
        });

        this.view.bindMobileNavClick((targetSection) => {
            // Close mobile menu first, then scroll
            this.model.setMobileMenuState(false);
            this.view.scrollToSection(targetSection);
            this.model.setActiveSection(targetSection);
        });

        this.view.bindLogoClick((target) => {
            this.view.scrollToSection(target);
            this.model.setActiveSection('');
        });

        this.view.bindScrollDownClick((target) => {
            this.view.scrollToSection(target);
            this.model.setActiveSection(target);
        });

        this.view.bindHeroCTAViewProjects((target) => {
            this.view.scrollToSection(target);
            this.model.setActiveSection(target);
        });

        this.view.bindHeroCTAContactMe((target) => {
            this.view.scrollToSection(target);
            this.model.setActiveSection(target);
        });

        this.view.bindSkillsFilter((category) => {
            this.model.setSkillsCategory(category);
        });

        this.view.bindCertsFilter((category, searchVal) => {
            this.model.setCertsCategory(category);
            this.view.updateCertsFilter(category, searchVal);
        });

        this.view.bindContactPreset((preset) => {
            this.model.setContactPreset(preset);
        });

        // 5. Connect View's scroll detection back into the Controller
        this.view.bindScrollSectionActive((sectionId) => {
            this.model.setActiveSection(sectionId);
        });
    }
}
