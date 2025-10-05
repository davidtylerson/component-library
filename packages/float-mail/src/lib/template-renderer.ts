import React from 'react';
import { render } from '@react-email/render';
import { TemplateData, RenderedTemplate } from '@/types/template-types';

// Import actual email templates
import { Welcome } from '@/templates/Welcome';
import { PasswordReset } from '@/templates/PasswordReset';
import { DisputeConfirm } from '@/templates/DisputeConfirm';
import { ReturnConfirmSimple } from '@/templates/ReturnConfirmSimple';
import { Affirmation } from '@/templates/Affirmation';
import { AffirmationMultiple } from '@/templates/AffirmationMultiple';
import { DisputeMultiple } from '@/templates/DisputeMultiple';
import { ReturnConfirmTable } from '@/templates/ReturnConfirmTable';
import { EmailComponents } from '@/templates/EmailComponents';

// Map template names to their components
const TEMPLATE_COMPONENTS: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  Welcome,
  PasswordReset,
  DisputeConfirm,
  ReturnConfirmSimple,
  Affirmation,
  AffirmationMultiple,
  DisputeMultiple,
  ReturnConfirmTable,
  EmailComponents,
};

// Template source code (simplified versions for display)
const TEMPLATE_SOURCE_CODE: Record<string, string> = {
  Welcome: `import React from 'react';
import { Container, Section, Text, Button } from '@react-email/components';

interface WelcomeProps {
  sender_name: string;
  organization_name: string;
  url: string;
}

export const Welcome: React.FC<WelcomeProps> = ({
  sender_name,
  organization_name,
  url,
}) => {
  return (
    <Container>
      <Section>
        <Text>Hello,</Text>
        <Text>
          Welcome to {organization_name}! {sender_name} has invited you to join.
        </Text>
        <Button href={url}>Accept Invitation</Button>
      </Section>
    </Container>
  );
};`,

  PasswordReset: `import React from 'react';
import { Container, Section, Text, Button } from '@react-email/components';

interface PasswordResetProps {
  user_name: string;
  reset_url: string;
  expiry_hours: number;
}

export const PasswordReset: React.FC<PasswordResetProps> = ({
  user_name,
  reset_url,
  expiry_hours,
}) => {
  return (
    <Container>
      <Section>
        <Text>Hello {user_name},</Text>
        <Text>You requested a password reset. Click the button below:</Text>
        <Button href={reset_url}>Reset Password</Button>
        <Text>This link expires in {expiry_hours} hours.</Text>
      </Section>
    </Container>
  );
};`,

  DisputeConfirm: `import React from 'react';
import { Container, Section, Text, Hr } from '@react-email/components';

interface DisputeConfirmProps {
  organization_name: string;
  message: string;
  product_type: string;
  trade_id: string;
  counterparty_ref: string;
  trade_date: string;
  confirmation_date: string;
}

export const DisputeConfirm: React.FC<DisputeConfirmProps> = ({
  organization_name,
  message,
  product_type,
  trade_id,
  counterparty_ref,
  trade_date,
  confirmation_date,
}) => {
  return (
    <Container>
      <Section>
        <Text>Dispute Confirmation</Text>
        <Text>Organization: {organization_name}</Text>
        <Text>Message: {message}</Text>
        <Hr />
        <Text>Trade ID: {trade_id}</Text>
        <Text>Product: {product_type}</Text>
        <Text>Date: {trade_date}</Text>
      </Section>
    </Container>
  );
};`,

  DisputeMultiple: `import React from 'react';
import { Container, Section, Text, Table, Td, Tr } from '@react-email/components';

interface DisputeMultipleProps {
  organization_name: string;
  disputedDocuments: Array<{
    trade_id: string;
    counterparty_ref: string;
    comment: string;
  }>;
}

export const DisputeMultiple: React.FC<DisputeMultipleProps> = ({
  organization_name,
  disputedDocuments,
}) => {
  return (
    <Container>
      <Section>
        <Text>Multiple Disputes - {organization_name}</Text>
        <Table>
          {disputedDocuments.map((doc, index) => (
            <Tr key={index}>
              <Td>{doc.trade_id}</Td>
              <Td>{doc.counterparty_ref}</Td>
              <Td>{doc.comment}</Td>
            </Tr>
          ))}
        </Table>
      </Section>
    </Container>
  );
};`,

  ReturnConfirmSimple: `import React from 'react';
import { Container, Section, Text } from '@react-email/components';

interface ReturnConfirmSimpleProps {
  organization_name: string;
  trade_id: string;
  counterparty_ref: string;
  trade_date: string;
  amount: string;
  currency: string;
}

export const ReturnConfirmSimple: React.FC<ReturnConfirmSimpleProps> = ({
  organization_name,
  trade_id,
  counterparty_ref,
  trade_date,
  amount,
  currency,
}) => {
  return (
    <Container>
      <Section>
        <Text>Return Confirmed</Text>
        <Text>Organization: {organization_name}</Text>
        <Text>Trade ID: {trade_id}</Text>
        <Text>Amount: {amount} {currency}</Text>
        <Text>Date: {trade_date}</Text>
      </Section>
    </Container>
  );
};`,

  ReturnConfirmTable: `import React from 'react';
import { Container, Section, Text, Table, Td, Tr } from '@react-email/components';

interface ReturnConfirmTableProps {
  organization_name: string;
  table_fields: Array<{ label: string; value: string }>;
}

export const ReturnConfirmTable: React.FC<ReturnConfirmTableProps> = ({
  organization_name,
  table_fields,
}) => {
  return (
    <Container>
      <Section>
        <Text>Return Confirmation - {organization_name}</Text>
        <Table>
          {table_fields.map((field, index) => (
            <Tr key={index}>
              <Td>{field.label}</Td>
              <Td>{field.value}</Td>
            </Tr>
          ))}
        </Table>
      </Section>
    </Container>
  );
};`,

  Affirmation: `import React from 'react';
import { Container, Section, Text, Button } from '@react-email/components';

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
  organization_name,
  action,
  trade_id,
  counterparty_ref,
  trade_date,
  amount,
  currency,
}) => {
  return (
    <Container>
      <Section>
        <Text>{action} Confirmed</Text>
        <Text>Organization: {organization_name}</Text>
        <Text>Trade ID: {trade_id}</Text>
        <Text>Amount: {amount} {currency}</Text>
        <Text>Date: {trade_date}</Text>
      </Section>
    </Container>
  );
};`,

  EmailComponents: `import React from 'react';
import {
  EmailLayout,
  PageTitle,
  SectionTitle,
  BodyText,
  DataTable,
  GroupedDataTable,
  ActionButton,
  Callout,
  MD,
  LG,
} from '../react-email-src/components';

interface EmailComponentsProps {
  table_fields?: Array<{ label: string; value: string }>;
  grouped_data?: Array<{
    groupName?: string;
    rows: Array<{ field: string; value: string; counterparty: string }>;
  }>;
}

export const EmailComponents: React.FC<EmailComponentsProps> = ({
  table_fields,
  grouped_data,
}) => {
  return (
    <EmailLayout preheader="Showcase of Float email components">
      <PageTitle>Float Email Components</PageTitle>
      <BodyText>
        This template showcases all available Float email components.
      </BodyText>
      <MD />
      
      {table_fields && (
        <>
          <SectionTitle>Simple Data Table</SectionTitle>
          <DataTable data={table_fields} />
          <LG />
        </>
      )}
      
      {grouped_data && (
        <>
          <SectionTitle>Grouped Data Table</SectionTitle>
          <GroupedDataTable groups={grouped_data} />
          <LG />
        </>
      )}
      
      <Callout variant="success">
        <BodyText>All components are working correctly!</BodyText>
      </Callout>
      
      <MD />
      <ActionButton href="https://float.tech">Learn More</ActionButton>
    </EmailLayout>
  );
};`,
};

