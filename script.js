// Snehamol Shiju - Modern Tech Portfolio JavaScript

// 1. Theme Toggle Management
(function initTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('portfolio-theme', 'dark');
        showToast('Switched to Dark Mode');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('portfolio-theme', 'light');
        showToast('Switched to Light Mode');
      }
    });
  }

  // 2. Mobile Navigation Menu
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.navlinks');
  
  if (menu && links) {
    menu.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? '✕' : '☰';
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') && !menu.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
        menu.textContent = '☰';
      }
    });

    // Close when clicking a nav link
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (links.classList.contains('open')) {
          links.classList.remove('open');
          menu.setAttribute('aria-expanded', 'false');
          menu.textContent = '☰';
        }
      });
    });
  }

  // 3. Contact Form Handler (if on contact page)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || '';
      const email = document.getElementById('form-email')?.value || '';
      const subject = document.getElementById('form-subject')?.value || 'Portfolio Contact Inquiry';
      const message = document.getElementById('form-message')?.value || '';

      const mailtoLink = `mailto:snehamolshiju2004@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\nMessage:\n' + message)}`;
      
      showToast('Opening your email client...');
      window.location.href = mailtoLink;
      contactForm.reset();
    });
  }

  // 4. Quick Copy Helper (e.g. for email/phone on click)
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`Could not copy automatically`);
        });
      }
    });
  });
});

// Helper: Toast Notifications
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
  toast.classList.add('show');
  
  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
