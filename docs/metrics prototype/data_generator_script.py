#!/usr/bin/env python3
"""
Mock Trade Data Generator
Generates 75 realistic trade records for prototype dashboards
"""

import json
import random
from datetime import datetime, timedelta
from typing import List, Dict, Optional

# Set seed for reproducibility
random.seed(42)

# Configuration
TOTAL_TRADES = 75
START_DATE = datetime(2025, 7, 6)  # 90 days ago from Oct 3, 2025
END_DATE = datetime(2025, 10, 3)

# Counterparty performance profiles (GS is best, JPM is worst)
COUNTERPARTIES = {
    'GS': {
        'full': 'Goldman Sachs',
        'template_usage': 0.95,
        'break_rate': 0.05,
        'avg_doc_hours': 0.9,
        'ai_accuracy': (96, 99),
        'weight': 0.24
    },
    'MS': {
        'full': 'Morgan Stanley',
        'template_usage': 0.90,
        'break_rate': 0.08,
        'avg_doc_hours': 1.2,
        'ai_accuracy': (94, 98),
        'weight': 0.17
    },
    'BAML': {
        'full': 'Bank of America',
        'template_usage': 0.80,
        'break_rate': 0.12,
        'avg_doc_hours': 1.8,
        'ai_accuracy': (91, 95),
        'weight': 0.15
    },
    'Citi': {
        'full': 'Citigroup',
        'template_usage': 0.75,
        'break_rate': 0.15,
        'avg_doc_hours': 2.5,
        'ai_accuracy': (89, 94),
        'weight': 0.13
    },
    'JPM': {
        'full': 'JP Morgan',
        'template_usage': 0.65,
        'break_rate': 0.22,
        'avg_doc_hours': 4.5,
        'ai_accuracy': (85, 92),
        'weight': 0.20
    },
    'DB': {
        'full': 'Deutsche Bank',
        'template_usage': 0.70,
        'break_rate': 0.18,
        'avg_doc_hours': 3.2,
        'ai_accuracy': (87, 93),
        'weight': 0.07
    },
    'Barclays': {
        'full': 'Barclays',
        'template_usage': 0.72,
        'break_rate': 0.16,
        'avg_doc_hours': 2.8,
        'ai_accuracy': (88, 94),
        'weight': 0.04
    }
}

# Product types by family
PRODUCTS = {
    'rates': {
        'products': ['IRS', 'CMS Option', 'Swaption', 'Cross-Ccy Swap'],
        'weight': 0.47,
        'fields': ['notional', 'effectiveDate', 'terminationDate', 'paymentFrequency', 'spread', 'strike']
    },
    'fx': {
        'products': ['FX Option', 'FX Forward'],
        'weight': 0.27,
        'fields': ['strike', 'notional', 'effectiveDate', 'settlementDate']
    },
    'equity': {
        'products': ['Equity Option', 'Equity Swap', 'Variance Swap'],
        'weight': 0.20,
        'fields': ['strike', 'notional', 'effectiveDate', 'basketTerms', 'varianceStrike']
    },
    'credit': {
        'products': ['Credit Default Swap'],
        'weight': 0.06,
        'fields': ['notional', 'effectiveDate', 'terminationDate', 'spread']
    }
}

CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY']
TRADE_TYPES = ['new', 'unwind', 'novation', 'partial_unwind']

def random_datetime_between(start: datetime, end: datetime) -> datetime:
    """Generate random datetime between start and end"""
    delta = end - start
    random_seconds = random.randint(0, int(delta.total_seconds()))
    return start + timedelta(seconds=random_seconds)

def add_hours(dt: datetime, hours: float) -> datetime:
    """Add hours to datetime"""
    return dt + timedelta(hours=hours)

def calculate_hours_between(start: datetime, end: datetime) -> float:
    """Calculate hours between two datetimes"""
    return (end - start).total_seconds() / 3600

