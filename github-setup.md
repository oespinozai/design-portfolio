# GitHub Repository Setup Instructions

Follow these steps to push your local project to GitHub:

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name your repository (e.g., "design-portfolio")
   - Add a description (optional)
   - Choose public or private
   - Click "Create repository" without initializing with any files

2. In your terminal or command prompt, navigate to your project folder:
   ```bash
   cd c:\Users\User\Desktop\designfinal
   ```

3. Connect your local repository to GitHub:
   ```bash
   # Using your GitHub repository URL
   git remote add origin https://github.com/oespinozai/design-portfolio.git
   ```

4. Push your code to GitHub:
   ```bash
   git push -u origin master
   ```

5. Enter your GitHub credentials when prompted.

That's it! Your code is now on GitHub and you can clone it on any other device.

To clone on your laptop tomorrow:
```bash
git clone https://github.com/oespinozai/design-portfolio.git
cd REPO_NAME
npm install
npm run dev
```
