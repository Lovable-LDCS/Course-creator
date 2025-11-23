# Deployment Guide - Course Crafter

## GitHub Pages URL

**Live Application**: https://lovable-ldcs.github.io/Course-creator/

## Overview

Course Crafter is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch. The deployment process is fully automated via GitHub Actions.

## Prerequisites

Before the application can be deployed and accessed, ensure the following are configured in your GitHub repository:

### 1. Enable GitHub Pages

1. Navigate to your repository: https://github.com/Lovable-LDCS/Course-creator
2. Go to **Settings** → **Pages**
3. Under **Source**, select: **GitHub Actions**
4. Save the configuration

### 2. Configure Repository Secrets

The application requires the OpenAI API key to function properly:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the following secret:
   - Name: `VITE_OPENAI_API_KEY`
   - Value: Your OpenAI API key

### 3. Repository Permissions

Ensure the GitHub Actions workflow has the necessary permissions:

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests

## Deployment Process

### Automatic Deployment

Every push to the `main` branch triggers an automatic deployment:

1. Code is checked out
2. Node.js 20 environment is set up
3. Dependencies are installed
4. Application is built with production configuration
5. Build artifacts are uploaded to GitHub Pages
6. Site is deployed

### Manual Deployment

You can also trigger a deployment manually:

1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select the `main` branch
5. Click **Run workflow**

## Verification

After deployment completes:

1. Check the **Actions** tab for the workflow run status
2. Once the workflow shows a green checkmark, the site is live
3. Access the application at: https://lovable-ldcs.github.io/Course-creator/
4. First deployment may take 5-10 minutes to propagate

## Local Development

To test the production build locally before deployment:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the production build
npm run preview
```

The preview server will show how the app will behave when deployed.

## Troubleshooting

### Deployment Fails

1. Check the **Actions** tab for error messages
2. Verify all repository secrets are configured
3. Ensure GitHub Pages is enabled in repository settings

### Site Shows 404

1. Verify the workflow completed successfully
2. Check that GitHub Pages is set to deploy from **GitHub Actions**
3. Wait a few minutes for DNS propagation

### API Errors on Deployed Site

1. Verify `VITE_OPENAI_API_KEY` secret is set correctly
2. Check that the API key has sufficient credits
3. Review browser console for specific error messages

## Build Configuration

The application uses the following build configuration:

- **Base Path**: `/Course-creator/` (in production)
- **Build Tool**: Vite 7.2.5 (rolldown-vite)
- **Output Directory**: `dist/`
- **Environment Variables**:
  - `VITE_OPENAI_API_KEY`: OpenAI API key (from secrets)
  - `VITE_APP_ENV`: Set to `production` during build

## Deployment Workflow

The deployment is configured in `.github/workflows/deploy.yml` and includes:

- Build job: Compiles the application
- Deploy job: Publishes to GitHub Pages
- Permissions: Configured for Pages write access
- Concurrency: Prevents multiple simultaneous deployments

## Security Notes

- API keys are never committed to the repository
- All sensitive data is stored in GitHub Secrets
- Environment variables are only available during build time
- Production build includes optimizations and minification

## Support

If you encounter issues with deployment:

1. Check this guide for common solutions
2. Review the workflow logs in the Actions tab
3. Open an issue in the repository with:
   - Description of the problem
   - Screenshots of any errors
   - Workflow run URL

---

**Last Updated**: 2025-11-23  
**Version**: 1.0.0
