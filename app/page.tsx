'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import 'tailwindcss/tailwind.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [inputData, setInputData] = useState({ name: '', email: '', message: '' });
  const [formError, setFormError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [faqData, setFaqData] = useState([
    { question: 'Apa itu portofolio?', answer: 'Portofolio adalah koleksi karya dan proyek yang menunjukkan keterampilan dan pengalaman seseorang.', answerVisible: false },
    { question: 'Bagaimana cara belajar pemrograman?', answer: 'Anda dapat belajar pemrograman melalui kursus online, tutorial, dan praktik langsung.', answerVisible: false },
    { question: 'Apa tujuan saya dalam belajar pengembangan web?', answer: 'Tujuan saya adalah menjadi pengembang web yang kompeten dan dapat membuat aplikasi yang bermanfaat untuk masyarakat.', answerVisible: false },
    { question: 'Apa yang harus saya lakukan jika saya tidak bisa menyelesaikan proyek?', answer: 'Anda bisa meminta bantuan dari teman atau mencari tutorial online yang relevan.', answerVisible: false },
    { question: 'Apakah saya perlu pengalaman sebelumnya untuk belajar pemrograman?', answer: 'Tidak, siapa pun dapat belajar pemrograman terlepas dari latar belakang sebelumnya.', answerVisible: false },
    { question: 'Apa saja bahasa pemrograman yang harus dipelajari untuk pemula?', answer: 'Bahasa pemrograman yang baik untuk pemula adalah HTML, CSS, dan JavaScript.', answerVisible: false },
    { question: 'Bagaimana cara menemukan mentor dalam belajar pemrograman?', answer: 'Anda bisa bergabung dengan komunitas online atau lokal untuk bertemu dengan mentor dan profesional.', answerVisible: false },
  ]);

  const [feedbackData, setFeedbackData] = useState({ name: '', email: '', message: '' });
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackConfirmation, setFeedbackConfirmation] = useState('');

  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Adding a small delay before scrolling
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // Delay of 100ms
    } else {
      console.warn(`Element with id "${id}" not found.`);
    }
  };
  

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setConfirmationMessage('');

    if (!inputData.name || !inputData.email || !inputData.message) {
      setFormError('Semua kolom harus diisi.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(inputData.email)) {
      setFormError('Alamat email tidak valid.');
      return;
    }

    console.log(inputData);
    setConfirmationMessage('Pesan Anda telah berhasil dikirim! Terima kasih atas partisipasi Anda.');
    setInputData({ name: '', email: '', message: '' });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackError('');
    setFeedbackConfirmation('');

    if (!feedbackData.name || !feedbackData.email || !feedbackData.message) {
      setFeedbackError('Semua kolom harus diisi.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(feedbackData.email)) {
      setFeedbackError('Alamat email tidak valid.');
      return;
    }

    console.log(feedbackData);
    setFeedbackConfirmation('Terima kasih atas masukan Anda!');
    setFeedbackData({ name: '', email: '', message: '' });
  };

  const skillData = {
    labels: ['HTML', 'CSS', 'JavaScript', 'Git'],
    datasets: [
      {
        label: 'Tingkat Keterampilan',
        data: [40, 30, 30, 10],
        backgroundColor: theme === 'dark' ? 'rgba(255, 215, 0, 0.6)' : 'rgba(0, 123, 255, 0.6)',
      },
    ],
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between p-6 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ${showContent ? 'animate-fade-in' : 'opacity-0'}`}>
      <Head>
        <title>Portofolio CV</title>
        <meta name="description" content="Portofolio CV saya" />
      </Head>

      <header className={`text-center mb-10 p-10 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <h1 className={`${theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'} text-5xl font-bold`}>I Putu Adrian Maheka Putra</h1>
        <p className="mt-4 text-lg italic">Pengembang web pemula yang bersemangat untuk belajar dan berinovasi.</p>
        <button
          onClick={toggleTheme}
          className={`mt-6 px-4 py-2 rounded transition duration-300 ease-in-out ${theme === 'dark' ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-blue-500 text-white hover:bg-blue-400'}`}
        >
          {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>

      <nav className="text-center mb-10">
  <ul className="flex flex-wrap justify-center space-x-6">
    {['Tentang Saya', 'Keahlian', 'Pendidikan', 'Proyek', 'Sumber Belajar', 'Tools dan Teknologi Favorit', 'Kontak Info', 'Masukan', 'Fitur Pencarian', 'FAQ'].map((item, index) => (
      <li key={index} className="hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105">
        <button onClick={() => handleScrollTo(item.toLowerCase().replace(/\s/g, '-'))} className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
          {item}
        </button>
      </li>
    ))}
  </ul>
</nav>
<main className="container mx-auto p-6 shadow-lg rounded-lg mt-6 flex flex-col space-y-10">
        <Section title="Tentang Saya" id="tentang-saya" theme={theme}>
          <p className="mt-4">Saya adalah pengembang web pemula yang antusias dalam belajar dan mengembangkan keterampilan.</p>
        </Section>
        
        <Section title="Keahlian" id="keahlian" theme={theme}>
  <ul className="list-disc list-inside mt-4">
    <li>Memahami Dasar-dasar HTML</li>
    <li>Memahami Dasar-dasar CSS</li>
    <li>Memahami Pengenalan JavaScript</li>
    <li>Memahami Pengenalan Git</li>
  </ul>
  <div className="mt-8">
    <Bar 
      data={skillData} 
      options={{ 
        responsive: true, 
        maintainAspectRatio: false, 
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 10, // Menyesuaikan langkah tick pada sumbu Y
            },
          },
        },
      }} 
      style={{ height: '400px' }} // Perbesar tinggi bar data
    />
  </div>
