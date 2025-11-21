# Course Crafter - Comprehensive Architecture Document

## Version: 1.0.0
## Last Updated: 2025-11-21
## Status: True North Architecture

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [System Overview](#system-overview)
3. [Architecture Principles](#architecture-principles)
4. [Technology Stack](#technology-stack)
5. [Application Structure](#application-structure)
6. [Engine Specifications](#engine-specifications)
7. [AI Integration Strategy](#ai-integration-strategy)
8. [Data Flow & Processing Pipeline](#data-flow--processing-pipeline)
9. [Storage Architecture](#storage-architecture)
10. [QA & Health Monitoring System](#qa--health-monitoring-system)
11. [Security & Authentication](#security--authentication)
12. [Deployment Strategy](#deployment-strategy)
13. [Future Scalability](#future-scalability)

---

## 1. Executive Summary

**Course Crafter** is a comprehensive AI-powered content creation platform designed to transform educational materials into professional training content. The application leverages cutting-edge AI models from OpenAI to provide automated voice-over generation and video creation capabilities.

### Key Objectives:
- Transform PowerPoint presentations and MP4 files into voice-over enabled content
- Generate fully-fledged training videos from various input formats
- Provide intelligent, cost-effective AI model selection
- Ensure 100% functional UI/UX with comprehensive QA coverage
- Enable single-user operation with future commercialization potential

### Initial Scope:
- **Engine 1**: Voice-Over Generator (PowerPoint/MP4 → Voice-enabled content)
- **Engine 2**: Training Video Creator (Multi-format → Professional training videos)
- **Engines 3-4**: Placeholder for future expansion

---

## 2. System Overview

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Course Crafter UI                        │
│  ┌────────┬────────┬────────┬────────┐  ┌──────────────┐   │
│  │Engine 1│Engine 2│Engine 3│Engine 4│  │System Health │   │
│  └────────┴────────┴────────┴────────┘  └──────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    Sidebar Navigation                        │
│         (Context-specific per engine)                        │
├─────────────────────────────────────────────────────────────┤
│                   Main Content Area                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  File Upload / Input Processing                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │ PPTX     │  │   MP4    │  │  DOCX    │          │   │
│  │  │ Parser   │  │  Parser  │  │  Parser  │          │   │
│  │  └──────────┘  └──────────┘  └──────────┘          │   │
│  └─────────────────────────────────────────────────────┘   │
│                           ↓                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           AI Orchestration Layer                     │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │  GPT-4   │  │  Vision  │  │  TTS     │          │   │
│  │  │ Reasoning│  │   API    │  │  API     │          │   │
│  │  └──────────┘  └──────────┘  └──────────┘          │   │
│  │  ┌──────────┐  ┌──────────┐                         │   │
│  │  │ DALL-E   │  │  SORA    │                         │   │
│  │  │  Image   │  │  Video   │                         │   │
│  │  └──────────┘  └──────────┘                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                           ↓                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Processing & Generation Pipeline            │   │
│  └─────────────────────────────────────────────────────┘   │
│                           ↓                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Storage Management System                    │   │
│  │         (Desktop / Cloud Storage)                    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 User Interaction Flow

1. User selects engine from top navigation bar
2. Sidebar provides engine-specific options and settings
3. User uploads input files (PPTX, MP4, DOCX, etc.)
4. System validates and parses input files
5. AI orchestration layer selects optimal models
6. Processing pipeline generates output
7. User previews and refines output
8. Final product saved to storage
9. System health checker monitors all operations

---

## 3. Architecture Principles

### 3.1 One-Time Build Philosophy
- **Complete Architecture First**: No coding until architecture is 100% complete
- **QA-Driven Development**: Build to pass QA tests, not to assumptions
- **Red to Green**: All tests start failing, build until all pass
- **Zero Rework**: Architecture must be comprehensive enough to avoid rebuilds

### 3.2 Design Principles
- **Modularity**: Each engine is self-contained with clear interfaces
- **AI-First**: Leverage AI for all intelligent operations
- **Cost Optimization**: Automatic model selection for minimum cost, maximum effectiveness
- **User-Centric**: Simple, intuitive UI with minimal learning curve
- **Testability**: Every component has corresponding QA tests
- **Scalability**: Architecture supports future engine additions

### 3.3 Quality Standards
- **100% Functional**: No placeholder or mock functionality
- **Production-Ready**: Code quality suitable for commercialization
- **Secure**: All data handling follows security best practices
- **Performant**: Optimized for single-user operation with sub-second response times
- **Accessible**: WCAG 2.1 Level AA compliance

---

## 4. Technology Stack

### 4.1 Frontend Framework
**Primary**: React 18+ with TypeScript
- **Reasoning**: Component-based architecture, strong typing, extensive ecosystem
- **UI Library**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API + React Query
- **Routing**: React Router v6
- **Form Handling**: React Hook Form + Zod validation

### 4.2 Build & Development Tools
- **Build Tool**: Vite (fast builds, excellent DX)
- **Package Manager**: npm
- **TypeScript**: Version 5+
- **Linting**: ESLint + Prettier
- **Testing**: Vitest + React Testing Library

### 4.3 AI & Backend Services
- **OpenAI API**: GPT-4, GPT-4 Vision, TTS, DALL-E, SORA (when available)
- **Document Parsing**:
  - PDF: pdf-parse or pdf.js
  - DOCX: mammoth.js or docx
  - PPTX: pptxgenjs or officegen
  - MP4: ffmpeg.wasm for browser-based processing
- **Web Research**: Tavily API or Perplexity API
- **API Client**: Axios with retry logic and rate limiting

### 4.4 Storage
- **Initial**: Local filesystem (Desktop directory)
- **File Management**: File System Access API (browser-based)
- **Future**: AWS S3 or Google Cloud Storage integration ready

### 4.5 Deployment
- **Platform**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Environment Management**: dotenv for local, GitHub Secrets for production

---

## 5. Application Structure

### 5.1 Directory Structure

```
course-crafter/
├── public/
│   ├── index.html
│   └── assets/
│       ├── icons/
│       └── images/
├── src/
│   ├── main.tsx                 # Application entry point
│   ├── App.tsx                  # Root component
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopNavigation.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   └── EngineLayout.tsx
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── Modal.tsx
│   │   ├── qa/
│   │   │   ├── QADashboard.tsx
│   │   │   ├── SystemHealth.tsx
│   │   │   ├── TestCategory.tsx
│   │   │   └── HealthMetric.tsx
│   │   └── engines/
│   │       ├── Engine1/
│   │       │   ├── VoiceOverGenerator.tsx
│   │       │   ├── VoiceOverSidebar.tsx
│   │       │   ├── FileProcessor.tsx
│   │       │   └── VoiceOverPreview.tsx
│   │       └── Engine2/
│   │           ├── VideoCreator.tsx
│   │           ├── VideoCreatorSidebar.tsx
│   │           ├── ContentAnalyzer.tsx
│   │           └── VideoPreview.tsx
│   ├── services/
│   │   ├── ai/
│   │   │   ├── openai.service.ts
│   │   │   ├── model-selector.service.ts
│   │   │   ├── gpt.service.ts
│   │   │   ├── vision.service.ts
│   │   │   ├── tts.service.ts
│   │   │   ├── dalle.service.ts
│   │   │   └── sora.service.ts
│   │   ├── parsers/
│   │   │   ├── pdf.parser.ts
│   │   │   ├── docx.parser.ts
│   │   │   ├── pptx.parser.ts
│   │   │   └── mp4.parser.ts
│   │   ├── storage/
│   │   │   ├── file-manager.service.ts
│   │   │   └── storage-adapter.ts
│   │   ├── research/
│   │   │   └── web-search.service.ts
│   │   └── qa/
│   │       ├── test-runner.service.ts
│   │       └── health-checker.service.ts
│   ├── hooks/
│   │   ├── useFileUpload.ts
│   │   ├── useAIProcessing.ts
│   │   ├── useStorage.ts
│   │   └── useQA.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   ├── error-handler.ts
│   │   └── logger.ts
│   ├── types/
│   │   ├── engine.types.ts
│   │   ├── ai.types.ts
│   │   ├── file.types.ts
│   │   └── qa.types.ts
│   ├── config/
│   │   ├── ai-models.config.ts
│   │   ├── app.config.ts
│   │   └── qa.config.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── tailwind.config.ts
│   └── lib/
│       ├── constants.ts
│       └── env.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── qa/
│       ├── code-correctness.test.ts
│       ├── wiring-integration.test.ts
│       ├── security.test.ts
│       ├── deployment.test.ts
│       ├── ui-ux.test.ts
│       ├── performance.test.ts
│       ├── runtime-rendering.test.ts
│       ├── accessibility.test.ts
│       ├── data-integrity.test.ts
│       └── duplicates-legacy.test.ts
├── docs/
│   ├── ARCHITECTURE.md         # This file
│   ├── API.md
│   ├── USER_GUIDE.md
│   └── DEVELOPMENT.md
├── .github/
│   └── workflows/
│       ├── deploy.yml
│       ├── qa.yml
│       └── security.yml
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── .env.example
└── README.md
```

### 5.2 Component Architecture

#### 5.2.1 Layout Components
- **TopNavigation**: Fixed header with 4 engine buttons + System Health button
- **Sidebar**: Context-sensitive navigation per engine
- **MainLayout**: Wrapper providing consistent spacing and responsive design
- **EngineLayout**: Template for engine-specific pages

#### 5.2.2 Engine Components
Each engine follows consistent pattern:
- Main container component
- Sidebar with engine-specific options
- File upload/input section
- Processing status display
- Preview/output section
- Export/save functionality

---

## 6. Engine Specifications

### 6.1 Engine 1: Voice-Over Generator

#### 6.1.1 Purpose
Transform PowerPoint presentations and MP4 videos into voice-enabled content by generating professional voice-overs for existing content.

#### 6.1.2 Input Formats
- **PowerPoint (.pptx)**: Slide decks with text, images, animations
- **MP4 (.mp4)**: Video files with or without existing audio

#### 6.1.3 Processing Pipeline

```
Input File → Parse Content → Extract Text/Captions → 
AI Analysis (GPT-4) → Script Generation → 
Voice Synthesis (OpenAI TTS) → Audio Synchronization → 
Output Generation
```

#### 6.1.4 Detailed Workflow

1. **File Upload & Validation**
   - Accept .pptx and .mp4 files
   - Validate file size (max 100MB initially)
   - Check file integrity

2. **Content Extraction**
   - **PPTX**: Extract slide notes, text boxes, titles, bullet points
   - **MP4**: Extract existing audio track (if any), extract frames for visual context

3. **AI-Powered Script Generation**
   - Use GPT-4 to analyze extracted content
   - Generate natural, engaging narration script
   - Maintain context and flow across slides/scenes
   - Option for user to review and edit script

4. **Voice-Over Synthesis**
   - Use OpenAI TTS API (voices: alloy, echo, fable, onyx, nova, shimmer)
   - Allow voice selection and customization
   - Generate audio files for each segment

5. **Audio Synchronization**
   - **PPTX**: Create slide timing based on audio duration
   - **MP4**: Sync voice-over with video timeline
   - Ensure smooth transitions

6. **Output Generation**
   - **PPTX**: Export as new .pptx with embedded audio or separate audio files
   - **MP4**: Export as new .mp4 with voice-over track
   - Provide preview before final export

#### 6.1.5 UI Components

**Sidebar Options**:
- Voice selection dropdown
- Script editing toggle
- Audio settings (speed, pitch)
- Export format selection
- Processing status indicator

**Main Area**:
- Drag-and-drop file upload zone
- File preview (slide thumbnails or video preview)
- Script editor (collapsible)
- Audio player for preview
- Export button

#### 6.1.6 Success Criteria
- ✅ Successfully parse 100% of valid PPTX files
- ✅ Successfully process 100% of standard MP4 files
- ✅ Generate coherent, contextual scripts
- ✅ Produce high-quality audio output
- ✅ Maintain synchronization accuracy within 100ms
- ✅ Complete processing within 2 minutes for standard files

---

### 6.2 Engine 2: Training Video Creator

#### 6.2.1 Purpose
Transform various input formats (PowerPoint, MP4, scripts, training materials) into fully-fledged, professional training videos suitable for online training portals.

#### 6.2.2 Input Formats
- **PowerPoint (.pptx)**: Slide decks
- **MP4 (.mp4)**: Existing video content
- **Word Documents (.docx)**: Training scripts, manuals
- **PDF (.pdf)**: Course materials, handouts
- **Text Scripts (.txt, .md)**: Raw training content

#### 6.2.3 Processing Pipeline

```
Multiple Inputs → Content Analysis (GPT-4 + Vision) → 
Storyboard Generation → Scene Planning → 
Asset Creation (Images: DALL-E, Video: SORA) → 
Voice-Over Generation (TTS) → Video Compilation → 
Post-Processing → Export
```

#### 6.2.4 Detailed Workflow

1. **Multi-Format Input Handling**
   - Accept multiple file types simultaneously
   - Parse and extract content from each format
   - Consolidate information into unified content structure

2. **Intelligent Content Analysis**
   - **GPT-4**: Analyze text content, identify key concepts, learning objectives
   - **GPT-4 Vision**: Analyze images, slides, diagrams for visual context
   - Extract metadata, headings, structure
   - Identify content hierarchy and flow

3. **Storyboard Generation**
   - Create scene-by-scene breakdown
   - Determine visual requirements for each scene
   - Plan transitions and animations
   - Generate shot list

4. **Script Creation**
   - Generate professional training narration
   - Include introduction, main content, summary
   - Add engagement elements (questions, pauses)
   - Structure for optimal learning retention

5. **Visual Asset Generation**
   - **Static Images**: Use DALL-E for custom graphics, diagrams
   - **Video Clips**: Use SORA for scene generation (when available)
   - **Slide Animations**: Programmatically create transitions
   - Extract and optimize existing assets from input files

6. **Voice-Over Production**
   - Generate narration using OpenAI TTS
   - Multiple voice options for different sections
   - Natural pacing with strategic pauses

7. **Video Compilation**
   - Synchronize visuals, audio, text overlays
   - Add transitions between scenes
   - Include branding elements (title, end card)
   - Apply consistent styling

8. **Post-Processing**
   - Quality checks for audio/video sync
   - Optimize file size for web delivery
   - Generate multiple resolution versions
   - Create captions/subtitles

9. **Export & Delivery**
   - Export as MP4 (H.264 codec for compatibility)
   - Generate SCORM package (for LMS integration - future)
   - Provide preview link
   - Save to designated storage

#### 6.2.5 UI Components

**Sidebar Options**:
- Input file manager (multiple uploads)
- Content type selector (training, tutorial, presentation)
- Style template selector
- Voice preferences
- Video quality settings
- Export format options

**Main Area**:
- Multi-file upload zone with preview
- Content outline view (generated from inputs)
- Storyboard preview (visual timeline)
- Script editor
- Video preview player
- Processing progress with stage indicators
- Export and download section

#### 6.2.6 Advanced Features

**Research Integration**:
- Web search capability to supplement content
- Fact-checking for accuracy
- Source citation inclusion

**Interactive Elements (Future)**:
- Quiz integration points
- Knowledge checks
- Interactive branching

**SORA Integration Strategy**:
- Fallback to DALL-E + animation if SORA unavailable
- Use SORA for complex scenes requiring video
- Cost optimization: use SORA selectively for key scenes

#### 6.2.7 Success Criteria
- ✅ Successfully parse all supported input formats
- ✅ Generate coherent, pedagogically sound training videos
- ✅ Produce professional-quality output (1080p minimum)
- ✅ Maintain content accuracy and context
- ✅ Complete processing within 10 minutes for standard course
- ✅ Export compatible with major training platforms (YouTube, Vimeo, LMS)

---

### 6.3 Engines 3 & 4: Future Expansion

#### 6.3.1 Placeholder Structure
- Maintain consistent UI/UX pattern
- Reserve navigation slots
- Architecture supports seamless addition
- No functionality required in initial build

#### 6.3.2 Potential Use Cases
- **Engine 3**: Interactive Quiz Generator
- **Engine 4**: Course Packaging & Distribution

---

## 7. AI Integration Strategy

### 7.1 Model Selection Architecture

#### 7.1.1 Decision Matrix

| Task Type | Primary Model | Fallback Model | Cost Optimization |
|-----------|--------------|----------------|-------------------|
| Text Analysis | GPT-4 | GPT-3.5-turbo | Use 3.5 for simple tasks |
| Image Analysis | GPT-4 Vision | GPT-4 + OCR | Selective image processing |
| Voice Synthesis | TTS (nova) | TTS (alloy) | Voice quality vs. cost |
| Image Generation | DALL-E 3 | DALL-E 2 | Use DALL-E 2 for thumbnails |
| Video Generation | SORA | DALL-E + ffmpeg | Use SORA for complex scenes |
| Research | GPT-4 + Search API | GPT-4 only | Cache search results |

#### 7.1.2 Cost Optimization Rules

1. **Caching Strategy**:
   - Cache GPT responses for identical queries (24-hour TTL)
   - Store parsed file content to avoid re-parsing
   - Cache web search results

2. **Batch Processing**:
   - Combine multiple API calls where possible
   - Process multiple images in single Vision API call
   - Generate audio in batches

3. **Progressive Enhancement**:
   - Start with lower-cost models
   - Upgrade to premium models only when necessary
   - User can override for quality preference

4. **Token Management**:
   - Implement token counting before API calls
   - Truncate prompts intelligently
   - Use streaming for long responses

### 7.2 OpenAI Service Architecture

#### 7.2.1 Core Services

**GPT Service** (`gpt.service.ts`):
```typescript
interface GPTService {
  analyzeContent(content: string, context?: string): Promise<AnalysisResult>;
  generateScript(outline: ContentOutline): Promise<Script>;
  improveText(text: string, style: StyleGuide): Promise<string>;
  chat(messages: ChatMessage[]): Promise<ChatResponse>;
}
```

**Vision Service** (`vision.service.ts`):
```typescript
interface VisionService {
  analyzeImage(image: ImageData): Promise<ImageAnalysis>;
  extractText(image: ImageData): Promise<string>;
  describeScene(image: ImageData): Promise<SceneDescription>;
}
```

**TTS Service** (`tts.service.ts`):
```typescript
interface TTSService {
  synthesize(text: string, voice: VoiceOption): Promise<AudioBuffer>;
  generateVoiceOver(script: Script, settings: VoiceSettings): Promise<AudioTrack>;
}
```

**DALL-E Service** (`dalle.service.ts`):
```typescript
interface DalleService {
  generateImage(prompt: string, size: ImageSize): Promise<ImageData>;
  createAssets(descriptions: string[]): Promise<ImageData[]>;
}
```

**SORA Service** (`sora.service.ts`):
```typescript
interface SoraService {
  generateVideo(prompt: string, duration: number): Promise<VideoData>;
  createScene(sceneDescription: SceneDescription): Promise<VideoClip>;
}
```

#### 7.2.2 Model Selector

**Intelligence Layer** (`model-selector.service.ts`):
```typescript
interface ModelSelector {
  selectOptimalModel(task: Task, constraints: Constraints): Promise<ModelChoice>;
  estimateCost(task: Task, model: Model): Promise<CostEstimate>;
  canUseCache(task: Task): Promise<boolean>;
}
```

**Selection Criteria**:
1. Task complexity
2. Quality requirements
3. Budget constraints
4. Response time needs
5. Cache availability

### 7.3 Error Handling & Resilience

#### 7.3.1 Retry Strategy
- Exponential backoff for rate limits
- Automatic model fallback on errors
- Circuit breaker for repeated failures
- Graceful degradation

#### 7.3.2 Monitoring
- API call logging
- Cost tracking per session
- Performance metrics
- Error rate monitoring

---

## 8. Data Flow & Processing Pipeline

### 8.1 Engine 1 Data Flow

```
User Upload (PPTX/MP4)
    ↓
File Validation
    ↓
Content Parser
    ↓
[PPTX] → Extract Slides, Notes, Text
[MP4]  → Extract Audio, Frames, Metadata
    ↓
GPT-4 Analysis
    ↓
Script Generation
    ↓
User Review (Optional Edit)
    ↓
TTS Processing
    ↓
Audio Synchronization
    ↓
Output Assembly
    ↓
Preview Generation
    ↓
User Approval
    ↓
Final Export
    ↓
Storage
```

### 8.2 Engine 2 Data Flow

```
Multiple File Upload
    ↓
File Type Detection & Routing
    ↓
Parallel Parsing
├─ PPTX → Slide Extraction
├─ DOCX → Document Parsing
├─ PDF  → Text/Image Extraction
└─ MP4  → Video Analysis
    ↓
Content Consolidation
    ↓
GPT-4 + Vision Analysis
    ↓
Storyboard Generation
    ↓
Asset Requirements Identification
    ↓
Parallel Asset Generation
├─ DALL-E (Images)
├─ SORA (Videos)
└─ TTS (Audio)
    ↓
Video Compilation Pipeline
    ↓
Post-Processing
├─ Quality Check
├─ Compression
└─ Caption Generation
    ↓
Preview Generation
    ↓
User Approval
    ↓
Export (Multiple Formats)
    ↓
Storage
```

### 8.3 State Management

#### 8.3.1 Application State
- Current engine selection
- User preferences
- Active processing jobs
- System health status

#### 8.3.2 Processing State
- Upload progress
- Parsing status
- AI processing stage
- Generation progress
- Export status

#### 8.3.3 Cache State
- API response cache
- Parsed content cache
- Generated assets cache

---

## 9. Storage Architecture

### 9.1 Initial Implementation: Desktop Storage

#### 9.1.1 Directory Structure
```
~/Desktop/CourseCreator/
├── projects/
│   ├── [project-id-1]/
│   │   ├── input/
│   │   │   ├── original-file.pptx
│   │   │   └── metadata.json
│   │   ├── processed/
│   │   │   ├── script.txt
│   │   │   ├── audio/
│   │   │   └── assets/
│   │   ├── output/
│   │   │   └── final-video.mp4
│   │   └── project.json
│   └── [project-id-2]/
├── templates/
├── cache/
└── exports/
```

#### 9.1.2 File System Access API Implementation
- Request persistent storage permission
- Use File System Access API for read/write
- Fallback to downloads folder if permission denied
- Store file handles for quick access

#### 9.1.3 Metadata Management
- JSON-based project metadata
- Index file for quick project lookup
- Version control for edited content
- Backup strategy

### 9.2 Future: Cloud Storage

#### 9.2.1 Migration Strategy
- Abstract storage layer
- Cloud storage adapter pattern
- Seamless migration path
- Hybrid approach (local + cloud)

#### 9.2.2 Cloud Providers
- **Primary**: AWS S3 (cost-effective, scalable)
- **Alternative**: Google Cloud Storage, Azure Blob
- **Integration**: Presigned URLs for upload/download

---

## 10. QA & Health Monitoring System

### 10.1 QA Dashboard Design

#### 10.1.1 Layout Structure

**Top Section**:
```
┌────────────────────────────────────────────────────────┐
│  ▶ Run All QA Tests                                    │
└────────────────────────────────────────────────────────┘

┌─────────────┬─────────────┬─────────────┬─────────────┐
│ SYSTEM      │ TOTAL TESTS │ PASSED      │ FAILED      │
│ HEALTH      │             │             │             │
│ ❤️  --      │   0         │   0         │   0         │
│ Health Score│ Tests       │ Tests       │ Tests       │
│ View Details│ Performed   │ Passed      │ Failed      │
│      →      │ View All → │ View Passed→│ View Failed→│
└─────────────┴─────────────┴─────────────┴─────────────┘
```

**Test Categories Section**:
```
┌────────────────────────────────────────────────────────┐
│  Test Categories Breakdown                             │
├──────────────────┬──────────────────┬─────────────────┤
│ 💻 Code          │ 🔌 Wiring &      │ 🔒 Security     │
│ Correctness      │ Integration      │                 │
│ 0 PASSED         │ 0 PASSED         │ 0 PASSED        │
│ 0 FAILED         │ 0 FAILED         │ 0 FAILED        │
│ Details →        │ Details →        │ Details →       │
├──────────────────┼──────────────────┼─────────────────┤
│ 🎨 UI/UX         │ ⚡ Performance   │ 🎬 Runtime      │
│                  │ & Timing         │ Rendering       │
│ 0 PASSED         │ 0 PASSED         │ 0 PASSED        │
│ 0 FAILED         │ 0 FAILED         │ 0 FAILED        │
│ Details →        │ Details →        │ Details →       │
├──────────────────┼──────────────────┼─────────────────┤
│ ♿ Accessibility │ 🗄️ Data          │ 🔍 Duplicates   │
│                  │ Integrity        │ & Legacy        │
│ 0 PASSED         │ 0 PASSED         │ 0 PASSED        │
│ 0 FAILED         │ 0 FAILED         │ 0 FAILED        │
│ Details →        │ Details →        │ Details →       │
└──────────────────┴──────────────────┴─────────────────┘
```

#### 10.1.2 Test Categories

**1. Code Correctness**
- Type safety (TypeScript strict mode)
- Function logic validation
- Edge case handling
- Error handling completeness
- API integration correctness

**2. Wiring & Integration**
- Component communication
- Props passing
- Event handling
- API service integration
- State management
- Router configuration

**3. Security**
- API key protection
- Input sanitization
- XSS prevention
- CSRF protection
- Secure storage practices
- File upload validation

**4. Deployment**
- Build success
- Asset optimization
- Environment variable configuration
- GitHub Pages compatibility
- Browser compatibility

**5. UI/UX**
- Responsive design (mobile, tablet, desktop)
- Color contrast ratios
- Font sizes and readability
- Interactive element states
- Loading indicators
- Error messages clarity
- Success feedback

**6. Performance & Timing**
- Component render time < 100ms
- API response handling
- File upload performance
- Processing pipeline efficiency
- Memory usage optimization
- Bundle size < 500KB (initial load)

**7. Runtime Rendering**
- Component mount/unmount
- Dynamic content rendering
- Conditional rendering logic
- List rendering optimization
- Portal rendering (modals, toasts)

**8. Accessibility**
- ARIA labels
- Keyboard navigation
- Screen reader compatibility
- Focus management
- Alt text for images
- Semantic HTML

**9. Data Integrity**
- File parsing accuracy
- Content preservation
- State persistence
- Cache invalidation
- Export data quality

**10. Duplicates & Legacy**
- No duplicate code
- No unused imports
- No deprecated dependencies
- Clean build (no warnings)
- Code style consistency

#### 10.1.3 Test Implementation

**Test Runner Service** (`test-runner.service.ts`):
```typescript
interface QATestRunner {
  runAllTests(): Promise<QAResults>;
  runCategory(category: TestCategory): Promise<CategoryResults>;
  getTestHistory(): Promise<TestHistory[]>;
  generateReport(): Promise<TestReport>;
}

interface QAResults {
  totalTests: number;
  passed: number;
  failed: number;
  categories: CategoryResults[];
  systemHealth: HealthScore;
  timestamp: Date;
}
```

**Health Checker Service** (`health-checker.service.ts`):
```typescript
interface HealthChecker {
  checkSystemHealth(): Promise<HealthStatus>;
  checkAPIConnectivity(): Promise<boolean>;
  checkStorageAvailability(): Promise<boolean>;
  checkBrowserCompatibility(): Promise<CompatibilityReport>;
}
```

### 10.2 System Health Metrics

#### 10.2.1 Health Score Calculation
```
Health Score = (
  API Connectivity (25%) +
  Storage Availability (15%) +
  Test Pass Rate (40%) +
  Performance Metrics (20%)
) / 100
```

**Scoring**:
- 90-100: Excellent (Green ❤️)
- 70-89: Good (Yellow 💛)
- 50-69: Fair (Orange 🧡)
- <50: Poor (Red 💔)

#### 10.2.2 Real-Time Monitoring
- Continuous health checks (every 60 seconds)
- API status monitoring
- Error rate tracking
- Performance degradation detection

### 10.3 One-Click QA Execution

**Button Placement**: Top-right corner, next to engines
**Button Behavior**:
1. Click "System Health" button
2. Modal/sidebar opens with QA Dashboard
3. Click "Run All QA Tests"
4. Tests execute in background
5. Real-time progress updates
6. Results display in categories
7. Detailed view available per category

---

## 11. Security & Authentication

### 11.1 API Key Management

#### 11.1.1 Environment Variables
```
VITE_OPENAI_API_KEY=sk-...
VITE_TAVILY_API_KEY=tvly-...
VITE_APP_ENV=production
```

#### 11.1.2 Security Measures
- API keys stored in environment variables
- Never commit keys to repository
- Use `.env.local` for local development
- GitHub Secrets for deployment
- Rotate keys periodically

#### 11.1.3 Rate Limiting
- Implement client-side rate limiting
- Queue API requests
- User feedback on rate limit status
- Graceful degradation

### 11.2 Data Security

#### 11.2.1 File Upload Validation
- File type validation (whitelist)
- File size limits
- Virus scanning (future)
- Content sanitization

#### 11.2.2 Storage Security
- Encrypt sensitive data at rest
- Secure file system permissions
- No sensitive data in logs
- Clear cache on logout

### 11.3 XSS & Injection Prevention
- Sanitize all user inputs
- Use React's built-in XSS protection
- Validate file content before parsing
- Escape special characters in generated content

---

## 12. Deployment Strategy

### 12.1 GitHub Pages Configuration

#### 12.1.1 Build Process
1. Vite builds optimized production bundle
2. Assets hashed for cache busting
3. Environment variables injected
4. Static files generated
5. Deploy to `gh-pages` branch

#### 12.1.2 GitHub Actions Workflow
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 12.2 CI/CD Pipeline

#### 12.2.1 Automated Testing
- Run QA tests on every commit
- Block merge if tests fail
- Generate test reports
- Track coverage metrics

#### 12.2.2 Deployment Stages
1. **Development**: Local dev server
2. **Staging**: Preview deployment on PR
3. **Production**: GitHub Pages on merge to main

### 12.3 Monitoring & Analytics

#### 12.3.1 Error Tracking
- Implement error boundary components
- Log errors to external service (optional)
- User-friendly error messages

#### 12.3.2 Usage Analytics (Future)
- Track engine usage
- Monitor processing times
- Identify bottlenecks
- User behavior insights

---

## 13. Future Scalability

### 13.1 Multi-User Support

#### 13.1.1 Authentication
- OAuth integration (Google, GitHub)
- User accounts and profiles
- Session management

#### 13.1.2 Cloud Storage Migration
- User-specific storage buckets
- Sharing and collaboration features
- Access control and permissions

### 13.2 Commercialization Path

#### 13.2.1 Pricing Model
- Free tier: Limited processing
- Pro tier: Unlimited processing + priority
- Enterprise: Custom integration + support

#### 13.2.2 Payment Integration
- Stripe integration
- Subscription management
- Usage-based billing

### 13.3 Additional Engines

#### 13.3.1 Engine 3: Interactive Quiz Generator
- Extract key concepts from training materials
- Generate multiple-choice questions
- Create interactive assessments
- Export as SCORM packages

#### 13.3.2 Engine 4: Course Packaging & Distribution
- Bundle training videos + quizzes
- Create course catalogs
- LMS integration (Moodle, Canvas)
- Analytics and reporting

### 13.4 Advanced AI Features

#### 13.4.1 Custom AI Models
- Fine-tuned models for specific industries
- Custom voice cloning
- Brand-specific image generation

#### 13.4.2 Advanced Automation
- Batch processing
- Scheduled generation
- Template libraries
- Style presets

---

## Appendices

### Appendix A: Color Palette

**Primary Colors**:
- Primary Blue: `#3B82F6`
- Primary Dark: `#1E40AF`
- Primary Light: `#DBEAFE`

**Status Colors**:
- Success Green: `#10B981`
- Warning Yellow: `#F59E0B`
- Error Red: `#EF4444`
- Info Blue: `#3B82F6`

**Neutral Colors**:
- Gray 50: `#F9FAFB`
- Gray 100: `#F3F4F6`
- Gray 200: `#E5E7EB`
- Gray 800: `#1F2937`
- Gray 900: `#111827`

### Appendix B: Typography

**Font Family**: Inter, system-ui, sans-serif

**Font Sizes**:
- Heading 1: 2.5rem (40px)
- Heading 2: 2rem (32px)
- Heading 3: 1.5rem (24px)
- Body Large: 1.125rem (18px)
- Body: 1rem (16px)
- Body Small: 0.875rem (14px)

### Appendix C: API Rate Limits

**OpenAI API Limits** (Pay-as-you-go):
- GPT-4: 10,000 TPM (tokens per minute)
- TTS: 50 RPM (requests per minute)
- DALL-E: 50 images per minute

**Handling Strategy**:
- Queue requests
- Implement exponential backoff
- Show user estimated wait times
- Provide offline mode (future)

### Appendix D: File Size Limits

**Input Files**:
- PPTX: 100 MB
- MP4: 500 MB
- DOCX: 50 MB
- PDF: 50 MB

**Output Files**:
- Video: 2 GB (H.264, 1080p)
- Audio: 100 MB

### Appendix E: Browser Compatibility

**Supported Browsers**:
- Chrome 100+
- Firefox 100+
- Safari 15+
- Edge 100+

**Required Features**:
- File System Access API
- Web Audio API
- IndexedDB
- ES2020+

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-21 | Initial comprehensive architecture |

---

## Approval & Sign-off

This architecture document represents the **True North** for Course Crafter development. All implementation must adhere to this specification.

**Next Steps**:
1. ✅ Create QA test suite based on this architecture
2. ⏳ Run QA (expect all tests to fail - RED status)
3. ⏳ Begin implementation
4. ⏳ Build to GREEN
5. ⏳ Final verification and handover
