const STORAGE_KEY = "subscription-tracker-v1-subscriptions";
const ACTIVITY_STORAGE_KEY = "subscription-tracker-v1-activity-log";
const PAYMENT_METHOD_PRESETS_STORAGE_KEY = "subscription-tracker-v1-payment-method-presets";
const CATEGORY_PRESETS_STORAGE_KEY = "subscription-tracker-v1-category-presets";
const BACKUP_SCHEMA = "subscription-tracker.backup";
const BACKUP_SCHEMA_VERSION = 2;
const BACKUP_APP_RELEASE = "v1.5";
const OCCURRENCE_LABELS = {
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  yearly: "Yearly",
};
const EVENT_LABELS = {
  subscription_created: "Created",
  subscription_updated: "Updated",
  subscription_deleted: "Deleted",
};

const openButtons = document.querySelectorAll("[data-open-form]");
const closeButtons = document.querySelectorAll("[data-close-form]");
const dialog = document.querySelector("[data-dialog]");
const form = document.querySelector("[data-subscription-form]");
const formTitle = document.querySelector("#form-title");
const formError = document.querySelector("[data-form-error]");
const statusMessage = document.querySelector("[data-status-message]");
const subscriptionList = document.querySelector("[data-subscription-list]");
const emptyState = document.querySelector("[data-empty-state]");
const activeCount = document.querySelector("[data-active-count]");
const upcomingList = document.querySelector("[data-upcoming-list]");
const upcomingEmpty = document.querySelector("[data-upcoming-empty]");
const dueSoonTotal = document.querySelector("[data-due-soon-total]");
const activityList = document.querySelector("[data-activity-list]");
const activityEmpty = document.querySelector("[data-activity-empty]");
const overviewCurrency = document.querySelector("[data-overview-currency]");
const overviewStats = document.querySelector("[data-overview-stats]");
const monthlyTotal = document.querySelector("[data-monthly-total]");
const yearlyTotal = document.querySelector("[data-yearly-total]");
const overviewCount = document.querySelector("[data-overview-count]");
const overviewNote = document.querySelector("[data-overview-note]");
const overviewTabs = document.querySelector("[data-overview-tabs]");
const overviewTabButtons = document.querySelectorAll("[data-overview-tab]");
const spendingBar = document.querySelector("[data-spending-bar]");
const paymentMethodList = document.querySelector("[data-payment-method-list]");
const overviewEmpty = document.querySelector("[data-overview-empty]");
const exportActions = document.querySelector("[data-export-actions]");
const exportEmpty = document.querySelector("[data-export-empty]");
const exportNote = document.querySelector("[data-export-note]");
const exportTextButton = document.querySelector("[data-export-text]");
const exportCsvButton = document.querySelector("[data-export-csv]");
const exportJsonButton = document.querySelector("[data-export-json]");
const backupFileInput = document.querySelector("[data-backup-file]");
const backupPreview = document.querySelector("[data-backup-preview]");
const restoreBackupButton = document.querySelector("[data-restore-backup]");
const paymentMethodSuggestions = document.querySelector("[data-payment-method-suggestions]");
const categorySuggestions = document.querySelector("[data-category-suggestions]");
const paymentPresetInput = document.querySelector("[data-payment-preset-input]");
const categoryPresetInput = document.querySelector("[data-category-preset-input]");
const addPaymentPresetButton = document.querySelector("[data-add-payment-preset]");
const addCategoryPresetButton = document.querySelector("[data-add-category-preset]");
const paymentPresetList = document.querySelector("[data-payment-preset-list]");
const categoryPresetList = document.querySelector("[data-category-preset-list]");
const paymentPresetEmpty = document.querySelector("[data-payment-preset-empty]");
const categoryPresetEmpty = document.querySelector("[data-category-preset-empty]");
const SEGMENT_COLORS = ["#147d64", "#b85d2a", "#263a63", "#7c5c2e", "#5b6f63", "#8b4a62"];

let subscriptions = loadSubscriptions();
let activityLog = loadActivityLog();
let paymentMethodPresets = loadPresetList(PAYMENT_METHOD_PRESETS_STORAGE_KEY);
let categoryPresets = loadPresetList(CATEGORY_PRESETS_STORAGE_KEY);
let editingId = null;
let validatedBackup = null;
let selectedOverviewMode = "items";

renderSubscriptions();
renderActivityLog();
renderPresetSuggestions();
renderPresetManager();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch((error) => {
      console.warn("Service worker registration failed.", error);
    });
  });
}

exportTextButton.addEventListener("click", () => {
  if (!subscriptions.length) {
    setStatus("Add a subscription before exporting.");
    return;
  }

  downloadFile(
    "subscription-tracker-export.txt",
    "text/plain;charset=utf-8",
    buildTextExport(),
  );
  setStatus("Text export downloaded.");
});

exportCsvButton.addEventListener("click", () => {
  if (!subscriptions.length) {
    setStatus("Add a subscription before exporting.");
    return;
  }

  downloadFile(
    "subscription-tracker-export.csv",
    "text/csv;charset=utf-8",
    buildCsvExport(),
  );
  setStatus("CSV export downloaded.");
});

exportJsonButton.addEventListener("click", () => {
  if (!hasBackupData()) {
    setStatus("Add a subscription before downloading a backup.");
    return;
  }

  const exportedAt = new Date().toISOString();

  downloadFile(
    buildJsonBackupFilename(exportedAt),
    "application/json;charset=utf-8",
    JSON.stringify(buildJsonBackup(exportedAt), null, 2),
  );
  setStatus("JSON backup downloaded.");
});

backupFileInput.addEventListener("change", () => {
  previewBackupFile(backupFileInput.files[0]);
});

restoreBackupButton.addEventListener("click", restoreValidatedBackup);

addPaymentPresetButton.addEventListener("click", () => {
  addPreset("paymentMethod", paymentPresetInput.value);
});

addCategoryPresetButton.addEventListener("click", () => {
  addPreset("category", categoryPresetInput.value);
});

[paymentPresetInput, categoryPresetInput].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    if (input === paymentPresetInput) {
      addPreset("paymentMethod", input.value);
    } else {
      addPreset("category", input.value);
    }
  });
});

[paymentPresetList, categoryPresetList].forEach((list) => {
  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-preset]");

    if (!button) {
      return;
    }

    removePreset(button.dataset.presetType, button.dataset.presetValue);
  });
});

