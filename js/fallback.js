function addBasicKeyboardNav() {
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && el.tagName === 'A') {
        el.click();
      }
    });
  });
}

function addFallbackSwitcher() {
  const currentPath = window.location.pathname;
  const fileName = currentPath.split('/').pop() || 'index.html';
  
  const switchButton = document.createElement('div');
  switchButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background: var(--bg-secondary);
    border: 2px solid var(--accent-primary);
    color: var(--accent-primary);
    cursor: pointer;
    z-index: 1000;
    font-size: 0.9rem;
  `;
  switchButton.textContent = 'Switch to Full Version';
  switchButton.setAttribute('role', 'button');
  switchButton.setAttribute('tabindex', '0');
  
  switchButton.addEventListener('click', () => {
    window.location.href = `../${fileName}`;
  });
  
  switchButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = `../${fileName}`;
    }
  });
  
  document.body.appendChild(switchButton);
}

function init() {
  addBasicKeyboardNav();
  addFallbackSwitcher();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
