import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

/**
 * Serves the real on-disk source for a template so the React tab shows the
 * actual file rather than the hand-maintained TEMPLATE_SOURCE_CODE map (which
 * only ever covered three templates and drifted from the files themselves).
 */
export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name') || '';

  // Guards path traversal: template names are bare PascalCase identifiers.
  if (!/^[A-Za-z0-9]+$/.test(name)) {
    return new NextResponse('// Invalid template name', {
      status: 400,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  try {
    const file = path.join(process.cwd(), 'src', 'templates', `${name}.tsx`);
    const source = await readFile(file, 'utf8');
    return new NextResponse(source, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new NextResponse(`// ${name}.tsx not found`, {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}
