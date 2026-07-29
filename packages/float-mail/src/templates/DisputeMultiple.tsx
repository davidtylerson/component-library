import React from 'react';
import {
  DocumentActionEmail,
  type DocumentRow,
} from '../react-email-src/components';

/**
 * DisputeMultiple
 *
 * Sent when a counterparty disputes one or more trade confirmations. A dispute
 * is raised by an institution, so the headline names `organization_name`.
 *
 * One `message` covers the whole batch. The previous version of this template
 * carried a per-document `comment` column; that was dropped deliberately when
 * the payload moved to a single shared message.
 *
 * Handles one document or many — see DocumentActionEmail for the card layout
 * and the dual-mode (preview / SendGrid export) split.
 */

interface DisputeMultipleProps {
  organization_name?: string;
  message?: string;
  dynamic_table_data?: DocumentRow[];
}

export const DisputeMultiple: React.FC<DisputeMultipleProps> = ({
  organization_name = '{{organization_name}}',
  message,
  dynamic_table_data,
}) => (
  <DocumentActionEmail
    variant="dispute"
    actorName={organization_name}
    organizationName={organization_name}
    message={message}
    documents={dynamic_table_data}
  />
);

export default DisputeMultiple;
