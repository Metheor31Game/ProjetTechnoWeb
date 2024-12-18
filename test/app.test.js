import { describe, it, expect } from 'vitest';
import request from "supertest";
import { app } from "../server/index";
import { initialiseDatabase } from '../server/bdd';
import { response } from 'express';



describe("test des routes -> status (GET) :", () =>{

  it("test de la route principale (localhost:3000/)", async () => {
    const response = await request(app).get("/");
  
    expect(response.status).toBe(200);
  })

  it("test de la route connection (localhost:3000/connection)", async () => {
    const response = await request(app).get("/connection");
  
    expect(response.status).toBe(200);
  })

  it("test de la route inscription (localhost:3000/inscription)", async () => {
    const response = await request(app).get("/inscription");
  
    expect(response.status).toBe(200);
  })  
})

describe("Test des routes basique (JSON content)", () => {
  it("route -> /annonces/:id?", async () => {

    const annonceId = "4";

    const connection = await initialiseDatabase();

    const [rows] = await connection.query("SELECT * FROM annonce WHERE id = ?", [annonceId]);

    expect(JSON.stringify(rows[0])).toBe((await (request(app).get("/annonces/4"))).text);

  })
})