def calculate_days_between(start: datetime, end: datetime) -> float:
    """Calculate days between two datetimes"""
    return (end - start).total_seconds() / 86400

def generate_trade_id(index: int) -> str:
    """Generate sequential trade ID"""
    return str(10000 + index)

def select_counterparty() -> str:
    """Select counterparty based on weights"""
    cps = list(COUNTERPARTIES.keys())
    weights = [COUNTERPARTIES[cp]['weight'] for cp in cps]
    return random.choices(cps, weights=weights)[0]

def select_product() -> tuple:
    """Select product family and specific product"""
    families = list(PRODUCTS.keys())
    family_weights = [PRODUCTS[f]['weight'] for f in families]
    family = random.choices(families, weights=family_weights)[0]
    product = random.choice(PRODUCTS[family]['products'])
    return family, product

def calculate_risk_score(notional: int, high_sev_breaks: int, hours_outstanding: float) -> int:
    """Calculate risk score based on notional, severity, and time"""
    if high_sev_breaks == 0:
        return 0
    
    # Time weight (step function)
    if hours_outstanding <= 24:
        time_weight = 1.0
    elif hours_outstanding <= 48:
        time_weight = 2.0
    elif hours_outstanding <= 120:
        time_weight = 5.0
    else:
        time_weight = 15.0
    
    # Severity multiplier for high severity
    severity_factor = high_sev_breaks * 5
    
    # Risk score
    base = (notional / 1000000) * severity_factor
    return int(base * time_weight)

