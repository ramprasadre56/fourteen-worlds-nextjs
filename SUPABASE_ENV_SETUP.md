# =====================================================
# Supabase Configuration
# Get these from your Supabase project settings
# =====================================================

# Public (can be exposed to client)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Private (server-side only)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# =====================================================
# Instructions:
# 1. Go to https://supabase.com and create a project
# 2. Go to Settings > API
# 3. Copy the Project URL to NEXT_PUBLIC_SUPABASE_URL
# 4. Copy the anon/public key to NEXT_PUBLIC_SUPABASE_ANON_KEY
# 5. Copy the service_role key to SUPABASE_SERVICE_ROLE_KEY
# 6. Add these to your .env.local file
# =====================================================
