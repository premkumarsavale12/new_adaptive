import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

async function checkDb() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log('Connected to database');

        const res3 = await client.query("SELECT has_schema_privilege(current_user, 'adap_schema', 'CREATE')");
        console.log('Can create in adap_schema:', res3.rows[0].has_schema_privilege);

        const res4 = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'adap_schema'");
        console.log('Existing tables in adap_schema:', res4.rows.map(r => r.table_name));

    } catch (err) {
        console.error('Error connecting to database:', err);
    } finally {
        await client.end();
    }
}

checkDb();
