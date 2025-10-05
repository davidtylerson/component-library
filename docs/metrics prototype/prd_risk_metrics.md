# Product Requirements Document: Risk-Centric Metrics for Post-Trade Operations

**Version:** 2.0  
**Last Updated:** October 2025  
**Owner:** Product Team  
**Status:** Draft for Review

---

## Executive Summary

Operations teams at asset managers struggle to identify and manage post-trade operational risk in real-time. This PRD defines a comprehensive metrics and dashboard system that transforms backward-looking trade analytics into a forward-looking risk management platform, enabling operations managers to answer "Where is my risk right now?" and drive systematic improvements in counterparty performance, template coverage, and process efficiency.

---

## Problem Statement

### Current State
Operations teams cannot effectively manage post-trade operational risk because existing systems provide:
- Backward-looking analytics without risk prioritization
- Equal treatment of all breaks regardless of economic impact
- No clear visibility into template coverage gaps
- Insufficient data to hold counterparties accountable
- Manual, inconsistent break tracking processes

### Core Problems

**1. Risk Visibility Gap**
- Cannot identify which open trades pose highest operational and economic risk
- All breaks treated equally (strike rate error = address typo)
- No real-time view of current exposure across trading population

**2. Inability to Drive Counterparty Behavior**
- Metrics lack context for broker scorecarding (dispute rates not volume-weighted)
- Cannot differentiate high-severity economic breaks from low-risk documentation issues
- Missing attribution data (who caused the break?)

**3. Template Coverage Blindspot**
- Unclear which counterparty/product combinations have legal templates
- No systematic way to identify template gaps creating legal risk
- Cannot track progress toward full coverage

**4. Process Effectiveness Unknown**
- Cannot determine if affirmation/confirmation processes meet risk SLAs
- Trends hidden in month-over-month comparisons requiring manual work
- No visibility into whether automation initiatives are reducing risk

**5. Manual, Inconsistent Break Tracking**
- Break categorization is ad-hoc and doesn't align to business impact
- Systems don't capture enough context to understand patterns
- Data quality issues prevent confident decision-making

---

## User Needs

### Primary User: Middle Office Operations Manager (Persona: Natasha)

**Daily Operational Needs:**
- See all open trades with unresolved issues, prioritized by risk severity
- Identify trades outside 24-hour affirmation/confirmation SLA
- Understand which counterparties/products require immediate attention

**Strategic Management Needs:**
- Conduct quarterly broker reviews with objective, contextual performance data
- Track progress toward risk reduction goals (template coverage, electronic adoption)
- Identify systematic issues vs. one-off errors
- Make resourcing decisions based on where risk is concentrated

**Compliance & Control Needs:**
- Demonstrate controls are working to reduce operational risk
- Show ROI on platform investments
- Provide audit trail of risk identification and resolution

---

## Success Criteria

The metrics system will be successful when users can:

1. **Log in each morning and within 30 seconds know:** "What are my top 5 risk items requiring action today?"

2. **Run a quarterly broker review and confidently say:** "Counterparty X has 3x the high-severity break rate of peers on comparable volume"

3. **Report to senior management:** "Template coverage increased from 40% to 75% this quarter, reducing legal risk exposure by Y%"

4. **Make a resourcing decision:** "We should prioritize CMS options with Counterparty Z because that's where we have the most open risk"

5. **Feel confident that:** "If we have an economic break, we'll catch it within 24 hours"

---

## Key Questions the Product Must Answer

### Immediate Risk & Action
- What is my current open risk across all unconfirmed/unaffirmed trades?
- Which open trades have high-severity economic breaks?
- Which trades are outside the 24-hour SLA for affirmation or confirmation?
- What are the highest-priority items requiring action today?

### Risk Distribution
- What is my risk exposure by counterparty?
- What is my risk exposure by product type/template?
- Where do I have template gaps (counterparty + product combinations without templates)?
- What percentage of my trading volume has template coverage?

### Break Analysis
- What types of breaks am I seeing, categorized by severity (high/medium/low risk)?
- What percentage of breaks are high-severity economic vs. low-risk documentation issues?
- Who owns the breaks - client or counterparty? What's the ratio?
- Are breaks concentrated in specific counterparties, products, or fields?

### Process Performance
- What percentage of trades achieve affirmation or confirmation within 24 hours?
- How long does it take counterparties to send confirmations (by counterparty/product)?
- What's my electronic affirmation coverage vs. paper?
- What's the trend - are we improving or degrading?

### Timing & Efficiency
- What is the average time to affirm trades?
- What is the average time to receive confirmation documents?
- What is the average time to confirm trades?
- How long are trades spending in review?
- How long are trades spending in dispute?

