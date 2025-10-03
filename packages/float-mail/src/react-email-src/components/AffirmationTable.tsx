import React from 'react';

interface TradeField {
  field: string;
  value: string;
  counterparty?: string;
}

interface TradeGroup {
  groupName: string;
  rows: TradeField[];
}

interface AffirmationTableProps {
  groups: TradeGroup[];
  title?: string;
  className?: string;
}

export const AffirmationTable: React.FC<AffirmationTableProps> = ({
  groups,
  title,
  className,
}) => {
  return (
    <div className={className}>
      {title && (
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '0 0 16px 0',
            color: '#111827',
          }}
        >
          {title}
        </h3>
      )}

      {/* Single Table with All Groups */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Column Headers */}
        <thead>
          <tr>
            <th
              style={{
                padding: '4px 8px',
                borderTop: '1px solid #e5e7eb',
                borderLeft: '1px solid #e5e7eb',
                borderRight: '1px solid #e5e7eb',
                borderBottom: '1px solid #e5e7eb',
                fontSize: '10px',
                fontWeight: '600',
                color: '#374151',
                backgroundColor: '#f9fafb',
                textAlign: 'left',
                width: '30%',
              }}
            >
              Field
            </th>
            <th
              style={{
                padding: '4px 8px',
                borderTop: '1px solid #e5e7eb',
                borderRight: '1px solid #e5e7eb',
                borderBottom: '1px solid #e5e7eb',
                fontSize: '10px',
                fontWeight: '600',
                color: '#374151',
                backgroundColor: '#f9fafb',
                textAlign: 'left',
                width: '35%',
              }}
            >
              Value
            </th>
            <th
              style={{
                padding: '4px 8px',
                borderTop: '1px solid #e5e7eb',
                borderRight: '1px solid #e5e7eb',
                borderBottom: '1px solid #e5e7eb',
                fontSize: '10px',
                fontWeight: '600',
                color: '#374151',
                backgroundColor: '#f9fafb',
                textAlign: 'left',
                width: '35%',
              }}
            >
              Counterparty Economics (if disputed)
            </th>
          </tr>
        </thead>

        <tbody>
          {groups.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {/* Group Header Row */}
              <tr>
                <td
                  colSpan={3}
                  style={{
                    padding: '4px 8px',
                    borderLeft: '1px solid #e5e7eb',
                    borderRight: '1px solid #e5e7eb',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#111827',
                    backgroundColor: '#f3f4f6',
                    textAlign: 'left',
                  }}
                >
                  {group.groupName}
                </td>
              </tr>

              {/* Group Data Rows */}
              {group.rows.map((row, rowIndex) => (
                <tr key={`${groupIndex}-${rowIndex}`}>
                  <td
                    style={{
                      padding: '4px 8px',
                      borderLeft: '1px solid #e5e7eb',
                      borderRight: '1px solid #e5e7eb',
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: '10px',
                      fontWeight: 'normal',
                      color: '#374151',
                      backgroundColor: '#f9fafb',
                      verticalAlign: 'top',
                    }}
                  >
                    {row.field}
                  </td>
                  <td
                    style={{
                      padding: '4px 8px',
                      borderRight: '1px solid #e5e7eb',
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: '10px',
                      color: '#111827',
                      verticalAlign: 'top',
                      wordBreak: 'break-word',
                    }}
                  >
                    {row.value}
                  </td>
                  <td
                    style={{
                      padding: '4px 8px',
                      borderRight: '1px solid #e5e7eb',
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: '10px',
                      color: '#6b7280',
                      verticalAlign: 'top',
                      wordBreak: 'break-word',
                    }}
                  >
                    {row.counterparty || ''}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AffirmationTable;
