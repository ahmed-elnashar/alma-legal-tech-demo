# LEGAL TECH PLATFORM DOCUMENTATION

## TABLE OF CONTENTS

1. [Overview](#1-overview)
2. [Getting Started](#2-getting-started)
3. [Architecture](#3-architecture)
4. [API Reference](#4-api-reference)
5. [Authentication](#5-authentication)
6. [Components](#6-components)
7. [Development Guidelines](#7-development-guidelines)
8. [Security](#8-security)
9. [Future Improvements](#9-future-improvements)

---

## 1. OVERVIEW

The Legal Tech Platform is a modern web application built with Next.js for managing legal consultation leads and visa
application processes. The platform consists of two main parts:

- Public-facing assessment form
- Admin interface for lead management

---

## 2. GETTING STARTED

### Prerequisites:

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Installation Steps:

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd legal-tech
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    ```bash
    cp .env.example .env.local
    ```
4. Configure the following in .env.local:
    ```bash
    NEXTAUTH_SECRET=your-secret-key
    NEXTAUTH_URL=http://localhost:3000
    ```
5. Start development server:
    ```bash
    npm run dev
    ```

#### The Public Lead Form will be available at `http://localhost:3000`

#### The Internal Lead Management will be available at `http://localhost:3000/admin`

### Demo Credentials

> **Note**: These are development-only credentials.

Admin Login:

- Email: admin@example.com
- Password: admin123

## 3. ARCHITECTURE

### Tech Stack:

- **Frontend**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **UI Components**: Material-UI (MUI)
- **Forms**: React Hook Form
- **Authentication**: NextAuth.js
- **Form Validation**: Yup
- **Styling**:
    - Tailwind CSS
    - Emotion

### Project Structure:

```
    src/
    ├── app/
    │   ├── api/           # API routes
    │   ├── components/    # React components
    │   ├── hooks/         # Custom hooks
    │   ├── lib/           # Configurations
    │   ├── types/         # TypeScript types
    │   └── utils/         # Helper functions
```

## 4. API REFERENCE

Available Endpoints:

 ```bash
    GET /api/leads
   ```

- Purpose: Fetch all leads
- Authentication: Required
- Response: JSON array of leads

    ```bash
    PATCH /api/leads/:id/status
    ```
- Purpose: Update lead status
- Authentication: Required
- Request Body: { status: "PENDING" | "REACHED_OUT" }
- Response: { success: true }

## 5. AUTHENTICATION

**Implementation:** NextAuth.js with credentials provider

### Features:

- ✅ Email/password authentication
- 🔒 Protected admin routes
- 🪙 JWT-based sessions
- ⏳ 30-day session duration

### Protected Routes:

- All `/admin/*` routes
- All `/api/*` routes


