# Quick Start - Course Crafter

## Access the Application

🌐 **Live URL**: https://lovable-ldcs.github.io/Course-creator/

## First-Time Setup Checklist

If this is your first time accessing the application, ensure these steps are complete:

- [ ] **Enable GitHub Pages**
  - Go to: Settings → Pages → Source: GitHub Actions
  
- [ ] **Add OpenAI API Key Secret**
  - Go to: Settings → Secrets and variables → Actions
  - Create secret: `VITE_OPENAI_API_KEY`
  
- [ ] **Trigger Deployment**
  - Push to `main` branch, OR
  - Go to Actions → Deploy to GitHub Pages → Run workflow

## First Deployment

After completing the setup:

1. Wait 5-10 minutes for the first deployment to complete
2. Check Actions tab for deployment status (should show green ✓)
3. Visit: https://lovable-ldcs.github.io/Course-creator/
4. The app should load and display the Course Crafter interface

## Using the Application

Once the app loads, you can:

1. **Navigate to Engine 1**: Voice-Over Generator
   - Upload PowerPoint (.pptx) or MP4 files
   - Generate AI-powered narration scripts
   - Add professional voice synthesis
   
2. **Navigate to Engine 2**: Training Video Creator
   - Upload various file formats (PPTX, DOCX, PDF, MP4, TXT, MD)
   - AI analyzes content and creates storyboards
   - Generate visual assets and voice-overs

3. **Access QA Dashboard**
   - Click "System Health" button in navigation
   - View comprehensive test results
   - Monitor system performance

## Running Tests

To run tests on the UI:

1. Access the live application at the URL above
2. Navigate to the QA Dashboard via "System Health" button
3. Review the 160 comprehensive tests across 10 categories
4. Tests include:
   - Code Correctness (25 tests)
   - Wiring & Integration (30 tests)
   - Security (15 tests)
   - Deployment (10 tests)
   - UI/UX (20 tests)
   - Performance & Timing (15 tests)
   - Runtime Rendering (10 tests)
   - Accessibility (12 tests)
   - Data Integrity (18 tests)
   - Duplicates & Legacy (5 tests)

## Local Development

For local testing:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access at: http://localhost:5173
```

## Troubleshooting

### Can't Access the URL?

1. Check if deployment completed: Actions tab should show green ✓
2. Verify GitHub Pages is enabled: Settings → Pages
3. Wait a few minutes and try again

### See Errors on the Page?

1. Open browser Developer Tools (F12)
2. Check Console tab for error messages
3. Verify `VITE_OPENAI_API_KEY` secret is set

### Need Help?

See detailed guides:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide
- [README.md](./README.md) - Full documentation
- [QA_SPECIFICATION.md](./QA_SPECIFICATION.md) - Test specifications

---

**Repository**: https://github.com/Lovable-LDCS/Course-creator  
**Live App**: https://lovable-ldcs.github.io/Course-creator/
