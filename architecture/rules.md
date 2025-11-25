# Course Crafter - Architecture Rules

## Version: 1.0.0
## Status: True North - Source of Truth
## Last Updated: 2025-11-25

---

## Table of Contents

1. [True North Philosophy](#true-north-philosophy)
2. [High-Level Functional Architecture](#high-level-functional-architecture)
3. [Page Structure & Layout Definitions](#page-structure--layout-definitions)
4. [UX/UI Rules & Consistency](#uxui-rules--consistency)
5. [Branding, Spacing & Typography](#branding-spacing--typography)
6. [System Behaviours](#system-behaviours)
7. [Launch Requirements](#launch-requirements)
8. [ESLint Cleanliness](#eslint-cleanliness)
9. [Domain-Specific Rules](#domain-specific-rules)
10. [Acceptance Criteria](#acceptance-criteria)
11. [Strict Wiring Rules](#strict-wiring-rules)

---

## 1. True North Philosophy

### Architecture is the Source of Truth

**Principle**: The architecture documentation is the single source of truth for all development. Code must conform to architecture, not the other way around.

### Rules

1. **Architecture First**: No coding begins until architecture is documented and approved
2. **QA Alignment**: All QA tests must trace back to architectural requirements
3. **Change Protocol**: Architecture changes require:
   - Documentation update first
   - QA update second
   - Implementation third
4. **No Legacy**: Code that isn't wired to the UI must be either:
   - Wired immediately
   - Deleted to prevent future confusion

### One-Time Build Process

```
Input: User requirements in plain English
  ↓
Step 1: Update/confirm architecture (rules.md) and encode checks (qa/checklist.json)
  ↓
Step 2: Generate/adjust QA checks to match latest architecture (expect RED initially)
  ↓
Step 3: Implement code and wiring to satisfy architecture
  ↓
Step 4: Run full QA repeatedly until GREEN, then handover for UI verification
  ↓
Output: Fully functioning app with GREEN QA
```

---

## 2. High-Level Functional Architecture

### Application Overview

Course Crafter is an AI-powered content creation platform that transforms educational materials into professional training content.

### Core Engines

| Engine | Name | Status | Description |
|--------|------|--------|-------------|
| Engine 1 | Voice-Over Generator | Active | Transform PPTX/MP4 into voice-enabled content |
| Engine 2 | Training Video Creator | Active | Multi-format to professional training videos |
| Engine 3 | TBD | Placeholder | Future expansion |
| Engine 4 | TBD | Placeholder | Future expansion |

### Technology Stack

- **Frontend**: React 19 + TypeScript 5.9
- **Build Tool**: Vite (Rolldown)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand + React Query
- **AI Integration**: OpenAI API (GPT-4, TTS, DALL-E, Vision)
- **Routing**: React Router v7
- **Form Handling**: React Hook Form + Zod

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      TopNavigation                          │
│    [Engine 1] [Engine 2] [Engine 3] [Engine 4] [Health]    │
├─────────────────────────────────────────────────────────────┤
│         │                                                   │
│ Sidebar │              MainContent                          │
│         │                                                   │
│ Engine- │    ┌─────────────────────────────────────┐       │
│ specific│    │                                     │       │
│ options │    │      Engine Component               │       │
│         │    │                                     │       │
│         │    │   - File Upload                     │       │
│         │    │   - Processing Pipeline             │       │
│         │    │   - Preview/Output                  │       │
│         │    │                                     │       │
│         │    └─────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Page Structure & Layout Definitions

### Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Landing page with engine overview |
| `/engine1` | Engine1 | Voice-Over Generator |
| `/engine2` | Engine2 | Training Video Creator |
| `/engine3` | Redirect to `/` | Placeholder |
| `/engine4` | Redirect to `/` | Placeholder |
| `/system-health` | QADashboard | System health and QA testing |
| `*` | NotFound | 404 error page |

### Layout Components

#### MainLayout
- **Purpose**: Wrapper providing consistent structure
- **Contains**: TopNavigation + Sidebar + Content area
- **Behavior**: Persistent across all routes

#### TopNavigation
- **Position**: Fixed top
- **Elements**: 4 Engine buttons + System Health button
- **Active State**: Visual distinction for current engine

#### Sidebar
- **Position**: Fixed left
- **Behavior**: Context-sensitive per engine
- **Content**: Engine-specific options and settings

### Page Templates

#### Engine Page Template
```
┌────────────────────────────────────────┐
│ Engine Header                          │
│ (Title, Status, Actions)               │
├────────────────────────────────────────┤
│ File Upload Zone                       │
│ (Drag-drop, file list, validation)     │
├────────────────────────────────────────┤
│ Processing Pipeline                    │
│ (Progress, status, controls)           │
├────────────────────────────────────────┤
│ Preview/Output                         │
│ (Preview, download, export)            │
└────────────────────────────────────────┘
```

---

## 4. UX/UI Rules & Consistency

### Interaction Patterns

1. **Feedback on Every Action**
   - Loading spinners during async operations
   - Success toasts on completion
   - Error toasts with actionable messages
   - Progress bars for long operations

2. **State Indicators**
   - Hover states on all interactive elements
   - Focus indicators for keyboard navigation
   - Active/pressed states on buttons
   - Disabled states when actions unavailable

3. **Error Handling**
   - Inline validation errors near relevant fields
   - Global error boundary for unexpected errors
   - Recovery options where possible
   - Clear, non-technical error messages

### Navigation Rules

1. **Engine Switching**: Instant visual feedback
2. **Route Changes**: Smooth transitions
3. **404 Handling**: Helpful redirect options
4. **Breadcrumbs**: Where depth > 1 level

### Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Desktop | ≥1024px | Full layout with sidebar |
| Tablet | 768-1023px | Collapsible sidebar |
| Mobile | <768px | Hidden sidebar, hamburger menu |

---

## 5. Branding, Spacing & Typography

### Color Palette

```typescript
const colors = {
  // Primary
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  // Status
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  // Neutral
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    800: '#1f2937',
    900: '#111827',
  }
};
```

### Typography

- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold weight
- **Body**: Regular weight

| Element | Size | Line Height |
|---------|------|-------------|
| H1 | 2.5rem (40px) | 1.2 |
| H2 | 2rem (32px) | 1.3 |
| H3 | 1.5rem (24px) | 1.4 |
| Body Large | 1.125rem (18px) | 1.6 |
| Body | 1rem (16px) | 1.6 |
| Body Small | 0.875rem (14px) | 1.5 |

### Spacing Scale

```typescript
const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
};
```

### Border Radius

- Small: 0.25rem (4px)
- Medium: 0.5rem (8px)
- Large: 0.75rem (12px)
- Full: 9999px (circular)

---

## 6. System Behaviours

### User Interaction Standards

1. **File Upload**
   - Drag-and-drop support
   - Click-to-browse fallback
   - File type validation (PPTX, MP4, DOCX, PDF)
   - Size limit enforcement (100MB default)
   - Progress indication during upload

2. **AI Processing**
   - Clear indication of processing status
   - Estimated time remaining (when possible)
   - Cancel option for long operations
   - Preview before final generation

3. **Export/Download**
   - Clear download buttons
   - Format selection where applicable
   - Confirmation of successful download

### State Persistence

- **Session State**: Engine context, upload progress
- **Local Storage**: User preferences, recent projects
- **No Backend**: All data client-side (initial version)

### Error Recovery

1. **Network Errors**: Retry option with exponential backoff
2. **API Rate Limits**: Queue requests, inform user of wait
3. **File Errors**: Clear message, allow re-upload
4. **Unexpected Errors**: Error boundary with recovery option

---

## 7. Launch Requirements

### No Broken Routes

- [ ] All defined routes return valid components
- [ ] No 404 errors for defined paths
- [ ] Redirect placeholder engines gracefully
- [ ] Handle unknown routes with NotFound component

### No Console Errors

- [ ] Zero console.error in production
- [ ] Zero React warnings
- [ ] Zero TypeScript errors
- [ ] Zero unhandled promise rejections

### Build Requirements

- [ ] `npm run build` succeeds without errors
- [ ] No build warnings (ESLint, TypeScript)
- [ ] Bundle size < 500KB initial load
- [ ] All assets optimized

### Functional Requirements

- [ ] All engine navigation works
- [ ] System Health dashboard accessible
- [ ] File upload functional (Engine 1, 2)
- [ ] QA tests can be triggered from UI

---

## 8. ESLint Cleanliness

### Enforced Rules

```javascript
// eslint.config.js requirements
{
  // TypeScript
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-unused-vars': 'error',
  
  // React
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
  'react-refresh/only-export-components': 'warn',
  
  // General
  'no-console': 'warn',
  'no-debugger': 'error',
}
```

### Clean Code Standards

1. **No unused imports** - Remove all unused imports
2. **No unused variables** - Remove or prefix with underscore
3. **Consistent formatting** - Use Prettier configuration
4. **DRY principle** - No duplicate code blocks
5. **Single responsibility** - Small, focused functions

---

## 9. Domain-Specific Rules

### AI Integration

1. **API Key Management**
   - Keys in environment variables only
   - Never commit to repository
   - Validate at startup

2. **Model Selection**
   - GPT-4 for complex analysis
   - GPT-3.5-turbo for simple tasks
   - TTS for voice generation
   - DALL-E for image generation

3. **Cost Optimization**
   - Cache API responses where appropriate
   - Use appropriate model for task complexity
   - Batch requests when possible

### File Processing

1. **Supported Formats**
   - PPTX: PowerPoint presentations
   - MP4: Video files
   - DOCX: Word documents
   - PDF: Document files

2. **Size Limits**
   - PPTX: 100MB
   - MP4: 500MB
   - DOCX: 50MB
   - PDF: 50MB

3. **Parsing Requirements**
   - Extract all text content
   - Preserve structure (headings, lists)
   - Extract metadata

---

## 10. Acceptance Criteria

### Feature Acceptance

Every feature must meet:

1. **Functional**: Works as specified in architecture
2. **Wired**: Accessible from UI (not dead code)
3. **Tested**: Covered by automated tests
4. **Documented**: Architecture updated
5. **Accessible**: WCAG AA compliant
6. **Performant**: No blocking operations

### Build Acceptance

Build is ready for handover when:

1. ✅ All routes respond (no 404s)
2. ✅ Build passes (no errors)
3. ✅ ESLint clean (no errors)
4. ✅ TypeScript clean (no errors)
5. ✅ QA tests GREEN (98%+ pass rate)
6. ✅ No console errors in browser

### QA Gate

```
QA Status: RED → Implementation required
QA Status: AMBER → Minor issues, can proceed with caution
QA Status: GREEN → Ready for handover
```

---

## 11. Strict Wiring Rules

### Definition

**Wiring**: Code is "wired" when it is:
1. Imported and used in the application
2. Accessible from the UI
3. Functional at runtime

### Wiring Checks

Every component must pass:

1. **Static Check**: Component file exists and is imported
2. **Route Check**: Component is rendered by a route
3. **UI Check**: Component renders in the browser
4. **Interaction Check**: Component responds to user input

### Anti-Wiring Violations

Code is **un-wired** (violation) if:

- Component exists but not imported anywhere
- Component imported but not rendered
- Component rendered but not visible
- Component visible but not functional

### Enforcement

1. **First violation**: Flag for review
2. **Second consecutive violation**: Remove code

### No Legacy Code

**Rule**: If code is not actively wired:
- Required? → Wire it now
- Not required? → Delete it

**No exceptions**: Dead code leads to confusion and bugs.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-25 | Initial architecture rules |

---

## Approval

This document represents the **True North** architecture rules for Course Crafter. All development must adhere to these rules.

**Status**: ✅ Active
**Next Review**: On major feature addition
