import React from 'react';
import {
  EmailLayout,
  PageTitle,
  BodyText,
  DataTable,
  LG,
} from '../react-email-src/components';

interface ReturnConfirmTableProps {
  organization_name: string;
  table_fields: Array<{ label: string; value: string }>;
}

export const ReturnConfirmTable: React.FC<ReturnConfirmTableProps> = ({
  organization_name = '{{organization_name}}',
  table_fields = [
    { label: 'Trade ID', value: '{{trade_id}}' },
    { label: 'Counterparty', value: '{{counterparty}}' },
    { label: 'Trade Date', value: '{{trade_date}}' },
    { label: 'Amount', value: '{{amount}}' },
  ],
}) => {
  return (
    <EmailLayout preheader="Trade confirmation received">
      <PageTitle>
        You have received a signed trade confirmation from{' '}
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span>
      </PageTitle>

      <BodyText>
        Please find your fully executed trade confirmation for the following
        trade attached to this email.
      </BodyText>

      <LG />

      <DataTable title="Trade Details" data={table_fields} />
    </EmailLayout>
  );
};

export default ReturnConfirmTable;
