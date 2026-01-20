# PromptGen Architecture & Implementation Guide

## 1. Overview
PromptGen is a high-performance AI Prompt Engineering SaaS platform. It enables users to architect optimized prompts using dynamic blueprints (templates) and visual style signatures, with support for major AI providers (Google Gemini, OpenAI).

### Key Features
- **Dynamic Blueprints**: Database-driven prompt templates with custom parameters.
- **Visual Signatures**: Curated aesthetic styles applied to generations.
- **Monetization**: Tiered subscription model ($0, $2, $5) via Stripe.
- **BYOK (Bring Your Own Key)**: Fallback logic allowing users to use their own API keys once system quotas are reached.

---

## 2. Technical Architecture

PromptGen follows a modern Serverless architecture using **Next.js 14 (App Router)** and **Supabase**.

### 2.1 Technology Stack
- **Frontend**: React 18, Tailwind CSS, shadcn/ui.
- **Backend/API**: Next.js Server Actions, Edge Functions (Supabase).
- **Database**: PostgreSQL (Supabase) with Row Level Security (RLS).
- **Authentication**: Supabase Auth (Email/Password).
- **Payments**: Stripe Billing + Webhooks.
- **AI Integration**: Google Generative AI (Gemini), OpenAI.

### 2.2 Repository Structure
```text
promptify/
├── .github/            # GitHub Actions (CI/CD)
├── docs/               # Architecture & Guides
├── public/             # Static Assets
├── src/
│   ├── app/            # App Router & Server Actions
│   ├── components/     # UI Components (Dashboard, Landing, Settings)
│   ├── hooks/          # React Query hooks
│   ├── lib/            # Shared utilities (Stripe, Supabase, AI)
│   └── types/          # TypeScript definitions
├── supabase/
│   ├── migrations/     # SQL Master Schema and Migrations
│   └── functions/      # Edge Functions
├── .env.local          # Environment Variables
├── next.config.ts      # Next.js Config
└── package.json        # Dependencies
```

---

## 3. Database Layer (Supabase)

The core logic is stored in a **single consolidated migration file** (`20260120000000_consolidated_schema.sql`).

### Core Tables
| Table | Description |
|-------|-------------|
| `user_profiles` | User profile data (replacing `profiles`). |
| `user_subscriptions` | Tracks plan tier, usage quotas, and Stripe IDs. |
| `subscription_tiers` | Cached definition of plans: Free, Basic, Pro. |
| `supported_templates`| Dynamic prompt structures and parameter schemas. |
| `supported_ai_models`| Registered models (Gemini 3 Flash, GPT-4o). |
| `user_api_keys` | Encrypted user keys for BYOK fallback (PGCrypto). |
| `user_prompts` | History with multimodal `context_data` & structured output. |

### RLS (Row Level Security)
- Users can only read/write their own user_profiles, user_subscriptions, and user_prompts.
- Metadata tables (`tiers`, `templates`, `models`) are globally readable but only writeable by the system.

---

## 4. Application Logic

### 4.1 Prompt Generation Flow
1. **User Request**: User selects a **Blueprint** and **Style** on the Dashboard.
2. **Dynamic Params**: The UI renders inputs based on the Blueprint's `param_schema`.
3. **Server Action**: `generatePrompt` is called.
   - Fetches User Tier from DB.
   - Checks Monthly Quota.
   - If quota exists: Uses **System API Key**.
   - If quota exceeded: Checks for **User BYOK Key**.
   - Interpolates user inputs into the structure.
   - Calls Provider (Gemini/OpenAI).
   - Saves to History.

### 4.2 Monetization & Billing
- **Stripe Checkout**: Handled by Server Actions in `src/app/actions/stripe.ts`.
- **Webhooks**: `api/webhooks/stripe` handles subscription lifecycle events (upgrades/downgrades).
- **Consolidated Config**: `src/config/plans.ts` serves as the single source of truth for pricing.

---

## 5. Deployment & Configuration

> Please refer to the **[Deployment Guide](DEPLOYMENT.md)** for detailed environment setup, Stripe configuration, and database migration steps.

## 6. Developer Workflows
- **Adding a Template**: Insert a new row into `supported_templates` via Supabase Dashboard. The UI will automatically render it.
- **Adding a Model**: Insert a new row into `supported_ai_models`.
- **Modifying UI**: Components use Tailwind CSS and are located in `src/components`.

---
*Created for the PromptGen Engineering Team.*