overviewTabs.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-overview-tab]");

  if (!tab) {
    return;
  }

  selectedOverviewMode = tab.dataset.overviewTab;
  renderSpendingOverview();
});

openButtons.forEach((button) => {
  button.addEventListener("click", () => openForm());
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeForm);
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeForm();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dialog.hidden) {
    closeForm();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = readForm();
  const validationMessage = validateSubscription(formData);

  if (validationMessage) {
    formError.textContent = validationMessage;
    return;
  }

  const now = new Date().toISOString();

  if (editingId) {
    let updatedSubscription = null;
    subscriptions = subscriptions.map((subscription) => {
      if (subscription.id !== editingId) {
        return subscription;
      }

      updatedSubscription = {
        ...subscription,
        ...formData,
        updatedAt: now,
      };
      return updatedSubscription;
    });
    if (updatedSubscription) {
      addActivityEntry("subscription_updated", updatedSubscription, now);
    }
    setStatus("Subscription updated.");
  } else {
    const newSubscription = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: now,
      updatedAt: now,
    };
    subscriptions = [
      newSubscription,
      ...subscriptions,
    ];
    addActivityEntry("subscription_created", newSubscription, now);
    setStatus("Subscription added.");
  }

  saveSubscriptions();
  saveActivityLog();
  renderSubscriptions();
  renderActivityLog();
  renderPresetSuggestions();
  closeForm();
});

subscriptionList.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");

  if (!action) {
    return;
  }

  const id = action.dataset.id;

  if (action.dataset.action === "edit") {
    const subscription = subscriptions.find((item) => item.id === id);
    if (subscription) {
      openForm(subscription);
    }
  }

  if (action.dataset.action === "delete") {
    deleteSubscription(id);
  }
});

function loadSubscriptions() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.warn("Could not read saved subscriptions.", error);
    return [];
  }
}

function loadActivityLog() {
  try {
    const storedValue = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.warn("Could not read saved activity log.", error);
    return [];
  }
}

function saveSubscriptions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
}

function saveActivityLog() {
  localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(activityLog));
}

function loadPresetList(storageKey) {
  try {
    const storedValue = localStorage.getItem(storageKey);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    return normalizePresetList(Array.isArray(parsedValue) ? parsedValue : []);
  } catch (error) {
    console.warn("Could not read saved preset values.", error);
    return [];
  }
}

function savePresetList(storageKey, presets) {
  const normalizedPresets = normalizePresetList(presets);

  try {
    localStorage.setItem(storageKey, JSON.stringify(normalizedPresets));
  } catch (error) {
    console.warn("Could not save preset values.", error);
  }

  return normalizedPresets;
}

function normalizePresetList(values) {
  const readableValues = Array.isArray(values) ? values : [];
  const labelsByKey = new Map();

  readableValues.forEach((value) => {
    if (typeof value !== "string") {
      return;
    }

    const label = normalize(value);
    const key = label.toLocaleLowerCase();

    if (label && !labelsByKey.has(key)) {
      labelsByKey.set(key, label);
    }
  });

  return [...labelsByKey.values()].sort(comparePresetLabels);
}

