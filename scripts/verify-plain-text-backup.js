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

  function expectValidBackup(text, label) {
    const result = parsePlainTextBackup(text);
    assert.equal(result.ok, true, label + " should parse");
    assert.deepEqual(result.errors, [], label + " should not report errors");
    return result.records;
  }

  function expectInvalidBackup(text, expectedMessage, label) {
    const result = parsePlainTextBackup(text);
    assert.equal(result.ok, false, label + " should fail validation");
    assert.equal(result.records.length, 0, label + " should not partially return records");
    assert.ok(
      result.errors.some((error) => error.includes(expectedMessage)),
      label + " should include error: " + expectedMessage + "\\nActual: " + result.errors.join("\\n"),
    );
  }

  function expectInvalidRecord(record, expectedMessage, label) {
    const errors = validatePlainTextBackupRecord(record, 0);
    assert.ok(
      errors.some((error) => error.includes(expectedMessage)),
      label + " should include error: " + expectedMessage + "\\nActual: " + errors.join("\\n"),
    );
  }

  const singleRecord = [{
    name: "Netflix",
    price: 12.99,
    currency: "USD",
    billingDate: "2026-04-15",
    occurrence: "monthly",
    paymentMethod: "Main card",
    category: "Streaming",
    endDate: "2026-12-31",
    notes: "Family plan",
  }];

  const singleText = buildPlainTextBackup(singleRecord);
  assert.ok(singleText.startsWith("Subscription Tracker Backup\\nVersion: 1"));
  assert.ok(singleText.includes("End date: 2026-12-31"));
  assert.deepEqual(expectValidBackup(singleText, "single record"), singleRecord);

  const multiRecord = [
    singleRecord[0],
    {
      name: "Spotify",
      price: 5.99,
      currency: "EUR",
      billingDate: "2026-04-02",
      occurrence: "weekly",
      paymentMethod: "Debit card",
      category: "Music",
      endDate: "",
      notes: "",
    },
  ];

  assert.deepEqual(expectValidBackup(buildPlainTextBackup(multiRecord), "multi record"), multiRecord);

  const blankCurrencyRecords = expectValidBackup(
    "Subscription Tracker Backup\\nVersion: 1\\n\\n---\\nBlank currency\\nPrice: 10\\nCurrency:\\nBilling date: 2026-02-28\\nOccurrence: monthly\\nPayment method: Cash\\nCategory:\\nEnd date:\\nNotes:",
    "blank currency",
  );
  assert.equal(blankCurrencyRecords[0].currency, "TRY", "blank currency should fall back to TRY");

  const noteRecord = [{
    name: "Notes check",
    price: 1.25,
    currency: "TRY",
    billingDate: "2026-05-01",
    occurrence: "yearly",
    paymentMethod: "Cash",
    category: "Test",
    endDate: "",
    notes: "Line one\\n\\nLine three\\n---\\nColon: comma, quote \\" and Turkish: İğüşöç",
  }];
  const noteText = buildPlainTextBackup(noteRecord);
  assert.ok(noteText.includes("\\\\---"), "literal note delimiter should be escaped");
  const noteRecords = expectValidBackup(noteText, "multiline notes");
  assert.deepEqual(noteRecords, noteRecord);

  expectInvalidBackup(
    "Subscription Tracker Backup\\nVersion: 1\\n\\n---\\nBroken\\nPrice: 10\\nCurrency: USD\\nBilling date: 2026-02-30\\nOccurrence: monthly\\nPayment method: Card\\nCategory:\\nEnd date:\\nNotes:",
    "billing date must be a valid YYYY-MM-DD date",
    "invalid billing date",
  );

  expectInvalidBackup(
    "Subscription Tracker Backup\\nVersion: 1\\n\\n---\\nBroken\\nPrice: 10\\nCurrency: USD\\nBilling date: 2026-02-28\\nOccurrence: monthly\\nPayment method: Card\\nCategory:\\nEnd date: 2026-02-27\\nNotes:",
    "end date cannot be before billing date",
    "reversed end date",
  );

  expectInvalidBackup(
    "Subscription Tracker Backup\\nVersion: 1\\n\\n---\\nBroken\\nPrice: 10\\nCurrency: USD\\nBilling date: 2026-02-28\\nOccurrence: daily\\nPayment method: Card\\nCategory:\\nEnd date:\\nNotes:",
    "occurrence must be weekly, monthly, quarterly, or yearly",
    "invalid occurrence",
  );

  expectInvalidRecord(
    {
      name: "",
      price: 10,
      currency: "USD",
      billingDate: "2026-02-28",
      occurrence: "monthly",
      paymentMethod: "Card",
      category: "",
      endDate: "",
      notes: "",
    },
    "name is required",
    "missing required name",
  );

  expectInvalidBackup(
    "Subscription Tracker Backup\\nVersion: 1\\n\\n---\\nMissing price\\nPrice:\\nCurrency: USD\\nBilling date: 2026-02-28\\nOccurrence: monthly\\nPayment method: Card\\nCategory:\\nEnd date:\\nNotes:",
    "price must be a valid number",
    "missing required price",
  );

  expectInvalidBackup(
    "Subscription Tracker Backup\\nVersion: 1\\n\\n---\\nMissing billing date\\nPrice: 10\\nCurrency: USD\\nBilling date:\\nOccurrence: monthly\\nPayment method: Card\\nCategory:\\nEnd date:\\nNotes:",
    "billing date is required",
    "missing required billing date",
  );

  expectInvalidBackup(
    "Subscription Tracker Backup\\nVersion: 1\\n\\n---\\nMissing payment\\nPrice: 10\\nCurrency: USD\\nBilling date: 2026-02-28\\nOccurrence: monthly\\nPayment method:\\nCategory:\\nEnd date:\\nNotes:",
    "payment method is required",
    "missing required payment method",
  );
})();
`;

vm.runInNewContext(`${appSource}\n${verificationSource}`, sandbox, {
  filename: "verify-plain-text-backup.vm.js",
});

console.log("Plain text backup helper verification passed.");
