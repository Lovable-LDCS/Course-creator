# GitHub Copilot Custom Agent Setup Guide

## Overview

This repository includes a custom GitHub Copilot agent that provides project-specific context and development rules. This guide explains how to use the custom agent and what it provides.

## Agent Location

**File Path**: `.github/agents/course-crafter-developer.agent.md`

**Important**: GitHub Copilot expects custom agents to be in the `.github/agents/` directory with the `.agent.md` extension. The agent file must include YAML frontmatter with metadata (name, description, and tools).

## Using the Custom Agent

### Agent File Format

Custom agents must include YAML frontmatter at the beginning of the file:

```yaml
---
name: course-crafter-developer
description: Expert agent for Course Crafter project development
tools:
  - read
  - edit
  - search
---
```

The frontmatter includes:
- **name**: Unique identifier for the agent (used when invoking with @)
- **description**: Brief explanation of the agent's capabilities (required)
- **tools**: List of Copilot tools the agent can use (optional)

### In GitHub Issues

When creating a new issue:

1. Click "New Issue"
2. Look for the agent selector dropdown (usually near the description field)
3. Select **"Course Crafter Developer"** from the available agents
4. The agent will now provide context-aware assistance based on this project's architecture

### In GitHub Copilot Chat

When using GitHub Copilot chat in your IDE:

1. Open the Copilot chat panel
2. Look for the agent selector (@ symbol)
3. Type `@course-crafter-developer` or select it from the dropdown
4. Ask questions with full project context

## What the Agent Provides

The custom agent is configured with the following project-specific knowledge:

### Build Philosophy
- **One-time Build Process**: Complete architecture first, then build to pass tests (RED → GREEN)
- **True North Architecture**: Architecture is the single source of truth
- **No Legacy Code**: If it's not wired and functional, it should be removed
- **Strict Wiring Checks**: All components must be properly integrated and functional

### Development Workflow
1. Update/confirm architecture
2. Generate/adjust QA checks
3. Implement code to satisfy architecture
4. Run full QA until GREEN
5. Handover only when fully functional

### QA Requirements
The agent knows about comprehensive QA requirements including:
- Architecture and requirements checks
- Environment validation
- Type safety and coding correctness
- Build integrity
- Unit and E2E tests
- Route smoke tests
- Database migrations
- API health checks
- UI/UX consistency
- Security posture
- Wiring checks (runtime verification)

### User Workflow
- User provides requirements in plain English
- Agent handles all coding, scripting, and QA
- User verifies only via the UI
- No copy-paste operations required from user

## Troubleshooting

### Agent Not Appearing in Selector

If the custom agent doesn't appear in the GitHub Copilot UI:

1. **Check File Location**: Ensure the agent file is in `.github/agents/` (not `.github/copilot/`)
2. **Check File Extension**: File should be `.agent.md` (not just `.md`)
3. **Check YAML Frontmatter**: The file must start with YAML frontmatter including `name` and `description` fields
4. **Wait for Sync**: After creating/moving files, GitHub may need a few minutes to detect the agent
5. **Check Repository Settings**: Ensure GitHub Copilot is enabled for your repository
6. **Refresh/Reload**: Try refreshing your browser or restarting your IDE

### Agent Not Providing Expected Context

If the agent is available but not providing the expected context:

1. **Check Agent Content**: Review `.github/agents/course-crafter-developer.agent.md` to ensure it has the correct instructions
2. **Be Specific**: Provide clear, specific questions or requests
3. **Reference Architecture**: Mention specific documents (ARCHITECTURE.md, RULES.md, etc.) when asking questions

## File Structure

```
.github/
├── agents/
│   └── course-crafter-developer.agent.md    # Custom agent configuration
└── workflows/
    └── deploy.yml                            # Deployment workflow
```

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Complete system design
- [RULES.md](./RULES.md) - Development best practices
- [ONE_TIME_BUILD_RULES.md](./ONE_TIME_BUILD_RULES.md) - QA and workflow process
- [QA_SPECIFICATION.md](./QA_SPECIFICATION.md) - Comprehensive test specification

## Support

If you continue to experience issues with the custom agent:

1. Check this guide for common solutions
2. Verify file locations and names match exactly
3. Check GitHub Copilot status page for any service issues
4. Open an issue in this repository with:
   - Description of the problem
   - Screenshots if available
   - Steps you've already tried

---

**Last Updated**: 2025-11-23  
**Version**: 1.0.0
