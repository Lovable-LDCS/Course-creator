# One-Time Build Process & QA Gating

## Version: 1.0.0
## Last Updated: 2025-11-23

---

## Philosophy

**Build Once, Build Right**

The one-time build philosophy emphasizes:
- Comprehensive planning before implementation
- Architecture-driven development
- Test-driven development (TDD)
- Automated QA gating
- No continuous rework cycles
- Merge only when QA passes

---

## Branching Model

### Branch Strategy

```
main (production)
  ├── develop (integration)
  │   ├── feature/engine1-settings
  │   ├── feature/engine1-projects
  │   ├── feature/engine1-contextualise
  │   ├── feature/engine1-feed-the-beast
  │   ├── feature/engine1-plan
  │   ├── feature/engine2-...
  │   └── feature/atomic-components
  └── hotfix/security-patch
```

### Rules

1. **Never commit directly to `main`**
2. **Never commit directly to `develop`**
3. All work must be done in feature branches
4. Feature branches follow naming convention: `feature/{engine-or-component}-{description}`
5. Hotfix branches for critical production issues: `hotfix/{description}`
6. Feature branches merge to `develop` after QA passes
7. `develop` merges to `main` after full system QA passes

---

## Development Workflow

### Phase 1: Planning & Architecture

**Before writing any code:**

1. **Architecture Specification**
   - Document component structure in ARCHITECTURE.md
   - Define data models and schemas
   - Design API endpoints (if applicable)
   - Create component diagrams
   - Define success criteria

2. **Test Planning**
   - Write test cases before implementation
   - Define expected inputs and outputs
   - Create test data and fixtures
   - Identify edge cases
   - Update QA_SPECIFICATION.md with new tests

3. **Review & Approval**
   - Architecture review by team/stakeholders
   - Test plan review
   - Get sign-off before proceeding

### Phase 2: Implementation

**Build Phase:**

1. **Create Feature Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-feature
   ```

2. **Implement Following TDD**
   - Write failing tests first (RED)
   - Write minimal code to pass tests (GREEN)
   - Refactor and optimize (REFACTOR)
   - Repeat for each component/function

3. **Follow Architecture**
   - Implement exactly as specified in ARCHITECTURE.md
   - Update ARCHITECTURE.md if design changes are needed
   - Document any deviations with reasons

4. **Build for Staging**
   - Create isolated staging build
   - Deploy to test environment
   - Verify deployment

### Phase 3: Automated Testing

**Automated QA Run:**

1. **Unit Tests**
   ```bash
   npm run test
   ```
   - All unit tests must pass
   - Coverage must be ≥80%
   - No new console warnings or errors

2. **Integration Tests**
   ```bash
   npm run test:integration
   ```
   - All integration tests must pass
   - API contracts validated
   - Data flow verified

3. **E2E Tests**
   ```bash
   npm run test:e2e
   ```
   - Critical user paths tested
   - Happy paths verified
   - Error scenarios handled

4. **Linting & Type Checking**
   ```bash
   npm run lint
   npm run type-check
   ```
   - No linting errors
   - No TypeScript errors
   - Code follows style guide

5. **Build Verification**
   ```bash
   npm run build
   ```
   - Build succeeds without errors
   - Bundle size within limits
   - No circular dependencies

### Phase 4: Automated Gap Analysis

**QA Gap Detection Script:**

Run automated gap analysis to verify:

1. **API Contract Verification**
   - All endpoints declared in API_SPEC.md exist
   - Endpoints respond with correct status codes
   - Response schemas match specification
   - Error handling matches specification

2. **Database Schema Verification**
   - Required fields exist in database
   - Field types match specification
   - Indexes created as specified
   - Relationships properly defined

3. **UI Component Verification**
   - Expected DOM elements render
   - ARIA attributes present
   - Keyboard navigation works
   - Focus management correct

4. **i18n Verification**
   - All strings externalized
   - Translation files exist for all locales
   - No hardcoded user-facing text

5. **Accessibility Verification**
   - WCAG AA compliance
   - Color contrast ratios met
   - Alt text for images
   - Proper heading hierarchy

**Gap Analysis Script Example:**
```bash
npm run qa:gap-analysis
```

Output:
```
✓ All API endpoints exist and respond correctly
✓ Database schema matches specification
✓ UI components render expected elements
✗ Missing translations for 3 strings in es-ES
✗ 2 images missing alt text
✗ Color contrast ratio below 4.5:1 on button

