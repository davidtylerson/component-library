import React from 'react';

interface TableRow {
  field: string;
  value: string;
  counterparty: string;
}

interface TableGroup {
  groupName?: string;
  rows: TableRow[];
}

interface GroupedDataTableProps {
  groups: TableGroup[];
  title?: string;
  className?: string;
}

export const GroupedDataTable: React.FC<GroupedDataTableProps> = ({ 
  groups, 
  title,
  className = ''
}) => {
  return (
    <div className={className}>
      {title && (
        <h3 style={{
          fontFamily: 'Helvetica-Neue, Helvetica, Arial, sans-serif',
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: '1.3',
          margin: '0 0 8px 0',
          color: '#111827',
        }}>
          {title}
        </h3>
      )}
      
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '16px',
        fontSize: '14px',
        minWidth: '100%',
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{
              padding: '8px 0',
              textAlign: 'left',
              borderBottom: '2px solid #dee2e6',
              fontWeight: 'bold',
              width: '25%',
              wordWrap: 'break-word',
            }}>
              Field
            </th>
            <th style={{
              padding: '8px 0',
              textAlign: 'left',
              borderBottom: '2px solid #dee2e6',
              fontWeight: 'bold',
              width: '35%',
              wordWrap: 'break-word',
            }}>
              Value
            </th>
            <th style={{
              padding: '8px 0',
              textAlign: 'left',
              borderBottom: '2px solid #dee2e6',
              fontWeight: 'bold',
              width: '40%',
              wordWrap: 'break-word',
            }}>
              Counterparty Economics (if disputed)
            </th>
          </tr>
        </thead>
        <tbody>
          {groups && groups.length > 0 ? (
            groups.map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {group.groupName && (
                  <tr style={{ backgroundColor: '#f3f4f6' }}>
                    <td colSpan={3} style={{
                      padding: '8px 0',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      color: '#374151',
                      wordWrap: 'break-word',
                    }}>
                      {group.groupName}
                    </td>
                  </tr>
                )}
                {group.rows.map((row, rowIndex) => (
                  <tr key={`${groupIndex}-${rowIndex}`}>
                    <td style={{
                      padding: '8px 0',
                      borderBottom: '1px solid #e5e7eb',
                      fontWeight: '600',
                      color: '#374151',
                      verticalAlign: 'top',
                      textAlign: 'left',
                      wordWrap: 'break-word',
                    }}>
                      {row.field}
                    </td>
                    <td style={{
                      padding: '8px 0',
                      borderBottom: '1px solid #e5e7eb',
                      color: '#6b7280',
                      verticalAlign: 'top',
                      textAlign: 'left',
                      wordWrap: 'break-word',
                    }}>
                      {row.value}
                    </td>
                    <td style={{
                      padding: '8px 0',
                      borderBottom: '1px solid #e5e7eb',
                      color: '#6b7280',
                      verticalAlign: 'top',
                      textAlign: 'left',
                      wordWrap: 'break-word',
                    }}>
                      {row.counterparty || '\u00A0'}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{
                padding: '8px 0',
                textAlign: 'center',
                color: '#9ca3af',
                fontStyle: 'italic',
              }}>
                No data provided
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GroupedDataTable; 