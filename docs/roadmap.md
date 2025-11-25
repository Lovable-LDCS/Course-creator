# Course Crafter - Development Roadmap

## Version: 1.0.0
## Status: Active Development
## Last Updated: 2025-11-25

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Milestone Status](#milestone-status)
3. [Current Sprint](#current-sprint)
4. [Outstanding Deliverables](#outstanding-deliverables)
5. [Blockers & Risks](#blockers--risks)
6. [Build Complete Criteria](#build-complete-criteria)
7. [Future Roadmap](#future-roadmap)
8. [Progress Tracking](#progress-tracking)

---

## 1. Project Overview

### Vision

Course Crafter is an AI-powered content creation platform that transforms educational materials into professional training content.

### Goals

1. **Engine 1**: Voice-Over Generator (PPTX/MP4 → Voice-enabled content)
2. **Engine 2**: Training Video Creator (Multi-format → Professional videos)
3. **QA System**: Comprehensive health monitoring and testing
4. **Production Ready**: Deploy to GitHub Pages

---

## 2. Milestone Status

### Milestone Visual Progress

```
                    COURSE CRAFTER ROADMAP
                    
Phase 1: Foundation
███████████████████████████████████████████████ 100%
[✓] Project Setup
[✓] Technology Stack
[✓] Basic Routing
[✓] Layout Components

Phase 2: Core UI
████████████████████████████████████████░░░░░░░  85%
[✓] TopNavigation
[✓] Sidebar
[✓] MainLayout
[✓] HomePage
[ ] Engine-specific sidebars

Phase 3: Engine 1 - Voice-Over Generator
████████████████████████░░░░░░░░░░░░░░░░░░░░░░░  50%
[✓] Engine1 Component
[✓] File Upload
[ ] PPTX Parser Integration
[ ] MP4 Parser Integration
[ ] GPT Script Generation
[ ] TTS Voice Synthesis
[ ] Audio Synchronization
[ ] Preview & Export

Phase 4: Engine 2 - Video Creator
██████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  30%
[✓] Engine2 Component
[✓] Multi-file Upload
[ ] Content Analysis
[ ] Storyboard Generation
[ ] Asset Creation
[ ] Video Compilation
[ ] Export Options

Phase 5: QA System
██████████████████████████████░░░░░░░░░░░░░░░░░  65%
[✓] QADashboard Component
[✓] Test Category Structure
[ ] Automated Test Runner
[ ] Health Score Calculation
[ ] Report Generation

Phase 6: Polish & Deploy
██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  15%
[ ] Performance Optimization
[ ] Accessibility Audit
[ ] Security Audit
[ ] Documentation
[ ] GitHub Pages Deployment
```

### Milestone Summary Table

| Milestone | Status | Progress | Target Date |
|-----------|--------|----------|-------------|
| Phase 1: Foundation | ✅ Complete | 100% | - |
| Phase 2: Core UI | 🔄 In Progress | 85% | TBD |
| Phase 3: Engine 1 | 🔄 In Progress | 50% | TBD |
| Phase 4: Engine 2 | 🔄 In Progress | 30% | TBD |
| Phase 5: QA System | 🔄 In Progress | 65% | TBD |
| Phase 6: Deploy | ⏳ Pending | 15% | TBD |

---

## 3. Current Sprint

### Sprint Goals

1. Complete Engine 1 core functionality
2. Integrate PPTX and MP4 parsers
3. Connect GPT and TTS services
4. QA automation framework

### In Progress

| Task | Assignee | Status | Notes |
|------|----------|--------|-------|
| PPTX Parser | - | 🔄 In Progress | Using pptxgenjs |
| TTS Integration | - | 🔄 In Progress | OpenAI TTS API |
| QA Test Runner | - | 🔄 In Progress | Framework setup |

### Completed This Sprint

- [x] Architecture documentation
- [x] Component map
- [x] QA checklist structure
- [x] Route configuration
- [x] Basic UI components

---

## 4. Outstanding Deliverables

### Critical Path (Must Complete)

| ID | Deliverable | Priority | Dependencies |
|----|-------------|----------|--------------|
| D-001 | PPTX Content Extraction | Critical | pptxgenjs library |
| D-002 | GPT Script Generation | Critical | OpenAI API key |
| D-003 | TTS Voice Synthesis | Critical | OpenAI API key |
| D-004 | Audio/Visual Sync | Critical | D-002, D-003 |
| D-005 | File Export | Critical | D-004 |
| D-006 | QA Test Automation | Critical | Architecture spec |
| D-007 | Production Build | Critical | All above |

### Secondary (Should Complete)

| ID | Deliverable | Priority | Dependencies |
|----|-------------|----------|--------------|
| D-101 | Engine 2 Full Workflow | High | Engine 1 complete |
| D-102 | DOCX Parser | High | - |
| D-103 | PDF Parser | High | - |
| D-104 | DALL-E Integration | Medium | OpenAI API |
| D-105 | Video Compilation | High | Multiple |

### Nice to Have

| ID | Deliverable | Priority | Dependencies |
|----|-------------|----------|--------------|
| D-201 | Custom Voice Selection | Low | TTS working |
| D-202 | Template Library | Low | Core complete |
| D-203 | Project History | Low | Storage layer |

---

## 5. Blockers & Risks

### Current Blockers

| ID | Blocker | Impact | Mitigation | Status |
|----|---------|--------|------------|--------|
| B-001 | OpenAI API Key | High | Use env vars | ✅ Resolved |
| B-002 | File System Access | Medium | Fallback to downloads | 🔄 In Progress |

### Risk Register

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| R-001 | API Rate Limits | Medium | High | Implement queuing |
| R-002 | Browser Compatibility | Low | Medium | Test major browsers |
| R-003 | File Size Limits | Medium | Medium | Chunk processing |
| R-004 | Build Size | Medium | Low | Code splitting |
| R-005 | TypeScript Errors | Low | High | Strict mode, CI |

### Dependency Risks

| Dependency | Risk Level | Notes |
|------------|------------|-------|
| OpenAI API | Medium | Service availability, pricing |
| pptxgenjs | Low | Well-maintained library |
| mammoth | Low | Stable DOCX parsing |
| react | Low | Major framework, well-supported |

---

## 6. Build Complete Criteria

### Definition of Done

A build is considered **complete** when:

```
✅ ALL Critical Items:
├── Build passes without errors
├── TypeScript: 0 errors
├── ESLint: 0 errors
├── All routes respond (no 404s)
├── No console errors in browser
├── Security audit passes
└── No dead/unwired code

✅ QA Requirements:
├── QA Score ≥ 95%
├── Critical categories: 100%
├── All mandatory tests pass
└── Health checker GREEN

✅ Functionality:
├── Engine 1 workflow complete
├── Engine 2 basic workflow
├── File upload works
├── QA dashboard accessible
└── Navigation functional

✅ Documentation:
├── Architecture current
├── Component map updated
├── QA checklist complete
└── Deployment guide ready
```

### Handover Checklist

- [ ] **Build**
  - [ ] `npm run build` passes
  - [ ] No build warnings
  - [ ] Bundle size < 500KB

- [ ] **Quality**
  - [ ] TypeScript clean
  - [ ] ESLint clean
  - [ ] No console errors

- [ ] **Functionality**
  - [ ] All engines accessible
  - [ ] File upload works
  - [ ] AI services connected

- [ ] **Testing**
  - [ ] QA tests GREEN
  - [ ] Manual testing complete
  - [ ] Cross-browser verified

- [ ] **Security**
  - [ ] No exposed secrets
  - [ ] npm audit clean

- [ ] **Documentation**
  - [ ] All docs updated
  - [ ] Known issues listed

---

## 7. Future Roadmap

### Q1 Next Year (Tentative)

```
┌─────────────────────────────────────────────────┐
│  ENGINE 3: Interactive Quiz Generator           │
│  ─────────────────────────────────────────────  │
│  • Extract key concepts from training materials │
│  • Generate multiple-choice questions           │
│  • Create interactive assessments               │
│  • Export as SCORM packages                     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  ENGINE 4: Course Packaging & Distribution      │
│  ─────────────────────────────────────────────  │
│  • Bundle training videos + quizzes             │
│  • Create course catalogs                       │
│  • LMS integration (Moodle, Canvas)             │
│  • Analytics and reporting                      │
└─────────────────────────────────────────────────┘
```

### Feature Pipeline

| Feature | Status | Target |
|---------|--------|--------|
| Cloud Storage | Planned | Q1 |
| User Authentication | Planned | Q1 |
| Multi-user Support | Planned | Q2 |
| Custom AI Models | Research | Q3 |
| Mobile App | Concept | TBD |

### Technical Debt

| Item | Priority | Effort |
|------|----------|--------|
| Improve Error Handling | High | Medium |
| Add Unit Tests | High | High |
| Refactor Services | Medium | Medium |
| Performance Optimization | Medium | Medium |
| Accessibility Audit | High | Medium |

---

## 8. Progress Tracking

### Sprint Burndown

```
Story Points Remaining
│
│  ████
│  ████ ████
│  ████ ████ ████
│  ████ ████ ████ ████
│  ████ ████ ████ ████ ████
│  ████ ████ ████ ████ ████ ████
└──────────────────────────────────
   S1   S2   S3   S4   S5   S6
        (Current)
```

### Velocity Trend

| Sprint | Planned | Completed | Velocity |
|--------|---------|-----------|----------|
| Sprint 1 | 20 | 18 | 18 |
| Sprint 2 | 22 | - | - |

### Key Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Code Coverage | TBD | 80% |
| QA Pass Rate | TBD | 95% |
| Build Time | TBD | < 60s |
| Bundle Size | TBD | < 500KB |
| Lighthouse Score | TBD | 90+ |

---

## Tracking URLs

### Project Resources

- **Repository**: [Course-creator GitHub](../../)
- **Architecture**: [architecture/rules.md](../architecture/rules.md)
- **QA Checklist**: [qa/checklist.json](../qa/checklist.json)
- **Components**: [architecture/components.md](../architecture/components.md)

### External Links

- **Deployment**: TBD (GitHub Pages)
- **Documentation**: This file
- **Issue Tracker**: GitHub Issues

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-25 | Initial roadmap |

---

## Contact

For questions about this roadmap:
- Check GitHub Issues
- Review Architecture Documentation
- Consult QA Specification

**Owner**: Development Team
**Review**: Each sprint planning
