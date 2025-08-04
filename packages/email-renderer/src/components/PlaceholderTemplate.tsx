import React from 'react';

interface PlaceholderTemplateProps {
  templateName: string;
  data: any;
}

export const PlaceholderTemplate: React.FC<PlaceholderTemplateProps> = ({
  templateName,
  data,
}) => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        color: '#333333',
      }}
    >
      <div
        style={{
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: '20px',
          marginBottom: '20px',
        }}
      >
        <h1 style={{ color: '#2563eb', margin: '0 0 10px 0' }}>
          {templateName} Template
        </h1>
        <p style={{ color: '#666666', margin: '0' }}>
          This is a placeholder for the {templateName} email template
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#333333', margin: '0 0 15px 0' }}>
          Template Data:
        </h2>
        <pre
          style={{
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '5px',
            fontSize: '12px',
            overflow: 'auto',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '5px',
          border: '1px solid #e9ecef',
        }}
      >
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
          Template Features:
        </p>
        <ul style={{ margin: '0', paddingLeft: '20px' }}>
          <li>Dynamic data binding</li>
          <li>Responsive design</li>
          <li>Email client compatibility</li>
          <li>Professional styling</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e0e0e0',
          textAlign: 'center',
          color: '#666666',
          fontSize: '12px',
        }}
      >
        <p style={{ margin: '0' }}>
          This is a placeholder template. The actual {templateName} template
          will be loaded here.
        </p>
      </div>
    </div>
  );
};
