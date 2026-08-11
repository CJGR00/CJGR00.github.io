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
    const lineCount = lines.length;
    const lineDelay = 300; // ms between each line
    const totalDuration = lineCount * lineDelay + 500; // total time for all lines + buffer
    
    // Hide all lines initially
    lines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(5px)';
        line.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    });
    
    // Show lines one by one
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * lineDelay);
    });
    
    // Animate progress bar
    let progress = 0;
    const progressStep = 100 / (totalDuration / 30);
    const progressInterval = setInterval(() => {
        progress += progressStep;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        progressBar.style.width = `${progress}%`;
    }, 30);
    
    // Hide loader and show app after animation completes
    setTimeout(() => {
        loader.classList.add('hidden');
        app.classList.add('loaded');
        
        // Remove loader from DOM after transition
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, totalDuration);
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
