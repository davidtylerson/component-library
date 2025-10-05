import React from 'react';

interface DataTableProps {
  data: Array<{ label: string; value: string }>;
  title?: string;
  className?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  title,
  className = '',
}) => {
  return (
    <div className={className}>
      {title && (
        <h3
          style={{
            fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: '1.3',
            margin: '0 0 8px 0',
            color: '#111827',
          }}
        >
          {title}
        </h3>
      )}

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '16px',
          fontSize: '14px',
          minWidth: '100%',
        }}
      >
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #e5e7eb',
                  fontWeight: '600',
                  color: '#374151',
                  width: '40%',
                  verticalAlign: 'top',
                  textAlign: 'left',
                  wordWrap: 'break-word',
                }}
              >
                {item.label}
              </td>
              <td
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #e5e7eb',
                  color: '#6b7280',
                  width: '60%',
                  verticalAlign: 'top',
                  textAlign: 'right',
                  wordWrap: 'break-word',
                }}
              >
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
