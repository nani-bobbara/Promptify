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
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key # Required for background webhook sync

# AI Providers
GEMINI_API_KEY=AIza...               # Required for default model (Gemini 3 Flash)
OPENAI_API_KEY=sk-...                # Optional

# Stripe (Developers -> API Keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...      # From Webhooks section after creating endpoint

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
- Configures `pg_cron` for automated prompt history purging.

## 4. Stripe Configuration (Critical)

### Step 4.1: Create Products
In your Stripe Dashboard, create two products in **Test Mode**:

1.  **Product Name**: "Basic Plan"
    - **Description**: For consistent creators.
2.  **Product Name**: "Pro Plan"
    - **Description**: For power users.

### Step 4.2: Create Prices
For each product, create a **Monthly** and **Yearly** price.
- **Basic**: $2.00/mo and $20.00/yr.
- **Pro**: $5.00/mo and $50.00/yr.

### Step 4.3: Sync to Database
Once prices are created, update the `INSERT INTO subscription_tiers` statement in your Supabase SQL Editor with the new **Price IDs** (`price_...`) and **Product IDs** (`prod_...`). This serves as the platform's central config.

### Step 4.4: Configure Webhooks (Vercel Ready)
The application uses a **Supabase Admin Client** to sync subscription status (`active`, `canceled`) to the database.

1.  Go to **Developers > Webhooks**.
2.  Add Endpoint: `https://your-domain.com/api/webhooks/stripe`.
3.  **Select Events:**
    - `checkout.session.completed`
    - `customer.subscription.updated`
    - `customer.subscription.deleted`
    - `product.updated`
    - `price.updated`
4.  Copy the **Signing Secret** (`whsec_...`) into your environment variables.

## 5. Development

1.  Install dependencies: `npm install`
2.  Run the server: `npm run dev`
3.  **Stripe CLI**: To test webhooks locally:
    ```bash
    stripe listen --forward-to localhost:3000/api/webhooks/stripe
    ```

## 6. Production Deployment

1.  Connect your repository to **Vercel**.
2.  Add all Environment Variables to Vercel Project Settings.
3.  **Authentication**: Ensure `Site URL` and `Redirect URLs` in Supabase Auth settings match your Vercel domain.

---
*Created for the PROMPTIFY Engineering Team.*
