const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const projectRoot = path.resolve(__dirname, "..");
const appSource = fs.readFileSync(path.join(projectRoot, "app.js"), "utf8");

function createElementStub() {
  return {
    hidden: false,
    innerHTML: "",
    textContent: "",
    value: "",
    files: [],
    dataset: {},
    classList: {
      add() {},
      remove() {},
      toggle() {},
    },
    elements: {
      currency: { value: "" },
    },
    addEventListener() {},
    append() {},
    click() {},
    focus() {},
    remove() {},
    reset() {},
    setAttribute() {},
    closest() {
      return null;
    },
    querySelector() {
      return createElementStub();
    },
  };
}

const elementCache = new Map();

const sandbox = {
  Blob,
  FormData: class FormDataStub {},
  URL: {
    createObjectURL() {
      return "blob:stub";
    },
    revokeObjectURL() {},
  },
  console,
  crypto: {
    randomUUID() {
      return "00000000-0000-4000-8000-000000000000";
    },
  },
  document: {
    addEventListener() {},
    body: createElementStub(),
    createElement() {
      return createElementStub();
    },
    querySelector(selector) {
      if (!elementCache.has(selector)) {
        elementCache.set(selector, createElementStub());
      }

      return elementCache.get(selector);
    },
    querySelectorAll() {
      return [];
    },
  },
  localStorage: {
    getItem() {
      return null;
    },
    removeItem() {},
    setItem() {},
  },
  navigator: {},
  window: {
    addEventListener() {},
    confirm() {
      return false;
    },
    setTimeout(callback) {
      callback();
    },
  },
  __assert: assert,
};

sandbox.globalThis = sandbox;

const verificationSource = `
(() => {
  const assert = globalThis.__assert;

  const records = [
    {
      id: "try-monthly",
      name: "TRY Monthly",
      price: 1200,
      currency: "TRY",
      billingDate: "2026-01-01",
      endDate: "",
      occurrence: "monthly",
      paymentMethod: "Main card",
      category: "",
      notes: "",
    },
    {
      id: "usd-yearly",
      name: "USD Yearly",
      price: 120,
      currency: "USD",
      billingDate: "2026-01-01",
      endDate: "",
      occurrence: "yearly",
      paymentMethod: "Work card",
      category: "",
      notes: "",
    },
    {
      id: "blank-weekly",
      name: "Blank Weekly",
      price: 12,
      currency: "",
      billingDate: "2026-01-01",
      endDate: "",
      occurrence: "weekly",
      paymentMethod: "Cash",
      category: "",
      notes: "",
    },
  ];

  const monthlyTotals = getMonthlyTotalsByCurrency(records);
  assert.deepEqual(
    Object.keys(monthlyTotals),
    ["TRY", "USD"],
    "blank currency should fall back to TRY without adding a separate group",
  );
  assert.equal(monthlyTotals.TRY, 1200 + (12 * (52 / 12)));
  assert.equal(monthlyTotals.USD, 10);

  const yearlyTotals = scaleCurrencyTotals(monthlyTotals, 12);
  assert.equal(yearlyTotals.TRY, 15024);
  assert.equal(yearlyTotals.USD, 120);

  assert.equal(
    formatCurrencyTotalsLines(monthlyTotals),
    "TRY 1252.00\\nUSD 10.00",
    "multi-currency overview totals should render as separate lines",
  );
  assert.equal(
    formatCurrencyTotalsLines({ TRY: 1249.99 }),
    "TRY 1249.99",
    "single-currency overview total should stay compact",
  );
  assert.equal(
    formatCurrencyTotalsLines({}),
    "TRY 0.00",
    "empty overview total should keep the current TRY fallback",
  );

  assert.equal(
    formatCurrencyBreakdown({ TRY: 1252, USD: 10 }),
    "TRY 1252.00 + USD 10.00",
    "existing breakdown formatting should remain unchanged",
  );

  const mixedDueSoonHtml = renderDueSoonTotal([
    { subscription: records[1] },
    { subscription: records[2] },
  ]);
  assert.ok(
    mixedDueSoonHtml.includes('class="summary-total-chip"'),
    "mixed due-soon totals should render grouped chip markup",
  );
  assert.ok(
    !mixedDueSoonHtml.includes(" + "),
    "mixed due-soon totals should avoid equation-like plus signs",
  );
  assert.ok(
    mixedDueSoonHtml.includes('aria-label="USD 120.00, TRY 12.00"'),
    "mixed due-soon totals should expose a readable comma-separated label",
  );
  assert.equal(
    renderDueSoonTotal([{ subscription: { ...records[2], currency: "" } }]),
    "TRY 12.00",
    "single due-soon total should stay compact and keep blank currency fallback",
  );
  const mixedRangeHtml = renderRangeSummaryTotal({ TRY: 75, USD: 12.5 });
  assert.ok(
    mixedRangeHtml.includes('class="summary-total-chip"'),
    "mixed range summary totals should render grouped chip markup",
  );
  assert.ok(
    !mixedRangeHtml.includes(" + "),
    "mixed range summary totals should avoid equation-like plus signs",
  );
  assert.ok(
    mixedRangeHtml.includes('aria-label="TRY 75.00, USD 12.50"'),
    "mixed range summary totals should expose a readable comma-separated label",
  );
  assert.equal(
    renderRangeSummaryTotal({ TRY: 75 }),
    "TRY 75.00",
    "single range summary total should stay compact",
  );
  assert.equal(
    renderRangeSummaryTotal({}),
    "TRY 0.00",
    "empty range summary total should keep the current TRY fallback",
  );
})();
`;

vm.runInNewContext(`${appSource}\n${verificationSource}`, sandbox, {
  filename: "verify-grouped-currency-totals.vm.js",
});

console.log("Grouped currency totals verification passed.");
