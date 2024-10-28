'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll'; // Import dari react-scroll
import { Bar } from 'react-chartjs-2';
// atau untuk chart jenis lain
import { Line } from 'react-chartjs-2';

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
   { question: 'Apa itu Next.js?', answer: 'Next.js adalah framework React untuk membangun aplikasi web.' },
    { question: 'Apa itu Tailwind CSS?', answer: 'Tailwind CSS adalah framework CSS utilitas yang memungkinkan Anda untuk membangun desain dengan cepat.' },
    { question: 'Apa manfaat menggunakan Vercel?', answer: 'Vercel mempermudah proses deployment dan hosting untuk aplikasi Next.js, serta menyediakan fitur-fitur seperti optimasi performa dan dukungan untuk integrasi otomatis.' },
    { question: 'Bagaimana cara menambahkan komponen baru di Next.js?', answer: 'Untuk menambahkan komponen baru di Next.js, buat file baru di folder komponen Anda dan import ke halaman atau komponen yang relevan.' },
    { question: 'Apakah Tailwind CSS bisa digunakan dengan framework lain selain Next.js?', answer: 'Ya, Tailwind CSS dapat digunakan dengan berbagai framework seperti Vue.js, Angular, atau bahkan proyek HTML/CSS biasa.' },
    { question: 'Bagaimana cara mengaktifkan mode gelap di Tailwind CSS?', answer: 'Anda bisa menggunakan pengaturan "dark mode" di Tailwind CSS, yang dapat diaktifkan dengan mengonfigurasi file tailwind.config.js.' },
    { question: 'Apakah saya perlu menguasai JavaScript untuk menggunakan Next.js?', answer: 'Ya, karena Next.js adalah framework React yang berbasis JavaScript, pemahaman dasar JavaScript sangat membantu.' },
    { question: 'Apakah website saya akan tetap responsif jika menggunakan Tailwind CSS?', answer: 'Ya, Tailwind CSS memiliki sistem responsif yang memungkinkan Anda menyesuaikan desain untuk berbagai ukuran layar.' },
    { question: 'Bagaimana cara mengoptimalkan performa website di Next.js?', answer: 'Anda bisa menggunakan fitur seperti lazy loading, optimasi gambar dengan Image Component, dan pre-rendering halaman di Next.js.' },
    { question: 'Apakah Next.js mendukung SEO?', answer: 'Ya, Next.js mendukung SEO dengan fitur seperti server-side rendering dan metadata di halaman-halaman tertentu.' }
]);
  const [feedbackData, setFeedbackData] = useState({ name: '', message: '' });
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackConfirmation, setFeedbackConfirmation] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFeedbackData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = inputData;

    if (!name || !email || !message) {
      setFormError('Semua kolom harus diisi!');
      setConfirmationMessage('');
      return;
    }

    // Simulasi pengiriman formulir
    setConfirmationMessage('Pesan Anda telah dikirim!');
    setFormError('');
    setInputData({ name: '', email: '', message: '' });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, message } = feedbackData;

    if (!name || !message) {
      setFeedbackError('Semua kolom harus diisi!');
      setFeedbackConfirmation('');
      return;
    }

    // Simulasi pengiriman umpan balik
    setFeedbackConfirmation('Umpan balik Anda telah dikirim!');
    setFeedbackError('');
    setFeedbackData({ name: '', message: '' });
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
              <button onClick={() =>(item.toLowerCase().replace(/\s/g, '-'))} className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
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
              stepSize: 10,
            },
          },
        },
      }} 
      style={{ height: '650px' }} // Meningkatkan tinggi grafik
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
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-yellow-300' : 'text-blue-500'}`}>
                MDN Web Docs - Belajar Dasar-dasar JavaScript
              </a>
            </li>
            <li>
              <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-yellow-300' : 'text-blue-500'}`}>
                FreeCodeCamp - Belajar Pengembangan Web untuk Pemula
              </a>
            </li>
            <li>
              <a href="https://www.w3schools.com/" target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-yellow-300' : 'text-blue-500'}`}>
                W3Schools - Panduan Dasar untuk HTML, CSS, dan JavaScript
              </a>
            </li>
          </ul>
        </Section>

        <Section title="Tools dan Teknologi Favorit" id="tools-dan-teknologi-favorit" theme={theme}>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
            Beberapa alat dan teknologi yang saya suka gunakan:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Visual Studio Code</li>
            <li>Git & GitHub</li>
            <li>Figma</li>
          </ul>
        </Section>

        <Section title="Kontak Info" id="kontak-info" theme={theme}>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2">Nama:</label>
              <input 
                type="text" 
                name="name" 
                value={inputData.name} 
                onChange={handleInputChange} 
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`} 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">Email:</label>
              <input 
                type="email" 
                name="email" 
                value={inputData.email} 
                onChange={handleInputChange} 
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`} 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-bold mb-2">Pesan:</label>
              <textarea 
                name="message" 
                value={inputData.message} 
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`} 
              />
            </div>
            {formError && <p className="text-red-500 text-sm">{formError}</p>}
            {confirmationMessage && <p className="text-green-500 text-sm">{confirmationMessage}</p>}
            <button 
              type="submit" 
              className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${theme === 'dark' ? 'bg-yellow-400 hover:bg-yellow-300' : 'bg-blue-500 hover:bg-blue-400'}`}
            >
              Kirim
            </button>
          </form>
        </Section>

        <Section title="Masukan" id="masukan" theme={theme}>
          <form onSubmit={handleFeedbackSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="feedbackName" className="block text-sm font-bold mb-2">Nama:</label>
              <input 
                type="text" 
                name="name" 
                value={feedbackData.name} 
                onChange={handleFeedbackChange} 
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`} 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="feedbackMessage" className="block text-sm font-bold mb-2">Umpan Balik:</label>
              <textarea 
                name="message" 
                value={feedbackData.message} 
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`} 
              />
            </div>
            {feedbackError && <p className="text-red-500 text-sm">{feedbackError}</p>}
            {feedbackConfirmation && <p className="text-green-500 text-sm">{feedbackConfirmation}</p>}
            <button 
              type="submit" 
              className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${theme === 'dark' ? 'bg-yellow-400 hover:bg-yellow-300' : 'bg-blue-500 hover:bg-blue-400'}`}
            >
              Kirim
            </button>
          </form>
        </Section>
        <Section title="Fitur Pencarian" id="fitur-pencarian" theme={theme}>
  <input 
    type="text" 
    placeholder="Cari FAQ..." 
    value={searchTerm} 
    onChange={(e) => setSearchTerm(e.target.value)} 
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
  />
  <ul className="mt-4">
    {faqData
      .filter((faq) => faq.question.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((faq, index) => (
        <li key={index} className={`mt-2 p-3 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
          <strong>{faq.question}</strong>
          <p>{faq.answer}</p>
        </li>
      ))}
  </ul>
