# Course Crafter - QA Specification & Test Suite

## Version: 1.1.0
## Status: RED (All tests expected to fail initially)

---

## Table of Contents
1. [QA Philosophy](#qa-philosophy)
2. [Test Categories](#test-categories)
3. [Test Definitions](#test-definitions)
4. [Success Criteria](#success-criteria)
5. [Test Execution Plan](#test-execution-plan)

---

## 1. QA Philosophy

### Red-to-Green Methodology
1. **RED**: All tests start in failing state
2. **AMBER**: Tests pass but with warnings
3. **GREEN**: All tests pass without warnings

### Test-Driven Architecture
- Every architectural component has corresponding tests
- Tests validate both presence and functionality
- No "partial" implementations accepted

### Comprehensive Coverage
- 100% of user-facing features tested
- 100% of critical paths validated
- All integration points verified
- **Post-deployment smoke tests** to catch 404 errors and deployment failures

---

## 2. Test Categories

### Category Overview

| Category | Priority | Test Count | Weight |
|----------|----------|------------|--------|
| Code Correctness | Critical | 25 | 20% |
| Wiring & Integration | Critical | 30 | 25% |
| Security | Critical | 15 | 15% |
| Deployment | High | 13 | 10% |
| UI/UX | High | 20 | 15% |
| Performance & Timing | Medium | 15 | 10% |
| Runtime Rendering | Medium | 10 | 2.5% |
| Accessibility | High | 12 | 2.5% |
| Data Integrity | Critical | 18 | 15% |
| Duplicates & Legacy | Low | 5 | 2.5% |
| **TOTAL** | | **163** | **100%** |

---

## 3. Test Definitions

### 3.1 Code Correctness (25 tests)

#### CC-001: TypeScript Configuration
- ✅ **Test**: Verify strict mode enabled in tsconfig.json
- ✅ **Pass Criteria**: `strict: true` in tsconfig
- ✅ **Validation**: No TypeScript errors in build

#### CC-002: No Any Types
- ✅ **Test**: Scan codebase for `any` types
- ✅ **Pass Criteria**: Zero instances of `: any` except in type definitions
- ✅ **Validation**: ESLint rule enforced

#### CC-003: Function Return Types
- ✅ **Test**: All functions have explicit return types
- ✅ **Pass Criteria**: 100% coverage of function signatures
- ✅ **Validation**: TypeScript compiler check

#### CC-004: Error Handling
- ✅ **Test**: All async functions have try-catch blocks
- ✅ **Pass Criteria**: No unhandled promise rejections
- ✅ **Validation**: Code review + runtime monitoring

#### CC-005: Input Validation
- ✅ **Test**: All user inputs validated before processing
- ✅ **Pass Criteria**: Zod schemas for all forms
- ✅ **Validation**: Form submission tests

#### CC-006: File Upload Validation
- ✅ **Test**: File type and size validation
- ✅ **Pass Criteria**: Only allowed extensions accepted, size limits enforced
- ✅ **Validation**: Upload rejection tests

#### CC-007: API Response Handling
- ✅ **Test**: All API responses properly typed
- ✅ **Pass Criteria**: No `unknown` or `any` in API responses
- ✅ **Validation**: Type checking in API services

#### CC-008: Edge Case Handling - Empty Files
- ✅ **Test**: System handles empty file uploads
- ✅ **Pass Criteria**: User-friendly error message displayed
- ✅ **Validation**: Upload empty file test

#### CC-009: Edge Case Handling - Large Files
- ✅ **Test**: System handles files exceeding size limits
- ✅ **Pass Criteria**: Clear error before processing starts
- ✅ **Validation**: Upload oversized file test

#### CC-010: Edge Case Handling - Corrupted Files
- ✅ **Test**: System handles corrupted/invalid files
- ✅ **Pass Criteria**: Parser errors caught and reported
- ✅ **Validation**: Upload corrupted file test

#### CC-011: Null/Undefined Checks
- ✅ **Test**: All object property accesses are safe
- ✅ **Pass Criteria**: Optional chaining used where appropriate
- ✅ **Validation**: No runtime null reference errors

#### CC-012: Array Bounds Checking
- ✅ **Test**: Array access operations validated
- ✅ **Pass Criteria**: No index out of bounds errors
- ✅ **Validation**: Edge case tests for loops

#### CC-013: Enum Validation
- ✅ **Test**: All enum values validated before use
- ✅ **Pass Criteria**: Type guards for external enum inputs
- ✅ **Validation**: Invalid enum value tests

#### CC-014: Date Handling
- ✅ **Test**: All date operations use consistent format
- ✅ **Pass Criteria**: ISO 8601 format throughout
- ✅ **Validation**: Date formatting tests

#### CC-015: Number Parsing
- ✅ **Test**: String-to-number conversions validated
- ✅ **Pass Criteria**: NaN checks after parsing
- ✅ **Validation**: Invalid number input tests

#### CC-016: Regular Expression Safety
- ✅ **Test**: All regex patterns tested for ReDoS
- ✅ **Pass Criteria**: No catastrophic backtracking
- ✅ **Validation**: Regex performance tests

#### CC-017: Memory Leak Prevention
- ✅ **Test**: Event listeners properly cleaned up
- ✅ **Pass Criteria**: No memory leaks in component lifecycle
- ✅ **Validation**: Memory profiling tests

#### CC-018: Async Race Conditions
- ✅ **Test**: Concurrent operations handled safely
- ✅ **Pass Criteria**: Proper state management for async flows
- ✅ **Validation**: Concurrent request tests

#### CC-019: Configuration Validation
- ✅ **Test**: All config values validated at startup
- ✅ **Pass Criteria**: App fails fast if config invalid
- ✅ **Validation**: Invalid config tests

#### CC-020: Constants Immutability
- ✅ **Test**: Constants not mutated
- ✅ **Pass Criteria**: All constants use `as const` or Object.freeze
- ✅ **Validation**: Code review

#### CC-021: Function Purity
- ✅ **Test**: Pure functions don't modify inputs
- ✅ **Pass Criteria**: No side effects in utility functions
- ✅ **Validation**: Unit tests

#### CC-022: Error Message Quality
- ✅ **Test**: All errors have descriptive messages
- ✅ **Pass Criteria**: No generic "Error" messages
- ✅ **Validation**: Error message catalog review

#### CC-023: API Error Mapping
- ✅ **Test**: OpenAI errors properly mapped to user errors
- ✅ **Pass Criteria**: Rate limit, auth, quota errors distinct
- ✅ **Validation**: API error simulation tests

#### CC-024: State Consistency
- ✅ **Test**: Application state remains consistent
- ✅ **Pass Criteria**: No conflicting state updates
- ✅ **Validation**: State transition tests

#### CC-025: Business Logic Validation
- ✅ **Test**: Core algorithms produce correct outputs
- ✅ **Pass Criteria**: Script generation, audio sync, video compilation tested
- ✅ **Validation**: End-to-end algorithm tests

---

### 3.2 Wiring & Integration (30 tests)

#### WI-001: Component Hierarchy
- ✅ **Test**: Component tree structure matches architecture
- ✅ **Pass Criteria**: All components in correct locations
- ✅ **Validation**: File structure review

#### WI-002: Props Passing - Top Navigation
- ✅ **Test**: Top navigation receives and passes props correctly
- ✅ **Pass Criteria**: Engine selection propagates to app state
- ✅ **Validation**: Navigation click tests

#### WI-003: Props Passing - Sidebar
- ✅ **Test**: Sidebar props match engine context
- ✅ **Pass Criteria**: Different sidebars for different engines
- ✅ **Validation**: Engine switch tests

#### WI-004: Event Handling - File Upload
- ✅ **Test**: File upload events properly handled
- ✅ **Pass Criteria**: Upload triggers processing pipeline
- ✅ **Validation**: Upload event tests

#### WI-005: Event Handling - Button Clicks
- ✅ **Test**: All button clicks have handlers
- ✅ **Pass Criteria**: No orphaned onClick events
- ✅ **Validation**: Button interaction tests

#### WI-006: Event Handling - Form Submissions
- ✅ **Test**: Form submissions prevent default and call handlers
- ✅ **Pass Criteria**: No page reloads on submit
- ✅ **Validation**: Form submission tests

#### WI-007: React Router Integration
- ✅ **Test**: All engine routes configured
- ✅ **Pass Criteria**: Navigation works between engines
- ✅ **Validation**: Route navigation tests

#### WI-008: React Router - 404 Handling
- ✅ **Test**: Invalid routes show 404 page
- ✅ **Pass Criteria**: User-friendly 404 component
- ✅ **Validation**: Invalid URL tests

#### WI-009: Context API - Global State
- ✅ **Test**: Global context provides app state
- ✅ **Pass Criteria**: State accessible from all components
- ✅ **Validation**: Context consumption tests

#### WI-010: Context API - Engine State
- ✅ **Test**: Engine-specific context isolated
- ✅ **Pass Criteria**: Engine 1 state separate from Engine 2
- ✅ **Validation**: State isolation tests

#### WI-011: React Query Integration
- ✅ **Test**: API calls use React Query
- ✅ **Pass Criteria**: Caching and refetching configured
- ✅ **Validation**: Query behavior tests

#### WI-012: API Service - OpenAI Connection
- ✅ **Test**: OpenAI service connects successfully
- ✅ **Pass Criteria**: API key valid, ping successful
- ✅ **Validation**: Connection test on startup

#### WI-013: API Service - GPT Integration
- ✅ **Test**: GPT service generates responses
- ✅ **Pass Criteria**: Sample prompt returns valid response
- ✅ **Validation**: GPT API test

#### WI-014: API Service - Vision Integration
- ✅ **Test**: Vision API analyzes images
- ✅ **Pass Criteria**: Image description returned
- ✅ **Validation**: Vision API test

#### WI-015: API Service - TTS Integration
- ✅ **Test**: TTS generates audio
- ✅ **Pass Criteria**: Audio buffer returned for text input
- ✅ **Validation**: TTS API test

#### WI-016: API Service - DALL-E Integration
- ✅ **Test**: DALL-E generates images
- ✅ **Pass Criteria**: Image URL returned for prompt
- ✅ **Validation**: DALL-E API test

#### WI-017: API Service - SORA Integration
- ✅ **Test**: SORA service configured (or fallback)
- ✅ **Pass Criteria**: Graceful fallback if unavailable
- ✅ **Validation**: SORA availability test

#### WI-018: Parser - PPTX Integration
- ✅ **Test**: PPTX parser extracts content
- ✅ **Pass Criteria**: Slides, text, notes extracted
- ✅ **Validation**: Sample PPTX parsing test

#### WI-019: Parser - DOCX Integration
- ✅ **Test**: DOCX parser extracts text
- ✅ **Pass Criteria**: Formatted text preserved
- ✅ **Validation**: Sample DOCX parsing test

#### WI-020: Parser - PDF Integration
- ✅ **Test**: PDF parser extracts text and images
- ✅ **Pass Criteria**: Content accuracy > 95%
- ✅ **Validation**: Sample PDF parsing test

#### WI-021: Parser - MP4 Integration
- ✅ **Test**: MP4 metadata extraction
- ✅ **Pass Criteria**: Duration, dimensions, audio track info
- ✅ **Validation**: Sample MP4 analysis test

#### WI-022: Storage Service Integration
- ✅ **Test**: File system access works
- ✅ **Pass Criteria**: Files saved to designated location
- ✅ **Validation**: Save file test

#### WI-023: Storage Service - Retrieval
- ✅ **Test**: Saved files can be retrieved
- ✅ **Pass Criteria**: File content matches saved content
- ✅ **Validation**: Load file test

#### WI-024: Model Selector Integration
- ✅ **Test**: Model selector chooses appropriate model
- ✅ **Pass Criteria**: Selection based on task complexity
- ✅ **Validation**: Model selection tests

#### WI-025: QA Service Integration
- ✅ **Test**: QA service runs tests
- ✅ **Pass Criteria**: Test results returned
- ✅ **Validation**: QA runner execution test

#### WI-026: Health Checker Integration
- ✅ **Test**: Health checker monitors system
- ✅ **Pass Criteria**: Health score calculated
- ✅ **Validation**: Health check test

#### WI-027: Web Search Integration (Future)
- ✅ **Test**: Web search API configured
- ✅ **Pass Criteria**: Search results returned
- ✅ **Validation**: Search API test

#### WI-028: Toast Notification System
- ✅ **Test**: Toasts display on events
- ✅ **Pass Criteria**: Success, error, info toasts work
- ✅ **Validation**: Toast trigger tests

#### WI-029: Modal Dialog System
- ✅ **Test**: Modals open and close correctly
- ✅ **Pass Criteria**: QA dashboard modal functional
- ✅ **Validation**: Modal interaction tests

#### WI-030: Progressive Loading
- ✅ **Test**: Components load progressively
- ✅ **Pass Criteria**: No blank screens during processing
- ✅ **Validation**: Loading state tests

---

### 3.3 Security (15 tests)

#### SE-001: API Key Protection
- ✅ **Test**: API keys not in client-side code
- ✅ **Pass Criteria**: Keys only in environment variables
- ✅ **Validation**: Code scan for hardcoded keys

#### SE-002: Environment Variable Validation
- ✅ **Test**: Required env vars checked at startup
- ✅ **Pass Criteria**: App fails if keys missing
- ✅ **Validation**: Missing env var test

#### SE-003: .env Files Excluded
- ✅ **Test**: .env files in .gitignore
- ✅ **Pass Criteria**: No .env files in repository
- ✅ **Validation**: Git history scan

#### SE-004: Input Sanitization
- ✅ **Test**: All user inputs sanitized
- ✅ **Pass Criteria**: XSS attack prevention
- ✅ **Validation**: XSS injection tests

#### SE-005: File Upload Whitelist
- ✅ **Test**: Only allowed file types accepted
- ✅ **Pass Criteria**: Executable files rejected
- ✅ **Validation**: Upload .exe, .sh file tests

#### SE-006: File Size Limits
- ✅ **Test**: File size validation enforced
- ✅ **Pass Criteria**: Large files rejected before upload
- ✅ **Validation**: Oversized file tests

#### SE-007: Content Security Policy
- ✅ **Test**: CSP headers configured
- ✅ **Pass Criteria**: Inline scripts blocked
- ✅ **Validation**: CSP validation test

#### SE-008: HTTPS Enforcement (Production)
- ✅ **Test**: GitHub Pages serves over HTTPS
- ✅ **Pass Criteria**: No mixed content warnings
- ✅ **Validation**: Deployment check

#### SE-009: Secure Storage
- ✅ **Test**: Sensitive data not in localStorage
- ✅ **Pass Criteria**: No API keys or tokens in browser storage
- ✅ **Validation**: Storage inspection

#### SE-010: CORS Configuration
- ✅ **Test**: API calls respect CORS
- ✅ **Pass Criteria**: No CORS errors
- ✅ **Validation**: Cross-origin request tests

#### SE-011: Rate Limiting
- ✅ **Test**: Client-side rate limiting implemented
- ✅ **Pass Criteria**: API calls queued appropriately
- ✅ **Validation**: Rapid request tests

#### SE-012: Error Information Disclosure
- ✅ **Test**: Error messages don't expose internals
- ✅ **Pass Criteria**: Generic errors shown to users
- ✅ **Validation**: Error message review

#### SE-013: Dependency Vulnerabilities
- ✅ **Test**: No known vulnerabilities in dependencies
- ✅ **Pass Criteria**: npm audit shows 0 vulnerabilities
- ✅ **Validation**: npm audit check

#### SE-014: Subresource Integrity
- ✅ **Test**: External scripts have SRI hashes
- ✅ **Pass Criteria**: All CDN resources protected
- ✅ **Validation**: SRI hash verification

#### SE-015: Secure Headers
- ✅ **Test**: Security headers configured
- ✅ **Pass Criteria**: X-Frame-Options, X-Content-Type-Options set
- ✅ **Validation**: Header inspection

---

### 3.4 Deployment (10 tests)

#### DE-001: Build Success
- ✅ **Test**: Production build completes without errors
- ✅ **Pass Criteria**: `npm run build` exits 0
- ✅ **Validation**: CI build test

#### DE-002: Build Warnings
- ✅ **Test**: No warnings during build
- ✅ **Pass Criteria**: Clean build output
- ✅ **Validation**: Build log review

#### DE-003: Asset Optimization
- ✅ **Test**: Images compressed and optimized
- ✅ **Pass Criteria**: Images < 500KB each
- ✅ **Validation**: Asset size check

#### DE-004: Bundle Size
- ✅ **Test**: Initial bundle size reasonable
- ✅ **Pass Criteria**: Main bundle < 500KB gzipped
- ✅ **Validation**: Bundle analysis

#### DE-005: Code Splitting
- ✅ **Test**: Routes code-split
- ✅ **Pass Criteria**: Separate chunks for each engine
- ✅ **Validation**: Build output analysis

#### DE-006: Environment Configuration
- ✅ **Test**: Production env vars configured in GitHub Secrets
- ✅ **Pass Criteria**: All required secrets present
- ✅ **Validation**: Secrets audit

#### DE-007: GitHub Pages Deployment - Homepage Accessibility
- ✅ **Test**: App loads on GitHub Pages URL
- ✅ **Pass Criteria**: Homepage returns 200 OK, not GitHub 404 page
- ✅ **Validation**: Post-deployment smoke test (curl homepage)
- ✅ **Implementation**: `.github/workflows/deploy.yml` smoke-test job

#### DE-007-A: GitHub Pages Deployment - Route Accessibility
- ✅ **Test**: All critical routes accessible after deployment
- ✅ **Pass Criteria**: /engine1, /engine2, /system-health return 200 OK
- ✅ **Validation**: Post-deployment smoke tests
- ✅ **Implementation**: Automated curl tests in deployment workflow

#### DE-007-B: GitHub Pages Deployment - 404 Handling
- ✅ **Test**: Invalid routes show app NotFound component, not GitHub 404
- ✅ **Pass Criteria**: Invalid routes return 200 (SPA routing) or custom 404, not GitHub's "File not found" page
- ✅ **Validation**: Post-deployment smoke test on /nonexistent-route
- ✅ **Implementation**: Content check for "File not found" text

#### DE-007-C: GitHub Pages Deployment - Base Path Configuration
- ✅ **Test**: Base path correctly configured for GitHub Pages
- ✅ **Pass Criteria**: Assets load with correct /Course-creator/ prefix
- ✅ **Validation**: Check dist/index.html for correct asset paths
- ✅ **Implementation**: Build output validation step

#### DE-008: Browser Compatibility - Chrome
- ✅ **Test**: App works in Chrome 100+
- ✅ **Pass Criteria**: All features functional
- ✅ **Validation**: Chrome testing

#### DE-009: Browser Compatibility - Firefox
- ✅ **Test**: App works in Firefox 100+
- ✅ **Pass Criteria**: All features functional
- ✅ **Validation**: Firefox testing

#### DE-010: Browser Compatibility - Safari
- ✅ **Test**: App works in Safari 15+
- ✅ **Pass Criteria**: All features functional
- ✅ **Validation**: Safari testing

---

### 3.5 UI/UX (20 tests)

#### UX-001: Top Navigation - Layout
- ✅ **Test**: 4 engine buttons + System Health button
- ✅ **Pass Criteria**: All buttons visible, properly spaced
- ✅ **Validation**: Visual inspection

#### UX-002: Top Navigation - Active State
- ✅ **Test**: Active engine highlighted
- ✅ **Pass Criteria**: Visual distinction clear
- ✅ **Validation**: Navigation tests

#### UX-003: Sidebar - Engine 1
- ✅ **Test**: Engine 1 sidebar displays correctly
- ✅ **Pass Criteria**: All options accessible
- ✅ **Validation**: Engine 1 navigation test

#### UX-004: Sidebar - Engine 2
- ✅ **Test**: Engine 2 sidebar displays correctly
- ✅ **Pass Criteria**: Different options from Engine 1
- ✅ **Validation**: Engine 2 navigation test

#### UX-005: Responsive Design - Desktop
- ✅ **Test**: Layout optimized for 1920x1080
- ✅ **Pass Criteria**: No horizontal scroll, content readable
- ✅ **Validation**: Desktop viewport test

#### UX-006: Responsive Design - Tablet
- ✅ **Test**: Layout optimized for 768x1024
- ✅ **Pass Criteria**: Sidebar collapsible, content reflows
- ✅ **Validation**: Tablet viewport test

#### UX-007: Responsive Design - Mobile
- ✅ **Test**: Layout works on 375x667
- ✅ **Pass Criteria**: Touch-friendly, readable
- ✅ **Validation**: Mobile viewport test

#### UX-008: Color Contrast - Text
- ✅ **Test**: Text meets WCAG AA contrast ratios
- ✅ **Pass Criteria**: 4.5:1 minimum for normal text
- ✅ **Validation**: Contrast checker tool

#### UX-009: Color Contrast - Interactive Elements
- ✅ **Test**: Buttons and links meet contrast requirements
- ✅ **Pass Criteria**: 3:1 minimum for large text
- ✅ **Validation**: Contrast checker tool

#### UX-010: Font Size - Readability
- ✅ **Test**: Minimum font size 14px
- ✅ **Pass Criteria**: All text readable without zoom
- ✅ **Validation**: Font size audit

#### UX-011: Interactive States - Hover
- ✅ **Test**: Hover states visible on all interactive elements
- ✅ **Pass Criteria**: Color or visual change on hover
- ✅ **Validation**: Interaction tests

#### UX-012: Interactive States - Focus
- ✅ **Test**: Focus states visible for keyboard navigation
- ✅ **Pass Criteria**: Clear focus indicator
- ✅ **Validation**: Tab navigation test

#### UX-013: Interactive States - Active
- ✅ **Test**: Active/pressed states for buttons
- ✅ **Pass Criteria**: Visual feedback on click
- ✅ **Validation**: Click interaction tests

#### UX-014: Loading Indicators
- ✅ **Test**: Loading spinners during async operations
- ✅ **Pass Criteria**: User knows system is processing
- ✅ **Validation**: Processing state tests

#### UX-015: Progress Indicators
- ✅ **Test**: Progress bars for file uploads and processing
- ✅ **Pass Criteria**: Accurate percentage display
- ✅ **Validation**: Upload progress tests

#### UX-016: Error Messages - Clarity
- ✅ **Test**: Error messages are clear and actionable
- ✅ **Pass Criteria**: User knows what went wrong and how to fix
- ✅ **Validation**: Error message catalog review

#### UX-017: Error Messages - Placement
- ✅ **Test**: Errors displayed near relevant fields
- ✅ **Pass Criteria**: No generic top-of-page errors
- ✅ **Validation**: Form error tests

#### UX-018: Success Feedback
- ✅ **Test**: Success messages after operations
- ✅ **Pass Criteria**: User knows operation succeeded
- ✅ **Validation**: Success toast tests

#### UX-019: Empty States
- ✅ **Test**: Helpful messages when no content
- ✅ **Pass Criteria**: Guidance on what to do next
- ✅ **Validation**: Empty state review

#### UX-020: QA Dashboard - Visual Match
- ✅ **Test**: QA dashboard matches reference design
- ✅ **Pass Criteria**: Layout, colors, icons match specification
- ✅ **Validation**: Visual comparison with reference image

---

### 3.6 Performance & Timing (15 tests)

#### PT-001: Initial Load Time
- ✅ **Test**: App loads in < 3 seconds
- ✅ **Pass Criteria**: Time to interactive < 3s
- ✅ **Validation**: Lighthouse performance test

#### PT-002: Component Render Time
- ✅ **Test**: Components render in < 100ms
- ✅ **Pass Criteria**: No janky rendering
- ✅ **Validation**: React Profiler

#### PT-003: Navigation Speed
- ✅ **Test**: Engine switching < 200ms
- ✅ **Pass Criteria**: Instant visual feedback
- ✅ **Validation**: Navigation timing tests

#### PT-004: File Upload - Validation Speed
- ✅ **Test**: File validation < 500ms
- ✅ **Pass Criteria**: Immediate feedback on invalid files
- ✅ **Validation**: Upload timing tests

#### PT-005: File Upload - Transfer Speed
- ✅ **Test**: Upload progress updates smoothly
- ✅ **Pass Criteria**: Progress updates at least 10 times per second
- ✅ **Validation**: Upload progress monitoring

#### PT-006: API Response Time - GPT
- ✅ **Test**: GPT responses handled efficiently
- ✅ **Pass Criteria**: Streaming displayed to user
- ✅ **Validation**: API timing tests

#### PT-007: API Response Time - TTS
- ✅ **Test**: TTS generation monitored
- ✅ **Pass Criteria**: User informed of estimated time
- ✅ **Validation**: TTS timing tests

#### PT-008: Memory Usage
- ✅ **Test**: Memory stays under 500MB
- ✅ **Pass Criteria**: No memory leaks during extended use
- ✅ **Validation**: Memory profiling

#### PT-009: CPU Usage
- ✅ **Test**: CPU usage reasonable during processing
- ✅ **Pass Criteria**: UI remains responsive
- ✅ **Validation**: CPU profiling

#### PT-010: Caching Effectiveness
- ✅ **Test**: Repeated operations use cache
- ✅ **Pass Criteria**: Second run 10x faster
- ✅ **Validation**: Cache hit rate tests

#### PT-011: Debouncing - Search Inputs
- ✅ **Test**: Search inputs debounced
- ✅ **Pass Criteria**: API calls delayed until user stops typing
- ✅ **Validation**: Input timing tests

#### PT-012: Throttling - Scroll Events
- ✅ **Test**: Scroll handlers throttled
- ✅ **Pass Criteria**: No performance impact from scrolling
- ✅ **Validation**: Scroll performance tests

#### PT-013: Lazy Loading - Routes
- ✅ **Test**: Engine components lazy loaded
- ✅ **Pass Criteria**: Initial bundle doesn't include all engines
- ✅ **Validation**: Bundle analysis

#### PT-014: Lazy Loading - Images
- ✅ **Test**: Images load on demand
- ✅ **Pass Criteria**: Below-fold images not loaded initially
- ✅ **Validation**: Network activity monitoring

#### PT-015: Processing Pipeline Efficiency
- ✅ **Test**: End-to-end processing time acceptable
- ✅ **Pass Criteria**: Engine 1 < 2 min, Engine 2 < 10 min for standard files
- ✅ **Validation**: End-to-end timing tests

---

### 3.7 Runtime Rendering (10 tests)

#### RR-001: Component Mount
- ✅ **Test**: All components mount without errors
- ✅ **Pass Criteria**: No console errors on mount
- ✅ **Validation**: Mount/unmount tests

#### RR-002: Component Unmount
- ✅ **Test**: Components cleanup on unmount
- ✅ **Pass Criteria**: Event listeners removed
- ✅ **Validation**: Unmount tests

#### RR-003: Conditional Rendering
- ✅ **Test**: Conditional UI elements render correctly
- ✅ **Pass Criteria**: Show/hide based on state
- ✅ **Validation**: Conditional rendering tests

#### RR-004: List Rendering
- ✅ **Test**: Lists render efficiently
- ✅ **Pass Criteria**: Key props present, no warnings
- ✅ **Validation**: List rendering tests

#### RR-005: Dynamic Content
- ✅ **Test**: Dynamic content updates reactively
- ✅ **Pass Criteria**: UI reflects state changes immediately
- ✅ **Validation**: State update tests

#### RR-006: Portal Rendering - Modals
- ✅ **Test**: Modals render in portal
- ✅ **Pass Criteria**: Modals on top of main content
- ✅ **Validation**: Modal rendering tests

#### RR-007: Portal Rendering - Toasts
- ✅ **Test**: Toasts render in portal
- ✅ **Pass Criteria**: Toasts positioned correctly
- ✅ **Validation**: Toast rendering tests

#### RR-008: Error Boundaries
- ✅ **Test**: Error boundaries catch rendering errors
- ✅ **Pass Criteria**: Fallback UI shown instead of crash
- ✅ **Validation**: Error boundary tests

#### RR-009: Suspense Boundaries
- ✅ **Test**: Suspense boundaries show loading states
- ✅ **Pass Criteria**: Fallback UI during lazy loading
- ✅ **Validation**: Suspense tests

#### RR-010: Re-render Optimization
- ✅ **Test**: Unnecessary re-renders prevented
- ✅ **Pass Criteria**: Memoization used appropriately
- ✅ **Validation**: Re-render profiling

---

### 3.8 Accessibility (12 tests)

#### AC-001: ARIA Labels - Buttons
- ✅ **Test**: All buttons have aria-label or text
- ✅ **Pass Criteria**: Screen reader can identify all buttons
- ✅ **Validation**: Screen reader test

#### AC-002: ARIA Labels - Form Inputs
- ✅ **Test**: All inputs have associated labels
- ✅ **Pass Criteria**: label with htmlFor or aria-label
- ✅ **Validation**: Form accessibility test

#### AC-003: ARIA Roles
- ✅ **Test**: Semantic roles used appropriately
- ✅ **Pass Criteria**: navigation, main, complementary roles
- ✅ **Validation**: Role audit

#### AC-004: Keyboard Navigation - Tab Order
- ✅ **Test**: Tab order is logical
- ✅ **Pass Criteria**: Follows visual flow
- ✅ **Validation**: Keyboard navigation test

#### AC-005: Keyboard Navigation - Focus Trap
- ✅ **Test**: Modals trap focus
- ✅ **Pass Criteria**: Tab cycles within modal
- ✅ **Validation**: Modal keyboard test

#### AC-006: Keyboard Navigation - Shortcuts
- ✅ **Test**: Keyboard shortcuts available
- ✅ **Pass Criteria**: Common actions have shortcuts (e.g., Ctrl+S)
- ✅ **Validation**: Shortcut tests

#### AC-007: Screen Reader Compatibility
- ✅ **Test**: App usable with NVDA/JAWS
- ✅ **Pass Criteria**: All content readable
- ✅ **Validation**: Screen reader testing

#### AC-008: Focus Visibility
- ✅ **Test**: Focus indicator always visible
- ✅ **Pass Criteria**: 2px outline minimum
- ✅ **Validation**: Focus indicator test

#### AC-009: Alt Text - Images
- ✅ **Test**: All images have alt text
- ✅ **Pass Criteria**: Descriptive alt attributes
- ✅ **Validation**: Alt text audit

#### AC-010: Alt Text - Icons
- ✅ **Test**: Icon-only buttons have labels
- ✅ **Pass Criteria**: aria-label on icon buttons
- ✅ **Validation**: Icon button audit

#### AC-011: Semantic HTML
- ✅ **Test**: Proper HTML elements used
- ✅ **Pass Criteria**: button, nav, header, main, footer
- ✅ **Validation**: HTML structure review

#### AC-012: Color Independence
- ✅ **Test**: Information not conveyed by color alone
- ✅ **Pass Criteria**: Icons or text supplement color
- ✅ **Validation**: Grayscale test

---

### 3.9 Data Integrity (18 tests)

#### DI-001: PPTX Parsing Accuracy
- ✅ **Test**: PPTX content accurately extracted
- ✅ **Pass Criteria**: 100% of text captured
- ✅ **Validation**: Sample PPTX comparison

#### DI-002: PPTX Structure Preservation
- ✅ **Test**: Slide order maintained
- ✅ **Pass Criteria**: Slides in original sequence
- ✅ **Validation**: Multi-slide test

#### DI-003: DOCX Parsing Accuracy
- ✅ **Test**: DOCX content accurately extracted
- ✅ **Pass Criteria**: Headings, paragraphs, lists preserved
- ✅ **Validation**: Sample DOCX comparison

#### DI-004: PDF Parsing Accuracy
- ✅ **Test**: PDF text extraction accurate
- ✅ **Pass Criteria**: 95% accuracy minimum
- ✅ **Validation**: Sample PDF comparison

#### DI-005: PDF Image Extraction
- ✅ **Test**: Images extracted from PDF
- ✅ **Pass Criteria**: All images captured
- ✅ **Validation**: Image count comparison

#### DI-006: MP4 Metadata Extraction
- ✅ **Test**: MP4 metadata accurate
- ✅ **Pass Criteria**: Duration, dimensions, codec correct
- ✅ **Validation**: MediaInfo comparison

#### DI-007: Script Generation Quality
- ✅ **Test**: Generated scripts coherent
- ✅ **Pass Criteria**: Logical flow, no repetition
- ✅ **Validation**: Manual script review

#### DI-008: Script Context Preservation
- ✅ **Test**: Scripts maintain original intent
- ✅ **Pass Criteria**: Key points from source material
- ✅ **Validation**: Content comparison

#### DI-009: Audio Synchronization Accuracy
- ✅ **Test**: Audio syncs with visuals
- ✅ **Pass Criteria**: ±100ms tolerance
- ✅ **Validation**: Sync timing tests

#### DI-010: Video Quality Preservation
- ✅ **Test**: Output video quality acceptable
- ✅ **Pass Criteria**: 1080p minimum, no artifacts
- ✅ **Validation**: Visual quality test

#### DI-011: Audio Quality
- ✅ **Test**: Generated audio clear
- ✅ **Pass Criteria**: No distortion, 48kHz sampling
- ✅ **Validation**: Audio quality test

#### DI-012: State Persistence
- ✅ **Test**: Work-in-progress saved
- ✅ **Pass Criteria**: Refresh doesn't lose data
- ✅ **Validation**: Persistence tests

#### DI-013: Cache Validity
- ✅ **Test**: Cached data remains valid
- ✅ **Pass Criteria**: No stale data served
- ✅ **Validation**: Cache invalidation tests

#### DI-014: Export Data Integrity
- ✅ **Test**: Exported files match internal state
- ✅ **Pass Criteria**: No data loss during export
- ✅ **Validation**: Export/import roundtrip test

#### DI-015: File Naming Consistency
- ✅ **Test**: Generated files properly named
- ✅ **Pass Criteria**: Unique, descriptive names
- ✅ **Validation**: File name tests

#### DI-016: Metadata Preservation
- ✅ **Test**: Project metadata saved
- ✅ **Pass Criteria**: Author, date, settings preserved
- ✅ **Validation**: Metadata tests

#### DI-017: Character Encoding
- ✅ **Test**: Special characters handled
- ✅ **Pass Criteria**: UTF-8 throughout
- ✅ **Validation**: Unicode character tests

#### DI-018: Large File Handling
- ✅ **Test**: Large files don't corrupt
- ✅ **Pass Criteria**: Files up to max size process correctly
- ✅ **Validation**: Large file tests

---

### 3.10 Duplicates & Legacy (5 tests)

#### DL-001: No Duplicate Code
- ✅ **Test**: DRY principles followed
- ✅ **Pass Criteria**: No copy-pasted code blocks
- ✅ **Validation**: Code similarity analysis

#### DL-002: No Unused Imports
- ✅ **Test**: All imports used
- ✅ **Pass Criteria**: ESLint unused-import rule passes
- ✅ **Validation**: Linter check

#### DL-003: No Deprecated Dependencies
- ✅ **Test**: Dependencies current
- ✅ **Pass Criteria**: No deprecated packages
- ✅ **Validation**: npm outdated check

#### DL-004: Clean Build Output
- ✅ **Test**: No console warnings
- ✅ **Pass Criteria**: Zero warnings in production build
- ✅ **Validation**: Build log analysis

#### DL-005: Code Style Consistency
- ✅ **Test**: Prettier formatting applied
- ✅ **Pass Criteria**: npm run format shows no changes
- ✅ **Validation**: Format check

---

## 4. Success Criteria

### 4.1 Critical Tests (Must Pass)
All tests marked as **Critical** priority must pass:
- Code Correctness: 25/25
- Wiring & Integration: 30/30
- Security: 15/15
- Data Integrity: 18/18

**Total Critical: 88/88 (100%)**

### 4.2 High Priority Tests (Must Pass)
All tests marked as **High** priority must pass:
- Deployment: 13/13
- UI/UX: 20/20
- Accessibility: 12/12

**Total High: 45/45 (100%)**

### 4.3 Medium/Low Priority Tests (90% Pass Rate)
- Performance & Timing: 14/15 (93%)
- Runtime Rendering: 9/10 (90%)
- Duplicates & Legacy: 5/5 (100%)

**Total Medium/Low: 28/30 (93%)**

### 4.4 Overall Success Criteria
- **Critical + High**: 133/133 (100%)
- **Overall**: 161/163 (98.77%)
- **System Health Score**: 90+ (Excellent)

---

## 5. Test Execution Plan

### 5.1 Initial Run (Expect RED)
```bash
npm run qa:all
```

**Expected Output**:
```
==================================
COURSE CRAFTER QA TEST SUITE
==================================

Total Tests: 163
Passed: 0
Failed: 163
Success Rate: 0%

Category Breakdown:
- Code Correctness: 0/25 ❌
- Wiring & Integration: 0/30 ❌
- Security: 0/15 ❌
- Deployment: 0/13 ❌
- UI/UX: 0/20 ❌
- Performance & Timing: 0/15 ❌
- Runtime Rendering: 0/10 ❌
- Accessibility: 0/12 ❌
- Data Integrity: 0/18 ❌
- Duplicates & Legacy: 0/5 ❌

System Health: 0% - CRITICAL
```

### 5.2 Build to Green
1. Implement features per architecture
2. Run tests frequently: `npm run qa:category <category>`
3. Monitor progress in QA dashboard
4. Address failures systematically
5. Re-run until all tests GREEN

### 5.3 Final Verification
```bash
npm run qa:all
```

**Target Output**:
```
==================================
COURSE CRAFTER QA TEST SUITE
==================================

Total Tests: 163
Passed: 161
Failed: 2
Success Rate: 98.77%

Category Breakdown:
- Code Correctness: 25/25 ✅
- Wiring & Integration: 30/30 ✅
- Security: 15/15 ✅
- Deployment: 13/13 ✅
- UI/UX: 20/20 ✅
- Performance & Timing: 14/15 ⚠️
- Runtime Rendering: 9/10 ⚠️
- Accessibility: 12/12 ✅
- Data Integrity: 18/18 ✅
- Duplicates & Legacy: 5/5 ✅

System Health: 92% - EXCELLENT ❤️
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-21 | Initial QA specification |
| 1.1.0 | 2025-11-24 | Added post-deployment smoke tests (DE-007-A through DE-007-C) to catch 404 errors and deployment failures |

---

## Sign-off

This QA specification represents the complete test suite for Course Crafter. All tests must pass (or meet minimum thresholds) before handover.

**Status**: ❌ RED (Initial State)
**Target**: ✅ GREEN (98.77%+ pass rate)
