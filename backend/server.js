/**
 * Optional backend for the portfolio contact form.
 *  - Serves the website (index.html, css, js, assets)
 *  - POST /api/contact  -> validates, saves to data/messages.json, emails you (if SMTP is set)
 *
 * Run:  cd backend && npm install && cp .env.example .env && npm start
 */
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

try { require('dotenv').config(); } catch (e) { /* dotenv optional */ }

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'messages.json');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

// Allow your GitHub Pages site (set ALLOWED_ORIGIN=https://YOUR-USERNAME.github.io) or all if unset
app.use('/api', cors({ origin: process.env.ALLOWED_ORIGIN || true }));

// Serve ONLY the public site files (never the backend folder or .env)
app.get('/', (_req, res) => res.sendFile(path.join(ROOT, 'index.html')));
['css', 'js', 'assets'].forEach((d) => app.use('/' + d, express.static(path.join(ROOT, d))));

// ---- tiny in-memory rate limit: 5 messages / 15 min / IP ----
const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 15 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < win);
  list.push(now); hits.set(ip, list);
  return list.length > 5;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v, max) => String(v == null ? '' : v).trim().slice(0, max);

function saveMessage(msg) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  let list = [];
  try { list = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch (e) {}
  list.push(msg);
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

async function sendMail(msg) {
  if (!process.env.SMTP_HOST) return false;
  const nodemailer = require('nodemailer');
  const t = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  await t.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.MAIL_TO || 'shujjol27@gmail.com',
    replyTo: msg.email,
    subject: '[Portfolio] ' + (msg.subject || 'New message from ' + msg.name),
    text: 'Name: ' + msg.name + '\nEmail: ' + msg.email + '\nTime: ' + msg.time + '\n\n' + msg.message
  });
  return true;
}

app.post('/api/contact', async (req, res) => {
  const b = req.body || {};
  if (b.botcheck) return res.json({ ok: true }); // honeypot: pretend success
  if (limited(req.ip)) return res.status(429).json({ ok: false, error: 'Too many messages. Try again later.' });

  const msg = {
    name: clean(b.name, 80), email: clean(b.email, 120),
    subject: clean(b.subject, 140), message: clean(b.message, 4000),
    time: new Date().toISOString()
  };
  if (msg.name.length < 2 || !EMAIL_RE.test(msg.email) || msg.message.length < 10) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid name, email and message.' });
  }

  try {
    saveMessage(msg);
    let mailed = false;
    try { mailed = await sendMail(msg); } catch (e) { console.error('Mail error:', e.message); }
    console.log('New message from', msg.name, '<' + msg.email + '>', mailed ? '(emailed)' : '(saved only)');
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log('Portfolio running at http://localhost:' + PORT));
