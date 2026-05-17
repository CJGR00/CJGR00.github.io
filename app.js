import { PortfolioModel } from './model/PortfolioModel.js';
import { PortfolioView } from './view/PortfolioView.js';
import { PortfolioController } from './controller/PortfolioController.js';

/**
 * Bootstrap the Portfolio Application
 */
document.addEventListener('DOMContentLoaded', () => {
    const model = new PortfolioModel();
    const view = new PortfolioView();
    const controller = new PortfolioController(model, view);
    
    // Start MVC loop
    controller.init();
});
