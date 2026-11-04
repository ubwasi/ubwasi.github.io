# Uzzal Biswas — Flutter Developer Portfolio

Static, animated, responsive portfolio (dark/light theme). No build step.

```
index.html          the page
css/style.css       design
js/config.js        <-- YOUR CONTENT (projects, skills, social links, contact settings)
js/main.js          interactions (menu, filter, modal, form, animations)
assets/uzzal.jpg    your photo (replace the file to change it)
assets/Uzzal_Biswas_CV.pdf   public CV for the Download button
backend/            optional Node.js server for the contact form
```

## 1. Edit your content (2 minutes)

Everything lives in `js/config.js`. Open it in any text editor (VS Code, Notepad). It already contains your CV data:
experience, education, skills, languages and all 11 projects.
- `socials`: add your **LinkedIn** link (GitHub and WhatsApp are already set).
- `projects`: add screenshots (put the image in `assets/` and set `image: "assets/afrikart.jpg"`),
  and `live` / `code` links. Gift N Gadget BD, Period Tracker and Demo Authentication already link to GitHub.
- `cvFile`: the "Download CV" button opens `assets/Uzzal_Biswas_CV.pdf` (a public version of your CV
  without home address, date of birth, family names, blood group or referee phone). Replace the file to update it.

## 2. Make the contact form deliver to your email (free, 2 minutes)

1. Go to https://web3forms.com, enter `shujjol27@gmail.com`, and copy the Access Key they email you.
2. In `js/config.js` set `contact: { web3formsKey: "PASTE_KEY_HERE", apiUrl: "" }`.

Done. Messages from the form now arrive in your inbox. Without a key, the form opens
the visitor's email app instead (so it still works).

## 3. Publish on GitHub Pages (free)

1. Create a **public** repo named `YOUR-USERNAME.github.io` on https://github.com/new
2. Upload everything from this folder (drag and drop all files and folders, including `.nojekyll`). You can skip `backend/` if you use Web3Forms.
3. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)` → Save.
4. After 1-2 minutes: `https://YOUR-USERNAME.github.io`

## 4. (Optional) Use the Node.js backend instead

GitHub Pages cannot run a server, so use this only if you want your own backend
(host it free on Render, Railway or any VPS).

```bash
cd backend
npm install
cp .env.example .env     # then edit .env (SMTP details for email; Gmail needs an App Password)
npm start                # http://localhost:3000  (site + API together)
```

- `POST /api/contact` validates the message, rate-limits spam, saves it to `backend/data/messages.json`, and emails you if SMTP is set.
- If the website stays on GitHub Pages and only the API is hosted elsewhere, set in `js/config.js`:
  `apiUrl: "https://YOUR-BACKEND-URL/api/contact"` and in `backend/.env`:
  `ALLOWED_ORIGIN=https://YOUR-USERNAME.github.io`

## Click features included
Theme toggle · mobile menu · active-section highlight · typing effect · animated counters and skill bars ·
project filter + detail popup · copy email/phone buttons · validated contact form with success/error messages ·
back-to-top · scroll progress bar.
"# uzzal.github.io" 
