// ─── STATE ────────────────────────────────────────────────
let assignments = JSON.parse(localStorage.getItem('trackr_v2') || '[]');
let filter = 'all';
let sortByDate = false;
let editingId = null;
let pendingDeleteId = null;
let countdownInterval = null;

const SUBJECTS_COLORS = {
  default: '#5B4FE8'
};

// ─── UTILS ───────────────────────────────────────────────
function save() {
  localStorage.setItem('trackr_v2', JSON.stringify(assignments));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function today() {
  const d = new Date();
  d.setHours(0,0,0,0);
  return d;
}

function parseDue(dateStr) {
  const [y,m,d] = dateStr.split('-').map(Number);
  return new Date(y, m-1, d);
}

function daysUntil(dateStr) {
  const due = parseDue(dateStr);
  const now = today();
  return Math.round((due - now) / 86400000);
}

function getStatus(a) {
  if (a.done) return 'done';
  const d = daysUntil(a.date);
  if (d < 0) return 'overdue';
  if (d <= 2) return 'soon';
  return 'ok';
}

function countdownText(dateStr, done) {
  if (done) return { text: 'Completed', cls: 'badge-done' };
  const d = daysUntil(dateStr);
  if (d < 0)  return { text: `${Math.abs(d)}d overdue`, cls: 'badge-overdue' };
  if (d === 0) return { text: 'Due today!', cls: 'badge-today' };
  if (d === 1) return { text: 'Due tomorrow', cls: 'badge-tomorrow' };
  if (d <= 7)  return { text: `Due in ${d} days`, cls: 'badge-soon' };
  return { text: `Due in ${d} days`, cls: 'badge-ok' };
}

function formatDate(dateStr) {
  const d = parseDue(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function minDate() {
  return today().toISOString().split('T')[0];
}

// ─── RENDER ───────────────────────────────────────────────
function render() {
  clearInterval(countdownInterval);

  let list = [...assignments];

  // Filter
  if (filter === 'pending') list = list.filter(a => !a.done);
  if (filter === 'done')    list = list.filter(a => a.done);

  // Sort
  if (sortByDate) {
    list.sort((a, b) => parseDue(a.date) - parseDue(b.date));
  } else {
    list.sort((a, b) => b.createdAt - a.createdAt);
  }

  // Progress
  const total = assignments.length;
  const done  = assignments.filter(a => a.done).length;
  const pct   = total === 0 ? 0 : Math.round((done / total) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent  = pct + '%';
  document.getElementById('progress-txt').textContent  = `${done} completed`;
  document.getElementById('stat-done').textContent  = done;
  document.getElementById('stat-total').textContent = total;

  // Build HTML
  const root = document.getElementById('list-root');
  if (!list.length) {
    root.innerHTML = `<div class="empty-state">
      <div class="empty-icon">📋</div>
      <h3>${filter === 'done' ? 'No completed assignments' : filter === 'pending' ? 'Nothing pending — great job!' : 'No assignments yet'}</h3>
      <p>${filter === 'all' ? 'Hit "Add Assignment" above to get started.' : 'Switch filter to see other tasks.'}</p>
    </div>`;
    return;
  }

  // Group by status sections (only when not filtered)
  const groups = filter === 'all'
    ? [
        { key: 'overdue', label: 'Overdue', items: list.filter(a => getStatus(a) === 'overdue') },
        { key: 'soon',    label: 'Due Soon', items: list.filter(a => getStatus(a) === 'soon') },
        { key: 'ok',      label: 'Upcoming', items: list.filter(a => getStatus(a) === 'ok') },
        { key: 'done',    label: 'Completed', items: list.filter(a => getStatus(a) === 'done') },
      ].filter(g => g.items.length)
    : [{ key: filter, label: '', items: list }];

  let html = '';
  groups.forEach(group => {
    if (group.label) html += `<div class="section-label">${group.label}</div>`;
    html += `<div class="cards-list" id="group-${group.key}">`;
    group.items.forEach(a => {
      if (editingId === a.id) {
        html += renderEditForm(a);
      } else {
        html += renderCard(a);
      }
    });
    html += `</div>`;
  });

  root.innerHTML = html;

  // Live countdowns
  countdownInterval = setInterval(() => {
    document.querySelectorAll('[data-countdown]').forEach(el => {
      const id = el.dataset.countdown;
      const a = assignments.find(x => x.id === id);
      if (!a) return;
      const { text, cls } = countdownText(a.date, a.done);
      el.textContent = text;
      el.className = 'countdown-badge ' + cls;
    });
  }, 60000);
}

function renderCard(a) {
  const status = getStatus(a);
  const { text, cls } = countdownText(a.date, a.done);
  return `<div class="asgn-card status-${status}" id="card-${a.id}">
    <div class="check-wrap">
      <button class="check-btn" onclick="toggleDone('${a.id}')" title="${a.done ? 'Mark pending' : 'Mark done'}">
        ${a.done ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
      </button>
    </div>
    <div class="asgn-body">
      <div class="asgn-subject">${escHtml(a.subject)}</div>
      <div class="asgn-title">${escHtml(a.title)}</div>
      <div class="asgn-meta">
        <div class="meta-date">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${formatDate(a.date)}
        </div>
        <span class="countdown-badge ${cls}" data-countdown="${a.id}">${text}</span>
      </div>
    </div>
    <div class="asgn-actions">
      <button class="icon-btn" onclick="startEdit('${a.id}')" title="Edit">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button class="icon-btn delete" onclick="confirmDelete('${a.id}')" title="Delete">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
      </button>
    </div>
  </div>`;
}

function renderEditForm(a) {
  return `<div class="edit-form" id="card-${a.id}">
    <div class="form-title">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      Edit Assignment
    </div>
    <div class="form-grid">
      <div class="field">
        <label>Subject</label>
        <input type="text" id="edit-subject" value="${escHtml(a.subject)}" maxlength="40">
      </div>
      <div class="field">
        <label>Assignment Title</label>
        <input type="text" id="edit-title" value="${escHtml(a.title)}" maxlength="80">
      </div>
      <div class="field">
        <label>Due Date</label>
        <input type="date" id="edit-date" value="${a.date}">
      </div>
    </div>
    <div class="form-footer">
      <button class="btn btn-ghost" onclick="cancelEdit()">Cancel</button>
      <button class="btn btn-primary" onclick="saveEdit('${a.id}')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        Save Changes
      </button>
    </div>
  </div>`;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ─── ACTIONS ─────────────────────────────────────────────
function toggleForm() {
  const wrap = document.getElementById('form-wrap');
  const visible = wrap.style.display !== 'none';
  wrap.style.display = visible ? 'none' : 'block';
  if (!visible) {
    document.getElementById('inp-date').min = minDate();
    document.getElementById('inp-subject').focus();
    // clear errors
    ['inp-subject','inp-title','inp-date'].forEach(id =>
      document.getElementById(id).classList.remove('error'));
  }
}

function addAssignment() {
  const subject = document.getElementById('inp-subject').value.trim();
  const title   = document.getElementById('inp-title').value.trim();
  const date    = document.getElementById('inp-date').value;
  let valid = true;
  if (!subject) { document.getElementById('inp-subject').classList.add('error'); valid = false; }
  else document.getElementById('inp-subject').classList.remove('error');
  if (!title)   { document.getElementById('inp-title').classList.add('error'); valid = false; }
  else document.getElementById('inp-title').classList.remove('error');
  if (!date)    { document.getElementById('inp-date').classList.add('error'); valid = false; }
  else document.getElementById('inp-date').classList.remove('error');
  if (!valid) { showToast('Please fill in all fields', true); return; }

  assignments.unshift({ id: uid(), subject, title, date, done: false, createdAt: Date.now() });
  save();
  render();
  // Reset
  document.getElementById('inp-subject').value = '';
  document.getElementById('inp-title').value   = '';
  document.getElementById('inp-date').value    = '';
  document.getElementById('form-wrap').style.display = 'none';
  showToast('Assignment added!');
}

function toggleDone(id) {
  const a = assignments.find(x => x.id === id);
  if (!a) return;
  a.done = !a.done;
  save();
  render();
  showToast(a.done ? 'Marked as done ✓' : 'Marked as pending');
}

function startEdit(id) {
  editingId = id;
  render();
  setTimeout(() => document.getElementById('edit-subject')?.focus(), 50);
}

function cancelEdit() {
  editingId = null;
  render();
}

function saveEdit(id) {
  const subject = document.getElementById('edit-subject').value.trim();
  const title   = document.getElementById('edit-title').value.trim();
  const date    = document.getElementById('edit-date').value;
  if (!subject || !title || !date) { showToast('Please fill in all fields', true); return; }
  const a = assignments.find(x => x.id === id);
  if (!a) return;
  a.subject = subject;
  a.title   = title;
  a.date    = date;
  editingId = null;
  save();
  render();
  showToast('Assignment updated!');
}

function confirmDelete(id) {
  pendingDeleteId = id;
  const a = assignments.find(x => x.id === id);
  document.getElementById('modal').style.display = 'flex';
  document.getElementById('modal').innerHTML = `<div class="modal-bg" onclick="closeModal()">
    <div class="modal-box" onclick="event.stopPropagation()">
      <h3>Delete assignment?</h3>
      <p>"${escHtml(a.title)}" will be permanently removed.</p>
      <div class="modal-actions">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-danger" onclick="doDelete()">Delete</button>
      </div>
    </div>
  </div>`;
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  pendingDeleteId = null;
}

function doDelete() {
  if (!pendingDeleteId) return;

  const idToDelete = pendingDeleteId; // ✅ FIX

  const card = document.getElementById('card-' + idToDelete);

  if (card) {
    card.classList.add('removing');
    setTimeout(() => {
      assignments = assignments.filter(x => x.id !== idToDelete);
      save();
      render();
    }, 280);
  } else {
    assignments = assignments.filter(x => x.id !== idToDelete);
    save();
    render();
  }

  closeModal(); // now safe
  showToast('Assignment deleted', true);
}

// ─── FILTER & SORT ───────────────────────────────────────
function setFilter(f, btn) {
  filter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

function toggleSort() {
  sortByDate = !sortByDate;
  const btn = document.getElementById('sort-btn');
  btn.classList.toggle('active', sortByDate);
  render();
  showToast(sortByDate ? 'Sorted by nearest deadline' : 'Sorted by date added');
}

// ─── DARK MODE ───────────────────────────────────────────
function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const icon = document.getElementById('dark-icon');
  icon.innerHTML = dark
    ? `<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="none" stroke="currentColor" stroke-width="2"/>`
    : `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>`;
  localStorage.setItem('trackr_dark', dark ? '1' : '0');
}

document.getElementById('dark-btn').addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  applyTheme(!isDark);
});

// ─── TOAST ───────────────────────────────────────────────
function showToast(msg, warn = false) {
  const wrap = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<div class="toast-dot${warn ? ' warn' : ''}"></div>${msg}`;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

// ─── KEYBOARD SHORTCUTS ──────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (editingId) { cancelEdit(); return; }
    closeModal();
    document.getElementById('form-wrap').style.display = 'none';
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    if (editingId) { saveEdit(editingId); return; }
    if (document.getElementById('form-wrap').style.display !== 'none') { addAssignment(); }
  }
});

// ─── INIT ────────────────────────────────────────────────
const savedDark = localStorage.getItem('trackr_dark');
if (savedDark === '1' || (savedDark === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  applyTheme(true);
}

// Seed sample data if empty
if (!assignments.length) {
  const now = Date.now();
  const fmt = d => d.toISOString().split('T')[0];
  const d = (n) => { const x = new Date(); x.setDate(x.getDate() + n); return fmt(x); };
  assignments = [
    { id: uid(), subject: 'Networking', title: 'Network Topology Diagram Activity', date: d(1), done: false, createdAt: now - 5000 },
    { id: uid(), subject: 'Data Structures', title: 'Arrays and Linked List Practice Problems', date: d(3), done: false, createdAt: now - 4000 },
    { id: uid(), subject: 'Database Management', title: 'SQL Query Practice Set', date: d(-2), done: false, createdAt: now - 3000 },
    { id: uid(), subject: 'Computer Programming', title: 'JavaScript Basics Practice Exercise', date: d(7), done: true, createdAt: now - 2000 },
    { id: uid(), subject: 'Computer Science', title: 'JavaScript To-Do App Improvement Task', date: d(0), done: false, createdAt: now - 1000 },
  ];
  save();
}

render();