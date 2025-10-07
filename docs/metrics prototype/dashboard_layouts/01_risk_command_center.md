# Risk Command Center - Layout Diagram

**Dashboard Purpose:** Daily operations - "What needs my attention today?"  
**Time Horizon:** Real-time + last 7 days  
**Primary User:** Natasha (Operations Manager)

---

## Full Page Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  RISK COMMAND CENTER                                    Friday, Oct 06 2025 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐   │
│  │ Trades at Risk     │  │ Outside 24hr SLA   │  │ High-Sev Breaks    │   │
│  │                    │  │                    │  │                    │   │
│  │      23            │  │    18 / 258        │  │        3           │   │
│  │   trades           │  │     (7.0%)         │  │     breaks         │   │
│  │                    │  │                    │  │                    │   │
│  │ 8 High             │  │  ↑ 1.2% vs avg     │  │  ↓ 2 from last week│   │
│  │ 12 Medium          │  │                    │  │                    │   │
│  │ 3 Low              │  │  Status: 🔴        │  │  Status: ✅        │   │
│  │                    │  │                    │  │                    │   │
│  │ Status: ⚠️         │  │                    │  │                    │   │
│  └────────────────────┘  └────────────────────┘  └────────────────────┘   │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ 🔴 PRIORITY ACTIONS: TRADES WITH ACTIVE BREAKS                        │ │
│  │                                                                       │ │
│  │  8 trades need attention                                             │ │
│  │                                                                       │ │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐ │ │
│  │  │Pri│Trade│ CP │Product│Notional│Breaks│Age│Affirm Status│Conf Status│  │ │ │
│  │  ├────────────────────────────────────────────────────────────────────────────┤ │ │
│  │  │🔴 │10234│ GS │CMS Opt│189.01  │ 4 ⓘ  │3d │  Affirmed   │In Dispute │  │ │ │
│  │  │   │     │    │       │  NZD   │      │   │             │           │  │ │ │
│  │  │🔴 │10189│JPM │FX Opt │178.90  │ 1 ⓘ  │2d │  Affirmed   │In Dispute │  │ │ │
│  │  │   │     │    │       │  USD   │      │   │             │           │  │ │ │
│  │  │🟡 │10156│Citi│IRS    │234.57  │ 3 ⓘ  │4d │  Affirmed   │Waiting CP │  │ │ │
│  │  │   │     │    │       │  USD   │      │   │             │           │  │ │ │
│  │  │🟡 │10298│BAML│Equity │67.89   │ 2 ⓘ  │1d │  Affirmed   │In Dispute │  │ │ │
│  │  │   │     │    │       │  NOK   │      │   │             │           │  │ │ │
│  │  │🟡 │10245│ MS │CMS Opt│123.46  │ 1 ⓘ  │2d │  Affirmed   │Escalated  │  │ │ │
│  │  │   │     │    │       │  SEK   │      │   │             │           │  │ │ │
│  │  └────────────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │  [View All 8 Items →]                                                │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ ⚠️  PRIORITY ACTIONS: TRADES AWAITING COUNTERPARTY                    │ │
│  │                                                                       │ │
│  │  Pending Affirmation (5 trades)                                      │ │
│  │  ┌──────────────────────────────────────────────────────────────────────┐ │ │
│  │  │Trade│ CP │Product │Notional│ Age  │    Status      │ Action  │      │ │ │
│  │  ├──────────────────────────────────────────────────────────────────────┤ │ │
│  │  │10298│BAML│Equity  │67.89   │50h 🟡│Pending Affirm  │Escalate │      │ │ │
│  │  │     │    │        │  NOK   │      │                │         │      │ │ │
│  │  │10245│ MS │CMS Opt │123.46  │ 18h  │Pending Affirm  │Monitor  │      │ │ │
│  │  │     │    │        │  SEK   │      │                │         │      │ │ │
│  │  │10312│Citi│IRS     │234.57  │ 32h  │Pending Affirm  │Monitor  │      │ │ │
│  │  │     │    │        │  CHF   │      │                │         │      │ │ │
│  │  │10298│ GS │FX Opt  │156.79  │  6h  │Pending Affirm  │Monitor  │      │ │ │
│  │  │     │    │        │  SEK   │      │                │         │      │ │ │
│  │  │10301│JPM │Swaption│145.68  │ 44h  │Pending Affirm  │Follow Up│      │ │ │
│  │  │     │    │        │  EUR   │      │                │         │      │ │ │
│  │  └──────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │  Pending Confirmation Document (5 trades)                            │ │
│  │  ┌──────────────────────────────────────────────────────────────────────┐ │ │
│  │  │Trade│ CP │Product │Notional│ Age  │    Status      │ Action  │      │ │ │
│  │  ├──────────────────────────────────────────────────────────────────────┤ │ │
│  │  │10321│JPM │FX Opt  │178.90  │75h 🔴│Pending Doc     │Escalate │      │ │ │
│  │  │     │    │        │  USD   │      │                │         │      │ │ │
│  │  │10278│Citi│IRS     │234.57  │ 44h  │Pending Doc     │Follow Up│      │ │ │
│  │  │     │    │        │  USD   │      │                │         │      │ │ │
│  │  │10289│ GS │CMS Opt │189.01  │62h 🟡│Pending Doc     │Escalate │      │ │ │
│  │  │     │    │        │  NZD   │      │                │         │      │ │ │
│  │  │10256│BAML│Equity  │67.89   │ 28h  │Pending Doc     │Monitor  │      │ │ │
│  │  │     │    │        │  NOK   │      │                │         │      │ │ │
│  │  │10267│ MS │Swaption│123.46  │ 12h  │Pending Doc     │Monitor  │      │ │ │
│  │  │     │    │        │  SEK   │      │                │         │      │ │ │
│  │  └──────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │  [View All Awaiting Items →]                                         │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────┐  ┌──────────────────────────────────┐│
│  │ RISK BY COUNTERPARTY            │  │ RISK BY PRODUCT TYPE             ││
│  │                                 │  │                                  ││
│  │  GS     [8H | 12M | 5L ] ██████ │  │  CMS Opt   [9H | 14M | 6L] █████ ││
│  │  JPM    [3H |  8M | 4L ] ████   │  │  FX Opt    [5H | 10M | 8L] ████  ││
│  │  Citi   [2H |  5M | 3L ] ███    │  │  IRS       [3H |  8M | 4L] ███   ││
│  │  BAML   [1H |  6M | 2L ] ███    │  │  Equity    [2H |  4M | 3L] ██    ││
│  │  MS     [0H |  4M | 1L ] ██     │  │  Swaption  [1H |  2M | 2L] █     ││
│  │                                 │  │                                  ││
│  │  Legend:                        │  │                                  ││
│  │  █ High  █ Med  █ Low           │  │                                  ││
│  └─────────────────────────────────┘  └──────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Details

