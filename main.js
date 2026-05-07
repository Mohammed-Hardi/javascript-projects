// ===== TAB SWITCHING =====
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabBtns.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.style.borderBottomColor = 'transparent';
        b.style.color = 'var(--gray-600)';
      });
      tabContents.forEach(c => {
        c.classList.remove('active');
        c.style.display = 'none';
      });

      // Add active class to clicked button
      btn.classList.add('active');
      btn.style.borderBottomColor = 'var(--primary)';
      btn.style.color = 'var(--primary)';

      // Show target content
      const targetId = btn.getAttribute('data-tab');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add('active');
        target.style.display = 'block';
      }
    });
  });

  // Set initial state for active tab
  const activeBtn = document.querySelector('.tab-btn.active');
  if (activeBtn) {
    activeBtn.style.borderBottomColor = 'var(--primary)';
    activeBtn.style.color = 'var(--primary)';
  }
}

// ===== PROGRESS BARS ANIMATION =====
function animateProgressBars() {
  const fills = document.querySelectorAll('.progress-fill');
  fills.forEach(fill => {
    const target = fill.getAttribute('data-width') || '0';
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.width = target + '%';
    }, 200);
  });
}

// ===== NOTIFICATION TOAST =====
function showNotification(message) {
  let notif = document.getElementById('notification');
  if (!notif) {
    notif = document.createElement('div');
    notif.className = 'notification';
    notif.id = 'notification';
    document.body.appendChild(notif);
  }
  
  // Apply styles directly for robustness
  notif.style.display = 'block';
  notif.style.position = 'fixed';
  notif.style.bottom = '20px';
  notif.style.right = '20px';
  notif.style.background = '#111827';
  notif.style.color = '#ffffff';
  notif.style.padding = '1rem 1.5rem';
  notif.style.borderRadius = '8px';
  notif.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
  notif.style.zIndex = '9999';
  notif.style.transition = 'opacity 0.3s ease';
  notif.style.opacity = '0';
  
  notif.textContent = message;
  
  // Fade in
  setTimeout(() => {
    notif.style.opacity = '1';
  }, 10);

  // Fade out and hide
  setTimeout(() => {
    notif.style.opacity = '0';
    setTimeout(() => {
      notif.style.display = 'none';
    }, 300);
  }, 3000);
}

// ===== UPLOAD ZONE =====
function initUpload() {
  const zone = document.getElementById('uploadZone');
  
  if (!zone) return;

  // Create hidden file input if it doesn't exist
  let input = document.getElementById('fileInput');
  if (!input) {
    input = document.createElement('input');
    input.type = 'file';
    input.id = 'fileInput';
    input.style.display = 'none';
    document.body.appendChild(input);
  }

  zone.addEventListener('click', () => input.click());

  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.style.borderColor = 'var(--primary-dark)';
    zone.style.background = 'var(--primary-light)';
  });

  zone.addEventListener('dragleave', () => {
    zone.style.borderColor = 'var(--primary)';
    zone.style.background = 'var(--white)';
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.style.borderColor = 'var(--primary)';
    zone.style.background = 'var(--white)';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      showNotification(`✅ "${files[0].name}" uploaded successfully!`);
    }
  });

  input.addEventListener('change', () => {
    if (input.files.length > 0) {
      showNotification(`✅ "${input.files[0].name}" uploaded successfully!`);
    }
  });
}

// ===== DISCUSSIONS: Post new message =====
function initDiscussions() {
  const form = document.getElementById('discussionForm');
  const input = document.getElementById('discussionInput');
  const list = document.getElementById('discussionList');

  if (!form || !input || !list) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const item = document.createElement('div');
    item.className = 'discussion-item';
    item.style.padding = '1.5rem';
    item.style.border = '1px solid var(--gray-100)';
    item.style.borderRadius = '12px';
    item.style.marginBottom = '1rem';
    item.style.background = '#f9fafb';
    
    item.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
        <div style="width:36px; height:36px; border-radius:50%; background:var(--accent); color:white; display:flex; align-items:center; justify-content:center; font-weight:700;">F</div>
        <span style="font-weight:700;">You (Fadlan)</span>
        <span class="badge badge-blue">Student</span>
        <span style="font-size:0.75rem; color:var(--gray-400); margin-left:auto;">Just now</span>
      </div>
      <div style="color:var(--gray-800); font-size:0.95rem;">${text}</div>
      <div style="margin-top:1rem; font-size:0.85rem; color:var(--primary); font-weight:600;">💬 0 replies</div>
    `;
    
    list.prepend(item);
    input.value = '';
    showNotification('✅ Comment posted successfully!');
  });
}

// ===== NAVIGATION ACTIVE STATE =====
function initNavigation() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTabs();
  animateProgressBars();
  initUpload();
  initDiscussions();
  
  // Add some global button click listeners for buttons that don't have onclick
  document.querySelectorAll('.btn').forEach(btn => {
    if (!btn.hasAttribute('onclick') && btn.tagName === 'BUTTON') {
      btn.addEventListener('click', () => {
        const text = btn.textContent.trim();
        showNotification(`Action "${text}" triggered!`);
      });
    }
  });
});
