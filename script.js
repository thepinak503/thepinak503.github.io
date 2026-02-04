import '@material/web/all.js';

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
	function smoothScrollTo(targetId) {
		const targetEl = document.querySelector(targetId);
		if (!targetEl) return;
		targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
	// legacy anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const targetId = this.getAttribute('href');
			if (!targetId) return;
			const targetEl = document.querySelector(targetId);
			if (!targetEl) return;
			e.preventDefault();
			smoothScrollTo(targetId);
		});
	});
	// Material hero buttons -> link to standalone pages
	const btnWork = document.getElementById('btn-view-work');
	if (btnWork) btnWork.addEventListener('click', () => { window.location.href = 'projects.html'; });
	const btnAbout = document.getElementById('btn-about-me');
	if (btnAbout) btnAbout.addEventListener('click', () => { window.location.href = 'about.html'; });

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

	// Contact form enhanced validation + status text
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

			if (!name || !email || !message) {
				if (status) status.textContent = 'Please fill out all fields.';
				return;
			}
			if (!/^\S+@\S+\.\S+$/.test(email)) {
				if (status) status.textContent = 'Please enter a valid email address.';
				return;
			}
			if (website) {
				try { new URL(website); }
				catch {
					if (status) status.textContent = 'Please enter a valid website URL (including https://).';
					return;
				}
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

	// Lazy-load dynamic projects app
	const projectsMount = document.getElementById('projects-app');
	if (projectsMount && 'IntersectionObserver' in window) {
		const once = { loaded: false };
		const loader = () => {
			if (once.loaded) return;
			once.loaded = true;
			import('./web-components/projects-app.js');
		};
		const obs = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					loader();
					obs.disconnect();
				}
			});
		}, { rootMargin: '200px 0px' });
		obs.observe(projectsMount);
	}

	// Animated hero background (particles) + typewriter subtitle
	(function mountHeroEffects() {
		const canvas = document.getElementById('hero-canvas');
		const subtitle = document.getElementById('hero-subtitle');
		const spotlight = document.getElementById('hero-spotlight');
		if (!canvas || !subtitle) return;
		const ctx = canvas.getContext('2d');
		let width = 0, height = 0, raf = 0;
		const particles = [];
		const PARTICLE_COUNT = 60;
		const DPR = Math.min(2, window.devicePixelRatio || 1);

		function resize() {
			const rect = canvas.getBoundingClientRect();
			width = Math.floor(rect.width);
			height = Math.floor(rect.height);
			canvas.width = Math.floor(width * DPR);
			canvas.height = Math.floor(height * DPR);
			ctx.scale(DPR, DPR);
		}

		function rand(min, max) { return Math.random() * (max - min) + min; }

		function initParticles() {
			particles.length = 0;
			for (let i = 0; i < PARTICLE_COUNT; i++) {
				particles.push({
					x: rand(0, width),
					y: rand(0, height),
					r: rand(1, 2.5),
					opacity: rand(0.3, 0.8),
					vx: rand(-0.3, 0.3),
					vy: rand(-0.15, 0.15)
				});
			}
		}

		function step() {
			ctx.clearRect(0, 0, width, height);
			ctx.save();
			for (const p of particles) {
				p.x += p.vx; p.y += p.vy;
				if (p.x < -5) p.x = width + 5; if (p.x > width + 5) p.x = -5;
				if (p.y < -5) p.y = height + 5; if (p.y > height + 5) p.y = -5;
				ctx.globalAlpha = p.opacity;
				const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
				grad.addColorStop(0, 'rgba(124,58,237,0.6)');
				grad.addColorStop(1, 'rgba(124,58,237,0)');
				ctx.fillStyle = grad;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.restore();
			raf = requestAnimationFrame(step);
		}

		const onResize = () => { resize(); initParticles(); };
		window.addEventListener('resize', onResize);
		resize(); initParticles(); step();

		// Spotlight follows pointer (reduced motion safe)
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (spotlight && !prefersReduced) {
			const update = (x, y) => {
				spotlight.style.setProperty('--x', x + 'px');
				spotlight.style.setProperty('--y', y + 'px');
			};
			window.addEventListener('pointermove', (e) => update(e.clientX, e.clientY), { passive: true });
		}

		// Magnetic buttons
		const magnets = document.querySelectorAll('.magnetic');
		magnets.forEach(el => {
			const strength = 20;
			function onMove(e) {
				const rect = el.getBoundingClientRect();
				const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
				const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
				el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
			}
			function reset() { el.style.transform = ''; }
			el.addEventListener('pointermove', onMove);
			el.addEventListener('pointerleave', reset);
		});

		// Reactive buttons & links (tilt + ripple on press)
		const reactiveNodes = document.querySelectorAll('button, a, md-filled-button, md-outlined-button, .btn, .like-btn');
		reactiveNodes.forEach(node => {
			node.classList.add('reactive','ripple-host');
			node.addEventListener('pointerenter', () => node.classList.add('is-hover'));
			node.addEventListener('pointerleave', () => { node.classList.remove('is-hover'); node.style.removeProperty('--tx'); node.style.removeProperty('--ty'); });
			node.addEventListener('pointerdown', (e) => {
				node.classList.add('is-pressed');
				const rect = node.getBoundingClientRect();
				const ripple = document.createElement('span');
				ripple.className = 'ripple';
				ripple.style.left = (e.clientX - rect.left) + 'px';
				ripple.style.top = (e.clientY - rect.top) + 'px';
				node.appendChild(ripple);
				setTimeout(() => ripple.remove(), 650);
			});
			node.addEventListener('pointerup', () => node.classList.remove('is-pressed'));
			node.addEventListener('pointermove', (e) => {
				const rect = node.getBoundingClientRect();
				const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
				const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
				node.style.setProperty('--tx', (dx * 4) + 'px');
				node.style.setProperty('--ty', (dy * 4) + 'px');
			});
		});

		// Typewriter
		const phrases = [
			'Developer',
			'System enthusiast',
			'Lifelong learner'
		];
		let pi = 0, ci = 0, deleting = false;
		function typeStep() {
			const current = phrases[pi % phrases.length];
			if (!deleting) {
				ci++;
				if (ci >= current.length + 3) deleting = true;
			} else {
				ci--;
				if (ci <= 0) { deleting = false; pi++; }
			}
			subtitle.textContent = current.slice(0, Math.max(0, ci));
			setTimeout(typeStep, deleting ? 60 : 120);
		}
		setTimeout(typeStep, 500);

		// Cleanup on page hide
		document.addEventListener('visibilitychange', () => {
			if (document.hidden) cancelAnimationFrame(raf); else step();
		});
	})();
});


