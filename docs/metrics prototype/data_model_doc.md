# Data Model Documentation: Post-Trade Metrics System

**Version:** 1.0  
**Purpose:** Prototype data model for risk-centric post-trade operations dashboards  
**Last Updated:** October 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Real-World Data Model](#real-world-data-model)
3. [Prototype Simplified Schema](#prototype-simplified-schema)
4. [Key Differences: Real vs. Prototype](#key-differences-real-vs-prototype)
5. [Field Definitions](#field-definitions)
6. [Data Relationships](#data-relationships)
7. [Sample Calculations](#sample-calculations)

---

## Overview

### Business Context

This data model supports a post-trade operations platform for OTC/bilateral derivatives trading. The core business process is:

1. **Trade Execution** - Buy-side firm executes a trade with a dealer
2. **Affirmation** - Optional early confirmation of economic terms
3. **Confirmation** - Dealer sends PDF document with their record of the trade
4. **AI Extraction** - System extracts dealer's values from PDF
5. **Matching** - System compares dealer values vs. client values
6. **Break Management** - Discrepancies are identified and resolved
7. **Confirmation** - Trade is confirmed once all breaks resolved

### Key Business Entities

- **Trade** - The buy-side record (source of truth)
- **Document** - The dealer's PDF confirmation
- **AI Extraction** - Dealer's values extracted from PDF
- **Match** - Links Trade to Document, records comparison results
- **Break** - A discrepancy found during matching
- **Workflow** - Tracks affirmation and confirmation processes
- **Template** - Pre-agreed legal language for product/counterparty combinations

---

## Real-World Data Model

### Entity Relationship Diagram

```
Trade (buy-side record)
  ↓
  ├─→ AffirmationWorkflow
  │     └─→ AffirmationTasks
  │
  └─→ ConfirmationWorkflow
        ↓
        Document (dealer's PDF)
          ↓
          AIExtraction records (dealer's values from PDF)
            ↓
            Match (compares Trade vs AIExtraction)
              ↓
              Break records (differences found)
```

### Core Entities (Real World)

#### Trade
```typescript
interface Trade {
  id: string;
  executedTime: string;
  productTypeId: string;
  counterparty: string;
  notional: number;
  currency: string;
  tradeType: 'new' | 'unwind' | 'novation' | 'partial_unwind';
  economicTerms: {
    strike?: number;
    spread?: number;
    effectiveDate?: string;
    terminationDate?: string;
    // ... other product-specific terms
  };
}
```

#### Document
```typescript
interface Document {
  id: string;
  confirmationWorkflowId: string;
  documentPDF: string; // URL to PDF
  uploadedAt: string;
  counterparty: string;
}
```

#### AIExtraction
```typescript
interface AIExtraction {
  id: string;
  documentId: string;
  field: string; // 'strike', 'notional', etc.
  extractedValue: any; // THIS IS THE DEALER'S VALUE
  confidenceScore: number;
  wasCorrect?: boolean;
  wasOverridden: boolean;
}
```

#### Match
```typescript
interface Match {
  id: string;
  documentId: string; // dealer's record
  tradeId: string;    // client's record
  autoMatchAttempted: boolean;
  autoMatchSucceeded: boolean;
  matchedAt: string;
}
```

#### Break
```typescript
interface Break {
  id: string;
  matchId: string;
  field: string;
  dealerValue: any;  // from AIExtraction
  clientValue: any;  // from Trade.economicTerms
  severity: 1 | 2 | 3 | 4 | 5;
  owner: 'dealer' | 'client' | 'ai' | 'unknown';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
}
```

### How It Works (Real World)

1. Trade created with `economicTerms` (client's record)
2. Dealer sends PDF → Document created
3. AI extracts PDF → AIExtraction records created (dealer's values)
4. Match created linking Trade ↔ Document
5. Comparison runs: for each field, compare `AIExtraction.extractedValue` vs `Trade.economicTerms[field]`
6. If different → Break created with both values
7. Ops team resolves breaks
8. When all breaks resolved → Trade confirmed

---

## Prototype Simplified Schema

### Why Simplified?

For prototyping dashboards, we don't need the full relational complexity. We need:
- Fast iteration on UI/UX
- Easy data manipulation
- Realistic-looking aggregations
- No complex joins

### Flattened Schema

```typescript
interface TradeRecord {
  // IDENTIFIERS
  tradeId: string;
  tradeDate: string;           // YYYY-MM-DD
  executedTime: string;        // ISO 8601
  
  // TRADE DETAILS
  productType: string;         // 'CMS Option', 'FX Option', 'IRS'
  productFamily: 'rates' | 'fx' | 'equity' | 'credit';
  counterparty: string;        // 'GS', 'JPM', 'MS', 'BAML', 'Citi'
  counterpartyFull: string;    // 'Goldman Sachs', 'JP Morgan'
  notional: number;
  currency: string;
  tradeType: 'new' | 'unwind' | 'novation' | 'partial_unwind';
  
  // TEMPLATE INFO
  hasTemplate: boolean;        // Does a template exist?
  templateUsed: boolean;       // Was it actually used?
  
  // WORKFLOW TIMESTAMPS
  docReceivedTime?: string;
  affirmationSentTime?: string;
  affirmationCompletedTime?: string;
  reviewStartTime?: string;
  reviewCompletedTime?: string;
  confirmedTime?: string;
  
  // BREAK/MATCH INFO
  hasBreaks: boolean;
  breakCount: number;
  highSeverityBreakCount: number;
  mediumSeverityBreakCount: number;
  lowSeverityBreakCount: number;
  breakFields?: string[];      // ['strike', 'notional']
  breakOwner?: 'dealer' | 'client' | 'ai';
  breakCategory?: 'economic_high' | 'economic_medium' | 
                  'documentation' | 'legal_language';
  
  // DISPUTE TRACKING
  isDisputed: boolean;
  disputeStartTime?: string;
  disputeResolvedTime?: string;
  
  // AUTO-MATCH
  autoMatchAttempted: boolean;
  autoMatchSucceeded: boolean;
  
  // AI EXTRACTION
  aiExtractionAccuracy?: number;  // 0-100
  aiFieldsExtracted?: string[];
  
  // COMPUTED METRICS
  status: 'pending_affirmation' | 'affirmed' | 
          'pending_confirmation' | 'disputed' | 'confirmed';
  metSLA: boolean;              // affirmed or confirmed within 24hrs
  riskScore: number;
  
  // TIMING METRICS (pre-calculated)
  timeToDocHours?: number;
  timeToAffirmHours?: number;
  timeToConfirmHours?: number;
  timeInReviewHours?: number;
  timeInDisputeDays?: number;
}
```

---

## Key Differences: Real vs. Prototype

| Aspect | Real World | Prototype |
|--------|------------|-----------|
| **Structure** | Normalized, multiple related tables | Single flattened table |
| **Joins** | Required for all queries | None needed |
| **Break Details** | Separate Break table with field-by-field records | Aggregated counts only |
| **AI Extraction** | Per-field extraction records | Single accuracy score |
| **Timestamps** | Across multiple workflow tables | All in one record |
| **Calculations** | Computed on query | Pre-calculated fields |
| **Complexity** | Production-ready, auditable | Prototype-optimized |

### What We Lost (Acceptable for Prototype)

- Field-level break detail (can't see "strike was 1.25 vs 1.26")
- Per-field AI accuracy (only overall accuracy)
- Task-level tracking
- Historical audit trail
- Template version history

### What We Kept (Critical for Dashboards)

- All timing metrics for scorecards
- Break severity distribution
- Template coverage tracking
- Risk scoring
- SLA tracking
- Counterparty performance metrics

---

## Field Definitions

### Core Identifiers

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `tradeId` | string | Unique trade identifier | "10234" |
| `tradeDate` | string | Date trade was executed (YYYY-MM-DD) | "2025-09-28" |
| `executedTime` | string | Precise execution timestamp (ISO 8601) | "2025-09-28T09:15:00Z" |

### Trade Attributes

| Field | Type | Description | Possible Values |
|-------|------|-------------|-----------------|
| `productType` | string | Specific product | "CMS Option", "FX Option", "IRS", "Swaption" |
| `productFamily` | enum | High-level categorization | rates, fx, equity, credit |
| `counterparty` | string | Short CP name | "GS", "JPM", "MS", "BAML", "Citi" |
| `counterpartyFull` | string | Full legal name | "Goldman Sachs", "JP Morgan" |
| `notional` | number | Trade size in currency units | 50000000 |
| `currency` | string | ISO currency code | "USD", "EUR", "GBP" |
| `tradeType` | enum | Trade lifecycle type | new, unwind, novation, partial_unwind |

### Template Fields

| Field | Type | Description | Business Meaning |
|-------|------|-------------|------------------|
| `hasTemplate` | boolean | Template exists for this CP+product | Does template exist? |
| `templateUsed` | boolean | Template was applied in this workflow | Was it actually used? |

**Important:** `hasTemplate=true, templateUsed=false` means template exists but wasn't used (coverage gap)

### Workflow Timestamps

All timestamps are ISO 8601 format. `null` means that stage hasn't occurred yet.

| Field | When Set | Business Meaning |
|-------|----------|------------------|
| `docReceivedTime` | When dealer's PDF arrives | Dealer responsiveness |
| `affirmationSentTime` | When affirmation sent to dealer | Start of affirmation |
| `affirmationCompletedTime` | When affirmation confirmed | Affirmation success |
| `reviewStartTime` | When ops starts reviewing doc | Internal process start |
| `reviewCompletedTime` | When ops finishes review | Review efficiency |
| `confirmedTime` | When trade fully confirmed | Final confirmation |

### Break Information

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `hasBreaks` | boolean | Were any breaks found? | true |
| `breakCount` | number | Total number of breaks | 3 |
| `highSeverityBreakCount` | number | Severity 4-5 breaks | 1 |
| `mediumSeverityBreakCount` | number | Severity 3 breaks | 1 |
| `lowSeverityBreakCount` | number | Severity 1-2 breaks | 1 |
| `breakFields` | string[] | Which fields had breaks | ["strike", "notional"] |
| `breakOwner` | enum | Who caused the break | dealer, client, ai, unknown |
| `breakCategory` | enum | Type of break | economic_high, documentation |

### Dispute Tracking

| Field | Type | Description |
|-------|------|-------------|
| `isDisputed` | boolean | Is trade currently/was disputed? |
| `disputeStartTime` | string | When first break flagged |
| `disputeResolvedTime` | string | When all breaks resolved |

### Auto-Match & AI

| Field | Type | Description |
|-------|------|-------------|
| `autoMatchAttempted` | boolean | Did system try to auto-match? |
| `autoMatchSucceeded` | boolean | Did auto-match work? |
| `aiExtractionAccuracy` | number | Overall extraction accuracy (0-100) |
| `aiFieldsExtracted` | string[] | Which fields AI extracted |

### Computed Fields

| Field | Type | Calculation | Purpose |
|-------|------|-------------|---------|
| `status` | enum | Based on timestamp progression | Current state |
| `metSLA` | boolean | Affirmed or confirmed within 24hrs | SLA tracking |
| `riskScore` | number | notional × severity × time weight | Risk prioritization |
| `timeToDocHours` | number | docReceivedTime - executedTime | CP responsiveness |
| `timeToAffirmHours` | number | affirmationCompletedTime - executedTime | Affirmation speed |
| `timeToConfirmHours` | number | confirmedTime - executedTime | Total time |
| `timeInReviewHours` | number | reviewCompletedTime - reviewStartTime | Internal efficiency |
| `timeInDisputeDays` | number | disputeResolvedTime - disputeStartTime | Dispute duration |

---

## Data Relationships

### Status Progression

```
Trade Created
    ↓
pending_affirmation → affirmationSentTime set
    ↓
affirmed → affirmationCompletedTime set
    ↓
pending_confirmation → docReceivedTime set
    ↓
disputed → hasBreaks=true, disputeStartTime set
    ↓
confirmed → confirmedTime set
```

### SLA Logic

```
metSLA = true if:
  (affirmationCompletedTime - executedTime) <= 24 hours
  OR
  (confirmedTime - executedTime) <= 24 hours
```

### Risk Score Calculation

```
Base = notional × highSeverityBreakCount × 5
Time Weight:
  - 0-24 hours: 1.0×
  - 24-48 hours: 2.0×
  - 48-120 hours: 5.0×
  - 120+ hours: 15.0×
  
riskScore = Base × TimeWeight
```

---

## Sample Calculations

### Dashboard 1: Open Risk Score

```javascript
const openRiskScore = trades
  .filter(t => t.status === 'disputed')
  .reduce((sum, t) => sum + t.riskScore, 0);
```

### Dashboard 1: Trades Outside SLA

```javascript
const outsideSLA = trades.filter(t => !t.metSLA);
const outsideSLAPercent = (outsideSLA.length / trades.length) * 100;
```

### Dashboard 2: Break Rate by Severity

```javascript
const totalTrades = trades.length;
const highSevBreaks = trades.reduce((sum, t) => 
  sum + t.highSeverityBreakCount, 0);
const highSevRate = (highSevBreaks / totalTrades) * 100;
```

### Dashboard 3: Average Time to Doc by Counterparty

```javascript
const byCounterparty = trades
  .filter(t => t.timeToDocHours != null)
  .reduce((acc, t) => {
    if (!acc[t.counterparty]) acc[t.counterparty] = [];
    acc[t.counterparty].push(t.timeToDocHours);
    return acc;
  }, {});

const avgByCP = Object.entries(byCounterparty).map(([cp, times]) => ({
  counterparty: cp,
  avgTimeToDoc: times.reduce((a, b) => a + b) / times.length
}));
```

### Dashboard 4: Template Coverage

```javascript
const withTemplate = trades.filter(t => t.hasTemplate).length;
const coveragePercent = (withTemplate / trades.length) * 100;
```

### Dashboard 4: AI Accuracy by Product

```javascript
const byProduct = trades
  .filter(t => t.aiExtractionAccuracy != null)
  .reduce((acc, t) => {
    if (!acc[t.productType]) {
      acc[t.productType] = { total: 0, count: 0 };
    }
    acc[t.productType].total += t.aiExtractionAccuracy;
    acc[t.productType].count += 1;
    return acc;
  }, {});

const accuracyByProduct = Object.entries(byProduct).map(([prod, data]) => ({
  product: prod,
  accuracy: data.total / data.count
}));
```

---

## Data Generation Strategy

### Recommended Dataset Size

**75 trades** over 90-day period

### Distribution Guidelines

```
Status Mix:
- confirmed: 45 (60%)
- disputed: 18 (24%)
- pending: 12 (16%)

Counterparty Mix:
- GS: 18 (24%) - worst performer
- JPM: 15 (20%) - below average
- MS: 13 (17%) - above average
- BAML: 11 (15%) - average
- Citi: 10 (13%) - average
- Others: 8 (11%)

Product Family:
- rates: 35 (47%)
- fx: 20 (27%)
- equity: 15 (20%)
- credit: 5 (6%)

Template Coverage:
- hasTemplate=true, templateUsed=true: 50 (67%)
- hasTemplate=true, templateUsed=false: 8 (11%)
- hasTemplate=false: 17 (22%)
```

### Data Quality Rules

1. **Timestamp Progression:** Always maintain logical order
   - `executedTime < docReceivedTime < reviewStartTime < confirmedTime`
   
2. **Status Consistency:**
   - `status='confirmed'` → must have `confirmedTime`
   - `status='disputed'` → must have `hasBreaks=true`
   
3. **Break Consistency:**
   - If `hasBreaks=true` → `breakCount > 0`
   - `breakCount = high + medium + low`
   
4. **SLA Calculation:**
   - Calculate `metSLA` based on actual timestamps
   
5. **Risk Score Realism:**
   - Higher for JPM, Citi (worse performers)
   - Lower for GS, MS (better performers)
   - Zero for confirmed trades

### Realistic Patterns

**GS (Best Performer):**
- High template usage
- Low break rates
- Fast doc delivery
- Few disputes

**JPM (Worst Performer):**
- Lower template usage
- Higher break rates
- Longer time to doc
- More disputes

**Time Distributions:**
- timeToDocHours: 0.5 to 8 hours (median ~2)
- timeToConfirmHours: 4 to 48 hours (median ~20)
- timeInDisputeDays: 1 to 7 days (median ~3)

---

## Next Steps

1. Generate 75-row dataset following these rules
2. Validate calculations match dashboard requirements
3. Test edge cases (missing timestamps, zero breaks, etc.)
4. Create JSON file for import into React prototypes
