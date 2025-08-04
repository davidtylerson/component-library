import React from 'react';

export default function TestPage() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'red', color: 'white' }}>
      <h1>TEST PAGE - This should have a red background</h1>
      <p>
        If you can see this with a red background, then the issue is with the
        main page component.
      </p>
    </div>
  );
}
