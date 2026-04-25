const STORAGE_KEY = "subscription-tracker-v1-subscriptions";
const ACTIVITY_STORAGE_KEY = "subscription-tracker-v1-activity-log";
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
const spendingBar = document.querySelector("[data-spending-bar]");
const paymentMethodList = document.querySelector("[data-payment-method-list]");
const overviewEmpty = document.querySelector("[data-overview-empty]");
const exportActions = document.querySelector("[data-export-actions]");
const exportEmpty = document.querySelector("[data-export-empty]");
const exportTextButton = document.querySelector("[data-export-text]");
const exportCsvButton = document.querySelector("[data-export-csv]");
const SEGMENT_COLORS = ["#147d64", "#b85d2a", "#263a63", "#7c5c2e", "#5b6f63", "#8b4a62"];

let subscriptions = loadSubscriptions();
let activityLog = loadActivityLog();
let editingId = null;

renderSubscriptions();
renderActivityLog();

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

function readForm() {
  const data = new FormData(form);
  const priceValue = normalize(data.get("price"));

  return {
    name: normalize(data.get("name")),
    price: priceValue ? Number(priceValue) : Number.NaN,
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
    return "Payment occurrence is required.";
  }

  if (!subscription.paymentMethod) {
    return "Payment method/account is required.";
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
  exportEmpty.hidden = hasSubscriptions;
  exportActions.hidden = !hasSubscriptions;
}

function renderSpendingOverview() {
  const overviewItems = subscriptions.map((subscription) => ({
    subscription,
    monthlyEquivalent: getMonthlyEquivalent(subscription),
  }));
  const hasSubscriptions = overviewItems.length > 0;
  const currencies = [...new Set(subscriptions.map((subscription) => subscription.currency || "TRY"))];
  const hasSingleCurrency = currencies.length === 1;
  const totalMonthly = overviewItems.reduce((total, item) => total + item.monthlyEquivalent, 0);
  const groups = getPaymentMethodGroups(overviewItems, totalMonthly);

  overviewEmpty.hidden = hasSubscriptions;
  overviewStats.hidden = !hasSubscriptions;
  spendingBar.hidden = !hasSubscriptions;
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
  spendingBar.innerHTML = groups.map(renderSpendingSegment).join("");
  paymentMethodList.innerHTML = groups.map(renderPaymentMethodGroup).join("");
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
    const method = item.subscription.paymentMethod || "Unlabeled account";
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

function renderSpendingSegment(group) {
  return `
    <span
      class="spending-segment"
      style="--segment-color: ${group.color}; width: ${Math.max(group.percentage, 2).toFixed(2)}%;"
      title="${escapeHtml(group.label)} ${group.percentage.toFixed(0)}%"
    ></span>
  `;
}

function renderPaymentMethodGroup(group) {
  return `
    <div class="payment-method-row">
      <span class="payment-method-dot" style="--segment-color: ${group.color};"></span>
      <div class="payment-method-main">
        <strong>${escapeHtml(group.label)}</strong>
        <span>${escapeHtml(formatCurrencyBreakdown(group.currencyTotals))} / month</span>
      </div>
      <span class="payment-method-percent">${group.percentage.toFixed(0)}%</span>
    </div>
  `;
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
      `Payment occurrence: ${OCCURRENCE_LABELS[subscription.occurrence] || subscription.occurrence}`,
      `Payment method/account: ${subscription.paymentMethod}`,
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
