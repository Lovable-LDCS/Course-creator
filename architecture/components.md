# Course Crafter - Component Map & Dependencies

## Version: 1.0.0
## Last Updated: 2025-11-25

---

## Table of Contents

1. [Component Hierarchy](#component-hierarchy)
2. [Core Components](#core-components)
3. [Layout Components](#layout-components)
4. [Engine Components](#engine-components)
5. [Common Components](#common-components)
6. [QA Components](#qa-components)
7. [Service Layer](#service-layer)
8. [Dependency Map](#dependency-map)
9. [Wiring Status](#wiring-status)

---

## 1. Component Hierarchy

### Application Structure

```
src/
├── App.tsx                    # Root component
├── main.tsx                   # Entry point
├── components/
│   ├── layout/
│   │   ├── MainLayout.tsx     # Main application wrapper
│   │   ├── TopNavigation.tsx  # Top navigation bar
│   │   └── Sidebar.tsx        # Context-sensitive sidebar
│   ├── common/
│   │   ├── Button.tsx         # Reusable button component
│   │   └── FileUpload.tsx     # File upload component
│   ├── engines/
│   │   ├── Engine1/
│   │   │   └── Engine1.tsx    # Voice-Over Generator
│   │   ├── Engine2/
│   │   │   └── Engine2.tsx    # Training Video Creator
│   │   └── voiceover/         # Voiceover-specific components
│   ├── molecules/             # Composite components
│   ├── organisms/             # Complex components
│   ├── templates/             # Page templates
│   ├── qa/
│   │   └── QADashboard.tsx    # QA/Health dashboard
│   ├── HomePage.tsx           # Home page
│   └── NotFound.tsx           # 404 page
├── contexts/
│   └── AIContext.tsx          # AI state management
├── hooks/                     # Custom React hooks
├── services/
│   ├── ai/                    # AI service layer
│   └── parsers/               # File parsing services
├── types/                     # TypeScript type definitions
├── utils/                     # Utility functions
├── config/                    # Configuration files
└── lib/                       # Library utilities
```

---

## 2. Core Components

### App.tsx

**Purpose**: Root application component with routing configuration

**Dependencies**:
- react-router-dom
- AIContext
- MainLayout
- All page components

**Provides**:
- BrowserRouter with basename support
- Route definitions
- AIProvider context wrapper

**Wiring Status**: ✅ Wired (Main entry point)

```typescript
// Key routes
'/'            → HomePage
'/engine1'     → Engine1
'/engine2'     → Engine2
'/engine3'     → Redirect to '/'
'/engine4'     → Redirect to '/'
'/system-health' → QADashboard
'*'            → NotFound
```

---

## 3. Layout Components

### MainLayout.tsx

**Purpose**: Main application layout wrapper

**Location**: `src/components/layout/MainLayout.tsx`

**Props**:
```typescript
interface MainLayoutProps {
  children: React.ReactNode;
}
```

**Dependencies**:
- TopNavigation
- Sidebar

**Renders**:
- TopNavigation (fixed top)
- Sidebar (fixed left)
- Content area (children)

**Wiring Status**: ✅ Wired (Used in App.tsx)

---

### TopNavigation.tsx

**Purpose**: Top navigation bar with engine selection

**Location**: `src/components/layout/TopNavigation.tsx`

**Features**:
- 4 Engine buttons (Engine 1-4)
- System Health button
- Active state indication
- Responsive behavior

**Dependencies**:
- react-router-dom (useLocation, Link)
- lucide-react (icons)

**Wiring Status**: ✅ Wired (Rendered by MainLayout)

---

### Sidebar.tsx

**Purpose**: Context-sensitive sidebar navigation

**Location**: `src/components/layout/Sidebar.tsx`

**Features**:
- Engine-specific options
- Settings links
- Collapsible on smaller screens

**Dependencies**:
- react-router-dom (useLocation)
- Engine-specific configuration

**Wiring Status**: ✅ Wired (Rendered by MainLayout)

---

## 4. Engine Components

### Engine1.tsx

**Purpose**: Voice-Over Generator engine

**Location**: `src/components/engines/Engine1/Engine1.tsx`

**Features**:
- File upload (PPTX, MP4)
- Script generation
- Voice-over synthesis
- Preview and export

**Dependencies**:
- FileUpload component
- AI services (GPT, TTS)
- File parsers (PPTX, MP4)

**Wiring Status**: ✅ Wired (Route: /engine1)

---

### Engine2.tsx

**Purpose**: Training Video Creator engine

**Location**: `src/components/engines/Engine2/Engine2.tsx`

**Features**:
- Multi-format file upload
- Content analysis
- Storyboard generation
- Video compilation

**Dependencies**:
- FileUpload component
- AI services (GPT, Vision, TTS, DALL-E)
- File parsers (PPTX, DOCX, PDF, MP4)

**Wiring Status**: ✅ Wired (Route: /engine2)

---

## 5. Common Components

### Button.tsx

**Purpose**: Reusable button component

**Location**: `src/components/common/Button.tsx`

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

**Wiring Status**: ✅ Wired (Used across components)

---

### FileUpload.tsx

**Purpose**: Drag-and-drop file upload component

**Location**: `src/components/common/FileUpload.tsx`

**Props**:
```typescript
interface FileUploadProps {
  accept?: string[];
  maxSize?: number;
  onUpload: (files: File[]) => void;
  multiple?: boolean;
}
```

**Features**:
- Drag-and-drop zone
- Click-to-browse
- File type validation
- Size validation
- Progress indication

**Wiring Status**: ✅ Wired (Used in Engine1, Engine2)

---

## 6. QA Components

### QADashboard.tsx

**Purpose**: System health and QA testing dashboard

**Location**: `src/components/qa/QADashboard.tsx`

**Features**:
- Run All QA Tests button
- System health score
- Test category breakdown
- Pass/fail indicators
- Detailed test results

**Dependencies**:
- QA service layer
- Health checker service

**Wiring Status**: ✅ Wired (Route: /system-health)

---

## 7. Service Layer

### AI Services

**Location**: `src/services/ai/`

| Service | Purpose | Status |
|---------|---------|--------|
| openai.service.ts | OpenAI API client | ✅ Wired |
| gpt.service.ts | GPT text generation | ✅ Wired |
| vision.service.ts | Image analysis | 🔄 Partial |
| tts.service.ts | Text-to-speech | ✅ Wired |
| dalle.service.ts | Image generation | 🔄 Partial |

### Parser Services

**Location**: `src/services/parsers/`

| Service | Purpose | Status |
|---------|---------|--------|
| pptx.parser.ts | PowerPoint parsing | ✅ Wired |
| docx.parser.ts | Word document parsing | 🔄 Partial |
| pdf.parser.ts | PDF parsing | 🔄 Partial |
| mp4.parser.ts | Video parsing | 🔄 Partial |

---

## 8. Dependency Map

### Component Dependencies

```
App.tsx
├── AIContext (provider)
├── MainLayout
│   ├── TopNavigation
│   │   └── react-router-dom
│   └── Sidebar
│       └── react-router-dom
├── HomePage
├── Engine1
│   ├── FileUpload
│   ├── AI Services
│   └── Parsers
├── Engine2
│   ├── FileUpload
│   ├── AI Services
│   └── Parsers
├── QADashboard
└── NotFound
```

### External Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.0 | UI framework |
| react-router-dom | ^7.9.6 | Routing |
| @tanstack/react-query | ^5.90.10 | Data fetching |
| zustand | ^4.4.7 | State management |
| openai | ^6.9.1 | AI integration |
| tailwind-merge | ^3.4.0 | CSS utilities |
| lucide-react | ^0.554.0 | Icons |
| zod | ^4.1.12 | Validation |
| react-hook-form | ^7.66.1 | Form handling |

---

## 9. Wiring Status

### Component Wiring Matrix

| Component | File Exists | Imported | Routed | Renders | Functional |
|-----------|-------------|----------|--------|---------|------------|
| App | ✅ | ✅ | ✅ | ✅ | ✅ |
| MainLayout | ✅ | ✅ | ✅ | ✅ | ✅ |
| TopNavigation | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sidebar | ✅ | ✅ | ✅ | ✅ | ✅ |
| HomePage | ✅ | ✅ | ✅ | ✅ | ✅ |
| Engine1 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Engine2 | ✅ | ✅ | ✅ | ✅ | ✅ |
| QADashboard | ✅ | ✅ | ✅ | ✅ | ✅ |
| NotFound | ✅ | ✅ | ✅ | ✅ | ✅ |
| Button | ✅ | ✅ | N/A | ✅ | ✅ |
| FileUpload | ✅ | ✅ | N/A | ✅ | ✅ |

### Legend

- ✅ = Fully wired and functional
- 🔄 = Partially implemented
- ❌ = Not wired (requires attention)
- N/A = Not applicable (utility component)

---

## Atomic Design Structure

### Atoms (`src/components/atoms/`)

Small, single-purpose UI elements:
- Button
- Input
- Label
- Icon
- Badge
- Spinner

### Molecules (`src/components/molecules/`)

Combinations of atoms:
- FormField
- SearchBar
- Card
- Alert
- FileUploadButton

### Organisms (`src/components/organisms/`)

Complex UI sections:
- Header
- Sidebar
- Modal
- Timeline
- ProjectTree

### Templates (`src/components/templates/`)

Page-level layouts:
- EngineLayout
- DashboardLayout

### Pages

Full page implementations:
- HomePage
- Engine1
- Engine2
- QADashboard
- NotFound

---

## Legacy Code Policy

### Identification

Code is considered legacy if:
1. File exists but is not imported
2. Component is imported but never rendered
3. Function is defined but never called
4. Service is created but never used

### Resolution Process

1. **Identify**: Run wiring check script
2. **Evaluate**: Determine if required by architecture
3. **Action**:
   - If required → Wire immediately
   - If not required → Remove immediately
4. **Verify**: Re-run wiring check

### Current Legacy Items

| Item | Location | Status | Action |
|------|----------|--------|--------|
| voiceover/ | src/components/engines/ | Review | Evaluate integration |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-25 | Initial component map |

---

## Maintenance

This document must be updated when:
- New components are added
- Components are removed
- Dependencies change
- Wiring status changes

**Owner**: Development Team
**Review Frequency**: Each sprint
