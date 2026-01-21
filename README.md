# PromptGen: Pro-Level AI Prompt Engineering 🚀

PromptGen is a professional prompt engineering workspace designed to convert creative concepts into high-fidelity AI instructions for Midjourney, DALL·E 3, and complex LLM workflows.

## 📁 Repository Architecture
This project is a unified Next.js + Supabase application, optimized for serverless deployment on Vercel.

- **`/src`**: Next.js 14 App Router (Frontend, Server Actions & API Routes).
- **`/supabase`**: Consolidated PostgreSQL Schema, Migrations, and RLS policies.
- **`/docs`**: Technical architecture and deployment guides.

## 🛠️ Core Capabilities
- **Dynamic Configuration**: UI automatically morphs based on database-driven `supported_templates` and `supported_ai_models`.
- **Hybrid Quotas**: Seamlessly switches between **System API Keys** (platform quota) and **User BYOK** (unlimited usage) based on tier limits.
- **Transactional Billing**: Secure Stripe integration with dual-interval (Monthly/Yearly) support.
- **Realtime Sync**: Instant UI notification of subscription status and prompt completion.
- **Data Governance**: Automated daily cleanup of expired prompt history via `pg_cron`.

## 🚀 Getting Started

> **⚠️ Setup Required**: For detailed instructions on environment variables, Stripe setup, and database initialization, please refer to the **[Deployment Guide](docs/DEPLOYMENT.md)**.

### Quick Start
1.  **Clone & Install**:
    ```bash
    git clone https://github.com/nani-bobbara/PG3.git
    npm install
    ```
2.  **Environment**: Create a `.env.local` based on the [Deployment Guide](docs/DEPLOYMENT.md).
3.  **Run Development**:
    ```bash
    npm run dev
    ```

## 📖 Deep Dive Documentation
- [Architecture & AI Governance](docs/ARCHITECTURE.md) — Technical details (BYOK, RLS, Webhooks).
- [Deployment Guide](docs/DEPLOYMENT.md) — Step-by-step setup instructions.
- [User Guide](docs/USER_GUIDE.md) — Feature walkthrough for end-users.

## ⚖️ License
MIT - Created by the PROMPTIFY Engineering Team.
