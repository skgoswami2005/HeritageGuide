import { validateInput } from "./validate";

describe("Input Validation", () => {
  test("should pass with valid email and password", () => {
    expect(() =>
      validateInput("test@example.com", "password123")
    ).not.toThrow();
  });

  test("should throw an error for invalid email format", () => {
    expect(() => validateInput("invalid-email", "password123")).toThrow(
      "Invalid email format"
    );
  });

  test("should throw an error for short password", () => {
    expect(() => validateInput("test@example.com", "123")).toThrow(
      "Password must be at least 6 characters"
    );
  });

  test("should throw an error for empty email", () => {
    expect(() => validateInput("", "password123")).toThrow(
      "Invalid email format"
    );
  });

  test("should throw an error for empty password", () => {
    expect(() => validateInput("test@example.com", "")).toThrow(
      "Password must be at least 6 characters"
    );
  });
});
