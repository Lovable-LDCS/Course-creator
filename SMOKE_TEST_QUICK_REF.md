# Smoke Test Failure Quick Reference

## What Are Smoke Tests?

Smoke tests are automated checks that run **after deployment** to verify the deployed site is actually accessible. They catch 404 errors that build-time checks cannot detect.

## When Do They Run?

- Automatically after every deployment to GitHub Pages
- After the `build` and `deploy` jobs complete
- Located in `.github/workflows/deploy.yml` as the `smoke-test` job

## What If Smoke Tests Fail?

### Step 1: Check Which Test Failed

Look at the workflow logs in the Actions tab. You'll see one of these failures:

#### ❌ Homepage Test Failed
**Error**: `Homepage returned 404 (expected 200)`

**Causes**:
- GitHub Pages not enabled
- Source not set to "GitHub Actions"
- Deployment didn't complete
- First deployment not yet propagated (wait 5-10 min)

**Fix**:
1. Go to Settings → Pages
2. Verify Source = "GitHub Actions"
3. Wait 5-10 minutes for propagation
4. Check Actions tab - did deploy job succeed?

#### ❌ Engine Route Test Failed
**Error**: `/engine1 returned 404 (expected 200)`

**Causes**:
- Base path misconfiguration
- Routing setup incorrect

**Fix**:
1. Check `vite.config.ts`: `base: '/Course-creator/'` in production
2. Check `App.tsx`: `basename = '/Course-creator'` when PROD
3. Rebuild and redeploy

#### ❌ GitHub 404 Detected
**Error**: `Homepage is showing GitHub's 404 page!`

**Causes**:
- Complete deployment failure
- GitHub Pages serving 404 instead of app

**Fix**:
1. Check deployment job logs for errors
2. Verify artifact was uploaded successfully
3. Check GitHub Pages settings
4. Try manual workflow dispatch

#### ❌ Invalid Route Test Failed
**Error**: `Received GitHub Pages 404 page instead of app NotFound component`

**Causes**:
- SPA routing not configured properly
- index.html fallback not working

**Fix**:
1. Verify NotFound component exists and is wired
2. Check React Router configuration
3. Ensure catch-all route `path="*"` exists

## Quick Diagnostic Commands

Run these locally to diagnose issues:

```bash
# Test if site is accessible
curl -I https://lovable-ldcs.github.io/Course-creator/

# Check for GitHub 404
curl -s https://lovable-ldcs.github.io/Course-creator/ | grep "File not found"

# Test specific route
curl -I https://lovable-ldcs.github.io/Course-creator/engine1

# View full response
curl -s https://lovable-ldcs.github.io/Course-creator/ | head -50
```

## Common Solutions

### Solution 1: Enable GitHub Pages
1. Go to repository Settings
2. Click Pages in sidebar
3. Source: Select "GitHub Actions"
4. Save and wait for deployment

### Solution 2: Fix Base Path
Edit `vite.config.ts`:
```typescript
base: process.env.NODE_ENV === 'production' ? '/Course-creator/' : '/',
```

Edit `App.tsx`:
```typescript
const basename = import.meta.env.PROD ? '/Course-creator' : '';
```

Rebuild and redeploy.

### Solution 3: Wait for Propagation
First deployments can take 5-10 minutes. Just wait and the tests will pass on the next run.

### Solution 4: Manual Re-run
If it's a transient issue:
1. Go to Actions tab
2. Find the failed workflow
3. Click "Re-run failed jobs"

## Prevention

To prevent smoke test failures:

1. **Test locally first**:
   ```bash
   npm run build
   npm run preview
   ```
   Visit `http://localhost:4173` and test routes

2. **Check build output**:
   - Verify `dist/index.html` exists
   - Check asset paths include base path
   - Look for any build warnings

3. **Verify settings before merge**:
   - GitHub Pages enabled
   - Secrets configured
   - Workflow permissions set

## Need More Help?

See detailed documentation:
- [SMOKE_TESTS.md](./SMOKE_TESTS.md) - Complete smoke test documentation
- [DEPLOYMENT_STATUS.md](./DEPLOYMENT_STATUS.md) - Deployment troubleshooting
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide

---

**Quick Tip**: Most smoke test failures are due to GitHub Pages settings or first-time propagation delays. Check settings first!
