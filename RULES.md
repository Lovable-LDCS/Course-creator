# Video Factory - Development Rules & Best Practices

## Version: 1.0.0
## Last Updated: 2025-11-23

---

## Table of Contents
1. [Accessibility Standards](#accessibility-standards)
2. [Internationalization & Localization](#internationalization--localization)
3. [Design System & Atomic Design](#design-system--atomic-design)
4. [Security Best Practices](#security-best-practices)
5. [AI & Content Generation Guidelines](#ai--content-generation-guidelines)
6. [Video Accessibility Requirements](#video-accessibility-requirements)

---

## 1. Accessibility Standards

### WCAG 2.1/2.2 Compliance (AA Level)

**Reference**: [W3C WCAG Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

All UI components and content must meet WCAG 2.1/2.2 Level AA standards:

#### 1.1 Semantic HTML
- Use appropriate HTML5 semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- Use heading hierarchy properly (`<h1>` through `<h6>`)
- Use `<button>` for actions, `<a>` for navigation
- Use `<label>` elements for all form inputs

#### 1.2 Keyboard Operability
- All interactive elements must be keyboard accessible
- Focus indicators must be visible (minimum 3:1 contrast ratio)
- Tab order must be logical and follow visual flow
- Provide keyboard shortcuts for common actions
- Ensure modals trap focus and can be closed with ESC key

#### 1.3 Color & Contrast
- Text contrast ratio: minimum 4.5:1 for normal text, 3:1 for large text
- Non-text elements: minimum 3:1 contrast ratio
- Do not rely solely on color to convey information
- Ensure sufficient contrast for focus indicators

#### 1.4 ARIA Attributes
- Use ARIA roles, states, and properties where HTML semantics are insufficient
- Common ARIA attributes to use:
  - `aria-label` for elements without visible text
  - `aria-labelledby` to reference labeling elements
  - `aria-describedby` for additional descriptions
  - `aria-live` for dynamic content updates
  - `aria-expanded` for collapsible elements
  - `aria-selected` for tabs and selections
  - `aria-hidden` for decorative elements

#### 1.5 Screen Reader Support
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Provide alternative text for images
- Ensure proper reading order
- Announce dynamic content changes

---

## 2. Internationalization & Localization

### i18n Best Practices

**Reference**: [Localization Best Practices](https://localizejs.com/articles/best-practices-for-localizing-your-user-experience)

#### 2.1 String Management
- All user-facing strings must be externalized using i18next
- Use namespaces to organize translations by feature
- Store translations in `/src/i18n/locales/{lang}/` directory
- Never hardcode user-facing text in components

#### 2.2 Language Selection
- **DO NOT** use flag icons to represent languages
- Use language names in their native form (e.g., "Français", "日本語", "العربية")
- Provide a clear language selector in the UI
- Store user language preference

#### 2.3 Text Expansion
- Reserve 30-50% additional space for text expansion in translations
- Avoid fixed-width containers for text
- Test UI with longest expected translations
- Use flexible layouts (flexbox, grid)

#### 2.4 RTL (Right-to-Left) Support
- Design layouts to support RTL languages (Arabic, Hebrew)
- Use logical CSS properties (`margin-inline-start` instead of `margin-left`)
- Test mirroring of UI elements for RTL
- Ensure icons and images are appropriately positioned

#### 2.5 Fonts & Typography
- Choose fonts that support target language scripts
- Provide fallback fonts for different scripts
- Support Unicode and UTF-8 encoding
- Test special characters and diacritics

#### 2.6 Date, Time, and Number Formatting
- Use `date-fns` or Intl API for locale-aware formatting
- Format dates according to locale (MM/DD/YYYY vs DD/MM/YYYY)
- Format numbers with proper thousand and decimal separators
- Handle currencies appropriately

---

## 3. Design System & Atomic Design

### Atomic Design Methodology

**Reference**: [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/chapter-2/)

#### 3.1 Component Hierarchy

**Atoms** (`/src/components/atoms/`)
- Smallest building blocks (buttons, inputs, labels, icons)
- Single responsibility components
- Highly reusable and generic
- Examples: `Button`, `Input`, `Icon`, `Label`, `Badge`

**Molecules** (`/src/components/molecules/`)
- Combinations of atoms
- Form a distinct functional unit
- Examples: `FormField`, `SearchBar`, `Card`, `Alert`, `FileUploadButton`

**Organisms** (`/src/components/organisms/`)
- Complex UI components made of molecules and atoms
- Represent distinct sections of interface
- Examples: `Header`, `Sidebar`, `Modal`, `Timeline`, `ProjectTree`

**Templates** (`/src/components/templates/`)
- Page-level layouts
- Combine organisms into page structures
- Examples: `EngineModalTemplate`, `DashboardLayout`

**Pages** (`/src/components/pages/` or feature folders)
- Specific instances of templates with real content
- Examples: `VoiceoverEngine`, `PPTToVideoEngine`

#### 3.2 Design Tokens
- Create a centralized token system for:
  - Colors (primary, secondary, neutral, semantic)
  - Typography (font families, sizes, weights, line heights)
  - Spacing (margin, padding scales)
  - Breakpoints (responsive design)
  - Shadows and elevation
  - Border radius
  - Transitions and animations

- Store design tokens in `/src/styles/tokens.css` or `/src/config/design-tokens.ts`
- Use CSS custom properties or TypeScript constants
- Ensure tokens are used consistently across all components

#### 3.3 Component Guidelines
- Each component should have a single, clear purpose
- Components should be self-contained and reusable
- Use composition over inheritance
- Document component props and usage
- Provide TypeScript types for all props
- Include accessibility attributes by default

---

## 4. Security Best Practices

### OWASP Top 10 Compliance

**Reference**: [OWASP Top Ten](https://owasp.org/www-project-top-ten/)

#### 4.1 Input Validation & Sanitization
- Validate all user inputs on both client and server side
- Use Zod or similar schema validation library
- Sanitize file uploads (check type, size, content)
- Prevent XSS by escaping user-generated content
- Validate URLs before processing (YouTube downloads, external media)

#### 4.2 File Upload Security
- Limit file sizes (enforce MAX_FILE_SIZES from config)
- Validate file types by content, not just extension
- Scan uploaded files for malware (server-side)
- Use signed URLs for S3 uploads (no direct upload endpoints)
- Store uploads outside web root
- Generate unique filenames to prevent overwrites

#### 4.3 API Security
- Use HTTPS for all API communications
- Implement rate limiting on all endpoints
- Protect sensitive endpoints with authentication
- Use API keys securely (environment variables, secrets manager)
- Never expose API keys in client-side code or logs
- Implement CORS properly

#### 4.4 Authentication & Authorization
- Use Auth0, Firebase Auth, or similar OIDC provider
- Implement proper session management
- Use secure, HTTP-only cookies for session tokens
- Implement CSRF protection
- Enforce least privilege principle

#### 4.5 Secrets Management
- Store all secrets in environment variables or secrets manager
- Never commit secrets to version control
- Use `.env.example` for documentation, not actual values
- Rotate secrets regularly
- Use different secrets for development and production

#### 4.6 Data Protection
- Encrypt sensitive data at rest and in transit
- Use secure storage for user data
- Implement proper access controls
- Follow data retention policies
- Comply with privacy regulations (GDPR, CCPA)

#### 4.7 Dependency Management
- Keep dependencies up to date
- Regularly audit dependencies for vulnerabilities
- Use `npm audit` or similar tools
- Review dependency licenses
- Minimize third-party dependencies

---

## 5. AI & Content Generation Guidelines

### Responsible AI Usage

#### 5.1 Industry & Audience Targeting
- **ALWAYS** allow users to select:
  - Industry (Mining, Healthcare, Manufacturing, etc.)
  - Worker level (Novice, Intermediate, Advanced)
- AI must adjust:
  - Vocabulary complexity
  - Sentence structure
  - Technical terminology
  - Explanation depth
- Store these selections in project metadata

#### 5.2 Context Document Consumption
- Display **AI Consumption Indicator**:
  - Percentage of context documents consulted
  - List of documents used
  - List of documents not consulted
- Allow users to:
  - Force AI to re-evaluate ignored documents
  - Rebuild plan with specific document focus
  - Understand which sources informed the generation

#### 5.3 Image Generation Best Practices
- **Prefer user-supplied images** over generated ones when available
- For generated images:
  - Use neutral, realistic depictions for professional training
  - Avoid exaggerated or sexualized imagery
  - Use diverse, non-stereotyped representations
  - Match industry and regional context
  - Provide content badges for generated images
  - Flag culturally sensitive content for review

#### 5.4 Explainability & Transparency
- For each generated image, provide:
  - The prompt used
  - Which context documents informed the prompt
  - Source attribution
- For generated scripts, show:
  - Which documents were referenced
  - How industry/level influenced language
  - Confidence scores where applicable

#### 5.5 User Control & Override
- Users must be able to:
  - Edit all AI-generated content
  - Accept or reject individual suggestions
  - See diffs when AI modifies content
  - Undo AI changes
  - Provide feedback for future improvements

#### 5.6 Self-Learning & Memory
- Store plan edits as training feedback in `projectMemory`
- Maintain `feedbackExamples` array in database
- Use for supervised fine-tuning or prompt engineering
- Respect user privacy in feedback collection

---

## 6. Video Accessibility Requirements

### Captions, Transcripts & Audio Descriptions

**Reference**: [W3C Captions Guidance](https://www.w3.org/WAI/media/av/captions/)

#### 6.1 Captions (Mandatory)
- Provide captions for **every video**
- Captions must include:
  - All spoken dialogue
  - Speaker identification when needed
  - Non-speech sounds that are important (e.g., [applause], [door slams])
  - Musical cues when relevant
- Caption quality:
  - Accurate (99%+ accuracy)
  - Synchronized with audio (±500ms tolerance)
  - Readable (proper line breaks, max 2 lines)
  - Properly positioned (not obscuring important visual content)
- Caption format:
  - Generate `.srt` files
  - Support `.vtt` for web playback
  - Embedded captions in MP4 when possible

#### 6.2 Transcripts
- Provide downloadable transcripts for all videos
- Transcript must include:
  - All captions content
  - Description of important visual information
  - Speaker names
  - Time codes
- Format: Text file, PDF, or HTML

#### 6.3 Audio Descriptions
- For videos where essential visual information is not conveyed in audio:
  - Provide audio descriptions track
  - Describe visual content during pauses in dialogue
  - Or provide alternative version with descriptions
- Examples of essential visual information:
  - Actions, expressions, scene changes
  - Text or graphics shown on screen
  - Physical demonstrations

#### 6.4 Playback Controls
- Provide accessible playback controls:
  - Play/Pause (spacebar)
  - Volume control (keyboard accessible)
  - Seek controls (arrow keys)
  - Playback speed adjustment (0.5x to 2.0x)
  - Captions toggle (keyboard shortcut: C)
  - Fullscreen toggle (keyboard shortcut: F)
- Ensure controls have:
  - Proper focus indicators
  - ARIA labels
  - Keyboard accessibility

#### 6.5 Default Settings
- Captions should be ON by default
- Allow users to save caption preferences
- Respect system accessibility settings
- Provide high contrast mode for captions

---

## 7. Development Workflow Rules

### 7.1 Code Quality
- Follow TypeScript strict mode
- Use ESLint with recommended rules
- Run linter before commits
- Write self-documenting code
- Add comments for complex logic only

### 7.2 Component Development
- Create components in appropriate atomic level folder
- Include TypeScript interfaces/types
- Add JSDoc comments for public APIs
- Follow naming conventions:
  - PascalCase for components
  - camelCase for functions and variables
  - UPPER_SNAKE_CASE for constants

### 7.3 Testing
- Write unit tests for business logic
- Write integration tests for user flows
- Write E2E tests for critical paths
- Achieve minimum 80% code coverage
- Test accessibility with automated tools

### 7.4 Version Control
- Use feature branches
- Write clear commit messages
- Reference issue numbers
- Keep commits atomic and focused
- Update documentation with code changes

---

## 8. Signoff Requirements

Before merging any feature, the following must be verified:

- [ ] Accessibility audit passed (WCAG AA)
- [ ] All strings externalized for i18n
- [ ] Security checklist reviewed
- [ ] AI guidelines followed (if applicable)
- [ ] Video accessibility requirements met (if applicable)
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Code reviewed by peer
- [ ] Documentation updated
- [ ] ARCHITECTURE.md updated with changes

---

## References

1. **WCAG 2.1/2.2**: https://www.w3.org/WAI/standards-guidelines/wcag/
2. **WAI Captions**: https://www.w3.org/WAI/media/av/captions/
3. **OWASP Top 10**: https://owasp.org/www-project-top-ten/
4. **Atomic Design**: https://atomicdesign.bradfrost.com/chapter-2/
5. **Localization Best Practices**: https://localizejs.com/articles/best-practices-for-localizing-your-user-experience
6. **Section 508**: https://www.section508.gov/

---

**This document is a living standard. All team members must review and follow these rules.**
