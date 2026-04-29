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
      id: overrides.id,
      name: overrides.name || "Safe name",
      price: overrides.price ?? 10,
      currency: overrides.currency || "TRY",
      billingDate: overrides.billingDate || "2026-04-15",
      endDate: overrides.endDate || "",
      occurrence: overrides.occurrence || "monthly",
      paymentMethod: overrides.paymentMethod || "Main card",
      category: overrides.category || "",
      notes: overrides.notes || "",
      createdAt: "2026-04-15T10:00:00.000Z",
      updatedAt: "2026-04-15T10:00:00.000Z",
    };
  }

  function assertDoesNotInclude(markup, unsafeValue, label) {
    assert.equal(
      markup.includes(unsafeValue),
      false,
      label + " should not include raw unsafe value.\\nMarkup:\\n" + markup,
    );
  }

  const normalId = "sub-normal-123";
  const normalMarkup = renderSubscriptionCard(subscription({ id: normalId }));

  assert.ok(
    normalMarkup.includes('data-action="edit" data-id="' + normalId + '"'),
    "normal edit action should keep a findable data-id",
  );
  assert.ok(
    normalMarkup.includes('data-action="delete" data-id="' + normalId + '"'),
    "normal delete action should keep a findable data-id",
  );

  const maliciousId = 'sub-1" autofocus onfocus="alert(1)" <script>alert(2)</script>';
  const maliciousFields = {
    name: '<img src=x onerror="alert(3)">',
    paymentMethod: 'Card"><svg onload=alert(4)>',
    category: '<script>alert("category")</script>',
    notes: 'Line one\\n<script>alert("notes")</script>',
    currency: 'TRY"><iframe srcdoc="<script>alert(5)</script>">',
  };
  const maliciousMarkup = renderSubscriptionCard(subscription({
    id: maliciousId,
    ...maliciousFields,
  }));
  const escapedId = escapeHtml(maliciousId);

  assert.ok(
    maliciousMarkup.includes('data-action="edit" data-id="' + escapedId + '"'),
    "malicious edit id should be escaped inside data-id",
  );
  assert.ok(
    maliciousMarkup.includes('data-action="delete" data-id="' + escapedId + '"'),
    "malicious delete id should be escaped inside data-id",
  );
  assertDoesNotInclude(maliciousMarkup, 'data-id="' + maliciousId + '"', "malicious id");

  Object.entries(maliciousFields).forEach(([fieldName, unsafeValue]) => {
    assertDoesNotInclude(maliciousMarkup, unsafeValue, fieldName);
    assert.ok(
      maliciousMarkup.includes(escapeHtml(unsafeValue)),
      fieldName + " should render as escaped text",
    );
  });

  assert.equal(maliciousMarkup.includes("<script>"), false, "script tags should be inert escaped text");
  assert.equal(maliciousMarkup.includes("<img"), false, "image tags should be inert escaped text");
  assert.equal(maliciousMarkup.includes("<svg"), false, "svg tags should be inert escaped text");
  assert.equal(maliciousMarkup.includes('autofocus onfocus="alert(1)"'), false, "attribute injection should not break out of data-id");

  const plainTextRecords = [{
    name: maliciousFields.name,
    price: 10,
    currency: maliciousFields.currency,
    billingDate: "2026-04-15",
    occurrence: "monthly",
    paymentMethod: maliciousFields.paymentMethod,
    category: maliciousFields.category,
    endDate: "",
    notes: maliciousFields.notes,
  }];
  const restored = buildSubscriptionsFromPlainTextBackupRecords(plainTextRecords, "2026-04-15T10:00:00.000Z");
  const restoredMarkup = renderSubscriptionCard(restored[0]);

  Object.entries(maliciousFields).forEach(([fieldName, unsafeValue]) => {
    assertDoesNotInclude(restoredMarkup, unsafeValue, "restored " + fieldName);
    assert.ok(
      restoredMarkup.includes(escapeHtml(unsafeValue)),
      "restored " + fieldName + " should render as escaped text",
    );
  });
})();
`;

vm.runInNewContext(`${appSource}\n${verificationSource}`, sandbox, {
  filename: "verify-import-safety.vm.js",
});

console.log("Import/render safety verification passed.");
