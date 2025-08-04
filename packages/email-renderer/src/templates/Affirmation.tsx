import React from 'react';
import {
  EmailLayout,
  PageTitle,
  BodyText,
  GroupedDataTable,
  MD,
  LG,
} from '../react-email-src/components';

interface TableRow {
  field: string;
  value: string;
  counterparty: string;
}

interface TableGroup {
  groupName?: string;
  rows: TableRow[];
}

interface AffirmationProps {
  counterparty_name: string;
  organization_name: string;
  trade_date: string;
  tableGroups: TableGroup[];
}

export const Affirmation: React.FC<AffirmationProps> = ({
  counterparty_name = '{{counterparty_name}}',
  organization_name = '{{organization_name}}',
  trade_date = '{{trade_date}}',
  tableGroups = [
    {
      groupName: 'Trade Details',
      rows: [
        {
          field: 'Trade ID',
          value: '{{trade_id}}',
          counterparty: '',
        },
        {
          field: 'Trade Date',
          value: '{{trade_date}}',
          counterparty: '',
        },
        {
          field: 'Amount',
          value: '{{amount}}',
          counterparty: '',
        },
      ],
    },
    {
      groupName: 'Settlement Details',
      rows: [
        {
          field: 'Settlement Date',
          value: '{{settlement_date}}',
          counterparty: '',
        },
        {
          field: 'Currency',
          value: '{{currency}}',
          counterparty: '',
        },
      ],
    },
  ],
}) => {
  return (
    <EmailLayout preheader="Trade affirmation required">
      <BodyText>
        Dear <span style={{ fontWeight: 'bold' }}>{counterparty_name}</span>,
        <br />
        <br />
        {organization_name} is requesting your affirmation of the following
        trade executed on{' '}
        <span style={{ fontWeight: 'bold' }}>{trade_date}</span>. Please review
        the detailed trade economics provided in the table below, which reflects
        our understanding of the terms from {organization_name}'s perspective.
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
        of the specific economics you disagree on in the table below along with
        any supporting evidence.
      </BodyText>

      <LG />

      <GroupedDataTable groups={tableGroups} />
    </EmailLayout>
  );
};

export default Affirmation;
