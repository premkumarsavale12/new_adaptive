import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

async function fixPermissions() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log('Connected to database');

        console.log('Attempting to grant CREATE on public schema to current user...');
        try {
            await client.query('GRANT ALL ON SCHEMA public TO adap');
            console.log('Successfully granted ALL on public schema');
        } catch (e) {
            console.error('Failed to grant ALL on public schema:', e.message);

            console.log('Attempting to create a custom schema instead...');
            await client.query('CREATE SCHEMA IF NOT EXISTS adap_schema AUTHORIZATION adap');
            console.log('Successfully created adap_schema');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

fixPermissions();
