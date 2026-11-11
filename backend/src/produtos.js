
import { Router } from 'express';
import pool from './db.js';
import { formatarPreco } from './preco.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT id, nome, preco
      FROM produtos
      ORDER BY id ASC
    `);

    const produtos = resultado.rows.map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      preco: formatarPreco(produto.preco)
    }));

    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao consultar produtos:', error);

    res.status(500).json({
      erro: 'Erro ao consultar produtos.'
    });
  }
});

export default router;
