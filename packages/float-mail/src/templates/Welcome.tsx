import React from 'react';
import {
  EmailLayout,
  PageTitle,
  BodyText,
  ActionButton,
  CenteredLayout,
  LG,
} from '../react-email-src/components';

interface WelcomeProps {
  sender_name: string;
  organization_name: string;
  url: string;
}

export const Welcome: React.FC<WelcomeProps> = ({
  sender_name = '{{sender_name}}',
  organization_name = '{{organization_name}}',
  url = '{{url}}',
}) => {
  return (
    <EmailLayout preheader="Welcome to Float">
      <CenteredLayout>
        <PageTitle>Welcome to Float</PageTitle>

        <BodyText>Hello,</BodyText>

        <BodyText>
          <span style={{ fontWeight: 'bold' }}>{sender_name}</span> has invited
          you to join the organization{' '}
          <span style={{ fontWeight: 'bold' }}>{organization_name}</span> on the
          Float platform. Follow the link below to set up your account and
          profile.
        </BodyText>

        <LG />

        <ActionButton href={url} fullWidth>
          Accept Invitation
        </ActionButton>

        <LG />

        <BodyText>
          If you have any questions, please don't hesitate to reach out to our
          support team.
        </BodyText>

        <BodyText>
          Best regards,
          <br />
          The Float Team
        </BodyText>
      </CenteredLayout>
    </EmailLayout>
  );
};

export default Welcome;
