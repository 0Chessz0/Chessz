// simple fade transitions + attach behavior on load
document.addEventListener('DOMContentLoaded', () => {
  // fade-in
  document.body.classList.add('fade-in');

  // nav link fade-out then navigate (internal)
  document.querySelectorAll('.nav a, .btn-cta, .ghost, .project-tile').forEach(el => {
    el.addEventListener('click', (e) => {
      const href = el.getAttribute('href');
      // ignore external/new-tab links or anchors
      if (!href || href.startsWith('http') || el.target === '_blank' || href.startsWith('#')) return;
      e.preventDefault();
      document.body.classList.remove('fade-in');
      document.body.classList.add('fade-out');
      setTimeout(() => { window.location = href; }, 320);
    });
  });
});
