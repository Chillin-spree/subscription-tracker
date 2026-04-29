const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const projectRoot = path.resolve(__dirname, "..");
const appSource = fs.readFileSync(path.join(projectRoot, "app.js"), "utf8");

const STORAGE_KEY = "subscription-tracker-v1-subscriptions";
const ACTIVITY_STORAGE_KEY = "subscription-tracker-v1-activity-log";
const PAYMENT_METHOD_PRESETS_STORAGE_KEY = "subscription-tracker-v1-payment-method-presets";
const CATEGORY_PRESETS_STORAGE_KEY = "subscription-tracker-v1-category-presets";

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

function createSandbox(storageValues) {
  const elementCache = new Map();
  const storage = new Map(Object.entries(storageValues));

  const sandbox = {
    Blob,
    FormData: class FormDataStub {},
    URL: {
      createObjectURL() {
        return "blob:stub";
      },
      revokeObjectURL() {},
    },
    console: {
      ...console,
      warn() {},
    },
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
      getItem(key) {
        return storage.has(key) ? storage.get(key) : null;
      },
      removeItem(key) {
        storage.delete(key);
      },
      setItem(key, value) {
        storage.set(key, String(value));
      },
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
  };

  sandbox.globalThis = sandbox;
  return sandbox;
}

function runAppWithStorage(storageValues) {
  const result = vm.runInNewContext(`${appSource}
({
  subscriptions,
  activityLog,
  paymentMethodPresets,
  categoryPresets,
});
`, createSandbox(storageValues), {
    filename: "verify-storage-safety.vm.js",
  });

  return JSON.parse(JSON.stringify(result));
}

function validSubscription(overrides = {}) {
  return {
    id: "sub-valid",
    name: "Netflix",
    price: 12.99,
    currency: "USD",
    billingDate: "2026-04-15",
    endDate: "",
    occurrence: "monthly",
    paymentMethod: "Main card",
    category: "Streaming",
    notes: "Family plan",
    createdAt: "2026-04-15T10:00:00.000Z",
    updatedAt: "2026-04-15T10:00:00.000Z",
    ...overrides,
  };
}

function validActivityEntry(overrides = {}) {
  return {
    id: "activity-valid",
    eventType: "subscription_created",
    subscriptionId: "sub-valid",
    subscriptionSnapshot: {
      name: "Netflix",
      price: 12.99,
      currency: "USD",
      billingDate: "2026-04-15",
      endDate: "",
      occurrence: "monthly",
      paymentMethod: "Main card",
      category: "Streaming",
    },
    createdAt: "2026-04-15T10:00:00.000Z",
    ...overrides,
  };
}

let result = runAppWithStorage({
  [STORAGE_KEY]: "{not valid json",
});
assert.deepEqual(result.subscriptions, [], "invalid JSON subscription storage should load as empty");

result = runAppWithStorage({
  [STORAGE_KEY]: JSON.stringify({ id: "not-an-array" }),
});
assert.deepEqual(result.subscriptions, [], "non-array subscription storage should load as empty");

result = runAppWithStorage({
  [STORAGE_KEY]: JSON.stringify([
    validSubscription(),
    null,
    validSubscription({ id: "", name: "Missing id" }),
    validSubscription({ id: "bad-price", price: "12.99" }),
    validSubscription({ id: "bad-date", billingDate: "2026-02-30" }),
    validSubscription({ id: "bad-end", endDate: "2026-04-01" }),
  ]),
});
assert.deepEqual(
  result.subscriptions,
  [validSubscription()],
  "malformed subscription entries should be ignored while valid entries load",
);

result = runAppWithStorage({
  [ACTIVITY_STORAGE_KEY]: "{not valid json",
});
assert.deepEqual(result.activityLog, [], "invalid JSON activity storage should load as empty");

result = runAppWithStorage({
  [ACTIVITY_STORAGE_KEY]: JSON.stringify({ id: "not-an-array" }),
});
assert.deepEqual(result.activityLog, [], "non-array activity storage should load as empty");

result = runAppWithStorage({
  [ACTIVITY_STORAGE_KEY]: JSON.stringify([
    validActivityEntry(),
    null,
    validActivityEntry({ id: "", eventType: "subscription_created" }),
    validActivityEntry({ id: "bad-event", eventType: "subscription_archived" }),
    validActivityEntry({
      id: "bad-snapshot",
      subscriptionSnapshot: { name: "Missing fields" },
    }),
  ]),
});
assert.deepEqual(
  result.activityLog,
  [validActivityEntry()],
  "malformed activity entries should be ignored while valid entries load",
);

result = runAppWithStorage({
  [PAYMENT_METHOD_PRESETS_STORAGE_KEY]: JSON.stringify([" Main card ", 42, "", "main card", null, "Cash"]),
  [CATEGORY_PRESETS_STORAGE_KEY]: JSON.stringify({ category: "not-an-array" }),
});
assert.deepEqual(
  result.paymentMethodPresets,
  ["Cash", "Main card"],
  "malformed preset values should be ignored and valid labels normalized",
);
assert.deepEqual(result.categoryPresets, [], "non-array preset storage should load as empty");

result = runAppWithStorage({
  [PAYMENT_METHOD_PRESETS_STORAGE_KEY]: "{not valid json",
  [CATEGORY_PRESETS_STORAGE_KEY]: "{not valid json",
});
assert.deepEqual(result.paymentMethodPresets, [], "invalid payment preset JSON should load as empty");
assert.deepEqual(result.categoryPresets, [], "invalid category preset JSON should load as empty");

result = runAppWithStorage({
  [STORAGE_KEY]: JSON.stringify([validSubscription()]),
  [ACTIVITY_STORAGE_KEY]: JSON.stringify([validActivityEntry()]),
  [PAYMENT_METHOD_PRESETS_STORAGE_KEY]: JSON.stringify(["Main card", "Cash"]),
  [CATEGORY_PRESETS_STORAGE_KEY]: JSON.stringify(["Streaming", "Utilities"]),
});
assert.deepEqual(result.subscriptions, [validSubscription()], "valid subscriptions should still load");
assert.deepEqual(result.activityLog, [validActivityEntry()], "valid activity log should still load");
assert.deepEqual(result.paymentMethodPresets, ["Cash", "Main card"], "valid payment presets should still load");
assert.deepEqual(result.categoryPresets, ["Streaming", "Utilities"], "valid category presets should still load");

console.log("Storage safety verification passed.");
