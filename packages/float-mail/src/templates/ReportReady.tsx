import React from 'react';
import { EmailLayout } from '../react-email-src/components';

/**
 * ReportReady
 *
 * Port of the "Your report is ready" SendGrid email. The source email is
 * produced by an automation tool that can emit report tables with an
 * arbitrarily large number of columns, so the data table is rendered
 * "scroll-wide": columns keep their natural width and the table extends
 * horizontally inside an `overflow-x: auto` wrapper rather than being crushed
 * into a fixed-width grid. Where a client can't scroll (Outlook desktop,
 * Gmail web) the column/row truncation notes + "view in Float / attached CSV"
 * fallback ensure no data is lost.
 *
 * Like the other Float templates this is dual-mode:
 *   - Preview mode (real data)  -> rendered with React for the in-app preview.
 *   - Export mode (no data)     -> emits raw Handlebars so SendGrid can loop
 *     over `tables`, `columns`, and `rows` at send time.
 */

const FONT = 'Helvetica-Neue, Helvetica, Arial, sans-serif';

interface ReportTable {
  report_name: string;
  columns?: string[];
  rows?: string[][];
  columns_truncated?: boolean;
  shown_columns?: number;
  total_columns?: number;
  truncated?: boolean;
  shown?: number;
  total?: number;
  has_attachment?: boolean;
  document_url?: string;
}

interface ReportReadyProps {
  report_count?: number;
  report_name?: string;
  message?: string;
  run_id?: string;
  tables?: ReportTable[];
}

