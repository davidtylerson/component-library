import React from 'react';
import { 
  EmailLayout, 
  Callout, 
  DataTable, 
  SectionTitle, 
  SubsectionTitle,
  BodyText,
  MD
} from '../react-email-src/components';

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
  organization_name = "{{organization_name}}",
  message = "{{message}}",
  product_type = "{{product_type}}",
  trade_id = "{{trade_id}}",
  counterparty_ref = "{{counterparty_ref}}",
  trade_date = "{{trade_date}}",
  confirmation_date = "{{confirmation_date}}"
}) => {
  return (
    <EmailLayout preheader="Disputed Confirmation">
      <SectionTitle>
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span> has raised a dispute with your trade confirmation
      </SectionTitle>
      
      <MD />
      
      <SubsectionTitle>Dispute Details</SubsectionTitle>
      
      <Callout>
        <BodyText>{message}</BodyText>
      </Callout>
      
      <MD />
      
      <DataTable 
        title="Trade Details"
        data={[
          { label: "Product Type", value: product_type },
          { label: "Trade ID", value: trade_id },
          { label: "Counterparty Ref", value: counterparty_ref },
          { label: "Trade Date", value: trade_date },
          { label: "Confirmation Date", value: confirmation_date }
        ]}
      />
    </EmailLayout>
  );
};

export default DisputeConfirm; 