</Section>


        <Section title="Pendidikan" id="pendidikan" theme={theme}>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
            Saya saat ini magang di PT Taksu Teknologi Indonesia, di mana saya belajar banyak mengenai pengembangan web dan teknologi terbaru di bidang ini.
          </p>
        </Section>

        <Section title="Proyek" id="proyek" theme={theme}>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
            Saya telah bekerja pada beberapa proyek web kecil dan ingin terus mengembangkan keterampilan saya.
          </p>
        </Section>

        <Section title="Sumber Belajar" id="sumber-belajar" theme={theme}>
  <ul className="list-disc list-inside mt-4">
    <li>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">
        MDN Web Docs - Belajar Dasar-dasar JavaScript
      </a>
    </li>
    <li>
      <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer">
        FreeCodeCamp - Belajar Pengembangan Web untuk Pemula
      </a>
    </li>
    <li>
      <a href="https://www.w3schools.com/" target="_blank" rel="noopener noreferrer">
        W3Schools - Panduan Dasar untuk HTML, CSS, dan JavaScript
      </a>
    </li>
    </ul>
</Section>
    <Section title="Tools dan Teknologi Favorit" id="tools-dan-teknologi-favorit" theme={theme}>
  <ul className={`list-disc list-inside mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
    <li>
      <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">
        Visual Studio Code
      </a> - Editor kode yang kuat untuk pengembangan web.
    </li>
    <li>
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
        GitHub
      </a> - Platform untuk kontrol versi dan kolaborasi.
    </li>
    <li>
      <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer">
        Figma
      </a> - Alat desain berbasis web untuk UI/UX.
    </li>
    <li>
      <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
        Next.js
      </a> - Framework React untuk membangun aplikasi yang dirender di server.
    </li>
    <li>
      <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
        Tailwind CSS
      </a> - Framework CSS berbasis utilitas untuk pengembangan UI yang cepat.
    </li>
    <li>
      <a href="https://www.postman.com/" target="_blank" rel="noopener noreferrer">
        Postman
      </a> - Alat untuk pengembangan dan pengujian API.
    </li>
  </ul>
</Section>
   <Section title="Kontak Info" id="kontak-info" theme={theme}>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Nama"
                value={inputData.name}
                onChange={handleInputChange}
                className={`p-2 rounded border ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-400'} focus:outline-none`}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={inputData.email}
                onChange={handleInputChange}
                className={`p-2 rounded border ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-400'} focus:outline-none`}
              />
              <textarea
                name="message"
                placeholder="Pesan"
                value={inputData.message}
                onChange={handleInputChange}
                rows="4"
                className={`p-2 rounded border ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-400'} focus:outline-none`}
              />
            </div>
            {formError && <p className="text-red-500">{formError}</p>}
            <button type="submit" className={`mt-4 px-4 py-2 rounded transition duration-300 ease-in-out ${theme === 'dark' ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-blue-500 text-white hover:bg-blue-400'}`}>
              Kirim Pesan
            </button>
            {confirmationMessage && <p className="mt-4 text-green-500">{confirmationMessage}</p>}
          </form>
        </Section>

        <Section title="Masukan" id="masukan" theme={theme}>
          <form onSubmit={handleFeedbackSubmit} className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Nama"
                value={feedbackData.name}
                onChange={(e) => setFeedbackData({ ...feedbackData, name: e.target.value })}
                className={`p-2 rounded border ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-400'} focus:outline-none`}
              />
              <input
                type="email"
                placeholder="Email"
                value={feedbackData.email}
                onChange={(e) => setFeedbackData({ ...feedbackData, email: e.target.value })}
                className={`p-2 rounded border ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-400'} focus:outline-none`}
              />
              <textarea
                placeholder="Pesan"
                value={feedbackData.message}
                onChange={(e) => setFeedbackData({ ...feedbackData, message: e.target.value })}
                rows="4"
                className={`p-2 rounded border ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-400'} focus:outline-none`}
              />
            </div>
            {feedbackError && <p className="text-red-500">{feedbackError}</p>}
            <button type="submit" className={`mt-4 px-4 py-2 rounded transition duration-300 ease-in-out ${theme === 'dark' ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-blue-500 text-white hover:bg-blue-400'}`}>
              Kirim Masukan
            </button>
            {feedbackConfirmation && <p className="mt-4 text-green-500">{feedbackConfirmation}</p>}
          </form>
        </Section>

        <Section title="Fitur Pencarian" id="fitur-pencarian" theme={theme}>
          <input
            type="text"
            placeholder="Cari FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`p-2 rounded border ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-400'} focus:outline-none`}
          />
        </Section>
<Section title="FAQ" id="faq" theme={theme}>
  <div className="space-y-4">
    {faqData.filter(faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase())).map((faq, index) => (
      <div key={index} className={`p-4 rounded border ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-400'}`}>
        <h3 className="flex justify-between items-center font-bold cursor-pointer" onClick={() => {
          const updatedFaqData = [...faqData];
          updatedFaqData[index].answerVisible = !updatedFaqData[index].answerVisible;
          setFaqData(updatedFaqData);
        }}>
          <span>{faq.question}</span>
          <span className={`transition-transform duration-300 ${faq.answerVisible ? 'transform rotate-180' : 'transform rotate-0'}`}>
            {faq.answerVisible ? '-' : '+'}
          </span>
        </h3>
        {faq.answerVisible && <p className="mt-2 transition-opacity duration-300">{faq.answer}</p>}
      </div>
    ))}
  </div>
