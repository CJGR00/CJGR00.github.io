import { PortfolioModel } from './model/PortfolioModel.js';
import { PortfolioView } from './view/PortfolioView.js';
import { PortfolioController } from './controller/PortfolioController.js';

/**
 * Terminal Loading Screen Animation
 */
function initTerminalLoader() {
    const loader = document.getElementById('terminal-loader');
    const terminalBody = document.getElementById('terminal-body');
    const progressBar = document.getElementById('terminal-progress-bar');
    const app = document.getElementById('app');
    
    if (!loader || !terminalBody || !progressBar || !app) return;
    
    const lines = terminalBody.querySelectorAll('.terminal-line');
    const totalDuration = 3500; // Total animation duration in ms
    const lineCount = lines.length;
    
    // Animate each line with its delay
    lines.forEach((line, index) => {
        const delay = parseInt(line.getAttribute('data-delay')) || 0;
        setTimeout(() => {
            line.classList.add('animate');
        }, delay);
    });
    
    // Animate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        progressBar.style.width = `${progress}%`;
    }, totalDuration / 50);
    
    // Hide loader and show app after animation completes
    setTimeout(() => {
        loader.classList.add('hidden');
        app.classList.add('loaded');
        
        // Remove loader from DOM after transition
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, totalDuration + 500);
}

/**
 * Bootstrap the Portfolio Application
 */
document.addEventListener('DOMContentLoaded', () => {
    // Start terminal loading animation
    initTerminalLoader();
    
    const model = new PortfolioModel();
    const view = new PortfolioView();
    const controller = new PortfolioController(model, view);
    
    // Start MVC loop
    controller.init();
});
