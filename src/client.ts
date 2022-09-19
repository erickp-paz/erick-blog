import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://lkwwxvarmlonbucscsig.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrd3d4dmFybWxvbmJ1Y3Njc2lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM1ODgzODEsImV4cCI6MTk3OTE2NDM4MX0.9klPrNbFhIDFNJb6QL7rJW20O2oICiahJmxaMhm-LQc'
)
