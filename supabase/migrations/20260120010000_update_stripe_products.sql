-- Update Basic Tier Product ID
UPDATE public.subscription_tiers
SET stripe_product_id = 'prod_TpECeLNea3s1D3'
WHERE id = 'basic';

-- Update Pro Tier Product ID
UPDATE public.subscription_tiers
SET stripe_product_id = 'prod_TpEGwSM4LTIWIc'
WHERE id = 'pro';
