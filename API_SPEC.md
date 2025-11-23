# Video Factory - API Specification

## Version: 1.0.0
## Last Updated: 2025-11-23
## Base URL: `/api` (serverless functions) or configurable backend URL

---

## Table of Contents
1. [Authentication](#authentication)
2. [Projects](#projects)
3. [Uploads & Media](#uploads--media)
4. [Parsing](#parsing)
5. [Plan & AI](#plan--ai)
6. [Render](#render)
7. [Error Responses](#error-responses)

---

## Authentication

### POST /auth/login

Authenticate user and create session.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200 OK):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Errors:**
- 401: Invalid credentials
- 400: Missing required fields

---

### GET /auth/me

Get current authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Errors:**
- 401: Unauthorized (no token or invalid token)

---

## Projects

### POST /api/projects

Create a new project.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "name": "History of Human Rights",
  "metadata": {
    "industry": ["Mining"],
    "workerLevel": ["Novice"],
    "language": "en"
  }
}
```

**Response (201 Created):**
```json
{
  "projectId": "proj_abc123",
  "name": "History of Human Rights",
  "createdAt": "2025-11-23T09:00:00Z",
  "metadata": {
    "industry": ["Mining"],
    "workerLevel": ["Novice"],
    "language": "en"
  },
  "units": []
}
```

**Errors:**
- 400: Invalid request body
- 401: Unauthorized
- 409: Project with same name already exists

---

### GET /api/projects

List all projects for authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `perPage` (optional): Results per page (default: 20, max: 100)
- `sortBy` (optional): Sort field (default: "createdAt")
- `order` (optional): Sort order "asc" or "desc" (default: "desc")

**Response (200 OK):**
```json
{
  "projects": [
    {
      "projectId": "proj_abc123",
      "name": "History of Human Rights",
      "createdAt": "2025-11-23T09:00:00Z",
      "updatedAt": "2025-11-23T10:00:00Z",
      "metadata": {
        "industry": ["Mining"],
        "workerLevel": ["Novice"],
        "language": "en"
      }
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "perPage": 20,
    "totalPages": 1
  }
}
```

---

### GET /api/projects/{projectId}

Get project details including units, modules, and lessons.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "projectId": "proj_abc123",
  "name": "History of Human Rights",
  "createdAt": "2025-11-23T09:00:00Z",
  "updatedAt": "2025-11-23T10:00:00Z",
  "units": [
    {
      "unitId": "unit_01",
      "name": "Origins",
      "modules": [
        {
          "moduleId": "mod_01",
          "name": "Module A",
          "lessons": [
            {
              "lessonId": "lesson_001",
              "seq": 1,
              "title": "History of human rights",
              "filePath": "projects/History of Human Rights/Origins/Module A/01 - History of human rights.mp4"
            }
          ]
        }
      ]
    }
  ],
  "metadata": {
    "industry": ["Mining"],
    "workerLevel": ["Novice"],
    "language": "en"
  }
}
```

**Errors:**
- 404: Project not found
- 401: Unauthorized
- 403: Forbidden (not owner)

---

### PUT /api/projects/{projectId}

Update project details.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "name": "Updated Project Name",
  "metadata": {
    "industry": ["Mining", "Construction"],
    "workerLevel": ["Intermediate"],
    "language": "en"
  }
}
```

**Response (200 OK):**
```json
{
  "projectId": "proj_abc123",
  "name": "Updated Project Name",
  "updatedAt": "2025-11-23T11:00:00Z",
  "metadata": {
    "industry": ["Mining", "Construction"],
    "workerLevel": ["Intermediate"],
    "language": "en"
  }
}
```

---

### DELETE /api/projects/{projectId}

Delete a project and all associated data.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (204 No Content)**

**Errors:**
- 404: Project not found
- 401: Unauthorized
- 403: Forbidden (not owner)

---

### POST /api/projects/{projectId}/units

Create a unit within a project.

**Request:**
```json
{
  "name": "Origins"
}
```

**Response (201 Created):**
```json
{
  "unitId": "unit_01",
  "name": "Origins",
  "createdAt": "2025-11-23T09:05:00Z"
}
```

---

### POST /api/projects/{projectId}/units/{unitId}/modules

Create a module within a unit.

**Request:**
```json
{
  "name": "Module A"
}
```

**Response (201 Created):**
```json
{
  "moduleId": "mod_01",
  "name": "Module A",
  "createdAt": "2025-11-23T09:10:00Z"
}
```

---

### POST /api/projects/{projectId}/units/{unitId}/modules/{moduleId}/lessons

Create a lesson within a module.

**Request:**
```json
{
  "title": "History of human rights",
  "seq": 1
}
```

**Response (201 Created):**
```json
{
  "lessonId": "lesson_001",
  "seq": 1,
  "title": "History of human rights",
  "filePath": "projects/History of Human Rights/Origins/Module A/01 - History of human rights.mp4",
  "createdAt": "2025-11-23T09:15:00Z"
}
```

---

## Uploads & Media

### POST /api/upload

Request a signed URL for direct S3 upload or upload file directly.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data (for direct upload)
           or application/json (for signed URL)
```

**Request (Signed URL):**
```json
{
  "fileName": "presentation.pptx",
  "fileType": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "fileSize": 5242880,
  "projectId": "proj_abc123"
}
```

**Response (200 OK):**
```json
{
  "uploadUrl": "https://s3.amazonaws.com/bucket/path?signature=...",
  "mediaId": "media_xyz789",
  "expiresIn": 3600
}
```

**Request (Direct Upload):**
```
POST /api/upload
Content-Type: multipart/form-data

file: [binary data]
projectId: proj_abc123
```

**Response (200 OK):**
```json
{
  "mediaId": "media_xyz789",
  "url": "https://cdn.example.com/media/media_xyz789.pptx",
  "type": "pptx",
  "size": 5242880,
  "uploadedAt": "2025-11-23T09:20:00Z"
}
```

**Errors:**
- 400: Invalid file type or size exceeds limit
- 401: Unauthorized
- 413: File too large
- 507: Storage quota exceeded

---

### POST /api/download-youtube

Download a video from YouTube URL.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "projectId": "proj_abc123"
}
```

**Response (202 Accepted):**
```json
{
  "jobId": "job_youtube_123",
  "status": "queued",
  "estimatedTime": 120
}
```

**Errors:**
- 400: Invalid YouTube URL
- 401: Unauthorized
- 403: Copyright protected content
- 429: Rate limit exceeded

---

### GET /api/jobs/{jobId}

Get status of a background job (YouTube download, render, etc.).

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "jobId": "job_youtube_123",
  "type": "youtube_download",
  "status": "processing",
  "progress": 45,
  "createdAt": "2025-11-23T09:25:00Z",
  "updatedAt": "2025-11-23T09:26:00Z",
  "logs": [
    "Downloading video metadata...",
    "Downloading video: 45% complete"
  ]
}
```

**Statuses:**
- `queued`: Job is in queue
- `processing`: Job is being processed
- `completed`: Job completed successfully
- `failed`: Job failed with error

---

### GET /api/thumbnail/{mediaId}

Get thumbnail or sprite sheet for video/PPTX.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `type` (optional): "single" or "sprite" (default: "sprite")
- `time` (optional): Time offset in seconds for single thumbnail

**Response (200 OK):**
```json
{
  "mediaId": "media_xyz789",
  "thumbnails": [
    {
      "url": "https://cdn.example.com/thumbnails/thumb_0.jpg",
      "time": 0
    },
    {
      "url": "https://cdn.example.com/thumbnails/thumb_1.jpg",
      "time": 1
    }
  ],
  "sprite": "https://cdn.example.com/sprites/sprite_media_xyz789.jpg",
  "spriteInfo": {
    "columns": 10,
    "rows": 10,
    "thumbWidth": 160,
    "thumbHeight": 90,
    "interval": 1
  }
}
```

---

## Parsing

### POST /api/parse/pptx

Parse PowerPoint file to extract content.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "mediaId": "media_xyz789"
}
```

**Response (200 OK):**
```json
{
  "mediaId": "media_xyz789",
  "slides": [
    {
      "slideNumber": 1,
      "title": "Introduction",
      "text": "Welcome to the course...",
      "speakerNotes": "Greet the audience warmly",
      "animations": ["fade", "slide"],
      "timing": 5.0,
      "images": [
        {
          "url": "https://cdn.example.com/extracted/img1.jpg",
          "altText": "Company logo"
        }
      ]
    }
  ],
  "totalSlides": 15,
  "estimatedDuration": 180,
  "parsedAt": "2025-11-23T09:30:00Z"
}
```

**Errors:**
- 400: Invalid or corrupted PPTX file
- 404: Media not found
- 422: File cannot be parsed

---

### POST /api/parse/document

Parse document (DOCX, PDF, TXT) to extract text content.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "mediaId": "media_doc456",
  "extractImages": true
}
```

**Response (200 OK):**
```json
{
  "mediaId": "media_doc456",
  "text": "Full extracted text content...",
  "wordCount": 5432,
  "images": [
    {
      "url": "https://cdn.example.com/extracted/doc_img1.jpg",
      "page": 3,
      "caption": "Figure 1: Process diagram"
    }
  ],
  "metadata": {
    "title": "Course Outline",
    "author": "John Doe",
    "createdDate": "2025-11-20T00:00:00Z"
  },
  "parsedAt": "2025-11-23T09:35:00Z"
}
```

---

## Plan & AI

### POST /api/plan/create

Generate plan using AI based on project context and media.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "projectId": "proj_abc123",
  "engine": "voiceover",
  "settings": {
    "voice": "nova",
    "language": "en"
  },
  "mediaRefs": ["media_xyz789", "media_mp4_456"],
  "contextRefs": ["media_doc456", "media_pdf_789"],
  "contextText": "This is a course about human rights for mining workers..."
}
```

**Response (200 OK):**
```json
{
  "planId": "plan_001",
  "projectId": "proj_abc123",
  "createdAt": "2025-11-23T09:40:00Z",
  "scenes": [
    {
      "sceneId": "s1",
      "start": "00:00:00.000",
      "end": "00:00:12.500",
      "thumbnail": "https://s3.../thumb_s1.jpg",
      "voText": "Welcome to the history of human rights course...",
      "externalMedia": []
    }
  ],
  "consumption": {
    "percent": 75,
    "documentsConsulted": ["media_doc456"],
    "documentsNotConsulted": ["media_pdf_789"]
  },
  "version": 1,
  "status": "draft"
}
```

**Errors:**
- 400: Invalid request or missing required data
- 401: Unauthorized
- 404: Project or media not found
- 422: Cannot generate plan with provided data
- 429: Rate limit exceeded (AI API)

---

### POST /api/plan/modify

Modify existing plan based on user chat/edits.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "planId": "plan_001",
  "modifications": [
    {
      "sceneId": "s1",
      "field": "voText",
      "newValue": "Updated voice-over text..."
    },
    {
      "sceneId": "s2",
      "field": "timing",
      "adjustment": "+1.5"
    }
  ],
  "chatMessage": "Make the intro more engaging"
}
```

**Response (200 OK):**
```json
{
  "planId": "plan_001",
  "version": 2,
  "updatedAt": "2025-11-23T09:45:00Z",
  "scenes": [
    {
      "sceneId": "s1",
      "voText": "Updated voice-over text...",
      "modified": true
    }
  ],
  "chatResponse": "I've made the intro more engaging by adding a question to hook the audience."
}
```

---

### POST /api/plan/approve

Lock plan and queue for rendering.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "planId": "plan_001"
}
```

**Response (200 OK):**
```json
{
  "planId": "plan_001",
  "status": "approved",
  "approvedAt": "2025-11-23T09:50:00Z",
  "renderJobId": "job_render_123",
  "estimatedCompletionTime": "2025-11-23T10:20:00Z"
}
```

**Errors:**
- 400: Plan not in draft status
- 404: Plan not found
- 409: Plan already approved

---

### GET /api/plan/{planId}

Get plan details.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "planId": "plan_001",
  "projectId": "proj_abc123",
  "createdAt": "2025-11-23T09:40:00Z",
  "updatedAt": "2025-11-23T09:50:00Z",
  "scenes": [...],
  "consumption": {...},
  "version": 2,
  "status": "approved"
}
```

---

## Render

### POST /api/render

Manually trigger render job (alternative to auto-trigger on approve).

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "planId": "plan_001",
  "outputFormat": "mp4",
  "quality": "high",
  "includeCaptions": true
}
```

**Response (202 Accepted):**
```json
{
  "jobId": "job_render_123",
  "status": "queued",
  "estimatedTime": 1800,
  "queuePosition": 3
}
```

---

### GET /api/render/{jobId}/status

Get render job status and progress.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "jobId": "job_render_123",
  "status": "processing",
  "progress": 65,
  "currentStep": "Generating audio tracks",
  "estimatedTimeRemaining": 300,
  "logs": [
    "2025-11-23T10:00:00Z - Job started",
    "2025-11-23T10:05:00Z - Generated voice-over for scene 1",
    "2025-11-23T10:10:00Z - Compositing video tracks: 65% complete"
  ]
}
```