def generate_trade(index: int) -> Dict:
    """Generate a single trade record"""
    trade_id = generate_trade_id(index)
    
    # Basic trade attributes
    executed_time = random_datetime_between(START_DATE, END_DATE)
    trade_date = executed_time.strftime('%Y-%m-%d')
    
    counterparty = select_counterparty()
    cp_profile = COUNTERPARTIES[counterparty]
    
    product_family, product_type = select_product()
    product_info = PRODUCTS[product_family]
    
    notional = random.randint(5, 100) * 1000000
    currency = random.choice(CURRENCIES)
    trade_type = random.choices(TRADE_TYPES, weights=[0.85, 0.08, 0.04, 0.03])[0]
    
    # Template decision
    has_template = random.random() < 0.78  # 78% have templates
    template_used = has_template and (random.random() < cp_profile['template_usage'])
    
    # Determine if this trade will have breaks
    will_have_breaks = random.random() < cp_profile['break_rate']
    
    # Generate timestamps
    doc_hours = random.gauss(cp_profile['avg_doc_hours'], 1.0)
    doc_hours = max(0.5, min(doc_hours, 12))  # Clamp between 0.5 and 12 hours
    
    doc_received_time = add_hours(executed_time, doc_hours)
    affirmation_sent_time = add_hours(executed_time, random.uniform(0.25, 1.0))
    
    # Review timing
    review_start_time = add_hours(doc_received_time, random.uniform(0.25, 1.5))
    review_hours = random.uniform(1, 4) if not will_have_breaks else random.uniform(2, 8)
    review_completed_time = add_hours(review_start_time, review_hours)
    
    # Initialize variables
    affirmation_completed_time = None
    confirmed_time = None
    dispute_start_time = None
    dispute_resolved_time = None
    break_count = 0
    high_sev_breaks = 0
    medium_sev_breaks = 0
    low_sev_breaks = 0
    break_fields = []
    break_owner = None
    break_category = None
    is_disputed = False
    status = 'pending_confirmation'
    
    if will_have_breaks:
        # Generate breaks
        is_disputed = True
        status = 'disputed'
        break_count = random.choices([1, 2, 3], weights=[0.7, 0.25, 0.05])[0]
        
        # Mostly high severity breaks for realism
        for _ in range(break_count):
            severity = random.choices(['high', 'medium', 'low'], weights=[0.6, 0.3, 0.1])[0]
            if severity == 'high':
                high_sev_breaks += 1
            elif severity == 'medium':
                medium_sev_breaks += 1
            else:
                low_sev_breaks += 1
        
        # Select break fields
        available_fields = product_info['fields']
        break_fields = random.sample(available_fields, min(break_count, len(available_fields)))
        
        break_owner = random.choices(['dealer', 'client', 'ai'], weights=[0.68, 0.23, 0.09])[0]
        break_category = 'economic_high' if high_sev_breaks > 0 else 'economic_medium'
        
        dispute_start_time = review_completed_time
        
        # Some disputes are resolved, some are still open
        if random.random() < 0.3:  # 30% resolved
            dispute_days = random.uniform(1, 7)
            dispute_resolved_time = add_hours(dispute_start_time, dispute_days * 24)
            confirmed_time = dispute_resolved_time
            status = 'confirmed'
        else:
            # Still in dispute
            dispute_resolved_time = None
            confirmed_time = None
    else:
        # No breaks - confirm it
        confirmed_time = review_completed_time
        status = 'confirmed'
        
        # Some trades get affirmation
        if random.random() < 0.4:
            affirmation_completed_time = add_hours(affirmation_sent_time, random.uniform(0.5, 3))
    
    # Auto-match logic
    auto_match_attempted = status in ['confirmed', 'disputed']
    auto_match_succeeded = auto_match_attempted and not will_have_breaks
    
    # AI extraction
    if auto_match_attempted:
        ai_accuracy = random.randint(cp_profile['ai_accuracy'][0], cp_profile['ai_accuracy'][1])
        ai_fields_extracted = product_info['fields'][:random.randint(3, len(product_info['fields']))]
    else:
        ai_accuracy = None
        ai_fields_extracted = []
    
    # Calculate timing metrics
    time_to_doc_hours = round(calculate_hours_between(executed_time, doc_received_time), 2)
    time_to_affirm_hours = round(calculate_hours_between(executed_time, affirmation_completed_time), 2) if affirmation_completed_time else None
    time_to_confirm_hours = round(calculate_hours_between(executed_time, confirmed_time), 2) if confirmed_time else None
    time_in_review_hours = round(calculate_hours_between(review_start_time, review_completed_time), 2)
    time_in_dispute_days = round(calculate_days_between(dispute_start_time, dispute_resolved_time), 1) if dispute_resolved_time else round(calculate_days_between(dispute_start_time, datetime.now()), 1) if dispute_start_time else None
    
    # SLA check (affirmed or confirmed within 24 hours)
    met_sla = False
    if affirmation_completed_time and calculate_hours_between(executed_time, affirmation_completed_time) <= 24:
        met_sla = True
    if confirmed_time and calculate_hours_between(executed_time, confirmed_time) <= 24:
        met_sla = True
    
    # Risk score
    hours_outstanding = calculate_hours_between(dispute_start_time, datetime.now()) if dispute_start_time and not dispute_resolved_time else 0
    risk_score = calculate_risk_score(notional, high_sev_breaks, hours_outstanding)
    
    # Handle pending trades (no review started yet)
    if random.random() < 0.16:  # 16% pending
        review_start_time = None
        review_completed_time = None
        confirmed_time = None
        status = 'pending_confirmation'
        time_in_review_hours = None
        auto_match_attempted = False
        auto_match_succeeded = False
        ai_accuracy = None
        ai_fields_extracted = []
        risk_score = random.randint(100, 1000)
    
    return {
        'tradeId': trade_id,
        'tradeDate': trade_date,
        'executedTime': executed_time.isoformat() + 'Z',
        'productType': product_type,
        'productFamily': product_family,
        'counterparty': counterparty,
        'counterpartyFull': cp_profile['full'],
        'notional': notional,
        'currency': currency,
        'tradeType': trade_type,
        'hasTemplate': has_template,
        'templateUsed': template_used,
        'docReceivedTime': doc_received_time.isoformat() + 'Z' if doc_received_time else None,
        'affirmationSentTime': affirmation_sent_time.isoformat() + 'Z' if affirmation_sent_time else None,
        'affirmationCompletedTime': affirmation_completed_time.isoformat() + 'Z' if affirmation_completed_time else None,
        'reviewStartTime': review_start_time.isoformat() + 'Z' if review_start_time else None,
        'reviewCompletedTime': review_completed_time.isoformat() + 'Z' if review_completed_time else None,
        'confirmedTime': confirmed_time.isoformat() + 'Z' if confirmed_time else None,
        'hasBreaks': is_disputed,
        'breakCount': break_count,
        'highSeverityBreakCount': high_sev_breaks,
        'mediumSeverityBreakCount': medium_sev_breaks,
        'lowSeverityBreakCount': low_sev_breaks,
        'breakFields': break_fields,
        'breakOwner': break_owner,
        'breakCategory': break_category,
        'isDisputed': is_disputed,
        'disputeStartTime': dispute_start_time.isoformat() + 'Z' if dispute_start_time else None,
        'disputeResolvedTime': dispute_resolved_time.isoformat() + 'Z' if dispute_resolved_time else None,
        'autoMatchAttempted': auto_match_attempted,
        'autoMatchSucceeded': auto_match_succeeded,
        'aiExtractionAccuracy': ai_accuracy,
        'aiFieldsExtracted': ai_fields_extracted,
        'status': status,
        'metSLA': met_sla,
        'riskScore': risk_score,
        'timeToDocHours': time_to_doc_hours,
        'timeToAffirmHours': time_to_affirm_hours,
        'timeToConfirmHours': time_to_confirm_hours,
        'timeInReviewHours': time_in_review_hours,
        'timeInDisputeDays': time_in_dispute_days
    }

