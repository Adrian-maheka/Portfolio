import Head from 'next/head';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Portofolio CV</title>
        <meta name="description" content="Portofolio CV saya" />
      </Head>
      <header className="text-center">
        <h1 className="text-4xl font-bold">I Putu Adrian Maheka Putra</h1>
        <p className="text-xl">Seorang pengembang web dengan minat dalam teknologi terbaru dan desain yang inovatif.</p>
      </header>
      <section>
        <h2 className="text-2xl mt-8">Proyek</h2>
        <p>Belum memiliki proyek sama sekali.</p>
      </section>
      <section>
        <h2 className="text-2xl mt-8">Keahlian</h2>
        <ul>
          <li>Dasar-dasar HTML dan CSS</li>
          <li>Pengenalan JavaScript</li>
          <li>Penggunaan Git untuk version control</li>
          <li>Dasar-dasar pengembangan aplikasi web</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl mt-8">Kontak</h2>
        <p>Email: adriannata164@gmail.com</p>
      </section>
    </div>
  );
}
