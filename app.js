/* ============================================================
   Emagon Eye Clinic — app.js
   Shared "database" (localStorage), auth, and utility functions
   used by every page in the site. This is the single source of
   truth all pages read/write to, so a booking made on book.html
   is instantly visible in the patient, doctor and admin areas.
   ============================================================ */

const EMAGON = (() => {

  const KEYS = {
    patients: 'emagon_patients',
    appointments: 'emagon_appointments',
    prescriptions: 'emagon_prescriptions',
    bills: 'emagon_bills',
    products: 'emagon_products',
    orders: 'emagon_orders',
    cart: 'emagon_cart',
    session: 'emagon_session',
    seeded: 'emagon_seeded_v1'
  };

  const DOCTORS = [
    {
      id: 'doc-001',
      name: 'Dr. Amara Okeke',
      title: 'Lead Consultant Ophthalmologist',
      specialty: 'Cataract & Refractive Surgery',
      bio: 'Dr. Okeke has performed over 4,000 cataract and LASIK procedures across Abuja and Lagos, and trained at the Moorfields Eye Hospital, London. She leads Emagon\'s surgical programme.',
      initials: 'AO',
      days: 'Mon, Tue, Thu, Fri',
      photoBg: '#0EA5E9'
    },
    {
      id: 'doc-002',
      name: 'Dr. Chinedu Bassey',
      title: 'Consultant Ophthalmologist',
      specialty: 'Glaucoma & Medical Retina',
      bio: 'Dr. Bassey specialises in early glaucoma detection and long-term retina care, with a focus on diabetic eye disease management for adults across the FCT.',
      initials: 'CB',
      days: 'Mon, Wed, Fri, Sat',
      photoBg: '#0284c7'
    },
    {
      id: 'doc-003',
      name: 'Dr. Fatima Suleiman',
      title: 'Paediatric Ophthalmologist',
      specialty: 'Children\'s Vision & Squint',
      bio: 'Dr. Suleiman runs Emagon\'s paediatric clinic, treating lazy eye, squint and childhood vision screening for schools across Abuja.',
      initials: 'FS',
      days: 'Tue, Wed, Thu, Sat',
      photoBg: '#0369a1'
    },
    {
      id: 'doc-004',
      name: 'Dr. Tunde Adigun',
      title: 'Optometrist',
      specialty: 'Contact Lenses & Vision Correction',
      bio: 'Dr. Adigun leads contact lens fittings and comprehensive eye tests, helping patients choose between glasses, contacts and laser correction.',
      initials: 'TA',
      days: 'Mon–Sat',
      photoBg: '#38bdf8'
    }
  ];

  const SERVICES = [
    { id: 'srv-eye-test', name: 'Comprehensive Eye Test', price: 15000, duration: '30–45 min', desc: 'Full visual acuity, refraction and eye health check using digital diagnostic equipment.', icon: 'scan-eye' },
    { id: 'srv-cataract', name: 'Cataract Surgery', price: 450000, duration: 'Half-day procedure', desc: 'Micro-incision cataract removal with premium lens implant options and same-day discharge.', icon: 'circle-dot' },
    { id: 'srv-lasik', name: 'LASIK Laser Correction', price: 650000, duration: '20 min per eye', desc: 'Bladeless laser vision correction for short-sight, long-sight and astigmatism.', icon: 'zap' },
    { id: 'srv-glaucoma', name: 'Glaucoma Screening & Management', price: 25000, duration: '45 min', desc: 'Eye pressure testing, optic nerve imaging and ongoing pressure-lowering treatment plans.', icon: 'activity' },
    { id: 'srv-retina', name: 'Diabetic & Medical Retina Clinic', price: 30000, duration: '45–60 min', desc: 'Retinal imaging and management for diabetic retinopathy and other retina conditions.', icon: 'radar' },
    { id: 'srv-paeds', name: 'Children\'s Eye Clinic', price: 12000, duration: '30 min', desc: 'Vision screening, squint assessment and lazy-eye treatment for children from age 2.', icon: 'baby' },
    { id: 'srv-contacts', name: 'Contact Lens Fitting', price: 18000, duration: '40 min', desc: 'Fitting and training for soft, toric and multifocal contact lenses.', icon: 'circle' },
    { id: 'srv-glasses', name: 'Prescription Glasses & Dispensing', price: 8000, duration: '20 min', desc: 'Frame styling and lens dispensing, from single vision to progressive lenses.', icon: 'glasses' }
  ];

  const PRODUCTS = [
    { id: 'p-001', name: 'Aurora Round — Tortoise', category: 'Optical Frames', price: 32000, desc: 'Acetate round frame with a warm tortoise finish. Lightweight, all-day comfort.', icon: 'glasses' },
    { id: 'p-002', name: 'Zenith Rectangle — Matte Black', category: 'Optical Frames', price: 28500, desc: 'Slim titanium rectangle frame built for daily wear and long screen hours.', icon: 'glasses' },
    { id: 'p-003', name: 'Halo Cat-Eye — Blush', category: 'Optical Frames', price: 35000, desc: 'Soft cat-eye silhouette in blush acetate, finished with rose-gold hardware.', icon: 'glasses' },
    { id: 'p-004', name: 'Meridian Aviator — Gunmetal', category: 'Sunglasses', price: 42000, desc: 'Polarised UV400 aviator lenses on a gunmetal frame for daily sun protection.', icon: 'sun' },
    { id: 'p-005', name: 'Solstice Wrap — Onyx', category: 'Sunglasses', price: 38000, desc: 'Sport wrap sunglasses with polarised lenses, ideal for driving and outdoor wear.', icon: 'sun' },
    { id: 'p-006', name: 'Junior Flex — Sky Blue', category: "Children's Frames", price: 21000, desc: 'Flexible, near-unbreakable frame sized for children aged 5–12.', icon: 'baby' },
    { id: 'p-007', name: 'Pure Comfort — Monthly Lenses', category: 'Contact Lenses', price: 15500, desc: 'Box of 6 monthly disposable soft contact lenses, breathable silicone hydrogel.', icon: 'circle' },
    { id: 'p-008', name: 'Daily Clear — Daily Lenses', category: 'Contact Lenses', price: 19000, desc: 'Box of 30 daily disposable lenses. No cleaning required, fresh every day.', icon: 'circle' },
    { id: 'p-009', name: 'Anti-Glare Lens Upgrade', category: 'Lens Add-ons', price: 9500, desc: 'Anti-reflective coating added to any frame — reduces screen glare and night halos.', icon: 'shield' },
    { id: 'p-010', name: 'Blue Light Filter Lenses', category: 'Lens Add-ons', price: 11000, desc: 'Blue-light filtering lens coating, recommended for heavy screen users.', icon: 'monitor' }
  ];

  function get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : (fallback !== undefined ? fallback : null);
    } catch (e) {
      console.error('EMAGON.get error', key, e);
      return fallback !== undefined ? fallback : null;
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('EMAGON.set error', key, e);
      return false;
    }
  }

  function uid(prefix) {
    return (prefix || 'id') + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function seed() {
    if (get(KEYS.seeded)) return;

    // Demo patient
    const demoPatientId = 'pat-demo-001';
    set(KEYS.patients, [
      { id: demoPatientId, name: 'Bilikisu Yusuf', email: 'bilikisu.yusuf@example.com', phone: '0803 555 0142', dob: '1994-03-12', gender: 'Female', address: 'Jabi, Abuja', createdAt: new Date(Date.now() - 86400000 * 40).toISOString() }
    ]);

    const today = new Date();
    const iso = (d) => d.toISOString().slice(0, 10);
    const addDays = (n) => { const d = new Date(today); d.setDate(d.getDate() + n); return d; };

    set(KEYS.appointments, [
      { id: uid('apt'), patientId: demoPatientId, patientName: 'Bilikisu Yusuf', doctorId: 'doc-001', doctorName: 'Dr. Amara Okeke', service: 'Comprehensive Eye Test', date: iso(addDays(-30)), time: '10:00', status: 'Completed', notes: 'Routine annual check.', createdAt: new Date(Date.now() - 86400000 * 35).toISOString() },
      { id: uid('apt'), patientId: demoPatientId, patientName: 'Bilikisu Yusuf', doctorId: 'doc-002', doctorName: 'Dr. Chinedu Bassey', service: 'Glaucoma Screening & Management', date: iso(addDays(0)), time: '11:30', status: 'Confirmed', notes: 'Follow-up on eye pressure readings.', createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
      { id: uid('apt'), patientId: 'pat-walkin-002', patientName: 'Emeka Nwosu', doctorId: 'doc-001', doctorName: 'Dr. Amara Okeke', service: 'Cataract Surgery', date: iso(addDays(0)), time: '09:00', status: 'Confirmed', notes: 'Pre-op assessment complete.', createdAt: new Date(Date.now() - 86400000 * 10).toISOString() },
      { id: uid('apt'), patientId: 'pat-walkin-003', patientName: 'Grace Okon', doctorId: 'doc-003', doctorName: 'Dr. Fatima Suleiman', service: "Children's Eye Clinic", date: iso(addDays(0)), time: '13:00', status: 'Pending', notes: 'First visit, referred by school.', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: uid('apt'), patientId: 'pat-walkin-004', patientName: 'Musa Ibrahim', doctorId: 'doc-002', doctorName: 'Dr. Chinedu Bassey', service: 'Diabetic & Medical Retina Clinic', date: iso(addDays(2)), time: '10:30', status: 'Pending', notes: '', createdAt: new Date().toISOString() }
    ]);

    set(KEYS.prescriptions, [
      { id: uid('rx'), patientId: demoPatientId, doctorId: 'doc-001', doctorName: 'Dr. Amara Okeke', date: iso(addDays(-30)), diagnosis: 'Mild dry eye syndrome, otherwise healthy eyes.', medications: [{ name: 'Systane Ultra Lubricant Drops', dosage: '1 drop each eye', duration: '3x daily for 4 weeks' }], notes: 'Reduce screen time where possible, review in 3 months.', scanName: '' }
    ]);

    set(KEYS.bills, [
      { id: uid('bill'), patientId: demoPatientId, appointmentId: null, description: 'Comprehensive Eye Test', amount: 15000, status: 'Paid', date: iso(addDays(-30)) },
      { id: uid('bill'), patientId: demoPatientId, appointmentId: null, description: 'Glaucoma Screening & Management', amount: 25000, status: 'Unpaid', date: iso(today) }
    ]);

    set(KEYS.products, PRODUCTS);
    set(KEYS.orders, []);
    set(KEYS.cart, []);
    set(KEYS.seeded, true);
  }

  // ---------- Session / Auth ----------
  function login(role, name, id) {
    set(KEYS.session, { role, name, id, since: new Date().toISOString() });
  }
  function currentSession() { return get(KEYS.session, null); }
  function logout() {
    localStorage.removeItem(KEYS.session);
    const file = location.pathname.split('/').pop();
    const role = file.startsWith('doctor-') ? 'doctor' : file.startsWith('admin-') ? 'admin' : 'patient';
    location.href = role + '-login.html';
  }
  function requireAuth(role, loginPath) {
    const s = currentSession();
    if (!s || s.role !== role) {
      location.href = loginPath || 'patient-login.html';
      return null;
    }
    return s;
  }

  // ---------- Formatting ----------
  function formatCurrency(n) {
    return '₦' + Number(n || 0).toLocaleString('en-NG');
  }
  function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr + (dateStr.length === 10 ? 'T00:00:00' : ''));
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  function formatTime(t) {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  // ---------- Toasts ----------
  function toast(message, type) {
    let region = document.getElementById('toast-region');
    if (!region) {
      region = document.createElement('div');
      region.id = 'toast-region';
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    const el = document.createElement('div');
    el.className = 'toast ' + (type || '');
    el.innerHTML = `<i data-lucide="${type === 'error' ? 'alert-circle' : type === 'success' ? 'check-circle-2' : 'info'}" style="width:16px;height:16px;flex-shrink:0"></i><span>${message}</span>`;
    region.appendChild(el);
    if (window.lucide) lucide.createIcons();
    setTimeout(() => { el.style.transition = 'opacity .3s'; el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 3200);
  }

  // ---------- Data accessors ----------
  const Doctors = {
    all: () => DOCTORS,
    byId: (id) => DOCTORS.find(d => d.id === id)
  };
  const Services = { all: () => SERVICES, byId: (id) => SERVICES.find(s => s.id === id) };
  const Products = { all: () => get(KEYS.products, PRODUCTS), byId: (id) => (get(KEYS.products, PRODUCTS)).find(p => p.id === id) };

  const Patients = {
    all: () => get(KEYS.patients, []),
    byId: (id) => (get(KEYS.patients, [])).find(p => p.id === id),
    byEmail: (email) => (get(KEYS.patients, [])).find(p => p.email.toLowerCase() === String(email).toLowerCase()),
    add: (patient) => {
      const list = get(KEYS.patients, []);
      const rec = Object.assign({ id: uid('pat'), createdAt: new Date().toISOString() }, patient);
      list.push(rec);
      set(KEYS.patients, list);
      return rec;
    },
    upsertByEmail: (patient) => {
      const list = get(KEYS.patients, []);
      const existing = list.find(p => p.email.toLowerCase() === String(patient.email).toLowerCase());
      if (existing) { Object.assign(existing, patient); set(KEYS.patients, list); return existing; }
      return Patients.add(patient);
    }
  };

  const Appointments = {
    all: () => get(KEYS.appointments, []),
    byPatient: (patientId) => Appointments.all().filter(a => a.patientId === patientId),
    byDoctor: (doctorId) => Appointments.all().filter(a => a.doctorId === doctorId),
    today: () => { const t = new Date().toISOString().slice(0, 10); return Appointments.all().filter(a => a.date === t); },
    add: (apt) => {
      const list = Appointments.all();
      const rec = Object.assign({ id: uid('apt'), status: 'Pending', createdAt: new Date().toISOString() }, apt);
      list.push(rec);
      set(KEYS.appointments, list);
      return rec;
    },
    updateStatus: (id, status) => {
      const list = Appointments.all();
      const rec = list.find(a => a.id === id);
      if (rec) { rec.status = status; set(KEYS.appointments, list); }
      return rec;
    },
    byId: (id) => Appointments.all().find(a => a.id === id)
  };

  const Prescriptions = {
    all: () => get(KEYS.prescriptions, []),
    byPatient: (patientId) => Prescriptions.all().filter(p => p.patientId === patientId).sort((a, b) => b.date.localeCompare(a.date)),
    add: (rx) => {
      const list = Prescriptions.all();
      const rec = Object.assign({ id: uid('rx'), date: new Date().toISOString().slice(0, 10) }, rx);
      list.push(rec);
      set(KEYS.prescriptions, list);
      return rec;
    }
  };

  const Bills = {
    all: () => get(KEYS.bills, []),
    byPatient: (patientId) => Bills.all().filter(b => b.patientId === patientId).sort((a, b) => b.date.localeCompare(a.date)),
    add: (bill) => {
      const list = Bills.all();
      const rec = Object.assign({ id: uid('bill'), status: 'Unpaid', date: new Date().toISOString().slice(0, 10) }, bill);
      list.push(rec);
      set(KEYS.bills, list);
      return rec;
    },
    markPaid: (id) => {
      const list = Bills.all();
      const rec = list.find(b => b.id === id);
      if (rec) { rec.status = 'Paid'; set(KEYS.bills, list); }
      return rec;
    }
  };

  const Cart = {
    get: () => get(KEYS.cart, []),
    add: (productId, qty) => {
      const cart = Cart.get();
      const line = cart.find(c => c.productId === productId);
      if (line) line.qty += (qty || 1);
      else cart.push({ productId, qty: qty || 1 });
      set(KEYS.cart, cart);
      return cart;
    },
    setQty: (productId, qty) => {
      let cart = Cart.get();
      if (qty <= 0) cart = cart.filter(c => c.productId !== productId);
      else { const line = cart.find(c => c.productId === productId); if (line) line.qty = qty; }
      set(KEYS.cart, cart);
      return cart;
    },
    remove: (productId) => { const cart = Cart.get().filter(c => c.productId !== productId); set(KEYS.cart, cart); return cart; },
    clear: () => set(KEYS.cart, []),
    total: () => Cart.get().reduce((sum, c) => { const p = Products.byId(c.productId); return sum + (p ? p.price * c.qty : 0); }, 0),
    count: () => Cart.get().reduce((n, c) => n + c.qty, 0)
  };

  const Orders = {
    all: () => get(KEYS.orders, []),
    byPatient: (patientId) => Orders.all().filter(o => o.patientId === patientId).sort((a, b) => b.date.localeCompare(a.date)),
    add: (order) => {
      const list = Orders.all();
      const rec = Object.assign({ id: uid('ord'), status: 'Processing', date: new Date().toISOString() }, order);
      list.push(rec);
      set(KEYS.orders, list);
      return rec;
    }
  };

  function initIcons() { if (window.lucide) lucide.createIcons(); }

  return {
    KEYS, seed, uid, get, set,
    login, currentSession, logout, requireAuth,
    formatCurrency, formatDate, formatTime, toast, initIcons,
    Doctors, Services, Products, Patients, Appointments, Prescriptions, Bills, Cart, Orders
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  EMAGON.seed();
  EMAGON.initIcons();
});