export class TemplateRenderer {
  static getTemplateComponent(
    templateName: string
  ): React.ComponentType<Record<string, unknown>> | null {
    return TEMPLATE_COMPONENTS[templateName] || null;
  }

  static async renderTemplate(
    templateName: string,
    data: TemplateData
  ): Promise<RenderedTemplate | null> {
    const Component = this.getTemplateComponent(templateName);
    if (!Component) return null;

    try {
      const element = React.createElement(Component, data);
      const html = await render(element);
      const text = await render(element, { plainText: true });

      return {
        html,
        text,
        subject: this.extractSubject(templateName),
      };
    } catch {
      // Error rendering template
      return null;
    }
  }

  static getTemplateSourceCode(templateName: string): string {
    return (
      TEMPLATE_SOURCE_CODE[templateName] ||
      `// Template: ${templateName}\n// Source code not available`
    );
  }

  private static extractSubject(templateName: string): string {
    const subjects: Record<string, string> = {
      Welcome: 'Welcome to Float',
      PasswordReset: 'Reset your Float password',
      DisputeConfirm: 'Dispute confirmed for transaction',
      DisputeMultiple: 'Multiple disputes confirmed',
      ReturnConfirmSimple: 'Return confirmed',
      ReturnConfirmTable: 'Return confirmed with details',
      Affirmation: 'Action confirmed',
      AffirmationMultiple: 'Multiple trade affirmations required',
      EmailComponents: 'Float Email Components Showcase',
    };

    return subjects[templateName] || 'Email from Float';
  }
}
