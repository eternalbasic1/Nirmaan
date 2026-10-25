import { expect, test } from "@playwright/test";

test("hero rotates through photos without visible controls", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "Homes built with care" });
  await expect(
    carousel.getByRole("group", { name: "Photo 1 of 3" }),
  ).toBeVisible();
  await expect(carousel.getByRole("button")).toHaveCount(0);
  for (const photo of [2, 3, 1]) {
    await page.clock.fastForward(6500);
    await expect(
      carousel.getByRole("group", { name: `Photo ${photo} of 3` }),
    ).toBeVisible();
  }
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Delivered to your doorstep.",
  );
});

test("photos remain still when reduced motion is preferred", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install();
  await page.goto("/");
  await page.clock.fastForward(20000);
  await expect(page.getByRole("group", { name: "Photo 1 of 3" })).toBeVisible();
});