FAIL: 3 issues detected. Fix and re-run.
```

### Phase 5: Manual QA

**Human Quality Assurance:**

Complete the QA checklist for the feature:

#### Functional Testing
- [ ] Feature works as specified
- [ ] All user interactions function correctly
- [ ] Edge cases handled properly
- [ ] Error messages are clear and helpful
- [ ] Loading states display correctly
- [ ] Success confirmations appear

#### UI/UX Testing
- [ ] Visual design matches mockups/specifications
- [ ] Responsive design works on all breakpoints
- [ ] Animations and transitions are smooth
- [ ] No visual glitches or layout issues
- [ ] Spacing and alignment correct

#### Accessibility Testing
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces content correctly
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] No accessibility errors in browser DevTools

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Performance Testing
- [ ] Page load time acceptable (<3 seconds)
- [ ] No performance warnings in console
- [ ] Smooth interactions (60fps)
- [ ] Memory usage reasonable

#### Security Testing
- [ ] No secrets in code or logs
- [ ] User inputs validated
- [ ] XSS protection verified
- [ ] CSRF protection present (if applicable)
- [ ] API calls use HTTPS

#### Integration Testing
- [ ] Works with other features
- [ ] Data flows correctly between components
- [ ] State management correct
- [ ] No regressions in existing features

### Phase 6: Pass/Fail Decision

**Decision Rule:**

```
IF automated_tests_pass AND gap_analysis_pass AND manual_qa_pass:
    THEN approve_for_merge()
ELSE:
    IF qa_is_incorrect:
        update_qa_specification()
        re_run_qa()
    ELSE:
        fix_code()
        re_run_qa()
```

**Pass Criteria:**
- All automated tests pass
- No issues found in gap analysis
- Manual QA checklist 100% complete
- Code review approved
- Documentation updated

**Fail Criteria:**
- Any automated test fails
- Gap analysis detects missing functionality
- Manual QA checklist incomplete or issues found
- Code review requests changes
- Documentation not updated

### Phase 7: Merge & Deploy

**Only when QA PASSES:**

1. **Update Architecture**
   - Ensure ARCHITECTURE.md reflects implementation
   - Document any architectural decisions made
   - Update API_SPEC.md if endpoints changed

2. **Merge to Develop**
   ```bash
   git checkout develop
   git pull origin develop
   git merge --no-ff feature/my-feature
   git push origin develop
   ```

3. **Deploy to Staging**
   - Automated deployment to staging environment
   - Smoke test on staging
   - Verify functionality

4. **Merge to Main (when develop is ready)**
   ```bash
   git checkout main
   git pull origin main
   git merge --no-ff develop
   git tag -a v1.x.x -m "Release v1.x.x"
   git push origin main --tags
   ```

5. **Deploy to Production**
   - Automated deployment to production
   - Monitor for errors
   - Verify critical paths

---

## No Continuous Rework

### The Problem We Avoid

Traditional development cycles often fall into:
```
Code → Test → Find bugs → Fix → Test → Find more bugs → Fix → ...
```

This leads to:
- Endless iteration cycles
- Technical debt accumulation
- Deadline slippage
- Quality degradation
- Developer frustration

### Our Solution

```
Plan → Specify → Build → QA → Pass → Done
                           ↓
                         Fail
                           ↓
                  Fix OR Update QA
                           ↓
                        Re-run QA
