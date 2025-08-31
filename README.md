# Frontend Technical Assessment

Welcome! This repo contains the assessment for frontend developer candidates at Nerd Studio.

## Overview

The assessment has **2 steps**. Please read all requirements carefully and follow the instructions. Please fork this repository to your own **public** GitHub account before beginning the assessment.

---

## Step 1: Auth Flow & Project Setup

**Goal:** Show your skills in Figma, Next.js, NextAuth, API work, and project structure.

### Requirements

- Follow the Figma design: [Figma file](https://www.figma.com/design/I9tcEpo7FfChsfuoY4aH2o/Frontend-Technical-Assessment?node-id=0-1)
- Build an auth flow using the API (Swagger docs will be provided)
- Use only:
  - Next.js 15+ (App Router, use `/src` folder)
  - TailwindCSS
  - NextAuth
  - next-intl
  - Lucide icons
  - TypeScript
- **Do not** put everything in the root; use proper project structure.

#### Extra Points (optional, but recommended):

- tanstack query
- zustand
- docker
- shadcn/ui or radix

### Functionality to cover

- Login
- Register
- Reset password (all endpoints will be ready)
- Session management (show us how you handle it)
- Logout flow

After login/register, show a page with:  
`Hello, {email}.`  
Include a logout button.

**Important:**  
Run your app on port `3000`. The reset password link in email will use this port.

---

## Step 2: Slider Component

- Check the example in `./slider-example.tsx`
- Create and adapt a slider based on the Figma design: [Figma file](https://www.figma.com/design/I9tcEpo7FfChsfuoY4aH2o/Frontend-Technical-Assessment?node-id=1-2)
- You can add this as a separate page in your project.

---

## Best Practices
 - Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages. This helps keep your commit history clear and organized.
 - Write clean, readable code and keep your files structured.
 - Comment your code where needed.
 - Use meaningful variable and function names.
 - Make small, focused commits for each change.
 - Test your code before submitting.

---

## Extra

- You may deploy your app to Vercel and share the link (optional, but appreciated).
- If you find issues or errors with the API, contact the person handling your interview.

---

Good luck!