### Counterparty Scorecarding
- Which counterparties have the highest dispute rates (volume-weighted)?
- Which counterparties are slowest to send documentation?
- Which counterparties make the most high-severity economic errors?
- How do counterparties compare to peers on key metrics?
- Which counterparties have the longest dispute resolution times?

### Trading Activity & Context
- What is my trading volume by product type and family?
- Which counterparties am I trading most with?
- How has trading activity trended over time?
- Are volume changes affecting my risk metrics?

### Progress & Trends
- Is my overall risk profile improving month-over-month?
- Is template coverage increasing as expected?
- Are high-severity breaks decreasing over time?
- Is AI extraction accuracy improving?
- Are automation rates increasing?

---

## Foundational Data Requirements

### Trade-Level Attributes
| Attribute | Description | Purpose |
|-----------|-------------|---------|
| Trade ID | Unique identifier | Link across systems |
| Trade timestamp | When trade was executed | SLA tracking baseline |
| Trade type | New, unwind, novation, partial unwind | Risk profile varies by type |
| Product type / instrument | CMS option, FX option, equity swap, etc. | Field requirements differ |
| Counterparty | Legal entity traded with | Performance tracking |
| Trade template | Counterparty + product + characteristics | Coverage measurement |
| Notional amount | Economic size of trade | Risk weighting |
| Trade status | Pending affirmation, affirmed, confirmed, disputed | Current state tracking |

### Process Timestamps
| Timestamp | Definition | Use Case |
|-----------|------------|----------|
| Trade executed time | When trade happened in market | Start of SLA clock |
| Doc uploaded time | When confirmation doc received | Counterparty timeliness |
| Affirmation sent time | When affirmation request sent | Process tracking |
| Affirmation completed time | When affirmation finalized | SLA achievement |
| Confirmation received time | When confirm doc arrives | Counterparty performance |
| Confirmation completed time | When confirm review done | End of risk window |
| Review start time | When review process begins | Internal efficiency tracking |
| Review complete time | When review finalized | Internal efficiency tracking |
| First dispute time | When break identified | Issue detection speed |
| Dispute resolution time | When break resolved | Resolution efficiency |

### Break/Dispute Data
| Field | Description | Why Critical |
|-------|-------------|--------------|
| Break owner | Client / Counterparty / AI / Unknown | Attribution for scorecarding |
| Break category | Economic high-risk / Economic medium-risk / Documentation / Legal language | Prioritization |
| Specific field(s) affected | Strike, notional, effective date, etc. | Root cause analysis |
| Break severity score | 1-5 or Red/Amber/Green | Risk aggregation |
| Resolution status | Open / In Progress / Resolved | Current exposure |
| Round-trips to resolution | Number of back-and-forth exchanges | Efficiency measurement |

### Template & Coverage Data
| Field | Description | Business Value |
|-------|-------------|----------------|
| Template exists? | Y/N for this counterparty + product combo | Coverage calculation |
| Template completeness score | % of relevant fields covered | Quality measurement |
| Template last updated | Date of last modification | Staleness indicator |
| Fields covered by template | Specific field list | Gap identification |
| Fields reviewed in this trade | What was actually checked | Process compliance |

### AI/Automation Data
| Field | Purpose | Decision Support |
|-------|---------|------------------|
| Auto-match attempted? | Was automation tried | Coverage tracking |
| Auto-match successful? | Did automation work | Success rate calculation |
| AI extraction confidence scores | Per-field confidence levels | Reliability assessment |
| Fields requiring manual review | What AI couldn't handle | Improvement prioritization |

---

## Core Metrics Framework

### 1. Current Risk Exposure Metrics

| Metric | Definition | Calculation | Breakdown | Purpose |
|--------|------------|-------------|-----------|---------|
| **Open Risk Score** | Aggregate risk score of all unconfirmed/unaffirmed trades | Sum of (trade notional × break severity × time weight) | By counterparty, product type | Single number showing current risk exposure |
| **Trades Outside SLA** | Count/% of trades without affirmation OR confirmation within 24 hours | (Trades outside 24hr) / (Total trades) × 100 | By counterparty, product type, template | Identify process failures requiring immediate attention |
| **High-Severity Open Breaks** | Count of unresolved breaks in high-risk fields | Count where severity = High AND status ≠ Resolved | By counterparty, product, age | Focus attention on economically significant issues |
| **Average Time to Risk Resolution** | Mean time from trade execution to affirmation or confirmation | Mean(first of [affirmation_time, confirmation_time] - trade_time) | By counterparty, product type, trade type | Understand how long economic uncertainty persists |

