import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { getUploadStore, isNetlifyRuntime } from '@/lib/uploads';

type Props = { params: Promise<{ arquivo: string }> };

export async function GET(_request: NextRequest, { params }: Props) {
  const { arquivo } = await params;

  if (!arquivo || arquivo.includes('..') || arquivo.includes('/')) {
    return NextResponse.json({ error: 'Arquivo inválido' }, { status: 400 });
  }

  if (isNetlifyRuntime()) {
    const store = getUploadStore();
    const result = await store.getWithMetadata(arquivo, { type: 'arrayBuffer' });

    if (!result || !result.data) {
      return NextResponse.json({ error: 'Imagem não encontrada' }, { status: 404 });
    }

    const contentType = result.metadata?.contentType || 'application/octet-stream';

    return new NextResponse(result.data, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'uploads', arquivo);
    const data = await readFile(filePath);
    const ext = arquivo.split('.').pop()?.toLowerCase();
    const types: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
      avif: 'image/avif',
    };

    return new NextResponse(data, {
      headers: {
        'Content-Type': types[ext || ''] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Imagem não encontrada' }, { status: 404 });
  }
}
