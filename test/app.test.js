import { describe, it, expect } from 'vitest';
import request from "supertest";
import { app } from "../server/index";
// import { initialiseDatabase } from '../server/bdd';



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


