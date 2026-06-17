import Link from 'next/link';
import Image from 'next/image';
import { getPublicProducts } from '@/lib/catalog';
import { siteImages } from '@/lib/images';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import ContactForm from '@/components/site/ContactForm';
import { TrendCard } from '@/components/site/TrendCard';
import { IconFlame, IconLeaf } from '@/components/icons/Icons';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getPublicProducts();

  const trends = products.filter((p) => p.category === 'destaque');
  const hotProcess = products.filter((p) => p.category === 'hot-process');
  const facial = products.filter((p) => p.category === 'rosto');

  return (
    <>
      <a href="#main" className="skip-link">Ir para o conteúdo principal</a>
      <Header />

      <main id="main">
        <section className="site-hero" style={{ ['--hero-image' as string]: `url('${siteImages.hero}')` }}>
          <div className="site-hero__bg" aria-hidden="true" />
          <div className="container site-hero__content">
            <p className="site-hero__eyebrow">Saboaria artesanal feita à mão</p>
            <h1>O Despertar da Natureza</h1>
            <p className="site-hero__subtitle">Deixe o perfume das ervas e o toque das manteigas nutrir sua alma viva</p>
            <div className="site-hero__actions">
              <Link href="/produtos" className="btn btn--primary">Comprar sabonetes</Link>
              <Link href="#tendencias" className="btn btn--ghost">Ver tendências</Link>
            </div>
          </div>
          <div className="site-hero__scroll" aria-hidden="true">
            <span>Sinta a Leveza</span>
            <div className="site-hero__scroll-line" />
          </div>
        </section>

        {trends.length > 0 && (
          <section className="site-highlights" id="tendencias">
            <div className="container">
              <header className="section-header section-header--center">
                <p className="section-header__eyebrow">Tendências</p>
                <h2 className="section-header__title">Pausas que curam o coração</h2>
              </header>
              <div className="site-highlights__grid">
                {trends.map((product) => (
                  <TrendCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="site-alma">
          <div className="container">
            <p className="site-alma__title">Deixe o perfume das ervas e o toque das manteigas nutrir sua alma viva</p>
            <div className="site-alma__grid">
              <div className="site-alma__image">
                <Image src={siteImages.almaErvas} alt="Perfume das ervas naturais" fill sizes="(max-width: 640px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
              <div className="site-alma__image">
                <Image src={siteImages.almaManteigas} alt="Toque das manteigas vegetais" fill sizes="(max-width: 640px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>

        <section className="site-categories">
          <div className="container">
            <div className="site-categories__grid">
              <Link href="/produtos?categoria=hot-process" className="site-category-card">
                <div className="site-category-card__icon">
                  <IconFlame />
                </div>                <h2>Sabonetes Hot Process</h2>
                <p>{hotProcess.length > 0 ? `${hotProcess.length} produto(s) na loja` : 'Processo ritual que preserva a alma das manteigas vegetais'}</p>
              </Link>
              <Link href="/produtos?categoria=rosto" className="site-category-card">
                <div className="site-category-card__icon">
                  <IconLeaf />
                </div>                <h2>Cuidados com o rosto</h2>
                <p>{facial.length > 0 ? `${facial.length} produto(s) na loja` : 'Fórmulas suaves para nutrir e acalmar sua pele'}</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="site-shop-cta">
          <div className="container site-shop-cta__inner">
            <div>
              <p className="section-header__eyebrow">Nossa loja</p>
              <h2 className="section-header__title">Escolha seus sabonetes com carinho</h2>
              <p>Monte seu carrinho, revise os itens e envie tudo direto pelo WhatsApp. Simples, rápido e com o toque artesanal da D&apos;Leve.</p>
            </div>
            <Link href="/produtos" className="btn btn--primary">Ir para a loja</Link>
          </div>
        </section>

        <section className="site-about" id="sobre">
          <div className="container site-about__grid">
            <div className="site-about__visual">
              <div className="site-about__image site-about__image--main">
                <Image src={siteImages.aboutMain} alt="O coração da D'Leve" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
              <div className="site-about__image site-about__image--accent">
                <Image src={siteImages.aboutAccent} alt="Saboaria artesanal feita à mão" fill sizes="(max-width: 900px) 50vw, 30vw" style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div>
              <p className="section-header__eyebrow">O coração da D&apos;Leve viva</p>
              <h2 className="section-header__title">Tecida com amor pela saboaria artesanal</h2>
              <div className="site-about__text">
                <p>A D&apos;Leve nasceu do desejo profundo de transformar o banho em um abraço. Nossa história é tecida com o amor pela saboaria artesanal, onde cada barra conta um segredo da terra.</p>
                <p>Trabalhamos com a paciência dos métodos Cold e Hot Process, processos rituais que preservam a alma das manteigas vegetais e dos óleos mais puros.</p>
                <p>Acreditamos que o bem-estar floresce quando respeitamos o tempo da natureza, criando espumas que acolhem sem agredir.</p>
                <p>Nosso compromisso vai além da limpeza; buscamos resgatar sua conexão com o essencial, proporcionando um respiro de calma em meio ao dia.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="site-cta">
          <div className="container">
            <blockquote>
              <p>Viva essa experiência sensorial e sinta a leveza de ser cuidada por mãos que amam o que fazem.</p>
            </blockquote>
          </div>
        </section>

        <section className="site-contact" id="contato">
          <div className="container site-contact__grid">
            <div>
              <p className="section-header__eyebrow">Vamos conversar com carinho</p>
              <h2 className="section-header__title">Nos contate com afeto</h2>
              <p>Tem dúvidas sobre nossos produtos, seu pedido ou quer dicas de cuidados com sua pele? Estamos por aqui para te ouvir.</p>
              <p className="site-contact__note">Adoramos saber como nossos sabonetes cuidam de você. Lemos cada mensagem com calma e respondemos com a mesma dedicação que colocamos em cada barra artesanal.</p>
              <a href="mailto:dlevesaboaria@gmail.com" className="site-contact__email">dlevesaboaria@gmail.com</a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
