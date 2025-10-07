# Dashboard Design Documentation

This directory contains the complete design specifications for the Risk Metrics dashboard system.

## Document Structure

```
docs/metrics prototype/
├── prd_risk_metrics.md                        # Strategic requirements (WHAT & WHY)
├── dashboard_design_spec.md                   # Technical specification (HOW)
├── DESIGN_UPDATES_SUMMARY.md                  # Summary of all design changes
├── README_DASHBOARD_DESIGN.md                # This file
└── dashboard_layouts/
    ├── 01_risk_command_center.md              # Daily operations dashboard (UPDATED)
    ├── 02_performance_analytics.md            # Trend analysis dashboard (UPDATED)
    ├── 03_templates_automation_REVISED.md     # Strategic initiatives dashboard (REVISED)
    ├── 03_templates_automation.md             # DEPRECATED - see REVISED version
    └── 04_counterparty_scorecard.md           # Broker review dashboard (UPDATED)
```

## How to Use These Documents

### For Product Managers
**Start with:** `prd_risk_metrics.md`
- Understand user needs and business problems
- Review success criteria and key questions
- Use for stakeholder alignment

**Then review:** `dashboard_design_spec.md`
- See how requirements translate to dashboards
- Understand design decisions and trade-offs
- Reference for scope discussions

### For Designers
**Start with:** `dashboard_design_spec.md`
- Understand dashboard structure and purpose
- Review data constraints and requirements
- Note open design questions

**Then review:** `dashboard_layouts/` (individual files)
- Detailed layout specifications
- Component interactions and behaviors
- Responsive design considerations

### For Engineers
**Start with:** `dashboard_design_spec.md`
- Data requirements and structures
- Technical constraints
- Integration notes

**Reference:** `dashboard_layouts/` (for implementation details)
- Specific calculations and formulas
- User flows and interactions
- API/data needs per dashboard

---

## Dashboard Summary

### 1. Risk Command Center (Priority 1)
**File:** `dashboard_layouts/01_risk_command_center.md`

**Purpose:** Daily operations - "What needs attention today?"

**Key Features:**
- Priority Actions: Trades with Active Breaks
- Priority Actions: Trades Awaiting Counterparty
- Current risk distribution by CP/Product
- Real-time or 5-min refresh

**Implementation Priority:** HIGH - This is net new and solves the most critical user need

---

### 2. Performance Analytics
**File:** `dashboard_layouts/02_performance_analytics.md`

**Purpose:** Trend analysis - "How are our processes performing?"

**Key Features:**
- Affirmation metrics (NEW)
- Confirmation metrics (EXISTING - from Trade Insights)
- Break analysis (FUTURE - when data available)
- Trading activity context (EXISTING)

**Implementation Priority:** MEDIUM - Enhancement of existing Trade Insights dashboard

---

### 3. Templates & Automation
**File:** `dashboard_layouts/03_templates_automation_REVISED.md` ⚠️ REVISED

**Purpose:** Strategic initiatives - "Are our investments paying off?"

**Key Features:**
- Strategic Impact section (NEW - shows outcomes at top)
- Template coverage tracking
- Automation performance metrics

**Major Changes:**
- Moved impact metrics to top (show outcomes first)
- Removed duplicative "Combined Impact" section
- Removed time-saved metrics (not tracking)

**Implementation Priority:** MEDIUM - Merger of existing Template + Automation Insights dashboards

---

### 4. Counterparty Scorecard
**File:** `dashboard_layouts/04_counterparty_scorecard.md`

**Purpose:** Broker reviews - "How do you compare to peers?"

**Key Features:**
- Volume-weighted rankings
- Detailed CP performance breakdown
- Trend analysis
- Talking points for meetings
- Export functionality

**Implementation Priority:** LOW - Used quarterly, not daily

---

## Key Design Decisions

### Dashboard Consolidation
**Decision:** 4 core dashboards (down from 5+ potential views)

**Rationale:**
- Clear separation of use cases (daily/weekly/quarterly)
- Reduced cognitive overhead
- Each dashboard has distinct purpose and time horizon

**Affected Documents:** All dashboard layouts

---

### Priority Actions Structure
**Decision:** Two separate sections (Trades with Breaks vs. Awaiting Counterparty)

**Rationale:**
- Different operational responses required
- Different data availability
- Different SLA measurements

**Affected Documents:** `01_risk_command_center.md`

---

### SLA Thresholds
**Decision:** 48h warning, 72h critical (simplified from complex time-weighting)

**Rationale:**
- Easy to understand and communicate
- Aligns with operational reality
- Configurable for future adjustment

**Affected Documents:** `01_risk_command_center.md`, `dashboard_design_spec.md`

