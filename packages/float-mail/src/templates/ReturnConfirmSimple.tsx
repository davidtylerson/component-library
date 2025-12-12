import React from 'react';
import {
  EmailLayout,
  PageTitle,
  BodyText,
  Callout,
  SubsectionTitle,
  MD,
} from '../react-email-src/components';

interface ReturnConfirmSimpleProps {
  organization_name: string;
  message?: string;
}

export const ReturnConfirmSimple: React.FC<ReturnConfirmSimpleProps> = ({
  organization_name = '{{organization_name}}',
  message = '{{message}}' as any,
}) => {
  // Detect if we're in preview mode (with real data) or export mode (with template variables)
  const isPreviewMode = organization_name !== '{{organization_name}}';
  const hasMessage = isPreviewMode && message && message !== '{{message}}';

  return (
    <EmailLayout preheader="Trade confirmation received">
      <PageTitle>
        You have received a signed trade confirmation from{' '}
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span>
      </PageTitle>

      {/* Render message - dual mode for preview and SendGrid */}
      {isPreviewMode ? (
        // Preview mode: use React components
        hasMessage && (
          <>
            <MD />
            <SubsectionTitle>Message from your counterparty</SubsectionTitle>
            <Callout>
              <BodyText>{message}</BodyText>
            </Callout>
          </>
        )
      ) : (
        // Export mode: use Handlebars HTML
        <div
          dangerouslySetInnerHTML={{
            __html: `
              {{#if message}}
              <div style="height: 16px;"></div>
              <h3 style="font-size: 16px; font-weight: bold; line-height: 1.3; margin: 0 0 12px 0; color: #111827;">Message from your counterparty</h3>
              <div style="background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px; width: 100%; box-sizing: border-box;">
                <p style="font-size: 14px; line-height: 1.5; color: #374151; margin: 0 0 12px 0;">{{message}}</p>
              </div>
              {{/if}}
            `,
          }}
        />
      )}

      <BodyText>
        Please find your fully executed trade confirmation attached to this
        email.
      </BodyText>
    </EmailLayout>
  );
};

export default ReturnConfirmSimple;
