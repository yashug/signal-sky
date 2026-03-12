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

export function renderInvoiceHtml(d: InvoiceTemplateData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 800px;
    background: #080d1a;
    font-family: 'Trebuchet MS', 'Segoe UI', system-ui, -apple-system, sans-serif;
    color: #e2e8f0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 800px;
    min-height: 1080px;
    background:
      radial-gradient(ellipse 80% 50% at 20% -5%, rgba(59,130,246,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 100%, rgba(16,185,129,0.05) 0%, transparent 55%),
      radial-gradient(circle at 1px 1px, rgba(148,163,184,0.06) 1px, transparent 0);
    background-size: 100% 100%, 100% 100%, 28px 28px;
    padding: 56px 60px 48px;
    position: relative;
    overflow: hidden;
  }
  /* Decorative corner accent */
  .page::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 280px; height: 280px;
    background: radial-gradient(ellipse at top right, rgba(59,130,246,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .page::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 200px; height: 200px;
    background: radial-gradient(ellipse at bottom left, rgba(16,185,129,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Header ── */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 36px;
  }
  .brand-wrap { position: relative; }
  .brand {
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #ffffff;
    line-height: 1;
  }
  .brand-accent {
    display: block;
    width: 36px;
    height: 3px;
    margin-top: 7px;
    background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 60%, transparent 100%);
    border-radius: 2px;
  }
  .brand-tagline {
    font-size: 10px;
    color: #475569;
    letter-spacing: 0.06em;
    margin-top: 6px;
    text-transform: uppercase;
  }
  .invoice-label-wrap { text-align: right; }
  .invoice-label {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #3b82f6;
    line-height: 1;
  }
  .gstin {
    font-size: 10px;
    color: #64748b;
    margin-top: 6px;
    letter-spacing: 0.04em;
    font-family: 'Courier New', monospace;
  }

  /* ── Glow divider ── */
  .glow-hr {
    height: 1px;
    border: none;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(59,130,246,0.3) 20%,
      rgba(99,179,237,0.7) 50%,
      rgba(59,130,246,0.3) 80%,
      transparent 100%);
    box-shadow: 0 0 8px 1px rgba(59,130,246,0.25);
    margin: 0 0 32px;
  }

  /* ── Meta row ── */
  .meta-row {
    display: flex;
    gap: 0;
    margin-bottom: 36px;
    background: rgba(15,23,42,0.6);
    border: 1px solid rgba(51,65,85,0.6);
    border-radius: 10px;
    overflow: hidden;
  }
  .meta-cell {
    flex: 1;
    padding: 18px 24px;
    border-right: 1px solid rgba(51,65,85,0.5);
  }
  .meta-cell:last-child { border-right: none; }
  .meta-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #475569;
    margin-bottom: 7px;
  }
  .meta-value {
    font-size: 14px;
    font-weight: 700;
    color: #f1f5f9;
    letter-spacing: -0.01em;
    font-family: 'Courier New', monospace;
  }
  .badge-paid {
    display: inline-block;
    background: linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.15) 100%);
    border: 1px solid rgba(16,185,129,0.4);
    color: #34d399;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
  }

  /* ── Billing section ── */
  .billing-row {
    display: flex;
    gap: 24px;
    margin-bottom: 36px;
  }
  .billing-card {
    flex: 1;
    background: rgba(15,23,42,0.5);
    border: 1px solid rgba(51,65,85,0.5);
    border-radius: 10px;
    padding: 20px 24px;
  }
  .billing-title {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #3b82f6;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(59,130,246,0.2);
  }
  .billing-name {
    font-size: 16px;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 4px;
    letter-spacing: -0.01em;
  }
  .billing-detail {
    font-size: 11px;
    color: #64748b;
    line-height: 1.6;
  }
  .billing-detail a, .billing-link {
    color: #60a5fa;
    text-decoration: none;
  }

  /* ── Items table ── */
  .table-wrap {
    margin-bottom: 28px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(51,65,85,0.5);
  }
  .table-head {
    display: flex;
    background: linear-gradient(135deg, #1e3a5f 0%, #172d4d 100%);
    padding: 12px 24px;
    gap: 0;
  }
  .th {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #7dd3fc;
  }
  .th-desc { flex: 1; }
  .th-period { width: 200px; }
  .th-amount { width: 120px; text-align: right; }
  .table-body {}
  .table-row {
    display: flex;
    padding: 20px 24px;
    background: rgba(15,23,42,0.4);
    border-bottom: 1px solid rgba(30,42,60,0.8);
    gap: 0;
    align-items: center;
  }
  .table-row:last-child { border-bottom: none; }
  .td-desc { flex: 1; }
  .td-period { width: 200px; }
  .td-amount { width: 120px; text-align: right; }
  .item-name {
    font-size: 14px;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 3px;
    letter-spacing: -0.01em;
  }
  .item-sub {
    font-size: 10px;
    color: #475569;
    letter-spacing: 0.01em;
  }
  .period-text {
    font-size: 11px;
    color: #64748b;
    font-family: 'Courier New', monospace;
  }
  .amount-text {
    font-size: 14px;
    font-weight: 700;
    color: #e2e8f0;
    font-family: 'Courier New', monospace;
    letter-spacing: -0.01em;
  }

  /* ── Totals ── */
  .totals-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 32px;
  }
  .totals-card {
    width: 320px;
    background: rgba(15,23,42,0.5);
    border: 1px solid rgba(51,65,85,0.5);
    border-radius: 10px;
    overflow: hidden;
  }
  .totals-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid rgba(30,42,60,0.8);
  }
  .totals-row:last-child { border-bottom: none; }
  .totals-label {
    font-size: 11px;
    color: #64748b;
  }
  .totals-value {
    font-size: 12px;
    color: #94a3b8;
    font-family: 'Courier New', monospace;
  }
  .totals-row-total {
    background: linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(5,150,105,0.05) 100%);
    border-top: 1px solid rgba(16,185,129,0.2) !important;
    padding: 14px 20px;
  }
  .totals-label-total {
    font-size: 12px;
    font-weight: 800;
    color: #e2e8f0;
    letter-spacing: 0.02em;
  }
  .totals-value-total {
    font-size: 20px;
    font-weight: 800;
    color: #10b981;
    font-family: 'Courier New', monospace;
    letter-spacing: -0.02em;
  }

  /* ── Transaction card ── */
  .txn-card {
    background: rgba(15,23,42,0.5);
    border: 1px solid rgba(51,65,85,0.5);
    border-left: 3px solid #3b82f6;
    border-radius: 10px;
    padding: 18px 24px;
    margin-bottom: 36px;
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }
  .txn-group {}
  .txn-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #475569;
    margin-bottom: 6px;
  }
  .txn-value {
    font-size: 12px;
    font-weight: 700;
    color: #e2e8f0;
    font-family: 'Courier New', monospace;
    letter-spacing: 0.02em;
  }
  .txn-method {
    font-size: 11px;
    color: #64748b;
    margin-top: 3px;
  }

  /* ── Footer ── */
  .footer-hr {
    height: 1px;
    border: none;
    background: rgba(51,65,85,0.4);
    margin-bottom: 18px;
  }
  .footer-text {
    font-size: 9px;
    color: #334155;
    line-height: 1.7;
    letter-spacing: 0.02em;
  }
  .footer-link { color: #475569; }
</style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <div class="brand-wrap">
      <div class="brand">SignalSky</div>
      <span class="brand-accent"></span>
      <div class="brand-tagline">Signal Scanner · India &amp; US Markets</div>
    </div>
    <div class="invoice-label-wrap">
      <div class="invoice-label">Tax Invoice</div>
      <div class="gstin">GSTIN: 36BKTPG1266J1ZS</div>
    </div>
  </div>

  <!-- Glow divider -->
  <hr class="glow-hr">

  <!-- Meta row -->
  <div class="meta-row">
    <div class="meta-cell">
      <div class="meta-label">Invoice No.</div>
      <div class="meta-value">${d.invoiceNo}</div>
    </div>
    <div class="meta-cell">
      <div class="meta-label">Date</div>
      <div class="meta-value" style="font-size:13px">${d.date}</div>
    </div>
    <div class="meta-cell" style="flex:0.6">
      <div class="meta-label">Status</div>
      <span class="badge-paid">Paid</span>
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
        Hyderabad, Telangana 500081, India<br>
        <span class="billing-link">support@signalsky.app</span>
      </div>
    </div>
  </div>

  <!-- Line items -->
  <div class="table-wrap">
    <div class="table-head">
      <span class="th th-desc">Description</span>
      <span class="th th-period">Period</span>
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

  <!-- Footer -->
  <hr class="footer-hr">
  <div class="footer-text">
    This is a computer-generated invoice and does not require a physical signature. &nbsp;&nbsp;·&nbsp;&nbsp;
    Questions? <span class="footer-link">support@signalsky.app</span> &nbsp;&nbsp;·&nbsp;&nbsp;
    YG IT Global Solutions, Hyderabad, Telangana 500081, India &nbsp;&nbsp;·&nbsp;&nbsp;
    <span class="footer-link">signalsky.app</span>
  </div>

</div>
</body>
</html>`
}
