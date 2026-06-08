import React from 'react';
import {
  EmailLayout,
  PageTitle,
  BodyText,
  AffirmationTable,
  MD,
  LG,
} from '../react-email-src/components';

interface TradeField {
  field: string;
  value: string;
  counterparty?: string;
}

interface TradeGroup {
  groupName: string;
  rows: TradeField[];
}

interface AffirmationProps {
  organization_name: string;
  groups?: TradeGroup[];
  trade_id?: string;
  counterparty_ref?: string;
  amount?: string;
  currency?: string;
}

export const Affirmation: React.FC<AffirmationProps> = ({
  organization_name = '{{organization_name}}',
  groups,
  trade_id = '{{trade_id}}',
  counterparty_ref = '{{counterparty_ref}}',
  amount = '{{amount}}',
  currency = '{{currency}}',
}) => {
  const isPreviewMode = organization_name !== '{{organization_name}}';

  const tableGroups = groups || [
    {
      groupName: 'Trade Details',
      rows: [
        { field: 'Trade ID', value: trade_id, counterparty: '' },
        {
          field: 'Counterparty Ref',
          value: counterparty_ref,
          counterparty: '',
        },
        { field: 'Amount', value: amount, counterparty: '' },
        { field: 'Currency', value: currency, counterparty: '' },
      ],
    },
  ];

  return (
    <EmailLayout preheader="Trade affirmation required">
      <PageTitle>Trade Affirmation Required</PageTitle>

      <BodyText>
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span> is
        requesting your affirmation of the following trade. Please review the
        detailed trade information provided below.
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

      {isPreviewMode ? (
        <AffirmationTable groups={tableGroups} />
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
                <thead>
                  <tr>
                    <th style="padding: 4px 8px; border-top: 1px solid #e5e7eb; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left; width: 30%;">
                      Field
                    </th>
                    <th style="padding: 4px 8px; border-top: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left; width: 35%;">
                      Value
                    </th>
                    <th style="padding: 4px 8px; border-top: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left; width: 35%;">
                      Counterparty Economics (if disputed)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {{#each groups}}
                  <tr>
                    <td colspan="3" style="padding: 4px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: bold; color: #111827; background-color: #f3f4f6; text-align: left;">
                      {{groupName}}
                    </td>
                  </tr>
                  {{#each rows}}
                  <tr>
                    <td style="padding: 4px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: normal; color: #374151; background-color: #f9fafb; vertical-align: top;">
                      {{field}}
                    </td>
                    <td style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #111827; vertical-align: top; word-break: break-word;">
                      {{value}}
                    </td>
                    <td style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #6b7280; vertical-align: top; word-break: break-word;">
                      {{#if counterparty}}{{counterparty}}{{/if}}
                    </td>
                  </tr>
                  {{/each}}
                  {{/each}}
                </tbody>
              </table>
            `,
          }}
        />
      )}
    </EmailLayout>
  );
};

export default Affirmation;
