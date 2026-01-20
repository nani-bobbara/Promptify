# Deployment & Configuration Guide

This is the single source of truth for deploying and configuring the **Promptify** platform. Only reference this document for setup instructions to avoid inconsistencies.

## 1. Prerequisites

- **Node.js**: v18 or higher.
- **Supabase Project**: A fresh project for the database and auth.
- **Stripe Account**: For billing and subscription management.
- **AI Provider Keys**: Google Gemini (required) and OpenAI (optional).

## 2. Environment Variables

Create a `.env.local` file in the project root. Use the exact variable names below:

```bash
# Supabase (Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# AI Providers
GEMINI_API_KEY=AIza...               # Required for default model (Gemini 3 Flash)
OPENAI_API_KEY=sk-...                # Optional

# Stripe (Developers -> API Keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...      # From Webhooks section after creating endpoint

# Stripe Price IDs (See Section 4)
NEXT_PUBLIC_STRIPE_PRICE_BASIC=price_...
NEXT_PUBLIC_STRIPE_PRICE_PRO=price_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000 # or your production URL
```

## 3. Database Setup

We use a **Single Consolidated Migration** strategy. You do not need to run multiple files.

1.  Navigate to the **Supabase SQL Editor**.
2.  Open the file `supabase/migrations/20260120000000_consolidated_schema.sql` from this repository.
3.  Copy the entire content and run it.

**What this does:**
- Creates core tables: `user_profiles`, `user_subscriptions`, `subscription_tiers`, `user_prompts`.
- Sets up Security (RLS) policies.
- Enables `pgcrypto` for API key encryption.
- Seeds default Tiers (Free, Basic, Pro) and Models (Gemini 3).

## 4. Stripe Configuration (Critical)

To ensure the checkout flow works, you must configure Stripe Products/Prices to match the application's expectations.

### Step 4.1: Create Products
In your Stripe Dashboard, create two products:

1.  **Product Name**: "Basic Plan"
    *   **Price**: $20.00 USD / Month
    *   **Recurring**: Monthly
    *   **Metadata (Optional but recommended)**:
        *   `monthly_quota`: `200`
2.  **Product Name**: "Pro Plan"
    *   **Price**: $50.00 USD / Month
    *   **Recurring**: Monthly
    *   **Metadata**:
        *   `monthly_quota`: `600`

### Step 4.2: Get Price IDs
After creating the pricing plans, copy the **API ID** for each price (starts with `price_...`).

*   Update `NEXT_PUBLIC_STRIPE_PRICE_BASIC` in your `.env.local`.
*   Update `NEXT_PUBLIC_STRIPE_PRICE_PRO` in your `.env.local`.

### Step 4.3: Configure Webhooks
The application relies on webhooks to sync subscription status (`active`, `canceled`) to the database in real-time.

1.  Go to **Developers > Webhooks**.
2.  Add Endpoint: `https://your-domain.com/api/webhooks/stripe` (or use Stripe CLI for local).
3.  **Select Events to Listen for:**
    *   `checkout.session.completed`
    *   `customer.subscription.updated`
    *   `customer.subscription.deleted`
    *   `product.updated` (syncs metadata to DB)
    *   `price.updated` (syncs pricing to DB)

## 5. Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the server:
    ```bash
    npm run dev
    ```
3.  Update Database Types (if schema changes):
    ```bash
    # Requires Docker or link to remove project
    npx supabase gen types typescript --linked > src/types/supabase.ts
    ```

## 6. Production Deployment

This repository is configured with **GitHub Actions**.

1.  Connect your repository to Vercel.
2.  Add the Environment Variables from Section 2 to Vercel Project Settings.
3.  **Supabase Auth**: Ensure `Site URL` and `Redirect URLs` in Supabase Auth settings match your Vercel domain.
4.  **GitHub Secrets**: For database migrations to run automatically, add these secrets to your GitHub Repo:
    *   `SUPABASE_ACCESS_TOKEN`
    *   `SUPABASE_DB_PASSWORD`
    *   `SUPABASE_PROJECT_ID`
