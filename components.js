/* ============================================================
   Emagon Eye Clinic — components.js
   Renders the shared public header/footer and the portal shells
   (patient / doctor / admin) so every page has one consistent,
   real navigation system instead of duplicated markup.
   ============================================================ */

const UI = (() => {

  const PUBLIC_LINKS = [
    { key: 'index', label: 'Home', href: 'index.html' },
    { key: 'services', label: 'Services', href: 'services.html' },
    { key: 'doctors', label: 'Doctors', href: 'doctors.html' },
    { key: 'about', label: 'About', href: 'about.html' },
    { key: 'contact', label: 'Contact', href: 'contact.html' }
  ];

  function logoMark(size) {
    size = size || 36;
    return `<span style="width:${size}px;height:${size}px" class="inline-flex items-center justify-center rounded-2xl bg-sky-500 text-white shadow-card shrink-0">
      <i data-lucide="eye" style="width:${size * 0.55}px;height:${size * 0.55}px"></i>
    </span>`;
  }

  function renderPublicHeader(active) {
    const el = document.getElementById('site-header');
    if (!el) return;
    const links = PUBLIC_LINKS.map(l => `<a href="${l.href}" class="nav-link text-sm text-slate-600 hover:text-sky-700 transition-colors" ${l.key === active ? 'aria-current="page"' : ''}>${l.label}</a>`).join('');
    const mobileLinks = PUBLIC_LINKS.map(l => `<a href="${l.href}" class="block py-3 px-4 rounded-xl text-base ${l.key === active ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'}">${l.label}</a>`).join('');
    el.innerHTML = `
    <a href="#main" class="skip-link">Skip to content</a>
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        <a href="index.html" class="flex items-center gap-3">
          ${logoMark(40)}
          <span class="leading-tight">
            <span class="block font-semibold text-ink text-[15px]">Emagon Eye Clinic</span>
            <span class="block text-[11px] text-slate-500">Abuja, Nigeria</span>
          </span>
        </a>
        <nav class="hidden lg:flex items-center gap-8" aria-label="Primary">${links}</nav>
        <div class="hidden lg:flex items-center gap-3">
          <a href="patient-login.html" class="text-sm font-medium text-slate-600 hover:text-sky-700 px-3 py-2">Patient Login</a>
          <a href="book.html" class="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-2.5 rounded-2xl shadow-card transition-colors">
            Book Appointment <i data-lucide="arrow-right" style="width:16px;height:16px"></i>
          </a>
        </div>
        <button id="mobile-menu-btn" class="lg:hidden p-2 -mr-2 rounded-xl text-slate-700" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
          <i data-lucide="menu" style="width:24px;height:24px"></i>
        </button>
      </div>
      <div id="mobile-menu" class="lg:hidden hidden border-t border-slate-100 bg-white px-4 pb-4">
        <nav class="pt-2 flex flex-col gap-1" aria-label="Mobile">${mobileLinks}</nav>
        <div class="mt-3 flex flex-col gap-2 px-1">
          <a href="patient-login.html" class="text-center border border-slate-200 rounded-2xl py-2.5 text-sm font-medium text-slate-700">Patient Login</a>
          <a href="book.html" class="text-center bg-sky-500 text-white rounded-2xl py-2.5 text-sm font-semibold">Book Appointment</a>
        </div>
      </div>
    </header>`;
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        const isHidden = menu.classList.contains('hidden');
        menu.classList.toggle('hidden');
        btn.setAttribute('aria-expanded', String(isHidden));
        btn.innerHTML = isHidden ? '<i data-lucide="x" style="width:24px;height:24px"></i>' : '<i data-lucide="menu" style="width:24px;height:24px"></i>';
        EMAGON.initIcons();
      });
    }
    EMAGON.initIcons();
  }

  function renderPublicFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;
    el.innerHTML = `
    <footer class="bg-sky-50 border-t border-sky-100 text-slate-600 mt-24">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div class="md:col-span-2 md:pr-8">
          <a href="index.html" class="flex items-center gap-3 mb-4">
            ${logoMark(36)}
            <span class="font-semibold text-ink">Emagon Eye Clinic</span>
          </a>
          <p class="text-sm text-slate-500 max-w-sm leading-relaxed">Premium, modern eye care in the heart of Abuja — from routine eye tests to cataract surgery, LASIK and prescription eyewear.</p>
          <div class="flex gap-3 mt-5">
            <a href="tel:+2348001234567" class="w-10 h-10 rounded-full bg-white text-sky-600 shadow-card hover:bg-sky-500 hover:text-white flex items-center justify-center transition-colors" aria-label="Call us"><i data-lucide="phone" style="width:16px;height:16px"></i></a>
            <a href="mailto:care@emagoneye.ng" class="w-10 h-10 rounded-full bg-white text-sky-600 shadow-card hover:bg-sky-500 hover:text-white flex items-center justify-center transition-colors" aria-label="Email us"><i data-lucide="mail" style="width:16px;height:16px"></i></a>
            <a href="https://wa.me/2348001234567" class="w-10 h-10 rounded-full bg-white text-sky-600 shadow-card hover:bg-sky-500 hover:text-white flex items-center justify-center transition-colors" aria-label="WhatsApp us"><i data-lucide="message-circle" style="width:16px;height:16px"></i></a>
          </div>
        </div>
        <div>
          <h3 class="text-ink text-sm font-semibold mb-4">Explore</h3>
          <ul class="space-y-2.5 text-sm text-slate-500">
            <li><a href="services.html" class="hover:text-sky-700">Services</a></li>
            <li><a href="doctors.html" class="hover:text-sky-700">Our Doctors</a></li>
            <li><a href="about.html" class="hover:text-sky-700">About Emagon</a></li>
            <li><a href="book.html" class="hover:text-sky-700">Book an Appointment</a></li>
            <li><a href="patient-shop.html" class="hover:text-sky-700">Shop Glasses</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-ink text-sm font-semibold mb-4">Visit Us</h3>
          <ul class="space-y-2.5 text-sm text-slate-500">
            <li class="flex gap-2"><i data-lucide="map-pin" style="width:16px;height:16px" class="mt-0.5 shrink-0"></i>Plot 14, Gana Street, Maitama, Abuja</li>
            <li class="flex gap-2"><i data-lucide="clock" style="width:16px;height:16px" class="mt-0.5 shrink-0"></i>Mon–Sat, 8:00 AM – 7:00 PM</li>
            <li class="flex gap-2"><i data-lucide="phone" style="width:16px;height:16px" class="mt-0.5 shrink-0"></i>0800 123 4567</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-sky-100">
        <div class="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; ${new Date().getFullYear()} Emagon Eye Clinic, Abuja. All rights reserved.</p>
          <div class="flex gap-5">
            <a href="doctor-login.html" class="hover:text-sky-700">Staff Login</a>
            <a href="admin-login.html" class="hover:text-sky-700">Admin Login</a>
          </div>
        </div>
      </div>
    </footer>`;
    EMAGON.initIcons();
  }

  // ---------- Portal shell (patient / doctor / admin) ----------
  function portalShell(opts) {
    // opts: { role, active, links:[{key,label,href,icon}], title, session, prefix }
    const el = document.getElementById('site-header');
    if (!el) return;
    const p = opts.prefix || '';
    const roleColor = { patient: 'bg-sky-500', doctor: 'bg-sky-700', admin: 'bg-sky-900' }[opts.role];
    const roleLabel = { patient: 'Patient Portal', doctor: 'Doctor Portal', admin: 'Admin Console' }[opts.role];

    const navItems = opts.links.map(l => `
      <a href="${opts.role}-${l.href}" class="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${l.key === opts.active ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50'}" ${l.key === opts.active ? 'aria-current="page"' : ''}>
        <i data-lucide="${l.icon}" style="width:18px;height:18px"></i>${l.label}
      </a>`).join('');

    el.innerHTML = `
    <a href="#main" class="skip-link">Skip to content</a>
    <div class="lg:flex lg:min-h-screen">
      <aside id="portal-sidebar" class="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-slate-100 bg-white px-4 py-6">
        <a href="index.html" class="flex items-center gap-3 px-2 mb-8">
          ${logoMark(36)}
          <span class="leading-tight">
            <span class="block font-semibold text-ink text-sm">Emagon Eye Clinic</span>
            <span class="block text-[11px] text-slate-500">${roleLabel}</span>
          </span>
        </a>
        <nav class="flex flex-col gap-1" aria-label="Portal">${navItems}</nav>
        <div class="mt-auto pt-6 border-t border-slate-100">
          <div class="flex items-center gap-3 px-2 mb-3">
            <span class="w-9 h-9 rounded-full ${roleColor} text-white flex items-center justify-center text-xs font-semibold shrink-0">${(opts.session && opts.session.name ? opts.session.name : '?').split(' ').map(w => w[0]).slice(0, 2).join('')}</span>
            <span class="text-sm font-medium text-ink truncate">${opts.session ? opts.session.name : ''}</span>
          </div>
          <button id="logout-btn" class="w-full flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors">
            <i data-lucide="log-out" style="width:16px;height:16px"></i>Log out
          </button>
        </div>
      </aside>

      <div class="flex-1 min-w-0">
        <header class="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 flex items-center justify-between px-4 h-16">
          <a href="index.html" class="flex items-center gap-2">
            ${logoMark(32)}
            <span class="font-semibold text-ink text-sm">Emagon</span>
          </a>
          <span class="text-xs font-medium text-slate-500 px-2.5 py-1 rounded-full bg-sky-50">${roleLabel}</span>
          <button id="mobile-portal-btn" class="p-2 -mr-2 text-slate-700" aria-label="Open menu" aria-expanded="false"><i data-lucide="menu" style="width:22px;height:22px"></i></button>
        </header>
        <div id="mobile-portal-menu" class="hidden lg:hidden bg-white border-b border-slate-100 px-4 py-3">
          <nav class="flex flex-col gap-1" aria-label="Portal mobile">${navItems}</nav>
          <button id="logout-btn-mobile" class="mt-2 w-full flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium text-red-600 hover:bg-red-50"><i data-lucide="log-out" style="width:16px;height:16px"></i>Log out</button>
        </div>
        <main id="main" class="px-4 sm:px-6 lg:px-10 py-6 lg:py-10 max-w-7xl mx-auto w-full"></main>
      </div>
    </div>`;

    const btn = document.getElementById('mobile-portal-btn');
    const menu = document.getElementById('mobile-portal-menu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        const isHidden = menu.classList.contains('hidden');
        menu.classList.toggle('hidden');
        btn.setAttribute('aria-expanded', String(isHidden));
      });
    }
    const doLogout = () => EMAGON.logout();
    const lo1 = document.getElementById('logout-btn'); if (lo1) lo1.addEventListener('click', doLogout);
    const lo2 = document.getElementById('logout-btn-mobile'); if (lo2) lo2.addEventListener('click', doLogout);
    EMAGON.initIcons();
  }

  function renderPatientPortal(active, session) {
    portalShell({
      role: 'patient', active, session,
      links: [
        { key: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: 'layout-dashboard' },
        { key: 'appointments', label: 'Appointments', href: 'appointments.html', icon: 'calendar-check' },
        { key: 'prescriptions', label: 'Prescriptions', href: 'prescriptions.html', icon: 'clipboard-list' },
        { key: 'bills', label: 'Billing', href: 'bills.html', icon: 'receipt' },
        { key: 'shop', label: 'Shop Glasses', href: 'shop.html', icon: 'shopping-bag' }
      ]
    });
  }

  function renderDoctorPortal(active, session) {
    portalShell({
      role: 'doctor', active, session,
      links: [
        { key: 'dashboard', label: "Today's Queue", href: 'dashboard.html', icon: 'layout-dashboard' },
        { key: 'calendar', label: 'Calendar', href: 'calendar.html', icon: 'calendar-days' }
      ]
    });
  }

  function renderAdminPortal(active, session) {
    portalShell({
      role: 'admin', active, session,
      links: [
        { key: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: 'layout-dashboard' }
      ]
    });
  }

  return { renderPublicHeader, renderPublicFooter, renderPatientPortal, renderDoctorPortal, renderAdminPortal, logoMark };
})();
