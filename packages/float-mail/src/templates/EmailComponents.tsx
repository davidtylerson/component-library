import React from 'react';
import { 
  EmailLayout, 
  PageTitle, 
  SectionTitle, 
  SubsectionTitle,
  BodyText, 
  LeadText,
  CaptionText,
  MutedText,
  Callout,
  DataTable,
  GroupedDataTable,
  ActionButton,
  Button,
  TextLink,
  Card,
  Row,
  Column,
  Divider,
  MD,
  LG
} from '../react-email-src/components';

interface EmailComponentsProps {
  table_fields?: Array<{label: string, value: string}>;
  grouped_data?: Array<{
    groupName?: string;
    rows: Array<{field: string, value: string, counterparty: string}>;
  }>;
}

export const EmailComponents: React.FC<EmailComponentsProps> = ({
  table_fields = [
    { label: "Component", value: "Status" },
    { label: "Typography", value: "✅ Complete" },
    { label: "Spacing", value: "✅ Complete" },
    { label: "Layout", value: "✅ Complete" },
    { label: "Interactive", value: "✅ Complete" }
  ],
  grouped_data = [
    {
      groupName: "Typography Components",
      rows: [
        { field: "PageTitle", value: "Large page headings", counterparty: "" },
        { field: "SectionTitle", value: "Section headings", counterparty: "" },
        { field: "BodyText", value: "Regular body text", counterparty: "" }
      ]
    },
    {
      groupName: "Layout Components", 
      rows: [
        { field: "Card", value: "Content containers", counterparty: "" },
        { field: "Row/Column", value: "Flexbox layouts", counterparty: "" }
      ]
    }
  ]
}) => {
  return (
    <EmailLayout preheader="Float Email Components Showcase">
      <PageTitle>Float Email Components</PageTitle>
      
      <LeadText>
        This template showcases all available components in the Float email system.
      </LeadText>
      
      <MD />
      
      <SectionTitle>Typography Components</SectionTitle>
      
      <BodyText>This is regular body text with proper spacing and typography.</BodyText>
      
      <SubsectionTitle>Text Variants</SubsectionTitle>
      
      <BodyText>Regular body text for main content.</BodyText>
      <LeadText>Lead text for important introductory content.</LeadText>
      <CaptionText>Caption text for small, secondary information.</CaptionText>
      <MutedText>Muted text for less important content.</MutedText>
      
      <LG />
      
      <SectionTitle>Interactive Components</SectionTitle>
      
      <Row gap="md">
        <Column>
          <ActionButton href="https://float.tech" fullWidth>
            Primary Action
          </ActionButton>
        </Column>
        <Column>
          <Button href="https://float.tech" variant="outline" fullWidth>
            Secondary Action
          </Button>
        </Column>
      </Row>
      
      <MD />
      
      <BodyText>
        This is a <TextLink href="https://float.tech">text link</TextLink> within body text.
      </BodyText>
      
      <LG />
      
      <SectionTitle>Content Components</SectionTitle>
      
      <Callout variant="default">
        <BodyText>This is a default callout box for important messages.</BodyText>
      </Callout>
      
      <MD />
      
      <Callout variant="warning">
        <BodyText>This is a warning callout for alerts and notices.</BodyText>
      </Callout>
      
      <MD />
      
      <Callout variant="success">
        <BodyText>This is a success callout for positive confirmations.</BodyText>
      </Callout>
      
      <LG />
      
      <SectionTitle>Data Tables</SectionTitle>
      
      <DataTable 
        title="Component Status"
        data={table_fields}
      />
      
      <LG />
      
      <GroupedDataTable 
        title="Component Categories"
        groups={grouped_data}
      />
      
      <LG />
      
      <SectionTitle>Layout Components</SectionTitle>
      
      <Card variant="default" padding="md">
        <SubsectionTitle>Default Card</SubsectionTitle>
        <BodyText>This is a default card with standard styling and subtle shadow.</BodyText>
      </Card>
      
      <Card variant="elevated" padding="md">
        <SubsectionTitle>Elevated Card</SubsectionTitle>
        <BodyText>This card has a more prominent shadow for emphasis and visual hierarchy.</BodyText>
      </Card>
      
      <Card variant="outlined" padding="lg">
        <SubsectionTitle>Outlined Card</SubsectionTitle>
        <BodyText>This card has a prominent border in Float brand color for special content and calls-to-action.</BodyText>
      </Card>
      
      <LG />
      
      <Divider />
      
      <MutedText align="center">
        This template demonstrates all available components in the Float email system.
      </MutedText>
    </EmailLayout>
  );
};

export default EmailComponents; 