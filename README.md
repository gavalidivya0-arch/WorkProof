# WorkProof

<div align="center">
  <h3>Prove Your Worth. Build Trust Faster.</h3>
  <p>WorkProof is a modern, verified portfolio and Trust Score platform designed specifically for freelancers.</p>
</div>

---

## 🚀 The Problem
In the modern gig economy, anyone can claim to have built a project. Freelancers struggle to prove their real-world experience, and clients spend too much time verifying claims and weeding out fake portfolios. Traditional resumes and unverified PDF case studies are no longer enough.

## 💡 The Solution
**WorkProof** bridges the trust gap. Freelancers build their portfolios and request direct verification from the clients they worked for. Once a client approves the request, the project is officially "Verified." WorkProof then calculates a dynamic **Trust Score**, giving freelancers a public profile backed by cryptographic-like verification and an easily shareable QR code.

---

## ✨ Key Features
- **Verified Portfolios:** Only showcase projects that have been directly approved by the client.
- **Dynamic Trust Score:** An evolving score based on verified projects, client reviews, and profile completeness.
- **Client Verification Flow:** One-click email verification requests sent securely to clients.
- **AI-Powered Assistance:** Gemini AI integration to automatically enhance project descriptions and extract relevant technical skills from your resume.
- **Role-Based Access Control (RBAC):** Distinct and secure dashboards for `FREELANCER`, `CLIENT`, and `ADMIN`.
- **Public Profiles & QR Codes:** Share your verified portfolio via a custom URL (`/username`) or instantly generate a QR code for your resume.
- **Premium UI:** A stunning, fully responsive interface built with Tailwind CSS, Shadcn UI, and Framer Motion.

---

## 🛠️ Tech Stack & Architecture

WorkProof is built with a cutting-edge Next.js architecture, designed for scale, speed, and strict security.

- **Framework:** Next.js 16 (App Router, React 19)
- **Language:** TypeScript (Strict Mode)
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma Client
- **Authentication:** Auth.js (NextAuth v5) with Google OAuth & Credentials
- **Validation:** Zod & React Hook Form
- **Styling:** Tailwind CSS v4 & CSS Modules
- **UI Components:** Shadcn UI, Radix UI, Base UI, Lucide React
- **AI Integration:** Vercel AI SDK & Google Gemini (1.5 Flash/Pro)
- **Testing:** Vitest (Unit), Playwright (E2E)

### 📊 Database Structure (Prisma)
- **User:** Stores authentication details, role (`FREELANCER`, `CLIENT`, `ADMIN`), and subscription plan (`FREE`, `PRO`, `BUSINESS`).
- **Profile:** Freelancer-specific metadata (Bio, Title, GitHub, LinkedIn).
- **Project:** The core entity representing a body of work. Links to a Freelancer and optionally a VerificationRequest.
- **VerificationRequest:** A secure, tokenized request sent to a Client to verify a specific project.
- **Review:** A verified client's rating and feedback on a specific project.
- **Report:** Moderation system for flagging users or projects.

---

## 🔄 User Flow (The Critical Path)

1. **Freelancer Registration:** User signs up as a Freelancer and completes their public profile.
2. **Project Creation:** Freelancer adds a new project detailing the scope, deliverables, and tech stack (assisted by AI).
3. **Verification Request:** Freelancer requests verification. The system emails the specified Client with a unique, secure link.
4. **Client Approval:** The Client clicks the link (authenticating if necessary), reviews the project details, and approves it.
5. **Trust Score Update:** The project receives a `VERIFIED` badge, and the Freelancer's Trust Score increases.
6. **Public Sharing:** The Freelancer shares their `/username` profile with future prospects, proving their expertise.

---

## 💻 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- PostgreSQL Database (Local or Cloud like Neon/Supabase)

### 1. Installation
```bash
git clone https://github.com/yourusername/workproof.git
cd workproof
npm install
```

### 2. Environment Variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```
Ensure you populate `DATABASE_URL`, `AUTH_SECRET` (generate via `npx auth secret`), and `GOOGLE_GENERATIVE_AI_API_KEY`.

### 3. Database Setup
```bash
npx prisma generate
npx prisma db push
```

### 4. Running Locally
```bash
npm run dev
```
Navigate to `http://localhost:3000`.

---

## 🧪 Testing

WorkProof uses Vitest for unit testing and Playwright for End-to-End testing.

**Run Unit Tests:**
```bash
npm run test
```

**Run E2E Tests:**
```bash
npm run test:e2e
```
*(Note: Playwright tests require the local dev server to be running or it will automatically start one).*

---

## 🚀 Deployment

WorkProof is optimized for **Vercel**.
1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Ensure all environment variables from your `.env` are added to Vercel's Environment Variables settings.
4. Vercel will automatically run `prisma generate && next build`.

---

## 🔮 Future Improvements
- **Stripe Integration:** Fully operationalize the `PRO` and `BUSINESS` tiers with recurring subscriptions.
- **Automated Escrow:** Allow clients to fund verified projects before they begin.
- **Analytics Dashboard:** Advanced traffic analytics for freelancer public profiles.
- **Web3 Integration:** Mint verified projects as Soulbound Tokens (SBTs) on the blockchain for permanent, decentralized verification.

---
*Built with precision. Designed for trust.*
