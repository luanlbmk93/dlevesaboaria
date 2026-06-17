import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <Link href="/" className="site-logo site-logo--footer">
            <span className="site-logo__mark">D&apos;</span>
            <span>Leve</span>
          </Link>
          <p className="site-footer__tagline">Alma da Terra</p>
          <p className="site-footer__desc">
            Criamos saboaria artesanal feita à mão, unindo botânica e carinho para nutrir sua pele.
            Cada barra respeita a natureza e traz a pureza dos ingredientes naturais.
          </p>
        </div>

        <div>
          <h3>Navegação</h3>
          <ul>
            <li><Link href="/produtos">Produtos</Link></li>
            <li><Link href="/#tendencias">Tendências</Link></li>
            <li><Link href="/#sobre">Nossa História</Link></li>
            <li><Link href="/#contato">Contato</Link></li>
          </ul>        </div>

        <div>
          <h3>Contato</h3>
          <a href="mailto:dlevesaboaria@gmail.com">dlevesaboaria@gmail.com</a>
          <p className="site-footer__motto">Bem-estar consciente em cada detalhe.</p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>&copy; 2026 D&apos;Leve saboaria artesanal. Feito com amor.</p>
        </div>
      </div>
    </footer>
  );
}