export const ReportReady: React.FC<ReportReadyProps> = ({
  report_count = '{{report_count}}' as unknown as number,
  report_name = '{{report_name}}',
  message = '{{message}}',
  run_id = '{{run_id}}',
  tables = [] as ReportTable[],
}) => {
  // Preview mode when we've been handed a populated tables array.
  const isPreviewMode = Array.isArray(tables) && tables.length > 0;

  if (!isPreviewMode) {
    // -------- Export mode: raw Handlebars for SendGrid --------
    return (
      <EmailLayout
        preheader="Your report is ready and available in Float."
        maxWidth="760px"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: `
<h2 style="color: #1A1A1E; font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: normal; line-height: 1.2; margin: 0; margin-bottom: 20px;">Your report is ready.</h2>
{{#equals report_count 1}}
<p style="color: #1A1A1E; font-family: ${FONT}; font-size: 16px; line-height: 1.4; margin: 0; margin-bottom: 16px;">{{report_name}} has been generated and is available in Float.</p>
{{else}}
<p style="color: #1A1A1E; font-family: ${FONT}; font-size: 16px; line-height: 1.4; margin: 0; margin-bottom: 16px;">{{report_count}} report tables have been generated and are available in Float.</p>
{{/equals}}

{{#if message}}
<p style="color: #1A1A1E; font-family: ${FONT}; font-size: 16px; line-height: 1.4; margin: 0; margin-bottom: 16px; white-space: pre-line;">{{message}}</p>
{{/if}}

{{#each tables}}
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; margin-top: 8px;">
  <tr>
    <td style="font-family: ${FONT}; font-size: 16px; padding-top: 16px;" valign="top">
      <p style="color: #1A1A1E; font-family: ${FONT}; font-size: 15px; font-weight: bold; margin: 0; margin-bottom: 8px;">{{this.report_name}}</p>

      {{#if this.columns}}
      <!-- Scroll-wide table. The outer table-layout:fixed table pins the scroll
           container to the card width (a fixed-layout table sizes to its parent,
           NOT to its content) so the inner auto-layout table can be wider and
           overflow-x:auto pans it on clients that support scrolling (Apple Mail,
           iOS, Gmail app). Where scroll is unavailable (Outlook, Gmail web) the
           truncation notes below cover the gap. -->
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%; table-layout: fixed; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
          <td style="padding: 0;" valign="top">
            <div style="width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; width: auto; min-width: 100%; table-layout: auto; border: 1px solid #eaebed; border-radius: 8px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <thead>
                  <tr>
                    {{#each this.columns}}
                    <th style="background-color: #f4f5f6; border-bottom: 2px solid #d7d9de; padding: 10px 12px; font-family: ${FONT}; font-size: 13px; font-weight: bold; text-align: left; color: #1A1A1E; white-space: nowrap;" bgcolor="#f4f5f6" valign="top">{{this}}</th>
                    {{/each}}
                  </tr>
                </thead>
                <tbody>
                  {{#each this.rows}}
                  <tr>
                    {{#each this}}
                    <td style="border-bottom: 1px solid #eaebed; padding: 8px 12px; font-family: ${FONT}; font-size: 13px; color: #333333; white-space: nowrap; vertical-align: top;" valign="top">{{this}}</td>
                    {{/each}}
                  </tr>
                  {{/each}}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </table>
      {{/if}}

      {{#if this.columns_truncated}}
      <p style="color: #9a9ea6; font-family: ${FONT}; font-size: 12px; margin: 8px 0 0;">Showing {{this.shown_columns}} of {{this.total_columns}} columns. The full set of columns is viewable in Float{{#if this.has_attachment}} and in the attached CSV{{/if}}.</p>
      {{/if}}

      {{#if this.truncated}}
      <p style="color: #9a9ea6; font-family: ${FONT}; font-size: 12px; margin: 4px 0 0;">Showing {{this.shown}} of {{this.total}} rows. The full result set is viewable in Float{{#if this.has_attachment}} and attached as a CSV{{/if}}.</p>
      {{else}}
        {{#if this.has_attachment}}
        <p style="color: #9a9ea6; font-family: ${FONT}; font-size: 12px; margin: 4px 0 0;">The full result set is viewable in Float and attached as a CSV.</p>
        {{/if}}
      {{/if}}

      {{#if this.document_url}}
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; box-sizing: border-box; margin-top: 12px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
          <td style="font-family: ${FONT}; font-size: 16px;" valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
              <tr>
                <td style="border-radius: 4px; font-family: ${FONT}; font-size: 16px;" bgcolor="#6063BD" width="100%" valign="top" align="center">
                  <a href="{{this.document_url}}" target="_blank" style="background-color: #6063BD; border: solid 2px #6063BD; border-radius: 4px; box-sizing: border-box; color: #ffffff; cursor: pointer; display: block; font-size: 16px; font-weight: normal; margin: 0; padding: 12px 24px; text-decoration: none; text-transform: capitalize; width: 100%;">View '{{this.report_name}}' in Float</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      {{/if}}
    </td>
  </tr>
</table>
{{/each}}

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; margin-top: 20px;">
  <tr>
    <td style="font-family: ${FONT}; font-size: 16px; padding: 12px 0;" valign="top">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
          <td style="border-radius: 4px; color: #333333; font-family: ${FONT}; font-size: 16px; line-height: 1.3; padding: 16px;" bgcolor="#f4f5f6" valign="top">
            <p style="font-family: ${FONT}; font-size: 14px; font-weight: normal; margin: 0;"><strong>Run ID:</strong> {{run_id}}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`,
          }}
        />
      </EmailLayout>
    );
  }

  // -------- Preview mode: React rendering of real data --------
  const introText =
    Number(report_count) === 1
      ? `${report_name} has been generated and is available in Float.`
      : `${report_count} report tables have been generated and are available in Float.`;

  const showMessage = message && message !== '{{message}}';

  return (
    <EmailLayout
      preheader="Your report is ready and available in Float."
      maxWidth="760px"
    >
      <h2
        style={{
          color: '#1A1A1E',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '20px',
          fontWeight: 'normal',
          lineHeight: '1.2',
          margin: '0 0 20px 0',
        }}
      >
        Your report is ready.
      </h2>

      <p
        style={{
          color: '#1A1A1E',
          fontFamily: FONT,
          fontSize: '16px',
          lineHeight: '1.4',
          margin: '0 0 16px 0',
        }}
      >
        {introText}
      </p>

      {showMessage && (
        <p
          style={{
            color: '#1A1A1E',
            fontFamily: FONT,
            fontSize: '16px',
            lineHeight: '1.4',
            margin: '0 0 16px 0',
            whiteSpace: 'pre-line',
          }}
        >
          {message}
        </p>
      )}

      {tables.map((table, tableIndex) => (
        <table
          key={tableIndex}
          role="presentation"
          cellSpacing="0"
          cellPadding="0"
          border={0}
          width="100%"
          style={{ borderCollapse: 'separate', marginTop: '8px' }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  fontFamily: FONT,
                  fontSize: '16px',
                  paddingTop: '16px',
                }}
                valign="top"
              >
                <p
                  style={{
                    color: '#1A1A1E',
                    fontFamily: FONT,
                    fontSize: '15px',
                    fontWeight: 'bold',
                    margin: '0 0 8px 0',
                  }}
                >
                  {table.report_name}
                </p>

                {table.columns && table.columns.length > 0 && (
                  <table
                    role="presentation"
                    border={0}
                    cellSpacing="0"
                    cellPadding="0"
                    width="100%"
                    style={{
                      width: '100%',
                      tableLayout: 'fixed',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ padding: 0 }} valign="top">
                          <div
                            style={{
                              width: '100%',
                              overflowX: 'auto',
                              WebkitOverflowScrolling: 'touch',
                            }}
                          >
                            <table
                              role="presentation"
                              border={0}
                              cellSpacing="0"
                              cellPadding="0"
                              style={{
                                borderCollapse: 'collapse',
                                width: 'auto',
                                minWidth: '100%',
                                tableLayout: 'auto',
                                border: '1px solid #eaebed',
                                borderRadius: '8px',
                              }}
                            >
                              <thead>
                                <tr>
                                  {table.columns.map((col, colIndex) => (
                                    <th
                                      key={colIndex}
                                      style={{
                                        backgroundColor: '#f4f5f6',
                                        borderBottom: '2px solid #d7d9de',
                                        padding: '10px 12px',
                                        fontFamily: FONT,
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        color: '#1A1A1E',
                                        whiteSpace: 'nowrap',
                                        verticalAlign: 'top',
                                      }}
                                    >
                                      {col}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {(table.rows || []).map((row, rowIndex) => (
                                  <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                      <td
                                        key={cellIndex}
                                        valign="top"
                                        style={{
                                          borderBottom: '1px solid #eaebed',
                                          padding: '8px 12px',
                                          fontFamily: FONT,
                                          fontSize: '13px',
                                          color: '#333333',
                                          whiteSpace: 'nowrap',
                                          verticalAlign: 'top',
                                        }}
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {table.columns_truncated && (
                  <p
                    style={{
                      color: '#9a9ea6',
                      fontFamily: FONT,
                      fontSize: '12px',
                      margin: '8px 0 0',
                    }}
                  >
                    Showing {table.shown_columns} of {table.total_columns}{' '}
                    columns. The full set of columns is viewable in Float
                    {table.has_attachment && ' and in the attached CSV'}.
                  </p>
                )}

                {table.truncated ? (
                  <p
                    style={{
                      color: '#9a9ea6',
                      fontFamily: FONT,
                      fontSize: '12px',
                      margin: '4px 0 0',
                    }}
                  >
                    Showing {table.shown} of {table.total} rows. The full result
                    set is viewable in Float
                    {table.has_attachment && ' and attached as a CSV'}.
                  </p>
                ) : (
                  table.has_attachment && (
                    <p
                      style={{
                        color: '#9a9ea6',
                        fontFamily: FONT,
                        fontSize: '12px',
                        margin: '4px 0 0',
                      }}
                    >
                      The full result set is viewable in Float and attached as a
                      CSV.
                    </p>
                  )
                )}

                {table.document_url && (
                  <table
                    role="presentation"
                    border={0}
                    cellPadding="0"
                    cellSpacing="0"
                    width="100%"
                    style={{
                      borderCollapse: 'separate',
                      boxSizing: 'border-box',
                      marginTop: '12px',
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{ fontFamily: FONT, fontSize: '16px' }}
                          valign="top"
                        >
                          <table
                            role="presentation"
                            border={0}
                            cellPadding="0"
                            cellSpacing="0"
                            width="100%"
                            style={{ borderCollapse: 'separate' }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  width="100%"
                                  valign="top"
                                  align="center"
                                  style={{
                                    borderRadius: '4px',
                                    fontFamily: FONT,
                                    fontSize: '16px',
                                  }}
                                >
                                  <a
                                    href={table.document_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                      backgroundColor: '#6063BD',
                                      border: 'solid 2px #6063BD',
                                      borderRadius: '4px',
                                      boxSizing: 'border-box',
                                      color: '#ffffff',
                                      cursor: 'pointer',
                                      display: 'block',
                                      fontSize: '16px',
                                      fontWeight: 'normal',
                                      margin: 0,
                                      padding: '12px 24px',
                                      textDecoration: 'none',
                                      textTransform: 'capitalize',
                                      width: '100%',
                                    }}
                                  >
                                    View &apos;{table.report_name}&apos; in
                                    Float
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      ))}

      <table
        role="presentation"
        cellSpacing="0"
        cellPadding="0"
        border={0}
        width="100%"
        style={{ borderCollapse: 'separate', marginTop: '20px' }}
      >
        <tbody>
          <tr>
            <td
              style={{ fontFamily: FONT, fontSize: '16px', padding: '12px 0' }}
              valign="top"
            >
              <table
                role="presentation"
                cellSpacing="0"
                cellPadding="0"
                border={0}
                width="100%"
                style={{ borderCollapse: 'separate' }}
              >
                <tbody>
                  <tr>
                    <td
                      valign="top"
                      style={{
                        borderRadius: '4px',
                        color: '#333333',
                        fontFamily: FONT,
                        fontSize: '16px',
                        lineHeight: '1.3',
                        padding: '16px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: FONT,
                          fontSize: '14px',
                          fontWeight: 'normal',
                          margin: 0,
                        }}
                      >
                        <strong>Run ID:</strong> {run_id}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </EmailLayout>
  );
};

export default ReportReady;
