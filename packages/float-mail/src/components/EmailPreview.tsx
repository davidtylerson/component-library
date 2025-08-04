'use client';

import React from 'react';
import { render } from '@react-email/render';
import { 
  Html, 
  Head, 
  Body, 
  Container, 
  Section, 
  Heading, 
  Text, 
  Button, 
  Hr, 
  Link,
  Img
} from '@react-email/components';
import { EmailTemplate, EmailPreviewData } from '../types/template';

interface EmailPreviewProps {
  template: EmailTemplate;
  previewData: EmailPreviewData;
}

// Simple email components for preview
const EmailHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <Section style={{ textAlign: 'center', padding: '20px 0' }}>
    <Heading as="h1" style={{ color: '#333', margin: '0 0 10px 0' }}>
      {title}
    </Heading>
    {subtitle && (
      <Text style={{ color: '#666', margin: '0', fontSize: '16px' }}>
        {subtitle}
      </Text>
    )}
  </Section>
);

const EmailBody: React.FC<{ text: string }> = ({ text }) => (
  <Section style={{ padding: '20px 0' }}>
    <Text style={{ color: '#333', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
      {text}
    </Text>
  </Section>
);

const EmailButton: React.FC<{ text: string; href: string; variant?: string }> = ({ 
  text, 
  href, 
  variant = 'primary' 
}) => (
  <Section style={{ textAlign: 'center', padding: '20px 0' }}>
    <Button
      href={href}
      style={{
        backgroundColor: variant === 'primary' ? '#007bff' : '#6c757d',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '6px',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        fontWeight: 'bold'
      }}
    >
      {text}
    </Button>
  </Section>
);

const EmailFooter: React.FC<{ text: string; links?: Array<{ text: string; href: string }> }> = ({ 
  text, 
  links 
}) => (
  <Section style={{ padding: '20px 0', borderTop: '1px solid #eee' }}>
    <Text style={{ color: '#666', fontSize: '14px', textAlign: 'center', margin: '0 0 10px 0' }}>
      {text}
    </Text>
    {links && links.length > 0 && (
      <div style={{ textAlign: 'center' }}>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <Link
              href={link.href}
              style={{ 
                color: '#007bff', 
                textDecoration: 'none', 
                fontSize: '14px',
                margin: '0 10px'
              }}
            >
              {link.text}
            </Link>
            {index < links.length - 1 && (
              <span style={{ color: '#666', fontSize: '14px' }}> | </span>
            )}
          </React.Fragment>
        ))}
      </div>
    )}
  </Section>
);

// Function to replace template variables
const replaceVariables = (text: string, data: EmailPreviewData): string => {
  return text.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
    return data[variable] || match;
  });
};

// Function to render email components
const renderEmailComponent = (component: any, data: EmailPreviewData) => {
  const props = { ...component.props };
  
  // Replace variables in text props
  Object.keys(props).forEach(key => {
    if (typeof props[key] === 'string') {
      props[key] = replaceVariables(props[key], data);
    }
  });

  switch (component.type) {
    case 'Header':
      return <EmailHeader {...props} />;
    case 'Body':
      return <EmailBody {...props} />;
    case 'Button':
      return <EmailButton {...props} />;
    case 'Footer':
      return <EmailFooter {...props} />;
    default:
      return <Text>Unknown component: {component.type}</Text>;
  }
};

export default function EmailPreview({ template, previewData }: EmailPreviewProps) {
  const emailHtml = render(
    <Html>
      <Head>
        <title>{template.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Body style={{ 
        fontFamily: 'Arial, sans-serif', 
        backgroundColor: '#f4f4f4',
        margin: '0',
        padding: '0'
      }}>
        <Container style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          backgroundColor: '#ffffff',
          padding: '20px'
        }}>
          {template.components.map((component) => (
            <React.Fragment key={component.id}>
              {renderEmailComponent(component, previewData)}
            </React.Fragment>
          ))}
        </Container>
      </Body>
    </Html>
  );

  return (
    <div className="h-full overflow-auto">
      <div 
        className="bg-white"
        style={{ 
          minHeight: '100%',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}
        dangerouslySetInnerHTML={{ __html: emailHtml }}
      />
    </div>
  );
} 