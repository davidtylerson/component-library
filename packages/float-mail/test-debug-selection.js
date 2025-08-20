const { chromium } = require('@playwright/test');

async function debugSelection() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3004');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // First, let's see what's actually in the DOM
    const editorInfo = await page.evaluate(() => {
      const editors = document.querySelectorAll('.cm-editor');
      const result = [];

      editors.forEach((editor, index) => {
        const hasView = !!editor.cmView;
        const isEditable = !editor.cmView?.state?.readOnly;
        const content = editor.textContent?.substring(0, 50) + '...';

        result.push({
          index,
          hasView,
          isEditable,
          content,
          classes: editor.className,
        });
      });

      return result;
    });

    console.log('Editor info:', JSON.stringify(editorInfo, null, 2));

    // Check computed styles for user-select
    const selectionStyles = await page.evaluate(() => {
      const editors = document.querySelectorAll('.cm-editor');
      const lastEditor = editors[editors.length - 1];
      if (lastEditor) {
        const styles = window.getComputedStyle(lastEditor);
        const contentEl = lastEditor.querySelector('.cm-content');
        const contentStyles = contentEl
          ? window.getComputedStyle(contentEl)
          : null;

        return {
          editorUserSelect: styles.userSelect,
          editorWebkitUserSelect: styles.webkitUserSelect,
          contentUserSelect: contentStyles?.userSelect,
          contentWebkitUserSelect: contentStyles?.webkitUserSelect,
        };
      }
      return null;
    });

    console.log('Selection styles:', selectionStyles);

    // Try to manually create a selection
    const selectionResult = await page.evaluate(() => {
      const editors = document.querySelectorAll('.cm-editor');
      const lastEditor = editors[editors.length - 1];

      if (lastEditor && lastEditor.cmView) {
        const view = lastEditor.cmView;
        const doc = view.state.doc;

        // Try to select the first line
        try {
          const firstLine = doc.line(1);
          view.dispatch({
            selection: { anchor: firstLine.from, head: firstLine.to },
          });

          const newSelection = view.state.selection.main;
          return {
            success: true,
            from: newSelection.from,
            to: newSelection.to,
            selectedText: doc.sliceString(newSelection.from, newSelection.to),
          };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }

      return { success: false, error: 'No view found' };
    });

    console.log('Manual selection result:', selectionResult);

    // Take a screenshot
    await page.screenshot({ path: 'debug-selection.png' });
  } catch (error) {
    console.error('Error:', error);
  }

  await browser.close();
}

debugSelection().catch(console.error);