function comparePresetLabels(a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function getPaymentMethodSuggestions() {
  return combinePresetSuggestions(
    paymentMethodPresets,
    subscriptions.map((subscription) => subscription.paymentMethod),
  );
}

function getCategorySuggestions() {
  return combinePresetSuggestions(
    categoryPresets,
    subscriptions.map((subscription) => subscription.category),
  );
}

function combinePresetSuggestions(savedPresets, recordValues) {
  return normalizePresetList([
    ...normalizePresetList(savedPresets),
    ...normalizePresetList(recordValues),
  ]);
}

function renderPresetSuggestions() {
  renderDatalistOptions(paymentMethodSuggestions, getPaymentMethodSuggestions());
  renderDatalistOptions(categorySuggestions, getCategorySuggestions());
}

function renderPresetManager() {
  renderPresetList(paymentPresetList, paymentPresetEmpty, paymentMethodPresets, "paymentMethod");
  renderPresetList(categoryPresetList, categoryPresetEmpty, categoryPresets, "category");
}

function renderPresetList(list, emptyState, presets, presetType) {
  if (!list || !emptyState) {
    return;
  }

  const hasPresets = presets.length > 0;
  emptyState.hidden = hasPresets;
  list.innerHTML = presets.map((preset) => renderPresetItem(preset, presetType)).join("");
}

function renderPresetItem(preset, presetType) {
  return `
    <li class="preset-item">
      <span>${escapeHtml(preset)}</span>
      <button
        class="preset-remove"
        type="button"
        data-remove-preset
        data-preset-type="${escapeHtml(presetType)}"
        data-preset-value="${escapeHtml(preset)}"
      >
        Remove
      </button>
    </li>
  `;
}

function addPreset(presetType, value) {
  const label = normalize(value);

  if (!label) {
    setStatus("Enter a preset label before saving.");
    return;
  }

  const currentPresets = getSavedPresetList(presetType);
  const nextPresets = normalizePresetList([
    ...currentPresets,
    label,
  ]);

  if (nextPresets.length === currentPresets.length) {
    setStatus("That preset is already saved.");
    clearPresetInput(presetType);
    return;
  }

  setSavedPresetList(presetType, nextPresets);
  clearPresetInput(presetType);
  renderPresetSuggestions();
  renderPresetManager();
  setStatus("Preset saved.");
}

function removePreset(presetType, value) {
  const currentPresets = getSavedPresetList(presetType);
  const valueKey = normalize(value).toLocaleLowerCase();
  const nextPresets = normalizePresetList(
    currentPresets.filter((preset) => preset.toLocaleLowerCase() !== valueKey),
  );

  setSavedPresetList(presetType, nextPresets);
  renderPresetSuggestions();
  renderPresetManager();
  setStatus("Preset removed. Existing records were not changed.");
}

function getSavedPresetList(presetType) {
  return presetType === "paymentMethod" ? paymentMethodPresets : categoryPresets;
}

function setSavedPresetList(presetType, presets) {
  if (presetType === "paymentMethod") {
    paymentMethodPresets = savePresetList(PAYMENT_METHOD_PRESETS_STORAGE_KEY, presets);
  } else {
    categoryPresets = savePresetList(CATEGORY_PRESETS_STORAGE_KEY, presets);
  }
}

function clearPresetInput(presetType) {
  if (presetType === "paymentMethod") {
    paymentPresetInput.value = "";
  } else {
    categoryPresetInput.value = "";
  }
}

function renderDatalistOptions(datalist, suggestions) {
  if (!datalist) {
    return;
  }

  datalist.innerHTML = suggestions.map((suggestion) => (
    `<option value="${escapeHtml(suggestion)}"></option>`
  )).join("");
}

function readForm() {
  const data = new FormData(form);

  return {
    name: normalize(data.get("name")),
    price: parseLocalizedPrice(data.get("price")),
    currency: normalize(data.get("currency")) || "TRY",
    billingDate: normalize(data.get("billingDate")),
    occurrence: normalize(data.get("occurrence")),
    paymentMethod: normalize(data.get("paymentMethod")),
    category: normalize(data.get("category")),
    notes: normalize(data.get("notes")),
  };
}

function validateSubscription(subscription) {
  if (!subscription.name) {
    return "Name is required.";
  }

  if (!Number.isFinite(subscription.price) || subscription.price < 0) {
    return "Price is required.";
  }

  if (!subscription.billingDate) {
    return "Billing date is required.";
  }

  if (!OCCURRENCE_LABELS[subscription.occurrence]) {
    return "Choose a billing cycle.";
  }

  if (!subscription.paymentMethod) {
    return "Enter a payment label.";
  }

  return "";
}

function openForm(subscription = null) {
  editingId = subscription?.id || null;
  form.reset();
  formError.textContent = "";
  formTitle.textContent = editingId ? "Edit subscription" : "Add subscription";

  form.elements.currency.value = "TRY";

  if (subscription) {
    form.elements.id.value = subscription.id;
    form.elements.name.value = subscription.name;
    form.elements.price.value = subscription.price;
    form.elements.currency.value = subscription.currency || "TRY";
    form.elements.billingDate.value = subscription.billingDate;
    form.elements.occurrence.value = subscription.occurrence;
    form.elements.paymentMethod.value = subscription.paymentMethod;
    form.elements.category.value = subscription.category || "";
    form.elements.notes.value = subscription.notes || "";
  }

  dialog.hidden = false;
  form.elements.name.focus();
}

function closeForm() {
  dialog.hidden = true;
  editingId = null;
  form.reset();
  formError.textContent = "";
}

function deleteSubscription(id) {
  const subscription = subscriptions.find((item) => item.id === id);

  if (!subscription) {
    return;
  }

  const confirmed = window.confirm(`Delete ${subscription.name}?`);

  if (!confirmed) {
    return;
  }

  addActivityEntry("subscription_deleted", subscription, new Date().toISOString());
  subscriptions = subscriptions.filter((item) => item.id !== id);
  saveSubscriptions();
  saveActivityLog();
  renderSubscriptions();
  renderActivityLog();
  renderPresetSuggestions();
  setStatus("Subscription deleted.");
}

function renderSubscriptions() {
  activeCount.textContent = String(subscriptions.length);
  emptyState.hidden = subscriptions.length > 0;
  subscriptionList.innerHTML = subscriptions.map(renderSubscriptionCard).join("");
  renderUpcomingPayments();
  renderSpendingOverview();
  renderExportControls();
}

function renderExportControls() {
  const hasSubscriptions = subscriptions.length > 0;
  const hasExportData = hasBackupData();
  exportEmpty.hidden = hasExportData;
  exportActions.hidden = !hasExportData;
  exportNote.hidden = !hasExportData;
  exportTextButton.hidden = !hasSubscriptions;
  exportCsvButton.hidden = !hasSubscriptions;
  exportJsonButton.hidden = !hasExportData;
}

function renderSpendingOverview() {
  const hasSubscriptions = subscriptions.length > 0;
  const currencies = [...new Set(subscriptions.map((subscription) => subscription.currency || "TRY"))];
  const hasSingleCurrency = currencies.length === 1;
  const totalMonthly = subscriptions.reduce(
    (total, subscription) => total + getMonthlyEquivalent(subscription),
    0,
  );
  const breakdownRows = getOverviewBreakdownRows(selectedOverviewMode);

  overviewEmpty.hidden = hasSubscriptions;
  overviewStats.hidden = !hasSubscriptions;
  overviewTabs.hidden = !hasSubscriptions;
  spendingBar.hidden = !hasSubscriptions || !hasSingleCurrency;
  overviewCurrency.textContent = hasSingleCurrency ? currencies[0] || "TRY" : "Multiple currencies";
  monthlyTotal.textContent = hasSingleCurrency
    ? `${currencies[0] || "TRY"} ${totalMonthly.toFixed(2)}`
    : "Multiple currencies";
  yearlyTotal.textContent = hasSingleCurrency
    ? `${currencies[0] || "TRY"} ${(totalMonthly * 12).toFixed(2)}`
    : "Multiple currencies";
  overviewCount.textContent = String(subscriptions.length);
  overviewNote.hidden = hasSingleCurrency || !hasSubscriptions;
  overviewNote.textContent = "Multiple currencies are shown separately instead of combined into one total.";
  renderOverviewTabs();
  spendingBar.setAttribute("aria-label", getOverviewBreakdownLabel());
  spendingBar.innerHTML = hasSingleCurrency ? breakdownRows.map(renderSpendingSegment).join("") : "";
  paymentMethodList.innerHTML = breakdownRows.map(renderOverviewBreakdownRow).join("");
}

function renderUpcomingPayments() {
  const today = startOfLocalDay(new Date());
  const horizon = addDays(today, 7);
  const upcomingPayments = subscriptions
    .map((subscription) => ({
      subscription,
      nextPaymentDate: getNextPaymentDate(subscription.billingDate, subscription.occurrence, today),
    }))
    .filter(({ nextPaymentDate }) => nextPaymentDate && nextPaymentDate <= horizon)
    .sort((a, b) => a.nextPaymentDate - b.nextPaymentDate);

  upcomingEmpty.hidden = upcomingPayments.length > 0;
  upcomingList.innerHTML = upcomingPayments.map(renderUpcomingPayment).join("");
  dueSoonTotal.textContent = formatTotal(upcomingPayments);
}

function renderUpcomingPayment({ subscription, nextPaymentDate }) {
  return `
    <article class="upcoming-card">
      <div class="upcoming-main">
        <div class="upcoming-title">
          <h3>${escapeHtml(subscription.name)}</h3>
          <span class="upcoming-price">${escapeHtml(formatPrice(subscription))}</span>
        </div>
        <p class="upcoming-detail">${escapeHtml(subscription.paymentMethod)}</p>
        <p class="upcoming-detail">${formatDateFromDate(nextPaymentDate)}</p>
      </div>
      <span class="upcoming-status">${getRelativeStatus(nextPaymentDate)}</span>
    </article>
  `;
}

function getPaymentMethodGroups(overviewItems, totalMonthly) {
  const groupsByMethod = overviewItems.reduce((groups, item) => {
    const method = item.subscription.paymentMethod || "Unlabeled payment label";
    groups[method] ||= {
      label: method,
      monthlyEquivalent: 0,
      currencyTotals: {},
    };
    groups[method].monthlyEquivalent += item.monthlyEquivalent;

    const currency = item.subscription.currency || "TRY";
    groups[method].currencyTotals[currency] =
      (groups[method].currencyTotals[currency] || 0) + item.monthlyEquivalent;

    return groups;
  }, {});

  return Object.values(groupsByMethod)
    .map((group, index) => ({
      ...group,
      color: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
      percentage: totalMonthly > 0 ? (group.monthlyEquivalent / totalMonthly) * 100 : 0,
    }))
    .sort((a, b) => b.monthlyEquivalent - a.monthlyEquivalent);
}

function getOverviewBreakdownRows(mode) {
  if (mode === "categories") {
    return getSpendingBreakdownByCategory(subscriptions).map(addBreakdownColor);
  }

  if (mode === "payment") {
    return getSpendingBreakdownByPaymentMethod(subscriptions).map(addBreakdownColor);
  }

  return getSpendingBreakdownByItem(subscriptions).map(addBreakdownColor);
}

function addBreakdownColor(row, index) {
  return {
    ...row,
    color: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
  };
}

function renderOverviewTabs() {
  overviewTabButtons.forEach((button) => {
    const isSelected = button.dataset.overviewTab === selectedOverviewMode;

    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function getOverviewBreakdownLabel() {
  if (selectedOverviewMode === "categories") {
    return "Spending by category";
  }

  return selectedOverviewMode === "payment"
    ? "Spending by payment label"
    : "Spending by item";
}

function renderSpendingSegment(group) {
  const percentage = getBreakdownPercentage(group);

  return `
    <span
      class="spending-segment"
      style="--segment-color: ${group.color}; width: ${Math.max(percentage, 2).toFixed(2)}%;"
      title="${escapeHtml(group.label)} ${percentage.toFixed(0)}%"
    ></span>
  `;
}

function renderOverviewBreakdownRow(group) {
  const secondaryLabel = getOverviewRowSecondaryLabel(group);
  const percentage = getBreakdownPercentage(group);
  const percentText = Number.isFinite(percentage) ? `${percentage.toFixed(0)}%` : "";

  return `
    <div class="payment-method-row">
      <span class="payment-method-dot" style="--segment-color: ${group.color};"></span>
      <div class="payment-method-main">
        <strong>${escapeHtml(group.label)}</strong>
        <span>${escapeHtml(secondaryLabel)}</span>
        <span>${escapeHtml(formatCurrencyBreakdown(group.currencyTotals))} / month</span>
      </div>
      <span class="payment-method-percent">${percentText}</span>
    </div>
  `;
}

function getOverviewRowSecondaryLabel(group) {
  if (selectedOverviewMode === "categories") {
    return `${group.itemCount} ${group.itemCount === 1 ? "item" : "items"}`;
  }

  if (selectedOverviewMode === "payment") {
    return `${group.itemCount} ${group.itemCount === 1 ? "item" : "items"}`;
  }

  return group.secondaryLabel || "Subscription";
}

function getBreakdownPercentage(group) {
  const [currencyEntry] = group.currencyBreakdown || [];

  return currencyEntry?.percentage ?? Number.NaN;
}

function getSpendingBreakdownByItem(subscriptionRecords) {
  const rows = normalizeSpendingItems(subscriptionRecords)
    .map((item) => ({
      type: "item",
      id: item.subscription.id || "",
      label: item.subscription.name || "Unnamed subscription",
      secondaryLabel: getItemBreakdownSecondaryLabel(item.subscription),
      subscription: item.subscription,
      paymentMethod: item.subscription.paymentMethod || "",
      category: item.subscription.category || "",
      occurrence: item.subscription.occurrence || "",
      currency: item.currency,
      monthlyEquivalent: item.monthlyEquivalent,
      currencyTotals: {
        [item.currency]: item.monthlyEquivalent,
      },
      currencyBreakdown: [
        {
          currency: item.currency,
          monthlyEquivalent: item.monthlyEquivalent,
          percentage: null,
        },
      ],
      itemCount: 1,
      sortAmount: item.monthlyEquivalent,
    }))
    .sort(sortBreakdownRows);

  return applySingleCurrencyPercentages(rows);
}

function getSpendingBreakdownByCategory(subscriptionRecords) {
  return applySingleCurrencyPercentages(getGroupedSpendingBreakdown(
    subscriptionRecords,
    (subscription) => normalize(subscription.category) || "Uncategorized",
    "category",
  ));
}

function getSpendingBreakdownByPaymentMethod(subscriptionRecords) {
  return applySingleCurrencyPercentages(getGroupedSpendingBreakdown(
    subscriptionRecords,
    (subscription) => subscription.paymentMethod || "Unlabeled payment label",
    "paymentMethod",
  ));
}

function getGroupedSpendingBreakdown(subscriptionRecords, getLabel, type) {
  const groups = normalizeSpendingItems(subscriptionRecords).reduce((result, item) => {
    const label = getLabel(item.subscription);

    result[label] ||= {
      type,
      id: label,
      label,
      itemCount: 0,
      subscriptions: [],
      currencyTotals: {},
    };

    result[label].itemCount += 1;
    result[label].subscriptions.push(item.subscription);
    result[label].currencyTotals[item.currency] =
      (result[label].currencyTotals[item.currency] || 0) + item.monthlyEquivalent;

    return result;
  }, {});

  return Object.values(groups)
    .map((group) => {
      const currencyBreakdown = buildCurrencyBreakdown(group.currencyTotals);

      return {
        ...group,
        currencyBreakdown,
        sortAmount: getBreakdownSortAmount(currencyBreakdown),
      };
    })
    .sort(sortBreakdownRows);
}

function normalizeSpendingItems(subscriptionRecords) {
  if (!Array.isArray(subscriptionRecords)) {
    return [];
  }

  return subscriptionRecords.map((subscription) => {
    const normalizedSubscription = { ...subscription };

    return {
      subscription: normalizedSubscription,
      currency: normalizedSubscription.currency || "TRY",
      monthlyEquivalent: getMonthlyEquivalent(normalizedSubscription),
    };
  });
}

function buildCurrencyBreakdown(currencyTotals) {
  return Object.entries(currencyTotals)
    .map(([currency, monthlyEquivalent]) => ({
      currency,
      monthlyEquivalent,
      percentage: null,
    }))
    .sort((a, b) => b.monthlyEquivalent - a.monthlyEquivalent);
}

function applySingleCurrencyPercentages(breakdownRows) {
  const currencies = new Set();

  breakdownRows.forEach((row) => {
    row.currencyBreakdown.forEach(({ currency }) => currencies.add(currency));
  });

  if (currencies.size !== 1) {
    return breakdownRows;
  }

  const [currency] = currencies;
  const denominator = breakdownRows.reduce(
    (total, row) => total + (row.currencyTotals[currency] || 0),
    0,
  );

  return breakdownRows.map((row) => ({
    ...row,
    currencyBreakdown: row.currencyBreakdown.map((entry) => ({
      ...entry,
      percentage: denominator > 0 ? (entry.monthlyEquivalent / denominator) * 100 : 0,
    })),
  }));
}

function getItemBreakdownSecondaryLabel(subscription) {
  return [
    subscription.paymentMethod,
    OCCURRENCE_LABELS[subscription.occurrence] || subscription.occurrence,
    subscription.category,
  ].filter(Boolean).join(" · ");
}

function getBreakdownSortAmount(currencyBreakdown) {
  return currencyBreakdown.reduce(
    (highestAmount, entry) => Math.max(highestAmount, entry.monthlyEquivalent),
    0,
  );
}

function sortBreakdownRows(a, b) {
  return b.sortAmount - a.sortAmount || a.label.localeCompare(b.label);
}

function buildTextExport() {
  const totals = getOverviewTotals();
  const lines = [
    "Subscription Tracker",
    `Export date: ${new Date().toLocaleString()}`,
    "",
    "Totals",
    `Active subscriptions: ${subscriptions.length}`,
    `Monthly equivalent: ${totals.hasSingleCurrency ? `${totals.currency} ${totals.totalMonthly.toFixed(2)}` : "Multiple currencies"}`,
    `Yearly equivalent: ${totals.hasSingleCurrency ? `${totals.currency} ${totals.totalYearly.toFixed(2)}` : "Multiple currencies"}`,
    "",
    "Subscriptions",
  ];

  subscriptions.forEach((subscription, index) => {
    lines.push(
      "",
      `${index + 1}. ${subscription.name}`,
      `Price: ${formatPrice(subscription)}`,
      `Billing date: ${subscription.billingDate}`,
      `Billing cycle: ${OCCURRENCE_LABELS[subscription.occurrence] || subscription.occurrence}`,
      `Payment label: ${subscription.paymentMethod}`,
      `Category: ${subscription.category || ""}`,
      `Notes: ${subscription.notes || ""}`,
    );
  });

  return lines.join("\n");
}

function buildCsvExport() {
  const headers = [
    "name",
    "price",
    "currency",
    "billingDate",
    "occurrence",
    "paymentMethod",
    "category",
    "notes",
  ];
  const rows = subscriptions.map((subscription) => headers.map((key) => csvEscape(subscription[key] ?? "")));

  return [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\r\n");
}

function buildJsonBackup(exportedAt) {
  return {
    schema: BACKUP_SCHEMA,
    schemaVersion: BACKUP_SCHEMA_VERSION,
    app: {
      name: "Subscription Tracker",
      release: BACKUP_APP_RELEASE,
    },
    exportedAt,
    data: {
      subscriptions,
      activityLog,
      paymentMethodPresets: normalizePresetList(paymentMethodPresets),
      categoryPresets: normalizePresetList(categoryPresets),
    },
  };
}

function buildJsonBackupFilename(exportedAt) {
  const date = exportedAt.slice(0, 10);
  return `subscription-tracker-backup-v1.5-${date}.json`;
}

function hasBackupData() {
  return subscriptions.length > 0
    || activityLog.length > 0
    || paymentMethodPresets.length > 0
    || categoryPresets.length > 0;
}

async function previewBackupFile(file) {
  clearValidatedBackup();

  if (!file) {
    clearBackupPreview();
    return;
  }

  try {
    let parsedBackup;

    try {
      parsedBackup = JSON.parse(await file.text());
    } catch (error) {
      throw new Error("Selected file must be valid JSON.");
    }

    const backup = validateBackupData(parsedBackup);
    validatedBackup = backup;
    renderBackupPreview(backup);
  } catch (error) {
    renderBackupPreviewError(error.message || "This backup file could not be checked.");
  }
}

function restoreValidatedBackup() {
  if (!validatedBackup) {
    setStatus("Preview a valid backup before restoring.");
    return;
  }

  const subscriptionCount = validatedBackup.data.subscriptions.length;
  const activityCount = validatedBackup.data.activityLog.length;
  const includesPresets = backupIncludesPresets(validatedBackup);
  const paymentPresetCount = includesPresets ? validatedBackup.data.paymentMethodPresets.length : 0;
  const categoryPresetCount = includesPresets ? validatedBackup.data.categoryPresets.length : 0;
  const presetReplacementText = includesPresets
    ? `, ${paymentPresetCount} payment label presets, and ${categoryPresetCount} category presets.`
    : ". Current saved presets will be kept because this is a schema version 1 backup.";
  const confirmed = window.confirm(
    `Replace local data with this backup?\n\nThis will replace ${subscriptions.length} current subscriptions and ${activityLog.length} activity entries with ${subscriptionCount} backup subscriptions and ${activityCount} backup activity entries${presetReplacementText}`,
  );

  if (!confirmed) {
    setStatus("Restore canceled. No local data was changed.");
    return;
  }

  const nextSubscriptions = validatedBackup.data.subscriptions;
  const nextActivityLog = validatedBackup.data.activityLog;
  const nextPaymentMethodPresets = validatedBackup.data.paymentMethodPresets;
  const nextCategoryPresets = validatedBackup.data.categoryPresets;
  const previousSubscriptionsValue = localStorage.getItem(STORAGE_KEY);
  const previousActivityLogValue = localStorage.getItem(ACTIVITY_STORAGE_KEY);
  const previousPaymentMethodPresetsValue = localStorage.getItem(PAYMENT_METHOD_PRESETS_STORAGE_KEY);
  const previousCategoryPresetsValue = localStorage.getItem(CATEGORY_PRESETS_STORAGE_KEY);

  try {
    const nextSubscriptionsValue = JSON.stringify(nextSubscriptions);
    const nextActivityLogValue = JSON.stringify(nextActivityLog);

    localStorage.setItem(STORAGE_KEY, nextSubscriptionsValue);
    localStorage.setItem(ACTIVITY_STORAGE_KEY, nextActivityLogValue);

    if (includesPresets) {
      localStorage.setItem(PAYMENT_METHOD_PRESETS_STORAGE_KEY, JSON.stringify(nextPaymentMethodPresets));
      localStorage.setItem(CATEGORY_PRESETS_STORAGE_KEY, JSON.stringify(nextCategoryPresets));
    }

    subscriptions = nextSubscriptions;
    activityLog = nextActivityLog;

    if (includesPresets) {
      paymentMethodPresets = nextPaymentMethodPresets;
      categoryPresets = nextCategoryPresets;
    }

    renderSubscriptions();
    renderActivityLog();
    renderPresetSuggestions();
    renderPresetManager();
    resetBackupRestorePreview();
    setStatus(`Backup restored: ${subscriptionCount} subscriptions and ${activityCount} activity entries${includesPresets ? ", plus saved presets" : ""}.`);
  } catch (error) {
    try {
      restoreStorageSnapshot(
        previousSubscriptionsValue,
        previousActivityLogValue,
        previousPaymentMethodPresetsValue,
        previousCategoryPresetsValue,
      );
      setStatus("Restore failed. Existing local data was kept.");
    } catch (rollbackError) {
      setStatus("Restore failed. Please reload before making more changes.");
      console.warn("Could not roll back failed restore.", rollbackError);
    }
    console.warn("Could not restore backup.", error);
  }
}

function validateBackupData(backup) {
  if (!isPlainObject(backup)) {
    throw new Error("Backup must be a JSON object.");
  }

  if (backup.schema !== BACKUP_SCHEMA) {
    throw new Error("This file is not a Subscription Tracker backup.");
  }

  if (![1, 2].includes(backup.schemaVersion)) {
    throw new Error("This backup version is not supported. Supported versions are 1 and 2.");
  }

  if (!isValidTimestamp(backup.exportedAt)) {
    throw new Error("Backup export date is missing or invalid.");
  }

  if (!isPlainObject(backup.data)) {
    throw new Error("Backup data is missing.");
  }

  if (!Array.isArray(backup.data.subscriptions)) {
    throw new Error("Backup subscriptions must be an array.");
  }

  if (!Array.isArray(backup.data.activityLog)) {
    throw new Error("Backup activity log must be an array.");
  }

  backup.data.subscriptions.forEach(validateBackupSubscription);
  backup.data.activityLog.forEach(validateBackupActivityEntry);

  if (backup.schemaVersion === 1) {
    return {
      ...backup,
      data: {
        ...backup.data,
        paymentMethodPresets: [],
        categoryPresets: [],
      },
    };
  }

  return {
    ...backup,
    data: {
      ...backup.data,
      paymentMethodPresets: normalizePresetList(backup.data.paymentMethodPresets),
      categoryPresets: normalizePresetList(backup.data.categoryPresets),
    },
  };
}

function backupIncludesPresets(backup) {
  return backup.schemaVersion === 2;
}

function describeBackupPresetBehavior(backup) {
  if (!backupIncludesPresets(backup)) {
    return "Saved presets: not included; current saved presets will be kept if restored.";
  }

  return `Saved presets: ${backup.data.paymentMethodPresets.length} payment labels and ${backup.data.categoryPresets.length} categories; these will replace current saved presets if restored.`;
}

function describeBackupRestoreScope(backup) {
  return backupIncludesPresets(backup)
    ? "Restoring will replace local subscriptions, activity log, and saved presets after confirmation."
    : "Restoring will replace local subscriptions and activity log after confirmation; saved presets are not changed.";
}

function validateBackupSubscription(subscription, index) {
  const label = `Subscription ${index + 1}`;

  if (!isPlainObject(subscription)) {
    throw new Error(`${label} must be an object.`);
  }

  requireNonEmptyString(subscription.id, `${label} id`);
  requireNonEmptyString(subscription.name, `${label} name`);

  if (!Number.isFinite(subscription.price) || subscription.price < 0) {
    throw new Error(`${label} price must be a valid number.`);
  }

  requireValidDateString(subscription.billingDate, `${label} billing date`);
  requireValidOccurrence(subscription.occurrence, `${label} billing cycle`);
  requireNonEmptyString(subscription.paymentMethod, `${label} payment label`);
  requireValidTimestamp(subscription.createdAt, `${label} created date`);
  requireValidTimestamp(subscription.updatedAt, `${label} updated date`);
  requireOptionalString(subscription.currency, `${label} currency`);
  requireOptionalString(subscription.category, `${label} category`);
  requireOptionalString(subscription.notes, `${label} notes`);
}

function validateBackupActivityEntry(entry, index) {
  const label = `Activity entry ${index + 1}`;

  if (!isPlainObject(entry)) {
    throw new Error(`${label} must be an object.`);
  }

  requireNonEmptyString(entry.id, `${label} id`);

  if (!EVENT_LABELS[entry.eventType]) {
    throw new Error(`${label} event type is not supported.`);
  }

  requireNonEmptyString(entry.subscriptionId, `${label} subscription id`);
  requireValidTimestamp(entry.createdAt, `${label} date`);
  validateBackupActivitySnapshot(entry.subscriptionSnapshot, `${label} snapshot`);
}

function validateBackupActivitySnapshot(snapshot, label) {
  if (!isPlainObject(snapshot)) {
    throw new Error(`${label} must be an object.`);
  }

  requireNonEmptyString(snapshot.name, `${label} name`);

  if (!Number.isFinite(snapshot.price) || snapshot.price < 0) {
    throw new Error(`${label} price must be a valid number.`);
  }

  requireValidDateString(snapshot.billingDate, `${label} billing date`);
  requireValidOccurrence(snapshot.occurrence, `${label} billing cycle`);
  requireNonEmptyString(snapshot.paymentMethod, `${label} payment label`);
  requireOptionalString(snapshot.currency, `${label} currency`);
  requireOptionalString(snapshot.category, `${label} category`);
}

function renderBackupPreview(backup) {
  backupPreview.hidden = false;
  backupPreview.classList.remove("is-error");
  restoreBackupButton.hidden = false;
  backupPreview.innerHTML = `
    <strong>Backup preview</strong>
    <span>Exported: ${escapeHtml(formatTimestamp(backup.exportedAt))}</span>
    <span>Schema version: ${backup.schemaVersion}</span>
    <span>Subscriptions: ${backup.data.subscriptions.length}</span>
    <span>Activity entries: ${backup.data.activityLog.length}</span>
    <span>${escapeHtml(describeBackupPresetBehavior(backup))}</span>
    <span>${escapeHtml(describeBackupRestoreScope(backup))}</span>
    <em>No data has been restored yet.</em>
  `;
}

function renderBackupPreviewError(message) {
  clearValidatedBackup();
  backupPreview.hidden = false;
  backupPreview.classList.add("is-error");
  backupPreview.innerHTML = `
    <strong>Backup could not be previewed</strong>
    <span>${escapeHtml(message)}</span>
    <em>No data has been restored.</em>
  `;
}

function clearBackupPreview() {
  backupPreview.hidden = true;
  backupPreview.classList.remove("is-error");
  backupPreview.textContent = "";
}

function clearValidatedBackup() {
  validatedBackup = null;
  restoreBackupButton.hidden = true;
}

function resetBackupRestorePreview() {
  backupFileInput.value = "";
  clearValidatedBackup();
  clearBackupPreview();
}

function restoreStorageSnapshot(
  subscriptionsValue,
  activityLogValue,
  paymentMethodPresetsValue,
  categoryPresetsValue,
) {
  restoreStorageValue(STORAGE_KEY, subscriptionsValue);
  restoreStorageValue(ACTIVITY_STORAGE_KEY, activityLogValue);
  restoreStorageValue(PAYMENT_METHOD_PRESETS_STORAGE_KEY, paymentMethodPresetsValue);
  restoreStorageValue(CATEGORY_PRESETS_STORAGE_KEY, categoryPresetsValue);
}

function restoreStorageValue(storageKey, value) {
  if (value === undefined) {
    return;
  }

  if (value === null) {
    localStorage.removeItem(storageKey);
  } else {
    localStorage.setItem(storageKey, value);
  }
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requireNonEmptyString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function requireOptionalString(value, label) {
  if (value !== undefined && typeof value !== "string") {
    throw new Error(`${label} must be a string.`);
  }
}

function requireValidDateString(value, label) {
  if (!isValidDateString(value)) {
    throw new Error(`${label} must be a valid YYYY-MM-DD date.`);
  }
}

function requireValidOccurrence(value, label) {
  if (!OCCURRENCE_LABELS[value]) {
    throw new Error(`${label} is not supported.`);
  }
}

function requireValidTimestamp(value, label) {
  if (!isValidTimestamp(value)) {
    throw new Error(`${label} must be a valid date.`);
  }
}

function isValidDateString(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day;
}

function isValidTimestamp(value) {
  return typeof value === "string" && !Number.isNaN(new Date(value).getTime());
}

function renderActivityLog() {
  activityEmpty.hidden = activityLog.length > 0;
  activityList.innerHTML = activityLog.map(renderActivityEntry).join("");
}

function renderActivityEntry(entry) {
  const snapshot = entry.subscriptionSnapshot;
  const category = snapshot.category ? ` · ${escapeHtml(snapshot.category)}` : "";

  return `
    <article class="activity-card">
      <div class="activity-title">
        <h3>${escapeHtml(snapshot.name)}</h3>
        <span class="activity-event">${escapeHtml(EVENT_LABELS[entry.eventType] || "Changed")}</span>
      </div>
      <div class="activity-main">
        <p class="activity-detail">
          ${escapeHtml(formatSnapshotPrice(snapshot))} · ${escapeHtml(OCCURRENCE_LABELS[snapshot.occurrence] || snapshot.occurrence)} · ${escapeHtml(snapshot.paymentMethod)}
        </p>
        <p class="activity-detail">
          Billing ${formatDate(snapshot.billingDate)}${category}
        </p>
        <p class="activity-date">${formatTimestamp(entry.createdAt)}</p>
      </div>
    </article>
  `;
}

function renderSubscriptionCard(subscription) {
  const category = subscription.category
    ? `<span class="tag">${escapeHtml(subscription.category)}</span>`
    : "";
  const notes = subscription.notes
    ? `<p class="subscription-notes">${escapeHtml(subscription.notes)}</p>`
    : "";

  return `
    <article class="subscription-card">
      <div class="subscription-main">
        <div class="subscription-title">
          <h3>${escapeHtml(subscription.name)}</h3>
          <span class="subscription-price">${escapeHtml(formatPrice(subscription))}</span>
        </div>
        <p class="subscription-detail">
          ${escapeHtml(OCCURRENCE_LABELS[subscription.occurrence])} · Bills ${formatDate(subscription.billingDate)}
        </p>
        <p class="subscription-detail">
          ${escapeHtml(subscription.paymentMethod)}
        </p>
        <div class="subscription-tags">
          <span class="tag">${escapeHtml(subscription.currency || "TRY")}</span>
          ${category}
        </div>
        ${notes}
      </div>
      <div class="subscription-actions">
        <button class="record-action" type="button" data-action="edit" data-id="${subscription.id}">Edit</button>
        <button class="record-action danger" type="button" data-action="delete" data-id="${subscription.id}">Delete</button>
      </div>
    </article>
  `;
}

function normalize(value) {
  return String(value || "").trim();
}

function parseLocalizedPrice(value) {
  const normalizedValue = normalize(value);

  if (!normalizedValue || !/^[0-9.,]+$/.test(normalizedValue)) {
    return Number.NaN;
  }

  const lastDot = normalizedValue.lastIndexOf(".");
  const lastComma = normalizedValue.lastIndexOf(",");

  if (lastDot !== -1 && lastComma !== -1) {
    const decimalSeparator = lastDot > lastComma ? "." : ",";
    const groupingSeparator = decimalSeparator === "." ? "," : ".";
    const decimalIndex = Math.max(lastDot, lastComma);
    const integerPart = normalizedValue.slice(0, decimalIndex);
    const fractionPart = normalizedValue.slice(decimalIndex + 1);
    const groupingPattern = new RegExp(`^\\d{1,3}(\\${groupingSeparator}\\d{3})*$`);

    if (!groupingPattern.test(integerPart) || !/^\d+$/.test(fractionPart)) {
      return Number.NaN;
    }

    return Number(`${integerPart.replaceAll(groupingSeparator, "")}.${fractionPart}`);
  }

  const decimalSeparator = lastComma !== -1 ? "," : ".";

  if (!normalizedValue.includes(decimalSeparator)) {
    return Number(normalizedValue);
  }

  const parts = normalizedValue.split(decimalSeparator);

  if (parts.length !== 2 || !/^\d+$/.test(parts[0]) || !/^\d+$/.test(parts[1])) {
    return Number.NaN;
  }

  return Number(`${parts[0]}.${parts[1]}`);
}

function formatPrice(subscription) {
  const currency = subscription.currency || "TRY";
  return `${currency} ${Number(subscription.price).toFixed(2)}`;
}

function formatSnapshotPrice(snapshot) {
  const currency = snapshot.currency || "TRY";
  return `${currency} ${Number(snapshot.price).toFixed(2)}`;
}

function formatCurrencyBreakdown(currencyTotals) {
  return Object.entries(currencyTotals)
    .map(([currency, total]) => `${currency} ${total.toFixed(2)}`)
    .join(" + ");
}

function getMonthlyEquivalent(subscription) {
  const price = Number(subscription.price || 0);

  if (subscription.occurrence === "weekly") {
    return price * (52 / 12);
  }

  if (subscription.occurrence === "quarterly") {
    return price / 3;
  }

  if (subscription.occurrence === "yearly") {
    return price / 12;
  }

  return price;
}

function getOverviewTotals() {
  const currencies = [...new Set(subscriptions.map((subscription) => subscription.currency || "TRY"))];
  const totalMonthly = subscriptions.reduce(
    (total, subscription) => total + getMonthlyEquivalent(subscription),
    0,
  );

  return {
    currency: currencies[0] || "TRY",
    hasSingleCurrency: currencies.length <= 1,
    totalMonthly,
    totalYearly: totalMonthly * 12,
  };
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

function formatDateFromDate(date) {
  return [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getFullYear()),
  ].join(".");
}

function formatTotal(upcomingPayments) {
  const totalByCurrency = upcomingPayments.reduce((totals, { subscription }) => {
    const currency = subscription.currency || "TRY";
    totals[currency] = (totals[currency] || 0) + Number(subscription.price || 0);
    return totals;
  }, {});
  const entries = Object.entries(totalByCurrency);

  if (entries.length === 0) {
    return "TRY 0";
  }

  return entries
    .map(([currency, total]) => `${currency} ${total.toFixed(2)}`)
    .join(" + ");
}

function getRelativeStatus(date) {
  const daysAway = getDayDifference(startOfLocalDay(new Date()), date);

  if (daysAway === 0) {
    return "Today";
  }

  if (daysAway === 1) {
    return "Tomorrow";
  }

  return `In ${daysAway} days`;
}

function getNextPaymentDate(billingDate, occurrence, today) {
  const anchor = parseLocalDate(billingDate);

  if (!anchor || !OCCURRENCE_LABELS[occurrence]) {
    return null;
  }

  if (anchor >= today) {
    return anchor;
  }

  if (occurrence === "weekly") {
    const daysSinceAnchor = getDayDifference(anchor, today);
    return addDays(anchor, Math.ceil(daysSinceAnchor / 7) * 7);
  }

  const intervalMonths = {
    monthly: 1,
    quarterly: 3,
    yearly: 12,
  }[occurrence];
  const monthsSinceAnchor =
    (today.getFullYear() - anchor.getFullYear()) * 12 +
    today.getMonth() -
    anchor.getMonth();
  let intervals = Math.max(0, Math.floor(monthsSinceAnchor / intervalMonths));
  let candidate = addMonthsClamped(anchor, intervals * intervalMonths);

  while (candidate < today) {
    intervals += 1;
    candidate = addMonthsClamped(anchor, intervals * intervalMonths);
  }

  return candidate;
}

function parseLocalDate(value) {
  const parts = String(value || "").split("-").map(Number);

  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return null;
  }

  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
}

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function addMonthsClamped(anchor, monthsToAdd) {
  const targetYear = anchor.getFullYear();
  const targetMonth = anchor.getMonth() + monthsToAdd;
  const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
  const targetDay = Math.min(anchor.getDate(), lastDay);

  return new Date(targetYear, targetMonth, targetDay);
}

function getDayDifference(startDate, endDate) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.round((endDate - startDate) / millisecondsPerDay);
}

function setStatus(message) {
  statusMessage.textContent = message;
  statusMessage.classList.add("is-visible");
}

function addActivityEntry(eventType, subscription, createdAt) {
  activityLog = [
    {
      id: crypto.randomUUID(),
      eventType,
      subscriptionId: subscription.id,
      subscriptionSnapshot: createSubscriptionSnapshot(subscription),
      createdAt,
    },
    ...activityLog,
  ];
}

function createSubscriptionSnapshot(subscription) {
  return {
    name: subscription.name,
    price: subscription.price,
    currency: subscription.currency || "TRY",
    billingDate: subscription.billingDate,
    occurrence: subscription.occurrence,
    paymentMethod: subscription.paymentMethod,
    category: subscription.category || "",
  };
}

function formatTimestamp(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function csvEscape(value) {
  const normalizedValue = String(value);

  if (/[",\r\n]/.test(normalizedValue)) {
    return `"${normalizedValue.replaceAll('"', '""')}"`;
  }

  return normalizedValue;
}

function downloadFile(filename, type, contents) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
