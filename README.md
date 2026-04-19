# SPACESTRY

SPACESTRY is a minimalist interior design and 3D visualisation portfolio focused on attention to detail, spatial balance, and refined material expression.

## Features & Technologies

- **HTML** for page structure
- **CSS** for responsive styling and layout
- **JavaScript** for interactions and navigation behavior
- **GitHub Pages** for static site hosting

## Project Screenshots

Representative visuals from completed interior design and 3D visualisation work:

![Ayush Project](images/AYUSH%20-%2001.jpg)
![Gulrang Project](images/GULRANG%20-%2001.jpg)
![Nirvee Project](images/NIRVEE%20-%2001%20-%20H.jpg)
![Spaces Project](images/SPACES%20-%2001.jpg)
![Sukoonat Project](images/SUKOONAT%20-%2001%20-%20H.jpg)
![Taamul Project](images/TAAMUL%20-%2001%20-%20H.jpg)

## Run Locally (Static Site)

No installation is required.

1. Clone the repository:
   ```bash
   git clone https://github.com/mitchmaaan94/SPACESTRY.git
   ```
2. Open the project folder.
3. Open `index.html` in your browser.

## Deploy on GitHub Pages

1. Go to your repository on GitHub.
2. Open **Settings** → **Pages**.
3. Under **Build and deployment**, select:
   - **Source**: Deploy from a branch
   - **Branch**: `main` and `/ (root)`
4. Save and wait for GitHub Pages to publish the site.
5. Your site will be available at:
   - `https://mitchmaaan94.github.io/SPACESTRY/`

> No separate CI/CD setup is required for this project because GitHub Pages handles deployment for this static site.

## Connect a GoDaddy Custom Domain (Step-by-Step)

### A) Configure GitHub Pages Custom Domain

1. In GitHub, go to **Settings** → **Pages**.
2. In **Custom domain**, enter your domain (for example, `www.yourdomain.com`) and save.
3. Keep **Enforce HTTPS** enabled after DNS records propagate.

### B) Configure DNS in GoDaddy

1. Sign in to GoDaddy and open your domain's **DNS Management**.
2. Add/update these records:
   - **A** record (`@`) → `185.199.108.153`
   - **A** record (`@`) → `185.199.109.153`
   - **A** record (`@`) → `185.199.110.153`
   - **A** record (`@`) → `185.199.111.153`
   - **CNAME** record (`www`) → `mitchmaaan94.github.io`
3. Remove conflicting old A/CNAME records for `@` or `www`.
4. Wait for DNS propagation (can take a few minutes up to 48 hours).

### C) Verify

1. Return to GitHub **Settings** → **Pages** and confirm domain status.
2. Visit your custom domain and verify it loads the SPACESTRY site.

## Contributing

Contributions are welcome. If you have suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
