# GitHub Pages Deployment Instructions

To deploy this website to GitHub Pages, follow these steps:

1.  **Create a new repository on GitHub.**
2.  **Push the code to the repository:**
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    git push -u origin main
    ```
3.  **Enable GitHub Pages:**
    *   Go to your repository's settings on GitHub.
    *   In the "Code and automation" section of the sidebar, click "Pages".
    *   Under "Build and deployment", for the source, select "Deploy from a branch".
    *   Select the `main` branch and the `/ (root)` folder, then click "Save".

Your website will be live at `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/` in a few minutes.