---

### Risk Score Without Notional
**Decision:** Count-based risk score, not notional-weighted

**Rationale:**
- Currency normalization not available
- Honest about data constraints
- Severity breakdown (8H, 12M, 3L) provides context

**Affected Documents:** `01_risk_command_center.md`, `dashboard_design_spec.md`

---

### Match Score Positioning
**Decision:** Call it "Match Score" not "AI Accuracy"

**Rationale:**
- Conflates AI quality with genuine breaks
- More accurate labeling
- Tooltip explains limitations

**Affected Documents:** `03_templates_automation.md`, `dashboard_design_spec.md`

---

## Data Availability

### Available Now
✅ Trade execution timestamps  
✅ Confirmation workflow data  
✅ Affirmation workflow data  
✅ Dispute timestamps  
✅ Counterparty identification  
✅ Product types  
✅ Match scores

### Coming Soon
🟡 Template definitions (which fields are high/med/low risk)  
🟡 Break ownership tagging (Counterparty/Alta/AI)  
🟡 Electronic affirmation tracking  

### Not Available (Blocked)
🔴 Currency-normalized notional values  
🔴 True AI extraction accuracy (vs. match score)  
🔴 Auto-generated talking points/insights

---

## Implementation Phases

### Phase 1: MVP (Risk Command Center)
**Timeline:** Sprint 1-2

**Scope:**
- Build Risk Command Center dashboard
- Priority Actions: Trades with Breaks
- Priority Actions: Awaiting Counterparty
- Basic risk distribution charts

**Success:** Natasha can answer "What needs attention today?"

---

### Phase 2: Performance Enhancement
**Timeline:** Sprint 3-4

**Scope:**
- Add Affirmation metrics to Trade Insights (rename to Performance Analytics)
- Enhance existing confirmation metrics
- Improve filtering and date range selection

**Success:** Natasha can track trends and identify process improvements

---

### Phase 3: Strategic Tracking
**Timeline:** Sprint 5-6

**Scope:**
- Merge Template + Automation dashboards
- Build combined impact section
- Add coverage trend visualizations

**Success:** Senior management can see ROI of strategic initiatives

---

### Phase 4: Broker Reviews
**Timeline:** Sprint 7-8

**Scope:**
- Build Counterparty Scorecard
- Implement percentile rankings
- Add export functionality
- Generate talking points (template-based initially)

**Success:** Natasha can run confident quarterly broker reviews

---

### Phase 5: Break Analysis (Future)
**Timeline:** TBD (depends on template data availability)

**Scope:**
- Add break severity tracking
- Add break ownership tagging
- Build field-level break analysis
- Add to Performance Analytics dashboard

**Success:** Natasha can identify root causes of breaks and hold parties accountable

---

## Open Questions

Questions marked in individual layout documents need resolution before implementation:

### Risk Command Center
- Default number of priority actions to show (5, 10, all)?
- Should "Action" column be buttons or text labels?
- Include resolved items from last 7 days?

### Performance Analytics
- Show combined "24hr SLA Achievement" chart?
- How many counterparties in tables by default?
- Hide or show placeholder for Break Analysis section?

### Templates & Automation
- Show target lines on coverage trends?
- How to calculate "time saved" metric?
- Need drill-down to specific template details?

### Counterparty Scorecard
- Auto-generate or manually edit talking points?
- How to handle new CPs with insufficient data?
- PDF export: one-page or multi-page?

---

## Next Steps

1. **Validate with Users**
   - Walk through layouts with Natasha
   - Confirm Priority Actions approach
   - Verify SLA thresholds

2. **Data Modeling**
   - Finalize data structures
   - Confirm timestamp availability
   - Plan for missing data handling

3. **Design Mockups**
   - Create high-fidelity designs from layouts
   - Design system component mapping
   - Responsive breakpoints

4. **Engineering Planning**
   - API requirements
   - Database schema updates
   - Performance considerations

5. **Phased Rollout**
   - MVP: Risk Command Center
   - Beta testing with ops team
   - Iterate based on feedback

---

## Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| Oct 2025 | 1.0 | Initial design specification | Product Team |

---

## Questions?

For questions about:
- **User needs & requirements** → See `prd_risk_metrics.md`
- **Technical implementation** → See `dashboard_design_spec.md`
- **Specific dashboard layouts** → See `dashboard_layouts/` files
- **Overall approach** → This file (README)

---

## Related Documentation

- **Design Updates Summary:** `DESIGN_UPDATES_SUMMARY.md` - All changes from user feedback
- Product roadmap (link TBD)
- Design system documentation: `/packages/design-system/docs/`
- API documentation (link TBD)
- User research findings (link TBD)

