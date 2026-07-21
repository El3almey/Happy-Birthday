# Happy Birthday — Luxury Digital Gift

An interactive, six-scene birthday website: wax seal → envelope & letter → moments gallery → music player → "us" heart collage → ending + final surprise.

## 1. Add your own files

Drop these in before you deploy (the site works without them — it shows tasteful placeholders — but it's built for your real photos):

| What | Where | Status |
|---|---|---|
| Logo | `images/logo.png` | ✅ added |
| Moments photos | `images/moments/1.png` … `5.png` | ✅ added (5 photos) |
| Couple photos | `images/us/1.png` … `4.png` | ✅ added (4 photos) |
| Song | `music/nefsy-ahbek.mp3` | ✅ added — Wust El Balad, "Nefsy Ahbek" |

Everything is in place — the site is ready to deploy as-is. To add more photos later, drop the file in `images/moments/` or `images/us/` and add one more `<figure class="polaroid">` line in the matching section of `index.html`, following the existing pattern.

Just keep the exact file names above, or edit the `src="..."` paths in `index.html` to match your own file names.

## 2. Run it locally

No build step — it's plain HTML/CSS/JS. Just open `index.html` in a browser, or serve it locally:

```bash
cd HappyBirthday
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## 3. Put it online with GitHub Pages (free link to send)

1. Create a new repository on GitHub (e.g. `happy-birthday`).
2. Upload all the files in this folder (`index.html`, `style.css`, `script.js`, `images/`, `music/`, `README.md`) keeping the same folder structure.
3. In the repo, go to **Settings → Pages**.
4. Under **Source**, choose the `main` branch and `/ (root)` folder, then **Save**.
5. Wait a minute, then your link will be live at:
   `https://YOUR-USERNAME.github.io/happy-birthday/`

Send that link — it opens straight to the wax seal.

## Tech used

- HTML5 / CSS3 / vanilla JavaScript (ES6)
- GSAP + ScrollTrigger (via cdnjs) for entrance animations
- canvas-confetti (via cdnjs) for the confetti bursts
- Font Awesome (via cdnjs) for icons
- Google Fonts: Cormorant Garamond (display) + Poppins (body)

## Personalizing the text

The letter text, ending message, and song name live directly in `index.html` — search for the text you want to change and edit it there.
