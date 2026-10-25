import { expect, test } from "@playwright/test";

test("a customer can save a preview, edit an address and review current reorder prices", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.locator("article").first().getByRole("spinbutton"),
  ).toHaveValue("1");
  await page.getByLabel("Delivery pincode", { exact: true }).fill("500001");
  await page.getByRole("button", { name: "Check delivery" }).click();
  await expect(page.locator(".delivery-result")).toContainText(
    "not yet confirmed",
  );
  await page
    .locator("article")
    .first()
    .getByRole("button", { name: "Add", exact: true })
    .click();
  await expect(page.getByRole("dialog", { name: "Your cart" })).toContainText(
    "Awaiting confirmation",
  );
  await page.getByRole("link", { name: "Review order", exact: true }).click();
  await expect(page.getByLabel("Pincode", { exact: true })).toHaveValue(
    "500001",
  );
  await page.getByLabel("Contact name", { exact: true }).fill("Test Customer");
  await page.getByLabel("Phone number", { exact: true }).fill("9876543210");
  await page
    .getByLabel("Delivery address", { exact: true })
    .fill("House 1, Example street");
  await page.getByLabel("Save this address on this browser").check();
  await expect(
    page.getByRole("button", {
      name: "Place order — not available in preview",
    }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Save order preview", exact: true })
    .click();
  await page.getByRole("link", { name: "View in My orders" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.locator(".order-preview")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".order-preview")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: "Your saved previews" }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Saved addresses" }).click();
  await page.getByRole("button", { name: "Edit address", exact: true }).click();
  await page
    .getByLabel("Delivery address", { exact: true })
    .fill("House 2, Changed street");
  await page.getByRole("button", { name: "Save address", exact: true }).click();
  await expect(page.locator(".address-grid")).toContainText("House 2");
  await page.getByRole("tab", { name: "Orders", exact: true }).click();
  await page.locator(".order-details summary").click();
  await expect(page.locator(".order-details")).toContainText("House 1");
  await page.getByRole("button", { name: "Buy again — review prices" }).click();
  await expect(
    page.getByRole("region", { name: "Review current prices" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Add at current prices" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close cart", exact: true }).click();
  await page.goto("/help#privacy");
  await page
    .getByRole("button", { name: "Clear saved cart, addresses and previews" })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "cleared from this browser",
  );
  await page.goto("/dashboard");
  await expect(page.locator(".order-preview")).toHaveCount(0);
});

test("failed persistent deletion does not falsely confirm removal", async ({
  page,
}) => {
  await page.goto("/help");
  await page.evaluate(() =>
    localStorage.setItem(
      "cerahub-shopping-v1",
      JSON.stringify({
        orders: [],
        addresses: [
          {
            id: "a",
            name: "Privacy Test",
            phone: "9876543210",
            address: "Test address",
            pincode: "500001",
            gstin: "",
          },
        ],
        pincode: "500001",
      }),
    ),
  );
  await page.reload();
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
    Storage.prototype.removeItem = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
  });
  await page
    .getByRole("button", { name: "Clear saved cart, addresses and previews" })
    .click();
  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "older saved information may remain" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.getItem("cerahub-shopping-v1")),
  ).toContain("Privacy Test");
});

test("key pages remain usable without overflow and fictitious service claims", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/materials",
      "/products/jk-super-cement-50kg",
      "/dashboard",
      "/checkout",
      "/help",
    ]) {
      await page.goto(path);
      await expect(page.locator("body")).not.toContainText("Cera Wallet");
      await expect(page.locator("body")).not.toContainText(
        "Casting readiness protocol",
      );
      await expect(page.locator("body")).not.toContainText("Site cam #02");
      await expect(page.locator("body")).not.toContainText("Bengaluru");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} at ${width}`,
      ).toBe(true);
    }
  }
});

test("dashboard samples are labelled, optional and never stored as customer orders", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await expect(
    page.getByRole("region", { name: "Sample orders" }),
  ).toBeVisible();
  await expect(page.getByText("SAMPLE-1024", { exact: true })).toBeVisible();
  await page.getByRole("checkbox", { name: "Show sample orders" }).uncheck();
  await expect(
    page.getByRole("heading", { name: "Your orders will appear here." }),
  ).toBeVisible();
  await expect(page.getByRole("region", { name: "Sample orders" })).toHaveCount(
    0,
  );
  expect(
    await page.evaluate(() => localStorage.getItem("cerahub-shopping-v1")),
  ).toBeNull();
});