```

**Key Principles:**

1. **Comprehensive Planning**
   - Spend more time in architecture and planning
   - Define exact requirements before coding
   - Identify risks and edge cases upfront

2. **Test-First Development**
   - Write tests before implementation
   - Tests define the contract
   - Code implements the contract

3. **QA as Gate, Not Suggestion**
   - QA results are binary: PASS or FAIL
   - Cannot proceed without passing QA
   - No "we'll fix it later"

4. **QA Can Be Wrong**
   - If QA fails but implementation is correct per spec
   - Update QA to match spec
   - Document the reasoning
   - Re-run updated QA

5. **No Merging Failed QA**
   - Failed QA means code is not ready
   - Fix issues immediately
   - No work-around or temporary solutions
   - Maintain quality standards

---

## QA Automation Tools

### Required Tools

1. **Jest** - Unit testing
2. **React Testing Library** - Component testing
3. **Playwright** - E2E testing
4. **ESLint** - Code quality
5. **TypeScript** - Type safety
6. **axe-core** - Accessibility testing

### Custom QA Scripts

Create custom scripts for gap analysis:

**`scripts/qa-gap-analysis.js`**
- Verify API endpoints
- Check database schema
- Validate UI components
- Scan for missing translations
- Check accessibility

**`scripts/qa-security-scan.js`**
- Scan for exposed secrets
- Check dependency vulnerabilities
- Verify input validation
- Test authentication flows

**`scripts/qa-performance.js`**
- Measure bundle size
- Check page load time
- Identify performance bottlenecks
- Verify lazy loading

---

## Checklist for Feature Completion

Before marking feature as complete:

### Code Quality
- [ ] All code follows TypeScript strict mode
- [ ] ESLint passes with no errors
- [ ] No console.log or debug code left
- [ ] Code is DRY (Don't Repeat Yourself)
- [ ] Functions are small and focused
- [ ] Complex logic is commented

### Testing
- [ ] Unit tests written and passing (≥80% coverage)
- [ ] Integration tests passing
- [ ] E2E tests for critical paths passing
- [ ] Accessibility tests passing
- [ ] Manual testing completed

### Documentation
- [ ] ARCHITECTURE.md updated
- [ ] API_SPEC.md updated (if applicable)
- [ ] Component props documented (JSDoc)
- [ ] README.md updated (if needed)
- [ ] CHANGELOG.md entry added

### Architecture Compliance
- [ ] Follows atomic design structure
- [ ] Uses design tokens
- [ ] Components in correct folder
- [ ] No hardcoded values
- [ ] Proper separation of concerns

### Accessibility
- [ ] WCAG AA compliant
- [ ] Keyboard accessible
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] ARIA attributes correct

### Security
- [ ] No secrets in code
- [ ] Input validation present
- [ ] XSS protection verified
- [ ] Dependencies scanned for vulnerabilities
- [ ] OWASP Top 10 considered

### Internationalization
- [ ] All strings externalized
- [ ] Translations provided
- [ ] RTL tested (if applicable)
- [ ] Date/number formatting locale-aware

### Performance
- [ ] Bundle size acceptable
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] Lazy loading used where appropriate
- [ ] No memory leaks

### QA Results
- [ ] Automated tests pass
- [ ] Gap analysis pass
- [ ] Manual QA pass
- [ ] Code review approved
- [ ] Security scan pass

---

## Emergency Procedures

### What if QA is Blocked?

If QA cannot be run due to infrastructure issues:

1. **Document the blocker**
2. **Escalate immediately**
3. **Do NOT merge without QA**
4. **Set up temporary QA environment if needed**
5. **Run manual QA as fallback**

### What if Production is Broken?

Hotfix process (only for critical production issues):

1. **Create hotfix branch from main**
   ```bash
   git checkout main
   git checkout -b hotfix/critical-issue
   ```

2. **Implement minimal fix**
3. **Run critical path tests only**
4. **Get expedited review**
5. **Merge to main AND develop**
6. **Deploy immediately**
7. **Post-mortem analysis**
8. **Update processes to prevent recurrence**

---

## Signoff Authority

### Who Can Approve Merges?

**Feature Branch → Develop:**
- Automated QA must pass (required)
- Manual QA completed (required)
- Code review by peer (required)
- Architecture updated (required)

**Develop → Main:**
- All feature QA passed (required)
- Full integration QA passed (required)
- Staging deployment verified (required)
- Product owner approval (required)
- Security scan passed (required)

---

## Metrics & Monitoring

### Track These Metrics

1. **Time from feature start to merge**
   - Goal: Reduce over time as process matures
   
2. **Number of QA iterations per feature**
   - Goal: ≤2 iterations average
   
3. **Post-merge bugs found**
   - Goal: <5% of features have post-merge bugs
   
4. **QA automation coverage**
   - Goal: ≥90% of tests automated
   
5. **Build success rate**
   - Goal: ≥95% of builds pass

### Review Process Quarterly

- Analyze metrics
- Identify bottlenecks
- Update processes
- Improve QA scripts
- Train team on new practices

---

**This process ensures we build quality software efficiently, without endless rework cycles.**