def generate_dataset(num_trades: int = TOTAL_TRADES) -> List[Dict]:
    """Generate full dataset"""
    trades = []
    for i in range(num_trades):
        trade = generate_trade(i)
        trades.append(trade)
    
    # Sort by executed time
    trades.sort(key=lambda x: x['executedTime'])
    
    return trades

def main():
    """Generate and save mock data"""
    print(f"Generating {TOTAL_TRADES} trade records...")
    
    trades = generate_dataset()
    
    # Save to JSON file
    output_file = 'mockTrades.json'
    with open(output_file, 'w') as f:
        json.dump(trades, f, indent=2)
    
    print(f"✓ Generated {len(trades)} trades")
    print(f"✓ Saved to {output_file}")
    
    # Print summary statistics
    confirmed = sum(1 for t in trades if t['status'] == 'confirmed')
    disputed = sum(1 for t in trades if t['status'] == 'disputed')
    pending = sum(1 for t in trades if t['status'] == 'pending_confirmation')
    
    print("\nSummary:")
    print(f"  Confirmed: {confirmed} ({confirmed/len(trades)*100:.1f}%)")
    print(f"  Disputed: {disputed} ({disputed/len(trades)*100:.1f}%)")
    print(f"  Pending: {pending} ({pending/len(trades)*100:.1f}%)")
    
    # Counterparty breakdown
    print("\nBy Counterparty:")
    for cp in COUNTERPARTIES.keys():
        count = sum(1 for t in trades if t['counterparty'] == cp)
        print(f"  {cp}: {count} ({count/len(trades)*100:.1f}%)")
    
    # Template coverage
    with_template = sum(1 for t in trades if t['hasTemplate'])
    template_used = sum(1 for t in trades if t['templateUsed'])
    print(f"\nTemplate Coverage:")
    print(f"  Has template: {with_template} ({with_template/len(trades)*100:.1f}%)")
    print(f"  Template used: {template_used} ({template_used/len(trades)*100:.1f}%)")

if __name__ == '__main__':
    main()