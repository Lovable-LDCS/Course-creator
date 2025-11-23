# Course Crafter 🎓

An AI-powered platform for transforming educational content into professional training materials.

## Features

- 🎙️ **Voice-Over Generator**: Transform PowerPoint presentations and MP4 files into voice-enabled content
- 🎬 **Training Video Creator**: Create professional training videos from various content sources
- 🤖 **AI-Powered**: Leverages OpenAI's GPT-4, Vision, TTS, DALL-E, and SORA for intelligent content generation
- 📊 **QA Dashboard**: Comprehensive quality assurance and system health monitoring
- 💰 **Cost Optimized**: Intelligent AI model selection for minimum cost, maximum effectiveness

## Architecture

Course Crafter follows a "one-time build philosophy" with comprehensive architecture-driven development:

- **Architecture Document**: See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete system design
- **QA Specification**: See [QA_SPECIFICATION.md](./QA_SPECIFICATION.md) for 160 comprehensive tests
- **Test-Driven**: All features are built to pass QA tests (RED → GREEN methodology)

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **AI Services**: OpenAI API (GPT-4, Vision, TTS, DALL-E, SORA)
- **State Management**: React Context API + React Query
- **Deployment**: GitHub Pages

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
npm install
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
course-crafter/
├── src/
│   ├── components/       # React components
│   │   ├── layout/      # Layout components
│   │   ├── common/      # Reusable UI components
│   │   ├── engines/     # Engine-specific components
│   │   └── qa/          # QA dashboard components
│   ├── services/        # API and service integrations
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   ├── config/          # Configuration files
│   └── lib/             # Library code
├── docs/                # Documentation
├── ARCHITECTURE.md      # Comprehensive architecture document
└── QA_SPECIFICATION.md  # Complete QA test specification
```

## Engines

### Engine 1: Voice-Over Generator

Transform presentations and videos into voice-enabled content:
- Upload PowerPoint (.pptx) or MP4 files
- AI generates natural narration scripts
- Professional voice synthesis with multiple voice options
- Automatic audio synchronization
- Export with embedded audio

### Engine 2: Training Video Creator

Create professional training videos from multiple sources:
- Support for PPTX, DOCX, PDF, MP4, TXT, MD files
- AI-powered content analysis and storyboarding
- Automatic visual asset generation
- Professional voice-over narration
- Export for training platforms

### Engines 3 & 4

Coming soon! Future expansion planned for:
- Interactive quiz generation
- Course packaging and distribution

## QA & Testing

Course Crafter includes comprehensive QA testing across 10 categories:

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

## Deployment

The application is deployed to GitHub Pages automatically on pushes to the `main` branch.

**Live Application**: https://lovable-ldcs.github.io/Course-creator/

For complete deployment instructions, setup guide, and troubleshooting, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Setup

1. Enable GitHub Pages in repository settings (Source: GitHub Actions)
2. Add OpenAI API key as repository secret: `VITE_OPENAI_API_KEY`
3. Push to `main` branch or manually trigger deployment workflow

The deployment workflow handles building and deploying automatically.

## Contributing

This is a private project for individual use with potential future commercialization.

## Security

- API keys are stored in environment variables
- No sensitive data committed to repository
- All user inputs are validated and sanitized
- Follows OWASP security best practices

## License

Private - All rights reserved

## Support

For issues or questions, please create an issue in the GitHub repository.

---

**Version**: 1.0.0  
**Last Updated**: 2025-11-21