### Top KPI Cards

**Design:**
- 3 cards across (responsive: stack on mobile)
- Each card shows: Title, Main metric, Context (breakdown or comparison), Status indicator
- Color coding: Green (✅), Yellow (⚠️), Red (🔴) based on thresholds

**Interaction:**
- Cards are NOT clickable (informational only)
- Provide quick context before diving into priority actions

---

### Priority Actions: Trades with Breaks

**Table Columns:**
1. **Priority Badge** (🔴 🟡 🟢)
   - Based on worst break severity + age
   - Visual sorting indicator
   
2. **Trade ID**
   - Clickable → Navigate to trade blotter filtered to this trade
   - Blue link styling

3. **Counterparty** (abbreviated)
   - GS, JPM, Citi, BAML, MS, etc.
   
4. **Product** (abbreviated)
   - CMS Opt, FX Opt, IRS, Equity, etc.

5. **Notional** (amount + currency)
   - Format: "189.01 NZD" (millions with 2 decimal places)
   - Two-row cell: Amount on top, currency below
   - Example cell formatting:
     ```
     189.01
       NZD
     ```
   
6. **Breaks** (count with tooltip icon ⓘ)
   - Shows total count: "4 ⓘ"
   - Hover tooltip shows breakdown:
     ```
     High Severity: Strike
     Medium Severity: Payment Freq, Effective Date
     Low Severity: Address
     ```

7. **Age** (time since break identified)
   - Format: "3d" or "18h"
   - No color coding (priority badge handles visual hierarchy)

