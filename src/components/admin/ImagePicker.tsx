'use client';

import Image from 'next/image';
import { galleryImages } from '@/lib/images';

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImagePicker({ value, onChange }: Props) {
  return (
    <div className="image-picker">
      <p className="form-hint">Toque na imagem que representa o produto. Não precisa fazer upload.</p>
      <div className="image-picker__grid">
        {galleryImages.map((image) => {
          const selected = value === image.url;
          return (
            <button
              key={image.url}
              type="button"
              className={`image-picker__item${selected ? ' image-picker__item--selected' : ''}`}
              onClick={() => onChange(image.url)}
              aria-label={`Selecionar ${image.label}`}
              aria-pressed={selected}
            >
              <Image src={image.url} alt={image.label} width={88} height={88} unoptimized />
              <span>{image.label}</span>
            </button>
          );
        })}
      </div>
      {value && (
        <p className="form-hint" style={{ marginTop: '0.75rem' }}>
          Imagem selecionada: <code>{value}</code>
        </p>
      )}
    </div>
  );
}
