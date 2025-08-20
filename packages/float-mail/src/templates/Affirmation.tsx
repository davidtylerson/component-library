import React from 'react';
import {
  EmailLayout,
  PageTitle,
  BodyText,
  GroupedDataTable,
  MD,
  LG,
} from '../react-email-src/components';

interface AffirmationProps {
  organization_name: string;
  action: string;
  trade_id: string;
  counterparty_ref: string;
  trade_date: string;
  amount: string;
  currency: string;
}

export const Affirmation: React.FC<AffirmationProps> = ({
  organization_name = '{{organization_name}}',
  action = '{{action}}',
  trade_id = '{{trade_id}}',
  counterparty_ref = '{{counterparty_ref}}',
  trade_date = '{{trade_date}}',
  amount = '{{amount}}',
  currency = '{{currency}}',
}) => {
  const tableGroups = [
    {
      groupName: 'Trade Details',
      rows: [
        { field: 'Action', value: action, counterparty: '' },
        { field: 'Trade ID', value: trade_id, counterparty: '' },
        {
          field: 'Counterparty Ref',
          value: counterparty_ref,
          counterparty: '',
        },
        { field: 'Trade Date', value: trade_date, counterparty: '' },
        { field: 'Amount', value: amount, counterparty: '' },
        { field: 'Currency', value: currency, counterparty: '' },
      ],
    },
  ];

  return (
    <EmailLayout preheader="Trade affirmation required">
      <PageTitle>{action} Required</PageTitle>

      <BodyText>
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span> is
        requesting your affirmation of the following trade executed on{' '}
        <span style={{ fontWeight: 'bold' }}>{trade_date}</span>. Please review
        the detailed trade information provided below.
      </BodyText>

      <MD />

      <PageTitle>Action Required:</PageTitle>

      <BodyText>
        1. To Affirm: Reply with{' '}
        <span style={{ fontWeight: 'bold' }}>AGREED</span> if all trade details
        are correct.
        <br />
        2. To Dispute: Reply with{' '}
        <span style={{ fontWeight: 'bold' }}>DISPUTED</span> and provide details
        of any discrepancies.
      </BodyText>

      <LG />

      <GroupedDataTable groups={tableGroups} />
    </EmailLayout>
  );
};

export default Affirmation;
