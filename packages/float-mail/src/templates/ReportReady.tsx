import React from 'react';
import { EmailLayout } from '../react-email-src/components';

/**
 * ReportReady
 *
 * The report email produced by the Automations "Send email" step. Per the
 * generate-report/send-email redesign, the email IS the deliverable — the
 * recipient reads the results here rather than being pushed into the app — so
 * it leads with the report's own name, carries the author's message, and then
 * renders the tables in full. No row/column truncation notices: the tables show
 * everything the step produced.
 *
 * Tables are rendered "scroll-wide": columns keep their natural width and the
 * table extends horizontally inside an `overflow-x: auto` wrapper rather than
 * being crushed into a fixed-width grid.
 *
 * Like the other Float templates this is dual-mode:
 *   - Preview mode (real data)  -> rendered with React for the in-app preview.
 *   - Export mode (no data)     -> emits raw Handlebars so SendGrid can loop
 *     over `tables`, `columns`, and `rows` at send time.
 */

const FONT = 'Helvetica-Neue, Helvetica, Arial, sans-serif';
const INK = '#1A1A1E';
const MUTED = '#6b7280';
const RULE = '#eaebed';
const WASH = '#f4f5f6';

interface ReportTable {
  report_name: string;
  columns?: string[];
  rows?: string[][];
}

interface ReportReadyProps {
  report_count?: number;
  /** Name of the report; the title when a single table was generated. */
  report_name?: string;
  /** Name of the automation that produced this; the title for multi-table runs. */
  automation_name?: string;
  /** Link back to the automation in Float. Supplied by the backend. */
  automation_url?: string;
  /** Preformatted send timestamp, e.g. "12 Jul 2026 at 07:00 UTC". */
  generated_at?: string;
  /** Free text typed by the automation's author in the Send email step. */
  message?: string;
  tables?: ReportTable[];
}

