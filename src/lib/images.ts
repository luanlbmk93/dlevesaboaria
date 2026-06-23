function img(filename: string) {
  return `/imagens/${encodeURIComponent(filename)}`;
}

export const siteImages = {
  hero: img('hero.jpg'),
  aboutMain: img('sobre-principal.avif'),
  aboutAccent: img('sobre-detalhe.avif'),
  almaErvas: img('alma-ervas.avif'),
  almaManteigas: img('alma-manteigas.avif'),
  almaBanner: img('efaa4e2f-d9a4-4442-975f-1a9a2bbf2693.avif'),
};

export const productImages = {
  amorPerfeito: img('alma-ervas.avif'),
  greenGarden: img('frescor-silvestre.avif'),
  cafeCacau: img('docura-graos.avif'),
  carvaoAtivado: img('a1cc93_ffff6ec660be431ebbe4b5affac13028~mv2.avif'),
  brisa: img('brisa-de-lavanda.avif'),
  lavandaCamomila: img('brisa-de-lavanda.avif'),
  brisaLavanda: img('brisa-de-lavanda.avif'),
  abracoArgila: img('efaa4e2f-d9a4-4442-975f-1a9a2bbf2693.avif'),
  frescorSilvestre: img('frescor-silvestre.avif'),
  docuraGraos: img('docura-graos.avif'),
};

/** Imagens disponíveis para escolher no painel admin */
export const galleryImages = [
  { url: img('alma-ervas.avif'), label: 'Ervas naturais' },
  { url: img('alma-manteigas.avif'), label: 'Manteigas vegetais' },
  { url: img('brisa-de-lavanda.avif'), label: 'Brisa de lavanda' },
  { url: img('docura-graos.avif'), label: 'Doçura de grãos' },
  { url: img('frescor-silvestre.avif'), label: 'Frescor silvestre' },
  { url: img('efaa4e2f-d9a4-4442-975f-1a9a2bbf2693.avif'), label: 'Argila e flores' },
  { url: img('a1cc93_ffff6ec660be431ebbe4b5affac13028~mv2.avif'), label: 'Carvão ativado' },
  { url: img('hero.jpg'), label: 'Imagem principal' },
  { url: img('sobre-principal.avif'), label: 'Sobre — principal' },
  { url: img('sobre-detalhe.avif'), label: 'Sobre — detalhe' },
];
