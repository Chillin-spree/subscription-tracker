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

  function subscription(overrides) {
    return {
      id: overrides.id || overrides.name,
      name: overrides.name,
      price: overrides.price,
      currency: overrides.currency || "TRY",
      billingDate: overrides.billingDate,
      endDate: overrides.endDate || "",
      occurrence: overrides.occurrence,
      paymentMethod: overrides.paymentMethod || "Main card",
      category: overrides.category || "",
      notes: "",
    };
  }

  function rowByLabel(rows, label) {
    const row = rows.find((candidate) => candidate.label === label);
    assert.ok(row, "Expected row labeled " + label + "\\nActual labels: " + rows.map(({ label }) => label).join(", "));
    return row;
  }

  function assertAllPercentagesNull(rows, label) {
    rows.forEach((row) => {
      row.currencyBreakdown.forEach((entry) => {
        assert.equal(entry.percentage, null, label + " should not set mixed-currency percentages");
      });
    });
  }

  assert.equal(isValidDateString("2026-02-28"), true, "valid date should pass");
  assert.equal(isValidDateString("2026-02-30"), false, "invalid calendar date should fail");
  assert.equal(isValidDateString("2026-2-03"), false, "non-storage date shape should fail");
  assert.equal(formatDateForStorage(parseLocalDate("2026-04-09")), "2026-04-09");
  assert.equal(parseLocalDate("2026-04-31"), null, "invalid parsed date should be null");

  assert.deepEqual(
    getBillingOccurrencesInRange(
      subscription({ name: "Weekly", price: 10, billingDate: "2026-04-01", occurrence: "weekly" }),
      "2026-04-01",
      "2026-04-22",
    ),
    ["2026-04-01", "2026-04-08", "2026-04-15", "2026-04-22"],
    "weekly range occurrences",
  );

  assert.deepEqual(
    getBillingOccurrencesInRange(
      subscription({ name: "Monthly", price: 10, billingDate: "2026-01-31", occurrence: "monthly" }),
      "2026-01-01",
      "2026-04-30",
    ),
    ["2026-01-31", "2026-02-28", "2026-03-31", "2026-04-30"],
    "monthly range occurrences should clamp shorter months",
  );

  assert.deepEqual(
    getBillingOccurrencesInRange(
      subscription({ name: "Quarterly", price: 10, billingDate: "2026-01-31", occurrence: "quarterly" }),
      "2026-01-01",
      "2026-08-01",
    ),
    ["2026-01-31", "2026-04-30", "2026-07-31"],
    "quarterly range occurrences",
  );

  assert.deepEqual(
    getBillingOccurrencesInRange(
      subscription({ name: "Yearly", price: 10, billingDate: "2025-06-15", occurrence: "yearly" }),
      "2025-01-01",
      "2027-06-15",
    ),
    ["2025-06-15", "2026-06-15", "2027-06-15"],
    "yearly range occurrences",
  );

  assert.deepEqual(
    getBillingOccurrencesInRange(
      subscription({
        name: "Ended exactly",
        price: 10,
        billingDate: "2026-01-15",
        endDate: "2026-03-15",
        occurrence: "monthly",
      }),
      "2026-01-01",
      "2026-04-30",
    ),
    ["2026-01-15", "2026-02-15", "2026-03-15"],
    "occurrence on end date should be included",
  );

  assert.deepEqual(
    getBillingOccurrencesInRange(
      subscription({
        name: "Ended before next",
        price: 10,
        billingDate: "2026-01-15",
        endDate: "2026-03-14",
        occurrence: "monthly",
      }),
      "2026-01-01",
      "2026-04-30",
    ),
    ["2026-01-15", "2026-02-15"],
    "occurrence after end date should be excluded",
  );

  const records = [
    subscription({
      id: "streambox",
      name: "StreamBox",
      price: 10,
      currency: "USD",
      billingDate: "2026-01-01",
      occurrence: "monthly",
      paymentMethod: "Main card",
      category: "Streaming",
    }),
    subscription({
      id: "weekly-news",
      name: "Weekly News",
      price: 5,
      currency: "USD",
      billingDate: "2026-01-08",
      endDate: "2026-01-22",
      occurrence: "weekly",
      paymentMethod: "Main card",
      category: "",
    }),
    subscription({
      id: "euro-hosting",
      name: "Euro Hosting",
      price: 20,
      currency: "EUR",
      billingDate: "2026-01-10",
      occurrence: "quarterly",
      paymentMethod: "Main card",
      category: "Utilities",
    }),
    subscription({
      id: "future-service",
      name: "Future Service",
      price: 7,
      currency: "USD",
      billingDate: "2026-02-01",
      occurrence: "monthly",
      paymentMethod: "Work card",
      category: "Work",
    }),
  ];

  const itemRows = getRangeSpendingBreakdownByItem(records, "2026-01-01", "2026-01-31");
  assert.equal(itemRows.length, 3, "item rows should include only records with occurrences");

  const streamBox = rowByLabel(itemRows, "StreamBox");
  assert.equal(streamBox.occurrenceCount, 1);
  assert.deepEqual(streamBox.occurrenceDates, ["2026-01-01"]);
  assert.deepEqual(streamBox.currencyTotals, { USD: 10 });

  const weeklyNews = rowByLabel(itemRows, "Weekly News");
  assert.equal(weeklyNews.occurrenceCount, 3);
  assert.deepEqual(weeklyNews.occurrenceDates, ["2026-01-08", "2026-01-15", "2026-01-22"]);
  assert.deepEqual(weeklyNews.currencyTotals, { USD: 15 });

  const categoryRows = getRangeSpendingBreakdownByCategory(records, "2026-01-01", "2026-01-31");
  assert.equal(categoryRows.length, 3, "category rows should group actual range charges");
  assert.deepEqual(rowByLabel(categoryRows, "Streaming").currencyTotals, { USD: 10 });
  assert.deepEqual(rowByLabel(categoryRows, "Uncategorized").currencyTotals, { USD: 15 });
  assert.deepEqual(rowByLabel(categoryRows, "Utilities").currencyTotals, { EUR: 20 });

  const paymentRows = getRangeSpendingBreakdownByPaymentMethod(records, "2026-01-01", "2026-01-31");
  const mainCard = rowByLabel(paymentRows, "Main card");
  assert.equal(paymentRows.length, 1, "payment rows should group shared labels");
  assert.equal(mainCard.occurrenceCount, 5);
  assert.equal(mainCard.itemCount, 3);
  assert.equal(mainCard.totalAmount, null, "mixed-currency grouped row should not expose one combined total");
  assert.deepEqual(mainCard.currencyTotals, { USD: 25, EUR: 20 });
  assert.deepEqual(
    mainCard.currencyBreakdown.map(({ currency, totalAmount }) => ({ currency, totalAmount })),
    [{ currency: "USD", totalAmount: 25 }, { currency: "EUR", totalAmount: 20 }],
  );
  assertAllPercentagesNull(paymentRows, "payment breakdown");

  assert.deepEqual(
    getRangeSpendingBreakdownByItem(records, "2026-01-02", "2026-01-07"),
    [],
    "valid empty range should return no item rows",
  );
  assert.deepEqual(
    getRangeSpendingBreakdownByCategory(records, "2026-01-31", "2026-01-01"),
    [],
    "reversed range should return no category rows",
  );
  assert.deepEqual(
    getRangeSpendingBreakdownByPaymentMethod(records, "2026-02-30", "2026-03-31"),
    [],
    "invalid range date should return no payment rows",
  );
})();
`;

vm.runInNewContext(`${appSource}\n${verificationSource}`, sandbox, {
  filename: "verify-range-helpers.vm.js",
});

console.log("Range/date helper verification passed.");
