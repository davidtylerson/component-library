import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import { Header, Footer } from '../components';
import { DisputeMultipleProps } from '../types/dispute-multiple';

export const DisputeMultiple: React.FC<DisputeMultipleProps> = ({
  organization_name,
  disputedDocuments,
}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body style={{ 
          fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
          backgroundColor: '#F4F4F5',
          margin: 0,
          padding: 0,
        }}>
          <Container style={{
            margin: '0 auto',
            maxWidth: '600px',
            padding: '0',
            paddingTop: '24px',
            width: '600px',
          }}>
            <Header />
            
            {/* Preheader */}
            <Text style={{
              display: 'none',
              fontSize: '1px',
              color: '#ffffff',
              lineHeight: '1px',
              maxHeight: '0px',
              maxWidth: '0px',
              opacity: '0',
              overflow: 'hidden',
            }}>
              Multiple Disputed Confirmations
            </Text>

            <Section style={{
              background: '#ffffff',
              border: '1px solid #eaebed',
              borderRadius: '16px',
              width: '100%',
            }}>
              <Container style={{
                boxSizing: 'border-box',
                padding: '24px',
              }}>
                <Heading as="h2" style={{
                  fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  lineHeight: '1.3',
                  margin: '0 0 16px 0',
                  color: '#111827',
                }}>
                  <span style={{ fontWeight: 'bold' }}>{organization_name}</span> has raised a dispute with the following trade confirmations
                </Heading>
                
                <Text style={{
                  fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  margin: '0 0 8px 0',
                  color: '#374151',
                }}>
                  Please see comments regarding the attached confirmations.
                </Text>
                
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  margin: '16px 0',
                  fontSize: '12px',
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{
                        padding: '8px',
                        textAlign: 'left',
                        borderBottom: '2px solid #dee2e6',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        width: '15%',
                        fontSize: '12px',
                      }}>
                        Client ID
                      </th>
                      <th style={{
                        padding: '8px',
                        textAlign: 'left',
                        borderBottom: '2px solid #dee2e6',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        width: '25%',
                        fontSize: '12px',
                      }}>
                        Broker ID
                      </th>
                      <th style={{
                        padding: '8px',
                        textAlign: 'left',
                        borderBottom: '2px solid #dee2e6',
                        fontWeight: 'bold',
                        width: '60%',
                        fontSize: '12px',
                      }}>
                        Comments
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {disputedDocuments.map((doc, index) => (
                      <tr key={index}>
                        <td style={{
                          padding: '8px',
                          borderBottom: '1px solid #dee2e6',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: '12px',
                        }}>
                          {doc.trade_id}
                        </td>
                        <td style={{
                          padding: '8px',
                          borderBottom: '1px solid #dee2e6',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: '12px',
                        }}>
                          {doc.counterparty_ref}
                        </td>
                        <td style={{
                          padding: '8px',
                          borderBottom: '1px solid #dee2e6',
                          fontSize: '12px',
                        }}>
                          {doc.comment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Container>
            </Section>
            
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default DisputeMultiple; 