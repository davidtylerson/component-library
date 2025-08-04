import React from 'react';
import { 
  EmailLayout, 
  PageTitle, 
  BodyText, 
  Callout, 
  SubsectionTitle,
  MD
} from '../react-email-src/components';

interface ReturnConfirmSimpleProps {
  organization_name: string;
  message?: string;
}

export const ReturnConfirmSimple: React.FC<ReturnConfirmSimpleProps> = ({
  organization_name = "{{organization_name}}",
  message,
}) => {
  return (
    <EmailLayout preheader="Trade confirmation received">
      <PageTitle>
        You have received a signed trade confirmation from{' '}
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span>
      </PageTitle>
      
      {message && (
        <>
          <MD />
          <SubsectionTitle>Message from your counterparty</SubsectionTitle>
          <Callout>
            <BodyText>{message}</BodyText>
          </Callout>
        </>
      )}
      
      <BodyText>
        Please find your fully executed trade confirmation attached to this email.
      </BodyText>
    </EmailLayout>
  );
};

export default ReturnConfirmSimple; 