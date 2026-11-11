
import 'dotenv/config';

import { describe, it, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

import app from '../../src/app.js';
import pool from '../../src/db.js';

describe('GET /produtos', () => {
  after(async () => {
    await pool.end();
  });

  it('deve retornar os três produtos cadastrados', async () => {
    const resposta = await request(app)
      .get('/produtos');

    assert.equal(resposta.status, 200);

    assert.equal(resposta.body.length, 3);

    assert.deepEqual(
      resposta.body.map((produto) => produto.nome),
      ['Caderno', 'Caneta', 'Mochila']
    );

    assert.equal(
      resposta.body[0].preco,
      'R$ 19,90'
    );

    assert.equal(
      resposta.body[1].preco,
      'R$ 4,50'
    );

    assert.equal(
      resposta.body[2].preco,
      'R$ 89,90'
    );
  });
});
