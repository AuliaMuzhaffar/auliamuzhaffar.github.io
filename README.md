# 🚀 Neobrutalist Data Science Portfolio

A premium, high-contrast portfolio website for Computer Science graduates focusing on Data Analyst, Data Science, and AI/ML roles.

## ✨ Features
- **Neobrutalist Design**: Bold typography, thick borders, and hard shadows.
- **Interactive Filtering**: Smooth project gallery filtering by category.
- **Fully Responsive**: Optimized for all devices.
- **GitHub Pages Ready**: Static architecture, no build process required.

## 📁 Folder Structure
- `index.html`: Main structure.
- `assets/css/style.css`: Design system and layout.
- `assets/js/script.js`: Interactivity and animations.
- `assets/images/`: Store your project screenshots and profile picture here.

## 🚀 How to Deploy to GitHub Pages

1. **Create a GitHub Repository**: 
   - Name it `yourusername.github.io` if you want it as your main portfolio.
   - Or any name (e.g., `my-portfolio`) if you want it as a project subpage.

2. **Upload Your Files**:
   - Push all files from this folder to the `main` branch.
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select `Deploy from a branch`.
   - Select the `main` branch and `/ (root)` folder.
   - Click **Save**.

4. **Visit Your Site**:
   - Your site will be live at `https://yourusername.github.io/` or `https://yourusername.github.io/repo-name/`.

## 🛠️ Customization
- **Change Colors**: Update CSS Variables in `assets/css/style.css`.
- **Add Projects**: Duplicate the `.project-card` div in `index.html` and change the `data-category`.
- **Images**: Replace the placeholder images in `index.html` with your own assets.

---
Created with ❤️ by Antigravity AI
