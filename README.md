# My_Website

Personal portfolio website for **Garv Mehra** showcasing skills, projects, certifications, coursework, and contact details.

## Repository Description (for GitHub "About")
Use this as your repo description:

`Personal portfolio website of Garv Mehra — CSE undergraduate, full-stack developer, and AI/LLM enthusiast.`

## Pages
- `index.html` — Home page with About, Skills, Featured Projects, and Certifications
- `projects.html` — Full projects listing
- `courses.html` — Full courses and certifications listing
- `aboutus.html` — Contact page

## Tech Stack
- HTML5
- CSS3
- JavaScript (vanilla)
- Font Awesome
- Google Fonts

## Run Locally
This is a static website. You can open `index.html` directly in your browser, or serve it locally:

```bash
python -m http.server 8000
```

Then visit: `http://localhost:8000`

## How to Upload CV/Resume and Make It Downloadable
1. Create a folder named `assets/docs` in this repository.
2. Add your file there, for example: `assets/docs/Garv_Mehra_Resume.pdf`.
3. Add a button/link in `index.html` (or `aboutus.html`) pointing to that PDF.
4. Use the `download` attribute on the link so users download it directly.

Recommended link target:

`assets/docs/Garv_Mehra_Resume.pdf`

If you deploy on GitHub Pages, pushing this file to the repo is enough for public download.

## Author
**Garv Mehra**  
GitHub: https://github.com/studentGarv  
LinkedIn: https://www.linkedin.com/in/garv-mehra/
