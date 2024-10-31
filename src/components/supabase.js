import { createClient } from "@supabase/supabase-js";
const URL = 'https://ptrdlppmnisrhxbaryqc.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cmRscHBtbmlzcmh4YmFyeXFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTkyMTU2OCwiZXhwIjoyMDQxNDk3NTY4fQ.97nJsRa8bG47duENJOwDdbNzeiYzsNUtZ8KzTSN-HxY';

export const sbase = createClient(URL, API_KEY);