**Configuration Notes:**
- Open Risk Score uses step function time weighting (see detailed specification)
- "High-risk fields" includes: strike, notional, rates, effective date, termination amount
- Time to Risk Resolution excludes trades outside normal course (complex restructurings)

### 2. Break Analysis Metrics

| Metric | Definition | Calculation | Breakdown | Purpose |
|--------|------------|-------------|-----------|---------|
| **Break Rate by Severity** | % of trades with breaks at each severity level | (# breaks at severity) / (total trades) × 100 | High/Medium/Low; by counterparty, product | Distinguish material issues from noise |
| **Break Ownership Distribution** | % of breaks attributed to each party | Count by owner / Total breaks × 100 | By severity, counterparty, product type | Understand if issues are internal or external |
| **Field-Level Break Frequency** | For each field, how often it breaks | (Field breaks) / (Trades with field) × 100 | By product type | Identify systematic extraction or booking issues |
| **Break Concentration Score** | How concentrated are breaks | % of breaks from top 20% of counterparties/products | N/A | Determine if problems are concentrated or distributed |
| **Break Resolution Time** | Mean time from identification to resolution | Mean(resolution_time - first_dispute_time) | By severity, counterparty, break type | Understand operational efficiency |
| **Confirm Dispute Rate** | % of confirmations disputed | (Confirmations disputed) / (Total confirmations) × 100 | By counterparty, product type | Track confirmation quality |

**Key Insights:**
- Break Ownership requires consistent tagging discipline from ops team
- Field-Level Break Frequency only meaningful with sufficient sample size (>20 trades per field)
- Concentration Score helps prioritize: concentrated = target specific counterparties; distributed = systematic issue

### 3. Template Coverage Metrics

| Metric | Definition | Calculation | Breakdown | Purpose |
|--------|------------|-------------|-----------|---------|
| **Overall Template Coverage** | % of trades with active template | (# trades with template) / (total trades) × 100 | By counterparty, product family | Track progress toward risk reduction goal |
| **Template Gap Analysis** | Counterparty + product combos with volume but no template | List where trades >X in 90 days AND template = N | Ordered by trade count | Prioritize template creation work |
| **Template Coverage by Volume** | Risk-weighted coverage | (Notional with templates) / (Total notional) × 100 | By product type | Understand economic exposure with/without templates |
| **Template Utilization Rate** | Of available templates, how often used | (Trades using template) / (Trades where template exists) × 100 | By template type | Identify templates that exist but aren't applied |
| **New Product Time to Template** | Onboarding efficiency | Days between first trade and template creation | By product type | Track onboarding process performance |

**Configuration:**
- Template Gap threshold configurable (default: >5 trades in 90 days)
- Coverage trending should show 6+ months with target line
- Utilization <80% suggests process issue (template exists but not being found/used)

### 4. Process Performance & Timing Metrics

| Metric | Definition | Calculation | Breakdown | Purpose |
|--------|------------|-------------|-----------|---------|
| **24-Hour SLA Achievement** | % achieving affirmation OR confirmation in 24hrs | (Trades meeting SLA) / (Total trades) × 100 | By counterparty, product, trade type | Core operational performance indicator |
| **Affirmation Effectiveness** | % of affirmations completed before confirmation | (Non-superseded affirmations) / (Total affirmations) × 100 | By product type | Determine if affirmation adds value or is redundant |
| **Paper vs. Electronic Mix** | Automation adoption | Count by method / Total × 100 | Separate for affirmation and confirmation | Track automation progress |
| **Time to Receive Doc** | Counterparty responsiveness | Mean/Median(doc_received - trade_time) | By counterparty, product type | Hold counterparties accountable to SLAs |
| **Time to Affirm** | Speed of affirmation process | Mean/Median(affirmation_complete - trade_time) | By counterparty, product type | Track affirmation efficiency |
| **Time to Confirm** | Speed of confirmation process | Mean/Median(confirmation_complete - trade_time) | By counterparty, product type | Track confirmation efficiency |
| **Time in Review** | Internal processing efficiency | Mean/Median(review_complete - review_start) | By product type, reviewer | Understand internal processing speed |
| **Time in Dispute** | Dispute resolution efficiency | Mean/Median(dispute_resolution - dispute_start) | By counterparty, severity, product | Track dispute handling performance |
| **Dispute Resolution SLA** | % disputes resolved within threshold | (Disputes resolved <48hrs) / (Total disputes) × 100 | By severity, counterparty | Track resolution efficiency |
| **Auto-Match Success Rate** | Automation effectiveness | (Successful auto-matches) / (Auto-match attempts) × 100 | By product type, counterparty | Track automation quality |

**Important Distinctions:**
- SLA Achievement measures "risk closed" not "affirmation completed" - either process works
- Affirmation Effectiveness <50% suggests moving to electronic confirmation is higher priority
- Time metrics should show both mean (for trends) and median (for typical case)
- Time in Dispute is NEW metric requiring dispute resolution timestamp capture

### 5. Counterparty Scorecard Metrics

| Metric | Definition | Calculation | Breakdown | Purpose |
|--------|------------|-------------|-----------|---------|
| **Volume-Weighted Break Rate** | Fair comparison of break rates | (Counterparty breaks / Counterparty trades) with volume normalization | Percentile ranking vs. peers | Fair comparison across different-sized counterparties |
| **High-Severity Break Rate** | Material quality issues | (High-severity breaks / Total trades) × 100 | By counterparty | Identify counterparties with quality problems |
| **Doc Timeliness Score** | SLA compliance | % of docs received within 1 hour of trade | By counterparty | Track counterparty compliance |
| **Dispute Resolution Time** | Responsiveness | Mean time for counterparty to resolve disputed items | By counterparty | Measure counterparty engagement |
| **Language/Template Compliance** | Adherence to agreed standards | % of docs with correct template language | By counterparty, template type | Track attention to agreed standards |

**Scorecard Design Principles:**
- Always show peer comparison (quartile or percentile)
- Weight by both volume AND risk (high-risk products weighted higher)
- Track trends: is counterparty improving or degrading?
- Enable filtering to "like products" (compare FX to FX, not FX to equity swaps)

### 6. AI/Automation Performance Metrics

| Metric | Definition | Calculation | Adjustment | Purpose |
|--------|------------|-------------|------------|---------|
| **Field-Level Extraction Accuracy** | AI correctness by field | (Correct extractions) / (Total extractions) × 100 | Exclude counterparty errors | Understand where AI is reliable |
| **AI Confidence vs. Accuracy** | Confidence calibration | Accuracy rate within confidence buckets (e.g., 90-100%) | N/A | Validate confidence thresholds |
| **Manual Override Rate** | Operational burden | (AI extractions corrected) / (Total extractions) × 100 | By field, product, reason | Understand AI gaps |
| **AI vs. Human Break Detection** | Automation value-add | % of breaks caught by AI vs. human review | By break severity | Measure automation effectiveness |

**Critical Note on Accuracy:**
- Must distinguish AI errors from genuine counterparty errors
- Requires ops team to tag: "AI wrong" vs. "Counterparty wrong" vs. "Both wrong"
- Without this tagging, accuracy scores will be artificially deflated

### 7. Trading Activity Metrics

| Metric | Definition | Calculation | Breakdown | Purpose |
|--------|------------|-------------|-----------|---------|
| **Total Trades** | Trading volume count | Count of all trades in period | By period (day/week/month) | Provide volume context |
| **Trades by Product Type** | Product-level activity | Count by specific product type | Top 10 products | Understand product mix |
| **Trades by Product Family** | High-level categorization | Count by family (Rates/FX/Equity/Credit) | Percentage distribution | Understand business mix |
| **Trades by Counterparty** | Counterparty concentration | Count by counterparty | Top 10 counterparties | Understand CP concentration |
| **Volume by Product** | Notional distribution | Sum of notional by product | By product family/type | Economic exposure view |
| **Volume Trend** | Activity over time | Daily/weekly/monthly trade counts | Time series | Spot volume changes |

**Usage:**
- These metrics provide context for all other metrics
- Essential for understanding if changes in other metrics are volume-driven
- Support detection of unusual activity patterns

### 8. Trend & Progress Metrics

| Metric | Definition | Calculation | Visualization | Purpose |
|--------|------------|-------------|---------------|---------|
| **Risk Trend Score** | Month-over-month risk change | ((Current risk - Prior risk) / Prior risk) × 100 | Single number with up/down indicator | Is overall risk increasing or decreasing? |
| **SLA Achievement Trend** | 24-hour SLA over time | Monthly SLA achievement % | Line chart with target threshold | Show process improvement trajectory |
| **Template Coverage Trajectory** | Coverage progress | Monthly template coverage % | Line chart with target goal line | Show progress toward strategic objective |
| **Break Severity Mix Trend** | Are breaks becoming less severe? | % of breaks that are High/Medium/Low over time | Stacked area chart | Determine if remaining issues less material |

**Trending Best Practices:**
- Show at least 6 months of history
- Include target/goal lines where applicable
- Add annotations for major process changes (e.g., "Electronic affirmation launched")
- Calculate and display trend line (linear regression)
