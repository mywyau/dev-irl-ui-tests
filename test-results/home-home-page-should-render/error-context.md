# Test info

- Name: home page should render
- Location: /Users/michaelyau/dev-irl/dev-irl-ui-tests/tests/home.spec.ts:3:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)

Locator: locator(':root')
Expected pattern: /Your Nuxt App Title/
Received string:  ""
Call log:
  - expect.toHaveTitle with timeout 5000ms
  - waiting for locator(':root')
    9 × locator resolved to <html>…</html>
      - unexpected value ""

    at /Users/michaelyau/dev-irl/dev-irl-ui-tests/tests/home.spec.ts:5:22
```

# Page snapshot

```yaml
- banner:
  - link "Dev Irl":
    - /url: /
  - navigation:
    - link "Login":
      - /url: http://localhost:3000/api/auth/login
- main:
  - heading "Welcome to Dev Irl" [level=1]
  - paragraph: Discover quests, earn rewards, and connect with developers and clients.
- img
- button "Toggle Nuxt DevTools":
  - img
- text: 99 ms
- button "Toggle Component Inspector":
  - img
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 |
  3 | test('home page should render', async ({ page }) => {
  4 |   await page.goto('/');
> 5 |   await expect(page).toHaveTitle(/Your Nuxt App Title/);
    |                      ^ Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)
  6 | });
  7 |
```