export const ReportReady: React.FC<ReportReadyProps> = ({
  report_count = '{{report_count}}' as unknown as number,
  report_name = '{{report_name}}',
  automation_name = '{{automation_name}}',
  automation_url = '{{automation_url}}',
  generated_at = '{{generated_at}}',
  message = '{{message}}',
  tables = [] as ReportTable[],
}) => {
  // Preview mode when we've been handed a populated tables array.
  const isPreviewMode = Array.isArray(tables) && tables.length > 0;

  if (!isPreviewMode) {
    // -------- Export mode: raw Handlebars for SendGrid --------
    return (
      <EmailLayout
        preheader="{{report_name}} — your report results."
        maxWidth="100%"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: `
{{! ---- Title: the report's own name for a single table, else the automation's ---- }}
{{#equals report_count 1}}
<h2 style="color: ${INK}; font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: bold; line-height: 1.2; margin: 0;">{{report_name}}</h2>
{{else}}
<h2 style="color: ${INK}; font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: bold; line-height: 1.2; margin: 0;">{{automation_name}}</h2>
{{/equals}}

{{! ---- One quiet provenance line: when it ran, then a link to the automation ---- }}
<p style="color: ${MUTED}; font-family: ${FONT}; font-size: 13px; line-height: 1.4; margin: 4px 0 0;">{{#if generated_at}}{{generated_at}}{{/if}}{{#if automation_url}}{{#if generated_at}} · {{/if}}<a href="{{automation_url}}" target="_blank" style="color: #4A49A6; text-decoration: underline;">View automation</a>{{/if}}</p>

{{#if message}}
<p style="color: ${INK}; font-family: ${FONT}; font-size: 16px; line-height: 1.4; margin: 24px 0 0; white-space: pre-line;">{{message}}</p>
{{/if}}

{{#each tables}}
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  <tr>
    <td style="font-family: ${FONT}; font-size: 16px; padding-top: 32px;" valign="top">
      <p style="color: ${INK}; font-family: ${FONT}; font-size: 15px; font-weight: bold; line-height: 1.2; margin: 0; margin-bottom: 8px;">{{this.report_name}}</p>

      {{! ---- A report that matched no records renders an empty-state callout instead of a header-only table ---- }}
      {{#unless this.rows}}
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%; border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
          <td height="56" align="center" valign="middle" bgcolor="${WASH}" style="height: 56px; border: 1px solid ${RULE}; border-radius: 8px; padding: 16px 24px; text-align: center; vertical-align: middle;">
            <p style="color: ${MUTED}; font-family: ${FONT}; font-size: 14px; line-height: 1.4; margin: 0; text-align: center;">This table returned no records.</p>
          </td>
        </tr>
      </table>
      {{else}}

      <!-- Scroll-wide table. The outer table-layout:fixed table pins the scroll
           container to the card width (a fixed-layout table sizes to its parent,
           NOT to its content) so the inner auto-layout table can be wider and
           overflow-x:auto pans it on clients that support scrolling (Apple Mail,
           iOS, Gmail app). -->
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%; table-layout: fixed; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
          <td style="padding: 0;" valign="top">
            <div style="width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; width: auto; min-width: 100%; table-layout: auto; border: 1px solid ${RULE}; border-radius: 8px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <thead>
                  <tr>
                    {{#each this.columns}}
                    <th style="background-color: ${WASH}; border-bottom: 1px solid ${RULE}; padding: 8px 12px; font-family: ${FONT}; font-size: 10px; font-weight: normal; letter-spacing: 0.03em; text-align: left; color: ${MUTED}; white-space: nowrap;" bgcolor="${WASH}" valign="top">{{this}}</th>
                    {{/each}}
                  </tr>
                </thead>
                <tbody>
                  {{#each this.rows}}
                  <tr>
                    {{#each this}}
                    <td style="border-bottom: 1px solid ${RULE}; padding: 8px 12px; font-family: ${FONT}; font-size: 13px; color: #333333; white-space: nowrap; vertical-align: top;" valign="top">{{this}}</td>
                    {{/each}}
                  </tr>
                  {{/each}}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </table>
      {{/unless}}
    </td>
  </tr>
</table>
{{/each}}
`,
          }}
        />
      </EmailLayout>
    );
  }

  // -------- Preview mode: React rendering of real data --------
  const isSingleTable = Number(report_count) === 1 || tables.length === 1;
  const title = isSingleTable ? report_name : automation_name;

  const showMessage = message && message !== '{{message}}';
  const showTimestamp = generated_at && generated_at !== '{{generated_at}}';
  const hasAutomationLink =
    automation_url && automation_url !== '{{automation_url}}';

  return (
    <EmailLayout
      preheader={`${title} — your report results.`}
      maxWidth="100%"
    >
      <h2
        style={{
          color: INK,
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '20px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          margin: 0,
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: MUTED,
          fontFamily: FONT,
          fontSize: '13px',
          lineHeight: '1.4',
          margin: '4px 0 0',
        }}
      >
        {showTimestamp && generated_at}
        {showTimestamp && hasAutomationLink && ' · '}
        {hasAutomationLink && (
          <a
            href={automation_url}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#4A49A6', textDecoration: 'underline' }}
          >
            View automation
          </a>
        )}
      </p>

      {showMessage && (
        <p
          style={{
            color: INK,
            fontFamily: FONT,
            fontSize: '16px',
            lineHeight: '1.4',
            margin: '24px 0 0',
          }}
        >
          {/*
            Author newlines become explicit <br /> rather than relying on
            `white-space: pre-line`. The export pipeline runs the rendered HTML
            through Prettier (printWidth 120), which reflows text inside the
            tag — and under pre-line every one of those cosmetic newlines
            renders as a real line break, wrapping the message to a fraction of
            the container width.
          */}
          {message.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {index > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </p>
      )}

      {tables.map((table, tableIndex) => {
        const isEmpty = !table.rows || table.rows.length === 0;

        return (
          <table
            key={tableIndex}
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
                  style={{
                    fontFamily: FONT,
                    fontSize: '16px',
                    paddingTop: '32px',
                  }}
                  valign="top"
                >
                  <p
                    style={{
                      color: INK,
                      fontFamily: FONT,
                      fontSize: '15px',
                      fontWeight: 'bold',
                      lineHeight: '1.2',
                      margin: '0 0 8px 0',
                    }}
                  >
                    {table.report_name}
                  </p>

                  {isEmpty ? (
                    <table
                      role="presentation"
                      border={0}
                      cellSpacing="0"
                      cellPadding="0"
                      width="100%"
                      style={{ width: '100%', borderCollapse: 'separate' }}
                    >
                      <tbody>
                        <tr>
                          <td
                            align="center"
                            valign="middle"
                            style={{
                              height: '56px',
                              backgroundColor: WASH,
                              border: `1px solid ${RULE}`,
                              borderRadius: '8px',
                              padding: '16px 24px',
                              textAlign: 'center',
                              verticalAlign: 'middle',
                            }}
                          >
                            <p
                              style={{
                                color: MUTED,
                                fontFamily: FONT,
                                fontSize: '14px',
                                lineHeight: '1.4',
                                margin: 0,
                                textAlign: 'center',
                              }}
                            >
                              This table returned no records.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
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
                                  border: `1px solid ${RULE}`,
                                  borderRadius: '8px',
                                }}
                              >
                                <thead>
                                  <tr>
                                    {(table.columns || []).map(
                                      (col, colIndex) => (
                                        <th
                                          key={colIndex}
                                          style={{
                                            backgroundColor: WASH,
                                            borderBottom: `1px solid ${RULE}`,
                                            padding: '8px 12px',
                                            fontFamily: FONT,
                                            fontSize: '10px',
                                            fontWeight: 'normal',
                                            letterSpacing: '0.03em',
                                            textAlign: 'left',
                                            color: MUTED,
                                            whiteSpace: 'nowrap',
                                            verticalAlign: 'top',
                                          }}
                                        >
                                          {col}
                                        </th>
                                      )
                                    )}
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
                                            borderBottom: `1px solid ${RULE}`,
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
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </EmailLayout>
  );
};

export default ReportReady;