**Statuses:**
- `queued`: Waiting in queue
- `processing`: Currently rendering
- `completed`: Render successful
- `failed`: Render failed

---

### GET /api/outputs/{projectId}

List all rendered outputs for a project.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "projectId": "proj_abc123",
  "outputs": [
    {
      "outputId": "out_001",
      "lessonId": "lesson_001",
      "fileName": "01 - History of human rights.mp4",
      "url": "https://cdn.example.com/outputs/out_001.mp4",
      "format": "mp4",
      "size": 157286400,
      "duration": 180,
      "captionsUrl": "https://cdn.example.com/outputs/out_001.srt",
      "createdAt": "2025-11-23T10:20:00Z"
    }
  ]
}
```

---

## Error Responses

All API endpoints follow consistent error response format:

**Error Response Structure:**
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional context",
      "suggestion": "How to fix"
    }
  }
}
```

**Common HTTP Status Codes:**

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `202 Accepted`: Request accepted for async processing
- `204 No Content`: Request successful, no content to return
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Authenticated but not authorized
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (duplicate, already exists)
- `413 Payload Too Large`: File size exceeds limit
- `422 Unprocessable Entity`: Request well-formed but semantically invalid
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Service temporarily unavailable

**Example Error Responses:**

```json
{
  "error": {
    "code": "INVALID_FILE_TYPE",
    "message": "File type not supported",
    "details": {
      "providedType": "image/jpeg",
      "acceptedTypes": [".pptx", ".mp4", ".docx", ".pdf"]
    }
  }
}
```

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "details": {
      "limit": 100,
      "window": "1 hour",
      "retryAfter": 3600
    }
  }
}
```

---

## Rate Limits

**Default Limits:**
- Authentication: 10 requests per minute
- Projects: 100 requests per hour
- Uploads: 50 requests per hour
- AI/Plan generation: 20 requests per hour
- Renders: 10 concurrent jobs per user

**Headers Returned:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1700000000
```

---

## Versioning

API version is included in the base path:
- Current: `/api/v1/...`
- Future: `/api/v2/...`

Deprecation notices will be provided 6 months before removing old versions.

---

**This API specification is the contract between front-end and back-end. Any changes must be documented here before implementation.**
