import React from 'react';
import {
  EmailLayout,
  PageTitle,
  BodyText,
  ActionButton,
  CenteredLayout,
  LG,
  MutedText,
} from '../react-email-src/components';

interface PasswordResetProps {
  user_name: string;
  reset_url: string;
  expiry_hours?: number;
}

export const PasswordReset: React.FC<PasswordResetProps> = ({
  user_name = '{{user_name}}',
  reset_url = '{{reset_url}}',
  expiry_hours = 24,
}) => {
  return (
    <EmailLayout preheader="Reset your password">
      <CenteredLayout>
        <PageTitle>Reset your password</PageTitle>

        <BodyText>Hello {user_name},</BodyText>

        <BodyText>
          We received a password reset request for your account. Click the
          button below to reset your password.
        </BodyText>

        <LG />

        <ActionButton href={reset_url} fullWidth>
          Reset My Password
        </ActionButton>

        <LG />

        <BodyText>
          If you do not need to reset your password you can safely ignore this
          email, your password will not be reset.
        </BodyText>

        <MutedText>
          This link will expire in {expiry_hours} hours for security reasons.
        </MutedText>

        <BodyText>
          Best regards,
          <br />
          The Float Team
        </BodyText>
      </CenteredLayout>
    </EmailLayout>
  );
};

export default PasswordReset;
