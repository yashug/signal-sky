/**
 * Premium dark-theme invoice HTML template for PDF generation via Puppeteer.
 * Uses inline CSS only — no external fonts, no external resources.
 */

export type InvoiceTemplateData = {
  invoiceNo: string
  date: string
  userName: string
  userEmail: string
  planName: string
  period: string
  subtotal: string
  gstAmount: string
  total: string
  currency: string
  transactionId: string
  paymentMethod: string
}

// Logo SVG inline (blue rounded square + lightning bolt)
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2563eb"/><path d="M17.5 6L10 18h5.5l-1 8L22 14h-5.5l1-8z" fill="#ffffff" stroke="#ffffff" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"/></svg>`

export function renderInvoiceHtml(d: InvoiceTemplateData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  @media print {
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 800px;
    background: #ffffff;
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    color: #111827;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 800px;
    min-height: 1080px;
    background: #ffffff;
    padding: 0;
    position: relative;
  }

  /* ── Top accent bar ── */
  .top-bar {
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #1d4ed8 0%, #2563eb 40%, #3b82f6 100%);
  }

  .content { padding: 48px 56px 40px; }

  /* ── Header ── */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
  }
  .brand-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .brand-text-wrap {}
  .brand {
    font-size: 24px;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .brand-tagline {
    font-size: 10px;
    color: #6b7280;
    letter-spacing: 0.04em;
    margin-top: 4px;
  }
  .invoice-label-wrap { text-align: right; }
  .invoice-label {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: #1d4ed8;
    line-height: 1;
  }
  .gstin {
    font-size: 10px;
    color: #9ca3af;
    margin-top: 5px;
    letter-spacing: 0.04em;
    font-family: 'Courier New', monospace;
  }

  /* ── Divider ── */
  .divider {
    height: 1px;
    background: #e5e7eb;
    margin-bottom: 32px;
  }
  .divider-accent {
    height: 2px;
    background: #2563eb;
    width: 48px;
    border-radius: 2px;
    margin-bottom: 32px;
  }

  /* ── Meta row ── */
  .meta-row {
    display: flex;
    gap: 0;
    margin-bottom: 36px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    background: #f9fafb;
  }
  .meta-cell {
    flex: 1;
    padding: 16px 22px;
    border-right: 1px solid #e5e7eb;
  }
  .meta-cell:last-child { border-right: none; }
  .meta-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #9ca3af;
    margin-bottom: 6px;
  }
  .meta-value {
    font-size: 14px;
    font-weight: 700;
    color: #111827;
    letter-spacing: -0.01em;
    font-family: 'Courier New', monospace;
  }
  .badge-paid {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #15803d;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 20px;
  }
  .badge-dot {
    width: 6px; height: 6px;
    background: #22c55e;
    border-radius: 50%;
    display: inline-block;
  }

  /* ── Billing section ── */
  .billing-row {
    display: flex;
    gap: 20px;
    margin-bottom: 36px;
  }
  .billing-card {
    flex: 1;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 18px 22px;
    background: #ffffff;
  }
  .billing-title {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #2563eb;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid #dbeafe;
  }
  .billing-name {
    font-size: 15px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 4px;
  }
  .billing-detail {
    font-size: 11px;
    color: #6b7280;
    line-height: 1.7;
  }
  .billing-link { color: #2563eb; }

  /* ── Items table ── */
  .table-wrap {
    margin-bottom: 24px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }
  .table-head {
    display: flex;
    background: #1d4ed8;
    padding: 11px 22px;
  }
  .th {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #bfdbfe;
  }
  .th-desc { flex: 1; }
  .th-period { width: 200px; }
  .th-amount { width: 120px; text-align: right; }
  .table-row {
    display: flex;
    padding: 18px 22px;
    background: #ffffff;
    border-bottom: 1px solid #f3f4f6;
    align-items: center;
  }
  .table-row:last-child { border-bottom: none; }
  .td-desc { flex: 1; }
  .td-period { width: 200px; }
  .td-amount { width: 120px; text-align: right; }
  .item-name {
    font-size: 14px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 3px;
  }
  .item-sub {
    font-size: 10px;
    color: #9ca3af;
  }
  .period-text {
    font-size: 11px;
    color: #6b7280;
    font-family: 'Courier New', monospace;
  }
  .amount-text {
    font-size: 14px;
    font-weight: 700;
    color: #111827;
    font-family: 'Courier New', monospace;
  }

  /* ── Totals ── */
  .totals-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 32px;
  }
  .totals-card {
    width: 300px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }
  .totals-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 18px;
    border-bottom: 1px solid #f3f4f6;
    background: #f9fafb;
  }
  .totals-row:last-child { border-bottom: none; }
  .totals-label { font-size: 11px; color: #6b7280; }
  .totals-value { font-size: 12px; color: #374151; font-family: 'Courier New', monospace; }
  .totals-row-total {
    background: #eff6ff !important;
    border-top: 2px solid #bfdbfe !important;
    padding: 14px 18px;
  }
  .totals-label-total {
    font-size: 13px;
    font-weight: 800;
    color: #111827;
  }
  .totals-value-total {
    font-size: 20px;
    font-weight: 800;
    color: #1d4ed8;
    font-family: 'Courier New', monospace;
  }

  /* ── Transaction card ── */
  .txn-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 4px solid #2563eb;
    border-radius: 8px;
    padding: 16px 22px;
    margin-bottom: 40px;
    display: flex;
    gap: 48px;
    align-items: flex-start;
  }
  .txn-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #9ca3af;
    margin-bottom: 5px;
  }
  .txn-value {
    font-size: 12px;
    font-weight: 700;
    color: #111827;
    font-family: 'Courier New', monospace;
  }
  .txn-method { font-size: 10px; color: #9ca3af; margin-top: 2px; }

  /* ── Footer ── */
  .footer-bar {
    background: #f9fafb;
    border-top: 1px solid #e5e7eb;
    padding: 16px 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-left { font-size: 9px; color: #9ca3af; line-height: 1.7; }
  .footer-right { font-size: 9px; color: #9ca3af; text-align: right; line-height: 1.7; }
  .footer-blue { color: #2563eb; }
</style>
</head>
<body>
<div class="page">

  <!-- Top accent bar -->
  <div class="top-bar"></div>

  <div class="content">

    <!-- Header -->
    <div class="header">
      <div class="brand-row">
        ${LOGO_SVG}
        <div class="brand-text-wrap">
          <div class="brand">SignalSky</div>
          <div class="brand-tagline">Signal Scanner · India &amp; US Markets</div>
        </div>
      </div>
      <div class="invoice-label-wrap">
        <div class="invoice-label">Tax Invoice</div>
        <div class="gstin">GSTIN: 36BKTPG1266J1ZS</div>
      </div>
    </div>

    <div class="divider-accent"></div>

    <!-- Meta row -->
    <div class="meta-row">
      <div class="meta-cell">
        <div class="meta-label">Invoice No.</div>
        <div class="meta-value">${d.invoiceNo}</div>
      </div>
      <div class="meta-cell">
        <div class="meta-label">Invoice Date</div>
        <div class="meta-value" style="font-size:13px;font-family:'Segoe UI',Arial,sans-serif;font-weight:700">${d.date}</div>
      </div>
      <div class="meta-cell" style="flex:0.7">
        <div class="meta-label">Payment Status</div>
        <span class="badge-paid"><span class="badge-dot"></span>Paid</span>
      </div>
    </div>

    <!-- Billing section -->
    <div class="billing-row">
      <div class="billing-card">
        <div class="billing-title">Billed To</div>
        <div class="billing-name">${d.userName}</div>
        <div class="billing-detail">${d.userEmail}</div>
      </div>
      <div class="billing-card">
        <div class="billing-title">From</div>
        <div class="billing-name">YG IT Global Solutions</div>
        <div class="billing-detail">
          Sole Proprietorship<br>
          Hyderabad, Telangana 502300, India<br>
          <span class="billing-link">support@signalsky.app</span>
        </div>
      </div>
    </div>

    <!-- Line items -->
    <div class="table-wrap">
      <div class="table-head">
        <span class="th th-desc">Description</span>
        <span class="th th-period">Billing Period</span>
        <span class="th th-amount">Amount</span>
      </div>
      <div class="table-body">
        <div class="table-row">
          <div class="td-desc">
            <div class="item-name">${d.planName}</div>
            <div class="item-sub">Signal Scanner · India (NSE) + US Markets · Telegram &amp; Email Alerts</div>
          </div>
          <div class="td-period">
            <span class="period-text">${d.period}</span>
          </div>
          <div class="td-amount">
            <span class="amount-text">${d.currency} ${d.total}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Totals -->
    <div class="totals-wrap">
      <div class="totals-card">
        <div class="totals-row">
          <span class="totals-label">Subtotal (excl. GST)</span>
          <span class="totals-value">${d.currency} ${d.subtotal}</span>
        </div>
        <div class="totals-row">
          <span class="totals-label">IGST @ 18%</span>
          <span class="totals-value">${d.currency} ${d.gstAmount}</span>
        </div>
        <div class="totals-row totals-row-total">
          <span class="totals-label-total">Total Paid</span>
          <span class="totals-value-total">${d.currency} ${d.total}</span>
        </div>
      </div>
    </div>

    <!-- Transaction card -->
    <div class="txn-card">
      <div class="txn-group">
        <div class="txn-label">Transaction ID</div>
        <div class="txn-value">${d.transactionId}</div>
        <div class="txn-method">${d.paymentMethod}</div>
      </div>
      <div class="txn-group">
        <div class="txn-label">Payment Date</div>
        <div class="txn-value">${d.date}</div>
      </div>
      <div class="txn-group">
        <div class="txn-label">Currency</div>
        <div class="txn-value">${d.currency} (Indian Rupee)</div>
      </div>
    </div>

  </div><!-- /content -->

  <!-- Footer bar -->
  <div class="footer-bar">
    <div class="footer-left">
      This is a computer-generated invoice and does not require a physical signature.<br>
      Questions? <span class="footer-blue">support@signalsky.app</span> &nbsp;·&nbsp; <span class="footer-blue">signalsky.app</span>
    </div>
    <div class="footer-right">
      YG IT Global Solutions<br>
      Hyderabad, Telangana 502300, India
    </div>
  </div>

</div>
</body>
</html>`
}
