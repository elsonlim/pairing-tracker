import { hash, compare } from "../../src/services/encryption.service";

describe("Encryption", () => {
  describe("hash", () => {
    it("should return a hashed password", async () => {
      const hashedPassword = await hash("apple");
      expect(hashedPassword).toMatch(/\$2b\$10\$.+/);
    });
  });

  describe("compare", () => {
    const correctPw = "password1";

    it("should return true if same password", async () => {
      const hashedPassword = await hash(correctPw);
      expect(await compare(correctPw, hashedPassword)).toBe(true);
    });

    it("should return true if same password", async () => {
      const hashedPassword = await hash(correctPw);
      expect(await compare("wrong password", hashedPassword)).toBe(false);
    });
  });
});
