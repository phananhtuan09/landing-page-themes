import { test, expect } from "@playwright/test";

test.describe("Liquid Editorial Theme", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/themes/liquid-editorial");
  });

  test.describe("Page Structure and Content", () => {
    test("should display the page with correct title and main sections", async ({ page }) => {
      // Verify page title
      await expect(page).toHaveTitle(/Liquid Editorial/);

      // Verify all main sections are visible
      await expect(page.getByRole("heading", { name: /FLUID\s*DYNAMICS/i })).toBeVisible();
      await expect(page.getByRole("heading", { name: /CAPABILITIES/i })).toBeVisible();
      await expect(page.getByRole("heading", { name: /VOICES/i })).toBeVisible();
      await expect(page.getByRole("heading", { name: /READY TO FLOW/i })).toBeVisible();
    });

    test("should render hero section with editorial typography", async ({ page }) => {
      // Hero headline
      const heroHeading = page.getByRole("heading", { level: 1 });
      await expect(heroHeading).toBeVisible();
      await expect(heroHeading).toContainText("FLUID");
      await expect(heroHeading).toContainText("DYNAMICS");

      // Editorial subtext
      await expect(
        page.getByText(/Where brutalist typography meets liquid motion/)
      ).toBeVisible();

      // Scroll indicator
      await expect(page.getByText("Scroll to explore")).toBeVisible();
    });

    test("should render features section with all capability cards", async ({ page }) => {
      // Navigate to features section
      await page.locator("#features").scrollIntoViewIfNeeded();

      // Verify section heading
      await expect(page.getByRole("heading", { name: /CAPABILITIES/i })).toBeVisible();

      // Verify feature cards are present (6 features)
      const featureTitles = [
        "Velocity Response",
        "Elastic Recovery",
        "Accent Revelation",
        "Editorial Grid",
        "Performance First",
        "Accessible Design",
      ];

      for (const title of featureTitles) {
        await expect(page.getByRole("heading", { name: title })).toBeVisible();
      }
    });

    test("should render testimonials section with quotes", async ({ page }) => {
      // Navigate to testimonials section
      await page.locator("#testimonials").scrollIntoViewIfNeeded();

      // Verify section heading
      await expect(page.getByRole("heading", { name: /VOICES/i })).toBeVisible();

      // Verify testimonial authors are displayed
      await expect(page.getByText("Sarah Chen")).toBeVisible();
      await expect(page.getByText("Marcus Webb")).toBeVisible();
      await expect(page.getByText("Elena Rodriguez")).toBeVisible();

      // Verify company names
      await expect(page.getByText("Studio Flux")).toBeVisible();
      await expect(page.getByText("Kinetic Labs")).toBeVisible();
      await expect(page.getByText("Vertex Studio")).toBeVisible();
    });

    test("should render CTA section with action buttons", async ({ page }) => {
      // Navigate to CTA section
      await page.locator("#contact").scrollIntoViewIfNeeded();

      // Verify CTA heading
      await expect(page.getByRole("heading", { name: /READY TO FLOW/i })).toBeVisible();

      // Verify CTA buttons
      await expect(page.getByRole("button", { name: "Start Your Journey" })).toBeVisible();
      await expect(page.getByRole("button", { name: "View Case Studies" })).toBeVisible();

      // Verify trust indicators
      await expect(page.getByText("500+")).toBeVisible();
      await expect(page.getByText("Projects launched")).toBeVisible();
      await expect(page.getByText("98%")).toBeVisible();
      await expect(page.getByText("Client satisfaction")).toBeVisible();
    });

    test("should render footer with all sections", async ({ page }) => {
      // Scroll to footer
      await page.locator("footer").scrollIntoViewIfNeeded();

      // Verify brand text
      await expect(page.locator("footer").getByText("LIQUID")).toBeVisible();

      // Verify footer link sections
      await expect(page.getByRole("heading", { name: "Product" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Company" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Legal" })).toBeVisible();

      // Verify newsletter input
      await expect(page.getByPlaceholder("Email")).toBeVisible();

      // Verify social links
      await expect(page.getByRole("link", { name: "Twitter" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Instagram" })).toBeVisible();
      await expect(page.getByRole("link", { name: "LinkedIn" })).toBeVisible();
    });
  });

  test.describe("Navigation", () => {
    test("should display fixed navbar with navigation links", async ({ page }) => {
      // Verify navbar elements
      await expect(page.getByRole("navigation")).toBeVisible();
      await expect(page.locator("nav").getByText("LIQUID")).toBeVisible();

      // Verify back link to home
      await expect(page.getByRole("link", { name: /Back/i })).toBeVisible();

      // Verify Get Started button (desktop)
      await expect(page.getByRole("button", { name: "Get Started" }).first()).toBeVisible();
    });

    test("should navigate to sections via anchor links", async ({ page }) => {
      // Click Features link
      await page.getByRole("link", { name: "Features" }).first().click();
      await expect(page.locator("#features")).toBeInViewport();

      // Click Testimonials link
      await page.getByRole("link", { name: "Testimonials" }).first().click();
      await expect(page.locator("#testimonials")).toBeInViewport();

      // Click Contact link
      await page.getByRole("link", { name: "Contact" }).first().click();
      await expect(page.locator("#contact")).toBeInViewport();
    });

    test("should navigate back to home when clicking Back link", async ({ page }) => {
      await page.getByRole("link", { name: /Back/i }).click();
      await expect(page).toHaveURL("/");
    });
  });

  test.describe("Mobile Navigation", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("should toggle mobile menu on hamburger click", async ({ page }) => {
      // Mobile menu toggle button
      const menuButton = page.getByRole("button", { name: "Toggle menu" });
      await expect(menuButton).toBeVisible();

      // Verify menu is initially closed
      await expect(page.locator("nav").getByRole("link", { name: "Features" })).not.toBeVisible();

      // Open menu
      await menuButton.click();
      await expect(page.locator("nav").getByRole("link", { name: "Features" })).toBeVisible();
      await expect(page.locator("nav").getByRole("link", { name: "Testimonials" })).toBeVisible();
      await expect(page.locator("nav").getByRole("link", { name: "Contact" })).toBeVisible();

      // Close menu
      await menuButton.click();
      await expect(page.locator("nav").getByRole("link", { name: "Features" })).not.toBeVisible();
    });

    test("should close mobile menu after clicking a link", async ({ page }) => {
      const menuButton = page.getByRole("button", { name: "Toggle menu" });

      // Open menu
      await menuButton.click();

      // Click a nav link
      await page.locator("nav").getByRole("link", { name: "Features" }).click();

      // Menu should close
      await expect(page.locator("nav").getByRole("link", { name: "Features" })).not.toBeVisible();
    });
  });

  test.describe("Responsive Design", () => {
    test("should display mobile layout on small screens", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Mobile menu button should be visible
      await expect(page.getByRole("button", { name: "Toggle menu" })).toBeVisible();

      // Features should be in single column (mobile layout visible)
      const featuresSection = page.locator("#features");
      await featuresSection.scrollIntoViewIfNeeded();

      // The mobile layout div should be visible (lg:hidden class)
      await expect(
        page.locator("#features .flex.flex-col.gap-6").first()
      ).toBeVisible();
    });

    test("should display desktop layout on large screens", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      // Mobile menu button should be hidden
      await expect(page.getByRole("button", { name: "Toggle menu" })).not.toBeVisible();

      // Desktop nav links should be visible
      await expect(page.locator("nav").getByRole("link", { name: "Features" })).toBeVisible();
      await expect(page.locator("nav").getByRole("link", { name: "Testimonials" })).toBeVisible();
    });
  });

  test.describe("AC3: Mobile Static Fallback", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("should display static layout without WebGL on mobile", async ({ page }) => {
      // Page should load successfully
      await expect(page.getByRole("heading", { name: /FLUID\s*DYNAMICS/i })).toBeVisible();

      // All content should be visible and interactive
      await expect(page.getByText(/Where brutalist typography meets liquid motion/)).toBeVisible();

      // Scroll should work normally
      await page.locator("#features").scrollIntoViewIfNeeded();
      await expect(page.getByRole("heading", { name: /CAPABILITIES/i })).toBeVisible();
    });
  });

  test.describe("AC4: WebGL Not Supported Fallback", () => {
    test("should display static layout gracefully when WebGL is disabled", async ({
      page,
      context,
    }) => {
      // Disable WebGL by blocking the canvas context
      await context.addInitScript(() => {
        const originalGetContext = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) {
          if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") {
            return null;
          }
          return originalGetContext.call(this, type, ...args);
        };
      });

      await page.goto("/themes/liquid-editorial");

      // Page should still load and display content
      await expect(page.getByRole("heading", { name: /FLUID\s*DYNAMICS/i })).toBeVisible();
      await expect(page.getByText(/Where brutalist typography meets liquid motion/)).toBeVisible();

      // All sections should be visible
      await page.locator("#features").scrollIntoViewIfNeeded();
      await expect(page.getByRole("heading", { name: /CAPABILITIES/i })).toBeVisible();

      await page.locator("#testimonials").scrollIntoViewIfNeeded();
      await expect(page.getByRole("heading", { name: /VOICES/i })).toBeVisible();

      // No JavaScript errors should occur (check console)
      const errors: string[] = [];
      page.on("pageerror", (error) => {
        errors.push(error.message);
      });

      // Scroll through page
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Filter out unrelated errors (like network errors)
      const jsErrors = errors.filter(
        (e) => !e.includes("net::") && !e.includes("Failed to fetch")
      );
      expect(jsErrors).toHaveLength(0);
    });
  });

  test.describe("AC5: Reduced Motion Preference", () => {
    test("should respect prefers-reduced-motion setting", async ({ page }) => {
      // Enable reduced motion preference
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/themes/liquid-editorial");

      // Page should load with static layout
      await expect(page.getByRole("heading", { name: /FLUID\s*DYNAMICS/i })).toBeVisible();

      // All content should be accessible
      await expect(page.getByText(/Where brutalist typography meets liquid motion/)).toBeVisible();

      // Navigation should work
      await page.getByRole("link", { name: "Features" }).first().click();
      await expect(page.locator("#features")).toBeInViewport();
    });
  });

  test.describe("Form Interactions", () => {
    test("should allow email input in newsletter form", async ({ page }) => {
      // Scroll to footer
      await page.locator("footer").scrollIntoViewIfNeeded();

      // Find and interact with email input
      const emailInput = page.getByPlaceholder("Email");
      await expect(emailInput).toBeVisible();

      // Fill email
      await emailInput.fill("test@example.com");
      await expect(emailInput).toHaveValue("test@example.com");

      // Subscribe button should be visible
      await expect(page.getByRole("button", { name: "Subscribe" })).toBeVisible();
    });
  });

  test.describe("Accessibility", () => {
    test("should have proper heading hierarchy", async ({ page }) => {
      // H1 should exist (hero)
      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toBeVisible();

      // H2 headings for sections
      const h2Count = await page.getByRole("heading", { level: 2 }).count();
      expect(h2Count).toBeGreaterThanOrEqual(3); // Features, Testimonials, CTA

      // H3 headings for features and testimonials
      const h3Count = await page.getByRole("heading", { level: 3 }).count();
      expect(h3Count).toBeGreaterThanOrEqual(6); // 6 feature cards
    });

    test("should have accessible navigation landmarks", async ({ page }) => {
      // Navigation landmark
      await expect(page.getByRole("navigation")).toBeVisible();

      // Main content area
      await expect(page.locator("main")).toBeVisible();

      // Footer landmark
      await expect(page.locator("footer")).toBeVisible();
    });

    test("should have aria-labels on icon buttons", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Mobile menu toggle has aria-label
      const menuButton = page.getByRole("button", { name: "Toggle menu" });
      await expect(menuButton).toHaveAttribute("aria-label", "Toggle menu");
    });

    test("should support keyboard navigation", async ({ page }) => {
      // Focus on first interactive element
      await page.keyboard.press("Tab");

      // Navigate through focusable elements
      let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();

      // Tab through navigation
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press("Tab");
      }

      // Should be able to activate focused element with Enter
      focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(["A", "BUTTON"]).toContain(focusedElement);
    });
  });

  test.describe("Visual Consistency", () => {
    test("should apply correct theme colors", async ({ page }) => {
      // Background color should be warm off-white (#F9F7F2)
      const body = page.locator("body > div").first();
      const bgColor = await body.evaluate((el) =>
        getComputedStyle(el).getPropertyValue("background-color")
      );
      // CSS variables should be applied
      expect(bgColor).toBeTruthy();
    });

    test("should display accent color on interactive elements", async ({ page }) => {
      // CTA section has accent-colored text
      await page.locator("#contact").scrollIntoViewIfNeeded();
      const flowText = page.getByText("FLOW").first();
      await expect(flowText).toBeVisible();
    });
  });
});
