import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../server/index';  // ton fichier Express

describe('Tests pour les routes', () => {
  it('devrait répondre avec un code 200 à la requête GET /inscription', async () => {
    const response = await request(app).get('/inscription');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<form'); // Vérifie qu'un formulaire est présent
  });

  it('devrait répondre avec un code 201 lors de l\'inscription', async () => {
    const newUser = {
      pseudo: 'testuser',
      nom: 'Test',
      prenom: 'User',
      mail: 'testuser@example.com',
      mdp: 'password123',
    };

    const response = await request(app)
      .post('/inscription')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.header['location']).toBe('/connection'); // Vérifie la redirection
  });
});