8. **Affirmation Status**
   - Affirmed
   - Pending Affirm
   - Not Started

9. **Confirmation Status**
   - In Dispute
   - Waiting on CP
   - Escalated
   - Needs Review
   - Pending Doc

**Design Notes:**
- Show top 5 rows by default
- "View All X Items" button at bottom
- Sortable by priority (default), age, counterparty
- Search box: "Search trades..."

---

### Priority Actions: Awaiting Counterparty

**Two sub-tables:**

**A. Pending Affirmation**
- Trade waiting for affirmation (paper or electronic)
- Age since trade execution
- Aging indicators: 🟡 (48-72h), 🔴 (>72h)

**B. Pending Confirmation Document**
- Trade affirmed, waiting for CP to send confirmation doc
- Age since trade execution
- Same aging indicators

**Table Columns:**
1. **Trade ID** (clickable)
2. **Counterparty**
3. **Product**
4. **Notional** (amount + currency, formatted in millions with 2 decimals)
5. **Age** (with aging indicator if needed)
6. **Status** (Pending Affirm / Pending Doc)
7. **Action** (suggested next step - button)
   - Escalate (if >48h)
   - Follow Up (if 24-48h)
   - Monitor (if <24h)

**Design Notes:**
- Action column could be a button (clickable) or just text
- Aging thresholds: <48h OK, 48-72h Warning, >72h Critical

---

### Risk Distribution Charts

**Stacked Horizontal Bars:**
- Each bar represents a counterparty or product
- Segments: High (red), Medium (yellow), Low (gray)
- Click segment → Filter trade blotter to those trades

**Layout:**
- Two charts side-by-side on desktop
- Stack vertically on mobile
- Show top 5 counterparties/products only

**Legend:**
- Color key below charts
- No explicit instruction text (users discover clickability)

---

## Responsive Behavior

**Desktop (>1200px):**
- 3 KPI cards across
- 2 distribution charts side-by-side
- Full table columns visible

**Tablet (768px - 1200px):**
- 2 KPI cards across, 3rd wraps
- Distribution charts stack
- Table columns: hide less important columns (e.g., Status)

**Mobile (<768px):**
- KPI cards stack
- Tables show minimal columns (Trade, CP, Breaks)
- Expand rows for details

---

## Color Palette

**Status Indicators:**
- 🔴 Red: `var(--color-error-600)` - High priority, critical
- 🟡 Yellow: `var(--color-warning-600)` - Medium priority, warning
- ✅ Green: `var(--color-success-600)` - Low priority, good status

**Break Severity:**
- High: Red/Error
- Medium: Yellow/Warning
- Low: Gray/Tertiary


---

## Key User Flows

### Flow 1: Morning Standup
1. Natasha opens Risk Command Center
2. Scans top 3 KPIs → Sees "3 high-sev breaks, 18 outside SLA"
3. Looks at "Trades with Breaks" table → Identifies 10234 (GS, 4 breaks, 3d old)
4. Clicks trade 10234 → Opens trade blotter with detail view
5. Reviews breaks, leaves comment, escalates to counterparty

### Flow 2: Following Up on Delayed Affirmations
1. Scrolls to "Pending Affirmation" section
2. Sees trade 10298 (BAML, 50h 🟡)
3. Clicks "Escalate" action → Opens communication workflow
4. Sends follow-up to BAML

### Flow 3: Investigating Counterparty Pattern
1. Looks at "Risk by Counterparty" chart
2. Sees GS has 8 high-severity breaks (largest red segment)
3. Clicks GS red segment → Trade blotter filters to "GS + High Severity"
4. Reviews all 8 trades, identifies pattern (all CMS Options, all strike field)
5. Decides to escalate to GS relationship manager

---

## Data Update Frequency

- **update/refresh latest data on page load**

---

## Open Questions

1. Should "Action" column be actionable buttons or just text labels? Button in table is fine (we will probably remove this in the intial buildout)
2. Default sort order for awaiting tables: age (oldest first) or SLA risk (critical first)? (critical first)
3. Show resolved items from last 7 days or hide entirely? (hide the resolved items, as they are no longer risk)
4. Include a "Risk Score" number or keep as "Trades at Risk" text? (i think that we keep the trades at risk)

