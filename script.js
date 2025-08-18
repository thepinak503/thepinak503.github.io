document.addEventListener('DOMContentLoaded', () => {
	const root = document.documentElement;
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());

	// Theme handling with persistence
	const themeToggle = document.getElementById('theme-toggle');
	const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	const storedTheme = localStorage.getItem('theme');
	const initialTheme = storedTheme || (preferredDark ? 'dark' : 'light');
	applyTheme(initialTheme);

	function applyTheme(theme) {
		root.setAttribute('data-theme', theme);
		try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
		if (themeToggle) themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

		const icon = document.getElementById('theme-icon');
		if (icon) icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
	}

	if (themeToggle) {
		themeToggle.addEventListener('click', () => {
			const next = (root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
			applyTheme(next);
		});
	}

	// Smooth scrolling for in-page anchors
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const targetId = this.getAttribute('href');
			if (!targetId) return;
			const targetEl = document.querySelector(targetId);
			if (!targetEl) return;
			e.preventDefault();
			targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	});

	// Hamburger menu toggle with ARIA updates
	const hamburger = document.getElementById('hamburger-menu');
	const navLinks = document.querySelector('.nav-links');
	if (hamburger && navLinks) {
		hamburger.addEventListener('click', () => {
			const expanded = hamburger.getAttribute('aria-expanded') === 'true';
			hamburger.setAttribute('aria-expanded', String(!expanded));
			navLinks.classList.toggle('active');
		});
		// Close menu when clicking a link (mobile)
		navLinks.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				if (navLinks.classList.contains('active')) {
					navLinks.classList.remove('active');
					hamburger.setAttribute('aria-expanded', 'false');
				}
			});
		});
	}

	// Active section highlighting
	const sections = Array.from(document.querySelectorAll('main section[id]'));
	const navMap = new Map();
	document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
		const id = a.getAttribute('href') || '';
		navMap.set(id.replace('#', ''), a);
	});

	if ('IntersectionObserver' in window && sections.length) {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return;
				const id = entry.target.getAttribute('id');
				if (!id) return;
				setActiveNav(id);
			});
		}, { rootMargin: '0px 0px -40% 0px', threshold: 0.4 });
		sections.forEach(sec => observer.observe(sec));
	}

	function setActiveNav(id) {
		navMap.forEach((a, key) => {
			const isActive = key === id;
			a.classList.toggle('active', isActive);
			if (isActive) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
		});
	}

	// Contact form enhanced validation + honeypot + status text
	const contactForm = document.getElementById('contact-form');
	if (contactForm) {
		const status = document.getElementById('form-status');
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();
			const name = this.querySelector('input[name="name"]').value.trim();
			const email = this.querySelector('input[name="email"]').value.trim();
			const message = this.querySelector('textarea[name="message"]').value.trim();
			const websiteField = this.querySelector('input[name="website"]');
			const website = (websiteField && websiteField.value ? websiteField.value : '').trim();

			if (website) {
				// Honeypot caught: silently pass as success
				this.reset();
				if (status) status.textContent = 'Thank you!';
				return;
			}

			if (!name || !email || !message) {
				if (status) status.textContent = 'Please fill out all fields.';
				return;
			}
			if (!/^\S+@\S+\.\S+$/.test(email)) {
				if (status) status.textContent = 'Please enter a valid email address.';
				return;
			}

			const submitBtn = this.querySelector('button[type="submit"]');
			if (submitBtn) submitBtn.disabled = true;
			if (status) status.textContent = 'Sending…';

			// Simulate async submission (no backend on GitHub Pages)
			setTimeout(() => {
				if (status) status.textContent = 'Message sent! I will get back to you soon.';
				this.reset();
				if (submitBtn) submitBtn.disabled = false;
			}, 800);
		});
	}
});


