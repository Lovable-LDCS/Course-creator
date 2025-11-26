# Deployment Smoke Tests

## Overview

The deployment workflow now includes **post-deployment smoke tests** that verify the deployed application is actually accessible and functioning correctly. These tests catch 404 errors and deployment failures that build-time checks cannot detect.

## What Problem Does This Solve?

Previously, the QA process could pass with flying colors during the build phase, but the deployed site could still show GitHub's 404 page due to:
- GitHub Pages not being configured correctly
- Deployment workflow not completing successfully
- Base path configuration mismatches
- DNS propagation issues

The smoke tests run **after deployment** to ensure the live site is actually working.

## Tests Included

The smoke test job runs the following checks:

### 1. Homepage Accessibility (/)
- **Test**: `curl https://lovable-ldcs.github.io/Course-creator/`
- **Pass Criteria**: Returns HTTP 200 OK
- **Detects**: Deployment failures, GitHub Pages misconfiguration

### 2. Engine Routes (/engine1, /engine2)
- **Test**: `curl https://lovable-ldcs.github.io/Course-creator/engine1`
- **Pass Criteria**: Returns HTTP 200 OK
- **Detects**: Base path configuration issues, routing problems

### 3. System Health Route (/system-health)
- **Test**: `curl https://lovable-ldcs.github.io/Course-creator/system-health`
- **Pass Criteria**: Returns HTTP 200 OK
- **Detects**: QA dashboard accessibility

### 4. 404 Handling (invalid routes)
- **Test**: `curl https://lovable-ldcs.github.io/Course-creator/nonexistent-route`
- **Pass Criteria**: Returns 200 (SPA handles 404 client-side) OR custom 404, but NOT GitHub's "File not found" page
- **Detects**: GitHub 404 vs. app NotFound component

### 5. GitHub 404 Detection
- **Test**: Check response body for "File not found" text
- **Pass Criteria**: Main routes should NOT contain GitHub's 404 page
- **Detects**: Complete deployment failures

## Implementation

The smoke tests are implemented in `.github/workflows/deploy.yml` as a separate job:

```yaml
smoke-test:
  name: Post-Deployment Smoke Tests
  runs-on: ubuntu-latest
  needs: deploy
  
  steps:
    - Wait for deployment propagation (30 seconds)
    - Test each critical route
    - Verify no GitHub 404 pages
    - Report results
```

## Test Results

When all tests pass, you'll see:

```
=========================================
✅ ALL DEPLOYMENT SMOKE TESTS PASSED
=========================================

The following routes are accessible:
  ✅ / (Homepage)
  ✅ /engine1
  ✅ /engine2
  ✅ /system-health
  ✅ 404 handling works

Deployment is healthy!
```

When tests fail, you'll see detailed error messages explaining:
- Which route failed
- What status code was received
- Whether it's a GitHub 404 page
- Common causes and troubleshooting steps

## QA Specification Compliance

These smoke tests implement the following QA specification requirements:

- **DE-007**: GitHub Pages Deployment - Homepage Accessibility
- **DE-007-A**: GitHub Pages Deployment - Route Accessibility
- **DE-007-B**: GitHub Pages Deployment - 404 Handling
- **DE-007-C**: GitHub Pages Deployment - Base Path Configuration

See `QA_SPECIFICATION.md` for full details.

## Troubleshooting

If smoke tests fail:

1. **Check GitHub Pages Settings**
   - Go to Settings → Pages
   - Verify Source is set to "GitHub Actions"
   - Verify the site is published

2. **Check Deployment Workflow**
   - Go to Actions tab
   - Verify the deploy job completed successfully
   - Check for any errors in the workflow logs

3. **Check Base Path Configuration**
   - Verify `vite.config.ts` has `base: '/Course-creator/'` in production
   - Verify `App.tsx` has matching `basename` in Router

4. **Wait for Propagation**
   - First deployments can take 5-10 minutes to propagate
   - Subsequent deployments are faster

5. **Check Browser Console**
   - Open the deployed site in your browser
   - Check the console for 404 errors on assets
   - Verify routes work correctly

## Manual Testing

You can also run smoke tests manually:

```bash
# Test homepage
curl -I https://lovable-ldcs.github.io/Course-creator/

# Test engine routes
curl -I https://lovable-ldcs.github.io/Course-creator/engine1
curl -I https://lovable-ldcs.github.io/Course-creator/engine2

# Test system health
curl -I https://lovable-ldcs.github.io/Course-creator/system-health

# Check for GitHub 404
curl -s https://lovable-ldcs.github.io/Course-creator/ | grep "File not found"
# (Should return nothing if deployment is healthy)
```

## Related Documentation

- [QA_SPECIFICATION.md](./QA_SPECIFICATION.md) - Full QA test specifications
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [DEPLOYMENT_STATUS.md](./DEPLOYMENT_STATUS.md) - Current deployment status and troubleshooting
- [.github/workflows/deploy.yml](./.github/workflows/deploy.yml) - Deployment workflow implementation

---

**Last Updated**: 2025-11-24  
**Version**: 1.0.0