</Section>

<Section title="FAQ" id="faq" theme={theme}>
  {faqData.map((faq, index) => {
    // State untuk mengontrol apakah jawaban ditampilkan
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div 
        key={index} 
        className={`mt-4 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} transition-all duration-300 ease-in-out`} // Menambahkan transisi
      >
        <div className="flex items-center justify-between p-3">
          <strong className="flex-grow">{faq.question}</strong>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`ml-2 px-2 py-1 rounded transition-colors duration-300 ease-in-out ${isOpen ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          >
            {isOpen ? '-' : '+'}
          </button>
        </div>
        <div 
          className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`} // Menambahkan animasi pada jawaban
        >
          {isOpen && <p className="mt-2 p-3">{faq.answer}</p>}
        </div>
      </div>
    );
  })}
</Section>


</main>
<footer className="mt-10 text-center">
  <p className="text-gray-800 dark:text-gray-200">© 2024 I Putu Adrian Maheka Putra. All rights Reserved.</p>
  <p>
    <a
      href="https://www.instagram.com/yannlagikiap_?igsh=MTllZ2o0MmZldWd1ag=="
      className="text-yellow-500 hover:underline transition-all duration-300 transform hover:scale-110 hover:text-yellow-600 hover:-translate-y-1 dark:text-yellow-400 dark:hover:text-yellow-500"
      target="_blank"
      rel="noopener noreferrer"
    >
      Instagram
    </a> | 
    <a
      href="https://github.com/Adrian-maheka"
      className="text-yellow-500 hover:underline transition-all duration-300 transform hover:scale-110 hover:text-yellow-600 hover:-translate-y-1 dark:text-yellow-400 dark:hover:text-yellow-500"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
    </a> | 
    <a
      href="https://wa.me/628873749149"
      className="text-yellow-500 hover:underline transition-all duration-300 transform hover:scale-110 hover:text-yellow-600 hover:-translate-y-1 dark:text-yellow-400 dark:hover:text-yellow-500"
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

interface SectionProps {
  title: string;
  id: string;
  theme: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, id, theme, children }) => (
  <section id={id} className={`mb-8 p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
    <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'}`}>{title}</h2>
    {children}
  </section>
);


export default Home;