</Section>
</main>
<footer className="mt-10 text-center">
  <p>© 2024 I Putu Adrian Maheka Putra. All rights Reserved.</p>
  <p>
  <a
    href="https://www.instagram.com/yannlagikiap_?igsh=MTllZ2o0MmZldWd1ag=="
    className={`hover:underline transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
      theme === 'dark' ? 'text-yellow-400 hover:text-yellow-600' : 'text-blue-600 hover:text-blue-800'
    }`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Instagram
  </a> | 
  <a
    href="https://github.com/Adrian-maheka"
    className={`hover:underline transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
      theme === 'dark' ? 'text-yellow-400 hover:text-yellow-600' : 'text-blue-600 hover:text-blue-800'
    }`}
    target="_blank"
    rel="noopener noreferrer"
  >
    GitHub
  </a> | 
  <a
    href="https://wa.me/628873749149"
    className={`hover:underline transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
      theme === 'dark' ? 'text-yellow-400 hover:text-yellow-600' : 'text-blue-600 hover:text-blue-800'
    }`}
    target="_blank"
    rel="noopener noreferrer"
  >
    WhatsApp
  </a>
</p>
</footer>
</div>
 );
};

const Section = ({ title, children, id, theme }) => (
  <section id={id} className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
    <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'}`}>{title}</h2>
    {children}
  </section>
);

export default Home;
