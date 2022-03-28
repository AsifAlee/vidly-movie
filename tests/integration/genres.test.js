const request = require("supertest");
const { Genres } = require("../../models/genre");
const { User } = require("../../models/user");
let server;

describe("Genres api", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(() => {
    server.close();
  });
  describe("genres get request", () => {
    it("get all genres", async () => {
      const result = await request(server).get("/api/genres");
      expect(result.status).toBe(200);
    });
  });

  describe("GET/:ID", () => {
    it("get genre by its id", async () => {
      const genre = new Genres({ name: "vip movies" });
      await genre.save();
      const result = await request(server).get(`/api/genres/${genre._id}`);
      console.log("result body:", result.body);
      expect(result.body[0]).toHaveProperty("name", genre.name);
    });
    it("invalid genre id", async () => {
      const result = await request(server).get(`/api/genres/232323`);
      expect(result.status).toBe(404);
    });
  });

  describe("POST", () => {
    it("user not logged in", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "123456" });
      expect(res.status).toBe(401);
    });

    it("invalid genre", async () => {
      const user = new User();
      const token = user.generateAuthToken();
      console.log("token is :", token);
      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "2" });
      expect(res.status).toBe(400);
    });
  });
});
