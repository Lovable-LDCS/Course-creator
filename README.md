# Video Factory 🎓

An AI-powered platform for transforming educational content into professional training materials.

## Features

- 🎙️ **Voiceover Engine**: Transform PowerPoint presentations and MP4 files into voice-enabled content
- 🎬 **PPT/MP4 → Video Engine**: Create professional training videos from presentations and media
- 🤖 **AI-Powered**: Leverages OpenAI's GPT-4, Vision, TTS, DALL-E, and SORA for intelligent content generation
- 📊 **QA Dashboard**: Comprehensive quality assurance and system health monitoring
- 💰 **Cost Optimized**: Intelligent AI model selection for minimum cost, maximum effectiveness
- ♿ **Accessible**: WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
- 🌍 **Internationalized**: Built-in i18n support with multiple language capability

## New Architecture (v2.0)

Video Factory now features a completely redesigned UI/UX with:

- **Modal-Based Engine Interface**: Engines open in full-height modals for better focus
- **5-Step Workflow**: Structured process guides users through Settings → Projects → Contextualise → Feed the Beast → Plan
- **Atomic Design Pattern**: Components organized as Atoms → Molecules → Organisms → Templates
- **3-Panel Layout**: Left sidebar (steps), main content (cards), right panel (workspace utilities)
- **Professional UX**: Card-based interface with numbered sub-steps, integrated chat, and timeline preview

## Architecture

Video Factory follows a "one-time build philosophy" with comprehensive architecture-driven development:

- **Architecture Document**: See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete system design
- **Development Rules**: See [RULES.md](./RULES.md) for accessibility, i18n, security, and AI best practices
- **QA Process**: See [ONE_TIME_BUILD_RULES.md](./ONE_TIME_BUILD_RULES.md) for QA gating and workflow
- **API Specification**: See [API_SPEC.md](./API_SPEC.md) for complete endpoint documentation
- **QA Specification**: See [QA_SPECIFICATION.md](./QA_SPECIFICATION.md) for 160 comprehensive tests
- **Test-Driven**: All features are built to pass QA tests (RED → GREEN methodology)

## Technology Stack

**Frontend:**
- React 19 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- React Router v7 (routing)
- Zustand (state management)
- i18next (internationalization)
- Headless UI (accessible components)

**AI Services:**
- OpenAI API (GPT-4, Vision, TTS, DALL-E, SORA)

**Development:**
- ESLint + TypeScript strict mode
- Jest + React Testing Library
- Playwright (E2E testing)

**Deployment:**
- GitHub Pages (static hosting)
- GitHub Actions (CI/CD)

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn  
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Lovable-LDCS/Course-creator.git
cd Course-creator
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```env
VITE_OPENAI_API_KEY=your-api-key-here
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
video-factory/
├── src/
│   ├── components/       # React components
│   │   ├── atoms/        # Basic building blocks
│   │   ├── molecules/    # Simple combinations
│   │   ├── organisms/    # Complex UI components
│   │   ├── templates/    # Page-level layouts
│   │   ├── engines/      # Engine-specific components
│   │   │   └── voiceover/
│   │   ├── layout/       # Layout components
│   │   ├── common/       # Reusable UI components
│   │   └── qa/           # QA dashboard components
│   ├── services/         # API and service integrations
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── config/           # Configuration files
│   ├── contexts/         # React contexts
│   └── lib/              # Library code
├── docs/                 # Documentation
├── ARCHITECTURE.md       # System architecture
├── RULES.md              # Development best practices
├── ONE_TIME_BUILD_RULES.md  # QA and workflow process
├── API_SPEC.md           # API specification
└── QA_SPECIFICATION.md   # Complete QA test specification
```

## Engines

### Engine 1: Voiceover

Transform presentations and videos into voice-enabled content:

**5-Step Workflow:**
1. **Settings**: Configure voice, language, accessibility, and branding
2. **Projects**: Create project hierarchy (Projects → Units → Modules → Lessons)
3. **Contextualise**: Provide context via text, documents, and audience targeting
4. **Feed the Beast**: Upload PPTX, MP4, or paste YouTube URLs
5. **Plan**: Generate AI narration plan, review with chat, and approve for rendering

**Features:**
- AI-generated natural narration scripts
- Professional voice synthesis (6 voice options)
- Automatic audio synchronization
- Multiple export formats (MP3, WAV, PPTX with audio)
- Caption and transcript generation

### Engine 2: PPT/MP4 → Video

Create professional training videos from presentations and media:
- Support for PPTX, DOCX, PDF, MP4, TXT, MD files
- AI-powered content analysis and storyboarding
- Automatic visual asset generation
- Professional voice-over narration
- Export for training platforms

*(Same 5-step workflow as Voiceover)*

### Engines 3 & 4

Coming soon! Future expansion planned.

## QA & Testing

Video Factory includes comprehensive QA testing across 10 categories:

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

**Total: 160 tests**

Access the QA Dashboard from the "System Health" button in the top navigation.

## Best Practices & Compliance

### Accessibility (WCAG 2.1/2.2 AA)
- Semantic HTML throughout
- Proper ARIA attributes and roles
- Keyboard accessible navigation
- Screen reader compatible
- Color contrast compliant (4.5:1 minimum)
- Focus indicators visible

### Internationalization (i18n)
- All strings externalized
- RTL language support ready
- No flag icons for languages
- Locale-aware date/number formatting
- Font support for multiple scripts

### Security (OWASP Top 10)
- Input validation and sanitization
- Signed URLs for uploads
- API keys in environment variables
- Rate limiting ready
- XSS and CSRF protection
- Dependency scanning

### AI Ethics & Transparency
- Industry and worker level targeting
- AI consumption indicator
- Explainability for generated content
- User control and override
- Diverse, non-stereotyped imagery
- Content badges for generated media

## Deployment

The application is deployed to GitHub Pages automatically on pushes to the `main` branch.

**Live Application**: https://lovable-ldcs.github.io/Course-creator/

For complete deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy Setup

1. Enable GitHub Pages in repository settings (Source: GitHub Actions)
2. Add OpenAI API key as repository secret: `VITE_OPENAI_API_KEY`
3. Push to `main` branch or manually trigger deployment workflow

## Development Workflow

Video Factory follows a strict one-time build methodology:

1. **Plan**: Architecture and test specification first
2. **Build**: Implement following TDD (Red → Green → Refactor)
3. **Test**: Automated tests, gap analysis, manual QA
4. **Review**: Code review and security scan
5. **Deploy**: Merge only when all QA passes

See [ONE_TIME_BUILD_RULES.md](./ONE_TIME_BUILD_RULES.md) for complete workflow.

## Contributing

This is a private project for individual use with potential future commercialization.

Development follows these principles:
- Architecture-first approach
- Test-driven development
- Atomic Design component structure
- WCAG AA accessibility compliance
- OWASP security standards
- Comprehensive documentation

## Security

- API keys stored in environment variables
- No sensitive data committed to repository
- All user inputs validated and sanitized
- Follows OWASP security best practices
- Regular dependency audits
- CodeQL security scanning

## License

Private - All rights reserved

## Support

For issues or questions, please create an issue in the GitHub repository.

---

**Version**: 2.0.0  
**Last Updated**: 2025-11-23
**Status**: Foundation Complete - Iterative Enhancement Phase
