const { test, expect } = require("@playwright/test");

const hexToRGB = (hex) => {
  let alpha = false,
    h = hex.slice(hex.startsWith("#") ? 1 : 0);
  if (h.length === 3) h = [...h].map((x) => x + x).join("");
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    "rgb" +
    (alpha ? "a" : "") +
    "(" +
    (h >>> (alpha ? 24 : 16)) +
    ", " +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ", " +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : "") +
    ")"
  );
};

test.describe("Checking frontend challenge", () => {
  console.log("from testss--------------");
  test("should check heart-icon is 41px", async ({ page }) => {
    const heartIcon = await page.locator(".heart-icon");
    const icon = await heartIcon.boundingBox();
    await expect(icon.width).toEqual(41);
  });

  test("heart has width 83px and height 34px", async ({ page }) => {
    const heart = await page.locator(".heart");
    const icon = await heart.boundingBox();
    await expect(icon.width).toEqual(83);
    await expect(icon.height).toEqual(34);
  });

  test("heart-icon is inside heart", async ({ page }) => {
    await expect(await page.locator(".heart > .heart-icon")).toBeTruthy();
  });

  test("heart svg is color #ff6444", async ({ page }) => {
    await expect(page.locator(".heart-icon > svg")).toHaveCSS(
      "fill",
      "rgb(255, 100, 68)"
    );
  });
});

test.beforeEach(async ({ page }) => {
  // await page.goto(
  //   "http://127.0.0.1:5500/automarker-proto/submission/index.html"
  // );
  await page.goto("http://localhost:8081");
});
