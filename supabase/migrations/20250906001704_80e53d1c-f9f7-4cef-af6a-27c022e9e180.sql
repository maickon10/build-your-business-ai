-- Fix RLS issues on existing tables

-- Enable RLS on existing tables
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for businesses table
CREATE POLICY "Users can view their own businesses" ON public.businesses
  FOR SELECT USING (owner_id::uuid = auth.uid());

CREATE POLICY "Users can create their own businesses" ON public.businesses
  FOR INSERT WITH CHECK (owner_id::uuid = auth.uid());

CREATE POLICY "Users can update their own businesses" ON public.businesses
  FOR UPDATE USING (owner_id::uuid = auth.uid());

CREATE POLICY "Users can delete their own businesses" ON public.businesses
  FOR DELETE USING (owner_id::uuid = auth.uid());

-- Create RLS policies for integrations table
CREATE POLICY "Users can view integrations for their businesses" ON public.integrations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.businesses 
      WHERE businesses.id = integrations.business_id 
      AND businesses.owner_id::uuid = auth.uid()
    )
  );

CREATE POLICY "Users can create integrations for their businesses" ON public.integrations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.businesses 
      WHERE businesses.id = integrations.business_id 
      AND businesses.owner_id::uuid = auth.uid()
    )
  );

CREATE POLICY "Users can update integrations for their businesses" ON public.integrations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.businesses 
      WHERE businesses.id = integrations.business_id 
      AND businesses.owner_id::uuid = auth.uid()
    )
  );

-- Create RLS policies for marketing_campaigns table
CREATE POLICY "Users can view campaigns for their businesses" ON public.marketing_campaigns
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.businesses 
      WHERE businesses.id = marketing_campaigns.business_id 
      AND businesses.owner_id::uuid = auth.uid()
    )
  );

CREATE POLICY "Users can create campaigns for their businesses" ON public.marketing_campaigns
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.businesses 
      WHERE businesses.id = marketing_campaigns.business_id 
      AND businesses.owner_id::uuid = auth.uid()
    )
  );

-- Create RLS policies for products table
CREATE POLICY "Users can view products for their businesses" ON public.products
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.businesses 
      WHERE businesses.id = products.business_id 
      AND businesses.owner_id::uuid = auth.uid()
    )
  );

CREATE POLICY "Users can create products for their businesses" ON public.products
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.businesses 
      WHERE businesses.id = products.business_id 
      AND businesses.owner_id::uuid = auth.uid()
    )
  );

-- Create RLS policies for orders table
CREATE POLICY "Users can view orders for their businesses" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.businesses 
      WHERE businesses.id = orders.business_id 
      AND businesses.owner_id::uuid = auth.uid()
    )
  );

CREATE POLICY "Users can create orders for their businesses" ON public.orders
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.businesses 
      WHERE businesses.id = orders.business_id 
      AND businesses.owner_id::uuid = auth.uid()
    )
  );

-- Create RLS policies for order_items table
CREATE POLICY "Users can view order items for their orders" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      JOIN public.businesses ON businesses.id = orders.business_id
      WHERE orders.id = order_items.order_id 
      AND businesses.owner_id::uuid = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for their orders" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      JOIN public.businesses ON businesses.id = orders.business_id
      WHERE orders.id = order_items.order_id 
      AND businesses.owner_id::uuid = auth.uid()
    )
  );

-- Create RLS policies for users table (profile access)
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (id::uuid = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (id::uuid = auth.uid());

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (id::uuid = auth.uid());