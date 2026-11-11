
import 'dotenv/config';
import app from './app.js';
import pool from './db.js';

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`API executando na porta ${PORT}`);
});

async function encerrarServidor() {
  console.log('Encerrando servidor...');

  server.close(async () => {
    await pool.end();
    console.log('Servidor e conexões encerrados.');

    process.exit(0);
  });
}

process.on('SIGINT', encerrarServidor);
process.on('SIGTERM', encerrarServidor);
