import React from 'react';
import {
  DocumentActionEmail,
  type DocumentRow,
} from '../react-email-src/components';

/**
 * ReturnMultiple
 *
 * Sent when a counterparty signs and returns one or more trade confirmations.
 * The signing entity is the firm, so the headline names `organization_name`.
 *
 * Unlike Share and Dispute this variant carries no message block; instead it
 * keeps the "fully executed confirmation attached" line from the template it
 * replaces, pluralized with the document count.
 *
 * Handles one document or many — see DocumentActionEmail for the card layout
 * and the dual-mode (preview / SendGrid export) split.
 */

interface ReturnMultipleProps {
  organization_name?: string;
  dynamic_table_data?: DocumentRow[];
}

export const ReturnMultiple: React.FC<ReturnMultipleProps> = ({
  organization_name = '{{organization_name}}',
  dynamic_table_data,
}) => (
  <DocumentActionEmail
    variant="return"
    actorName={organization_name}
    organizationName={organization_name}
    documents={dynamic_table_data}
  />
);

export default ReturnMultiple;
