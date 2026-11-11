
import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DIRECT_URL
});

async function migrate() {
  try {
    await client.connect();

    console.log('Conectado ao PostgreSQL.');

    await client.query(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nome TEXT NOT NULL UNIQUE,
        preco NUMERIC(10, 2) NOT NULL
      );
    `);

    console.log('Tabela produtos verificada.');

    await client.query(`
      INSERT INTO produtos (nome, preco)
      VALUES
        ('Caderno', 19.90),
        ('Caneta', 4.50),
        ('Mochila', 89.90)
      ON CONFLICT (nome) DO NOTHING;
    `);

    console.log('Produtos iniciais inseridos.');
  } catch (error) {
    console.error('Erro na migração:', error);
    process.exitCode = 1;
  } finally {
    await client.end();
    console.log('Conexão encerrada.');
  }
}

migrate();
