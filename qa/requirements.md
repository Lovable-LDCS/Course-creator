# Course Crafter - QA Requirements

## Version: 1.0.0
## Status: True North QA Specification
## Last Updated: 2025-11-25

---

## Table of Contents

1. [QA Philosophy](#qa-philosophy)
2. [Validation Rules](#validation-rules)
3. [Architecture Compliance](#architecture-compliance)
4. [UI/UX Consistency Gates](#uiux-consistency-gates)
5. [User Feedback Requirements](#user-feedback-requirements)
6. [Component Wiring Checks](#component-wiring-checks)
7. [Workflow Validation](#workflow-validation)
8. [Data Integrity](#data-integrity)
9. [Deployment Readiness](#deployment-readiness)
10. [Security Requirements](#security-requirements)
11. [Green/Red Evaluation Model](#greenred-evaluation-model)
12. [Handover Criteria](#handover-criteria)

---

## 1. QA Philosophy

### Red-to-Green Methodology

The QA system operates on a binary pass/fail model:

```
RED    → Tests fail, implementation required
AMBER  → Tests pass with warnings, proceed with caution
GREEN  → All tests pass, ready for handover
```

### Core Principles

1. **Architecture First**: QA tests derive from architecture documentation
2. **No Partial Passes**: Either all critical tests pass, or the build fails
3. **Automated + Manual**: Automated tests supplemented by manual verification
4. **Continuous Validation**: Tests run on every code change
5. **Strict Wiring**: Dead code is a test failure

---

## 2. Validation Rules

### Rule Categories

| Category | Priority | Weight |
|----------|----------|--------|
| Code Correctness | Critical | 20% |
| Wiring & Integration | Critical | 25% |
| Security | Critical | 15% |
| Deployment | High | 10% |
| UI/UX | High | 15% |
| Performance | Medium | 10% |
| Accessibility | High | 5% |

### Enforcement

- **Critical**: Must pass 100% for build approval
- **High**: Must pass 95%+ for build approval
- **Medium**: Must pass 90%+ for build approval

---

## 3. Architecture Compliance

### AR-001: Route Definitions

**Requirement**: All routes in architecture must be implemented

**Check**:
```typescript
const requiredRoutes = ['/', '/engine1', '/engine2', '/system-health'];
requiredRoutes.forEach(route => {
  // Verify route returns valid component
  // Verify no 404 errors
});
```

**Pass Criteria**: 100% of defined routes respond correctly

---

### AR-002: Component Structure

**Requirement**: Component hierarchy matches architecture

**Check**:
- Layout components exist in `src/components/layout/`
- Engine components exist in `src/components/engines/`
- Common components exist in `src/components/common/`
- QA components exist in `src/components/qa/`

**Pass Criteria**: All architecture-defined components exist

---

### AR-003: Technology Stack

**Requirement**: Tech stack matches architecture specification

**Check**:
```json
{
  "react": "^19.x",
  "typescript": "^5.x",
  "tailwindcss": "^4.x",
  "react-router-dom": "^7.x"
}
```

**Pass Criteria**: Package versions align with architecture

---

## 4. UI/UX Consistency Gates

### UX-001: Navigation

**Requirement**: All navigation elements functional

**Checks**:
- [ ] TopNavigation renders all 5 buttons
- [ ] Engine buttons navigate to correct routes
- [ ] System Health button opens QA dashboard
- [ ] Active state visible on current route
- [ ] No broken links

**Pass Criteria**: 100% navigation functional

---

### UX-002: Responsive Design

**Requirement**: Layout adapts to all breakpoints

**Checks**:
- [ ] Desktop (≥1024px): Full layout with sidebar
- [ ] Tablet (768-1023px): Collapsible sidebar
- [ ] Mobile (<768px): Hidden sidebar with hamburger menu

**Pass Criteria**: All breakpoints render correctly

---

### UX-003: Color Consistency

**Requirement**: Colors match design tokens

**Checks**:
- Primary colors: `#3b82f6` (blue-500)
- Success: `#10b981` (green-500)
- Error: `#ef4444` (red-500)
- Warning: `#f59e0b` (amber-500)

**Pass Criteria**: No hardcoded colors outside design system

---

### UX-004: Typography

**Requirement**: Typography follows specification

**Checks**:
- Font family: Inter, system-ui, sans-serif
- Heading sizes match spec (H1: 40px, H2: 32px, H3: 24px)
- Body text readable (16px minimum)
- Proper line heights

**Pass Criteria**: Typography audit passes

---

## 5. User Feedback Requirements

### UF-001: Loading States

**Requirement**: Loading indicator for all async operations

**Checks**:
- [ ] File upload shows progress
- [ ] AI processing shows spinner
- [ ] Route transitions show loading
- [ ] Button loading state when clicked

**Pass Criteria**: No operation without feedback

---

### UF-002: Success Feedback

**Requirement**: Confirmation for all successful actions

**Checks**:
- [ ] File upload success toast
- [ ] Generation complete notification
- [ ] Export success message
- [ ] Form submission confirmation

**Pass Criteria**: All success states have feedback

---

### UF-003: Error Handling

**Requirement**: Clear, actionable error messages

**Checks**:
- [ ] Form validation errors inline
- [ ] API errors show user-friendly message
- [ ] Network errors suggest retry
- [ ] File errors explain the issue

**Pass Criteria**: All errors have clear messages

---

### UF-004: Saving Indicator

**Requirement**: Visual indication when saving/processing

**Checks**:
- [ ] Saving indicator visible during write operations
- [ ] Auto-save status shown if applicable
- [ ] No silent failures

**Pass Criteria**: User always knows save status

---

## 6. Component Wiring Checks

### WC-001: Static Presence

**Requirement**: All components exist and are importable

**Check**:
```typescript
// For each architecture-defined component
import { Component } from './path';
expect(Component).toBeDefined();
```

**Pass Criteria**: All imports succeed

---

### WC-002: Route Wiring

**Requirement**: All page components routed

**Check**:
- HomePage → `/`
- Engine1 → `/engine1`
- Engine2 → `/engine2`
- QADashboard → `/system-health`
- NotFound → `*`

**Pass Criteria**: All routes render correct components

---

### WC-003: Runtime Rendering

**Requirement**: Components render without errors

**Check**:
```typescript
render(<Component />);
expect(screen.getByTestId('component')).toBeInTheDocument();
```

**Pass Criteria**: No render errors

---

### WC-004: Event Handling

**Requirement**: Interactive elements respond to user input

**Checks**:
- [ ] Button clicks trigger handlers
- [ ] File uploads process files
- [ ] Navigation links work
- [ ] Form submissions validate

**Pass Criteria**: All interactions functional

---

### WC-005: No Dead Code

**Requirement**: No unused components/functions

**Check**:
- Run static analysis for unused exports
- Verify all files are imported somewhere
- Check for unused functions

**Pass Criteria**: Zero dead code detected

---

## 7. Workflow Validation

### WF-001: File Upload Flow

**Requirement**: Complete file upload workflow

**Steps**:
1. User selects file(s)
2. Validation runs (type, size)
3. Progress displayed
4. Success/error feedback
5. File ready for processing

**Pass Criteria**: End-to-end upload works

---

### WF-002: Engine 1 Workflow

**Requirement**: Voice-Over Generator flow complete

**Steps**:
1. Upload PPTX or MP4
2. Content extraction
3. Script generation
4. Voice-over synthesis
5. Preview
6. Export

**Pass Criteria**: End-to-end workflow functional

---

### WF-003: Engine 2 Workflow

**Requirement**: Training Video Creator flow complete

**Steps**:
1. Upload multiple files
2. Content analysis
3. Storyboard generation
4. Asset creation
5. Video compilation
6. Export

**Pass Criteria**: End-to-end workflow functional

---

### WF-004: QA Dashboard Flow

**Requirement**: System health check workflow

**Steps**:
1. Navigate to System Health
2. Click "Run All QA Tests"
3. Tests execute
4. Results display
5. Detailed view available

**Pass Criteria**: QA runs and reports correctly

---

## 8. Data Integrity

### DI-001: File Parsing Accuracy

**Requirement**: Parsed content matches source

**Checks**:
- PPTX: All slides, text, notes extracted
- DOCX: All paragraphs, formatting preserved
- PDF: Text extraction accurate
- MP4: Metadata correct

**Pass Criteria**: ≥95% accuracy

---

### DI-002: State Consistency

**Requirement**: Application state remains consistent

**Checks**:
- [ ] No conflicting state updates
- [ ] State persists across navigation
- [ ] Reset clears all state

**Pass Criteria**: No state corruption

---

### DI-003: Export Quality

**Requirement**: Exported files match preview

**Checks**:
- [ ] Audio files play correctly
- [ ] Video files are complete
- [ ] No data loss in export

**Pass Criteria**: 100% export accuracy

---

## 9. Deployment Readiness

### DR-001: Build Success

**Requirement**: Production build completes

**Checks**:
```bash
npm run build
# Must exit with code 0
# No errors in output
```

**Pass Criteria**: Clean build

---

### DR-002: TypeScript Clean

**Requirement**: No TypeScript errors

**Checks**:
```bash
tsc --noEmit
# Must exit with code 0
```

**Pass Criteria**: Zero type errors

---

### DR-003: ESLint Clean

**Requirement**: No linting errors

**Checks**:
```bash
npm run lint
# Zero errors (warnings acceptable)
```

**Pass Criteria**: Zero lint errors

---

### DR-004: Bundle Size

**Requirement**: Initial bundle < 500KB

**Checks**:
- Main bundle gzipped size
- Code splitting applied
- No unnecessary dependencies

**Pass Criteria**: Bundle under limit

---

### DR-005: Environment Variables

**Requirement**: Required env vars defined

**Checks**:
- `VITE_OPENAI_API_KEY` (or fallback handling)
- Production URL configured
- No secrets in code

**Pass Criteria**: All required vars documented

---

## 10. Security Requirements

### SE-001: No Exposed Secrets

**Requirement**: API keys not in client code

**Checks**:
- [ ] No hardcoded API keys
- [ ] Keys in environment variables
- [ ] .env in .gitignore

**Pass Criteria**: Zero exposed secrets

---

### SE-002: Input Validation

**Requirement**: All user inputs validated

**Checks**:
- [ ] File type whitelist enforced
- [ ] File size limits enforced
- [ ] Text inputs sanitized

**Pass Criteria**: 100% input validation

---

### SE-003: XSS Prevention

**Requirement**: No XSS vulnerabilities

**Checks**:
- [ ] React escapes by default
- [ ] No dangerouslySetInnerHTML without sanitization
- [ ] User content escaped

**Pass Criteria**: Zero XSS vectors

---

### SE-004: Dependency Security

**Requirement**: No known vulnerabilities

**Checks**:
```bash
npm audit
# No critical or high vulnerabilities
```

**Pass Criteria**: No critical vulnerabilities

---

## 11. Green/Red Evaluation Model

### Scoring System

| Category | Weight | Pass Threshold |
|----------|--------|----------------|
| Code Correctness | 20% | 100% |
| Wiring & Integration | 25% | 100% |
| Security | 15% | 100% |
| Deployment | 10% | 95% |
| UI/UX | 15% | 90% |
| Performance | 10% | 85% |
| Accessibility | 5% | 90% |

### Status Determination

```typescript
function determineStatus(results: QAResults): Status {
  const criticalPass = 
    results.codeCorrectness === 100 &&
    results.wiring === 100 &&
    results.security === 100;
  
  if (!criticalPass) return 'RED';
  
  const overallScore = calculateWeightedScore(results);
  
  if (overallScore >= 95) return 'GREEN';
  if (overallScore >= 85) return 'AMBER';
  return 'RED';
}
```

### Visual Indicators

- 🔴 **RED**: Build blocked, critical failures
- 🟡 **AMBER**: Proceed with caution, non-critical issues
- 🟢 **GREEN**: Ready for handover

---

## 12. Handover Criteria

### Mandatory Requirements

Before handover, ALL must be true:

1. ✅ **Build passes** - `npm run build` succeeds
2. ✅ **TypeScript clean** - Zero type errors
3. ✅ **ESLint clean** - Zero lint errors
4. ✅ **Routes work** - All defined routes respond
5. ✅ **No 404s** - No broken links
6. ✅ **No console errors** - Clean browser console
7. ✅ **Security audit** - No critical vulnerabilities
8. ✅ **Wiring complete** - No dead code

### QA Score Requirements

- Overall score: ≥95%
- Critical categories: 100%
- No blocking issues

### Documentation Requirements

- Architecture updated
- Component map current
- QA checklist complete
- Deployment guide ready

### Handover Checklist

```markdown
## Pre-Handover Checklist

### Build
- [ ] `npm run build` passes
- [ ] No build warnings
- [ ] Bundle size acceptable

### Quality
- [ ] TypeScript: 0 errors
- [ ] ESLint: 0 errors
- [ ] No console errors in browser

### Functionality
- [ ] All routes work
- [ ] File upload works
- [ ] Engine 1 workflow complete
- [ ] Engine 2 workflow complete
- [ ] QA dashboard works

### Security
- [ ] No exposed secrets
- [ ] npm audit clean
- [ ] Input validation complete

### Documentation
- [ ] Architecture updated
- [ ] QA results documented
- [ ] Known issues listed

### Final Verification
- [ ] QA status: GREEN
- [ ] User acceptance: PENDING
```

---

## Automated QA Commands

### Run All Tests

```bash
npm run qa:all
```

### Run Category Tests

```bash
npm run qa:code        # Code correctness
npm run qa:wiring      # Wiring & integration
npm run qa:security    # Security checks
npm run qa:deployment  # Deployment readiness
npm run qa:ui          # UI/UX checks
npm run qa:performance # Performance tests
npm run qa:a11y        # Accessibility
```

### Generate Report

```bash
npm run qa:report
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-25 | Initial QA requirements |

---

## Approval

This document defines the QA requirements for Course Crafter. No build may be released without meeting these requirements.

**Status**: ✅ Active
**Enforcement**: Mandatory
