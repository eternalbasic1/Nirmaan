import { expect, test } from "@playwright/test";
import { products, categories } from "../mockData";
import assets from "../docs/reference-assets.json" with { type: "json" };
test("three core screens contain their content before JavaScript", async ({
  request,
}) => {
  for (const [path, text] of [
    ["/", "SHOP BY CATEGORY"],
    ["/products/jk-super-cement-50kg", "Product specifications"],
    ["/dashboard", "Sample orders"],
  ]) {
    const r = await request.get(path);
    expect(r.status()).toBe(200);
    const html = await r.text();
    expect(html.toLowerCase()).toContain(text.toLowerCase());
    expect(html).toContain('name="robots"');
    expect(html).toContain('aria-label="CeraHub home"');
    expect(html).toContain('src="/cerahub-logo.png"');
    expect(html).not.toMatch(/NIRMAAN|Nirmaan|MONO/);
  }
});
test("all catalog routes return populated pages", async ({ request }) => {
  for (const product of products) {
    const r = await request.get(`/products/${product.slug}`);
    expect(r.status(), product.slug).toBe(200);
    expect(await r.text()).toContain(product.name);
  }
  for (const c of categories) {
    const r = await request.get(`/categories/${c.id}`);
    expect(r.status(), c.id).toBe(200);
    expect((await r.text()).toLowerCase()).toContain(
      c.name.replaceAll("&", "&amp;").toLowerCase(),
    );
  }
});
test("reference assets and self-hosted font weights are available", async ({
  request,
}) => {
  for (const image of Object.values(assets).flat()) {
    const r = await request.get(image.local);
    expect(r.status(), image.local).toBe(200);
    expect(r.headers()["content-type"]).toContain("image/");
  }
  for (const weight of [400, 500, 600, 700])
    expect(
      (await request.get(`/fonts/space-grotesk-${weight}.ttf`)).status(),
    ).toBe(200);
});
test("component aliases redirect and unknown products return 404", async ({
  request,
}) => {
  for (const path of ["/Home", "/ProductDetail", "/SiteDashboard"]) {
    const r = await request.get(path, { maxRedirects: 0 });
    expect(r.status()).toBe(308);
  }
  expect((await request.get("/products/not-a-material")).status()).toBe(404);
  expect((await request.get("/categories/unknown")).status()).toBe(404);
});
