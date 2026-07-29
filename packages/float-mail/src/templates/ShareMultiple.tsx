import React from 'react';
import {
  DocumentActionEmail,
  type DocumentRow,
} from '../react-email-src/components';

/**
 * ShareMultiple
 *
 * Sent when someone shares one or more trade confirmations. A person performs
 * this action, so the headline names `person_name` rather than the firm.
 *
 * Handles one document or many — see DocumentActionEmail for the card layout
 * and the dual-mode (preview / SendGrid export) split.
 */

interface ShareMultipleProps {
  person_name?: string;
  /** Only labels the client-side identifiers; the headline names the person. */
  organization_name?: string;
  message?: string;
  dynamic_table_data?: DocumentRow[];
}

export const ShareMultiple: React.FC<ShareMultipleProps> = ({
  person_name = '{{person_name}}',
  organization_name,
  message,
  dynamic_table_data,
}) => (
  <DocumentActionEmail
    variant="share"
    actorName={person_name}
    organizationName={organization_name}
    message={message}
    documents={dynamic_table_data}
  />
);

export default ShareMultiple;
