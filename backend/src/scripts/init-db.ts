import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
};

async function initDb() {
  const client = new Client({ ...config, database: 'postgres' });
  try {
    console.log('Connecting to postgres...');
    await client.connect();
    
    const dbName = process.env.DB_NAME || 'pozoblanco_db';
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    
    if (res.rowCount === 0) {
      console.log(`Creating database ${dbName}...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log('Database created.');
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  } catch (err) {
    console.error('Error checking/creating database:', err);
    process.exit(1);
  } finally {
    await client.end();
  }

  // Enable PostGIS
  console.log('Enabling PostGIS extension...');
  const dbClient = new Client({ ...config, database: process.env.DB_NAME });
  try {
    await dbClient.connect();
    await dbClient.query('CREATE EXTENSION IF NOT EXISTS postgis');
    console.log('PostGIS enabled.');
  } catch (err) {
    console.error('Error enabling PostGIS (ensure it is installed on your server):', err);
    // Don't exit, maybe it works anyway or user can fix
  } finally {
    await dbClient.end();
  }
}

initDb();
