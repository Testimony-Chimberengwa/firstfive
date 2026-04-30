const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// Supabase PostgreSQL connection
const connectionString = 'postgresql://postgres:%23Chimbet0123@db.fcuxgxtxsxjwelkivrza.supabase.co:5432/postgres';

async function runMigrations() {
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }, // Required for Supabase
  });

  try {
    console.log('🔗 Connecting to Supabase PostgreSQL...');
    await client.connect();
    console.log('✓ Connected successfully!');

    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20260430_init_schema.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');

    console.log('\n📝 Running database schema migrations...\n');
    
    // Execute the SQL
    await client.query(sql);
    
    console.log('\n✓ Database migrations completed successfully!');
    console.log('✓ Tables created: users, incidents, incident_responders, messages');
    console.log('✓ PostGIS extension enabled');
    console.log('✓ Row Level Security policies configured');
    
  } catch (error) {
    console.error('\n✗ Migration failed:');
    console.error('Error:', error.message);
    if (error.detail) console.error('Detail:', error.detail);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n✓ Connection closed\n');
  }
}

runMigrations();
