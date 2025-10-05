import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import { Header } from './Header';
import { Footer } from './Footer';

interface EmailLayoutProps {
  children: React.ReactNode;
  preheader?: string;
  backgroundColor?: string;
  maxWidth?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({
  children,
  preheader,
  backgroundColor = '#F4F4F5',
  maxWidth = '600px',
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Tailwind>
        <Body
          style={{
            fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
            backgroundColor,
            margin: 0,
            padding: 0,
            width: '100%',
          }}
        >
          <Container
            style={{
              margin: '0 auto',
              maxWidth,
              padding: '0',
              paddingTop: '24px',
              width: '100%',
            }}
          >
            {/* Preheader */}
            {preheader && (
              <Text
                style={{
                  display: 'none',
                  fontSize: '1px',
                  color: '#ffffff',
                  lineHeight: '1px',
                  maxHeight: '0px',
                  maxWidth: '0px',
                  opacity: '0',
                  overflow: 'hidden',
                }}
              >
                {preheader}
              </Text>
            )}

            {/* Header - Outside the white card */}
            {showHeader && <Header />}

            <Section
              style={{
                background: '#ffffff',
                border: '1px solid #eaebed',
                borderRadius: '16px',
                width: '100%',
                margin: '0 16px',
                maxWidth: 'calc(100% - 32px)',
              }}
            >
              <Container
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                }}
              >
                {/* Main Content with table-based padding for Outlook compatibility */}
                <table
                  width="100%"
                  border="0"
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: '24px',
                          boxSizing: 'border-box',
                        }}
                      >
                        {children}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Container>
            </Section>

            {/* Footer */}
            {showFooter && <Footer />}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailLayout;
