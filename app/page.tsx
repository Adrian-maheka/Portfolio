'use client';

import Head from 'next/head';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-scroll';
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

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Create a ThemeContext
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('dark'); // Default theme

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Main component
const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext) || { theme: 'dark', setTheme: () => {} }; // Using context
  const [inputData, setInputData] = useState({ name: '', email: '', message: '' });
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false)
  
  const [faqData] = useState([
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message } = inputData;

    // Logika pengiriman data atau lainnya
    console.log("Nama:", name);
    console.log("Email:", email);
    console.log("Pesan:", message);

    // Reset form after submission
    setInputData({ name: '', email: '', message: '' });
    setConfirmationMessage('Pesan Anda telah terkirim!');
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
    {['Tentang Saya', 'Keahlian', 'Pendidikan', 'Proyek', 'Sumber Belajar',"Tools Dan Teknologi Favorit", 'Kontak Info', 'Masukan', 'Fitur Pencarian', 'FAQ'].map((item, index) => (
      <li key={index} className="hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105">
        <Link 
          to={item === 'Tools Dan Teknologi Favorit' ? 'tools-favorit' : item.toLowerCase().replace(/ /g, '-')} 
          smooth={true} 
          duration={500}
        >
          <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            {item}
          </span>
        </Link>
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
              style={{ height: '650px' }}
            />
          </div>
        </Section>

        <Section title="Pendidikan" id="pendidikan" theme={theme}>
  <p className="mt-4">Saya sedang magang di PT Taksu Teknologi Indonesia.</p>
</Section>

<Section title="Proyek" id="proyek" theme={theme}>
  <p className="mt-4">Saya sedang mengerjakan proyek web ini.</p>
</Section>

<Section title="Sumber Belajar" id="sumber-belajar" theme={theme}>
  <ul className="list-disc list-inside mt-4">
    <li><a href="#" className="text-black dark:text-white hover:underline">MDN Web Docs</a></li>
    <li><a href="#" className="text-black dark:text-white hover:underline">FreeCodeCamp</a></li>
    <li><a href="#" className="text-black dark:text-white hover:underline">W3Schools</a></li>
    <li><a href="#" className="text-black dark:text-white hover:underline">Codecademy</a></li>
    <li><a href="#" className="text-black dark:text-white hover:underline">Coursera</a></li>
    <li><a href="#" className="text-black dark:text-white hover:underline">Udemy</a></li>
    <li><a href="#" className="text-black dark:text-white hover:underline">YouTube</a></li>
  </ul>
</Section>
<Section title="Tools dan Teknologi Favorit" id="tools-favorit" theme={theme}>
  <ul className="list-disc list-inside mt-4">
    <li>Visual Studio Code</li>
    <li>GitHub</li>
    <li>Figma</li>
    <li>Node.js</li>
    <li>React</li>
  </ul>
</Section>
<Section title="Kontak Info" id="kontak-info" theme={theme}>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              name="name"
              placeholder="Nama"
              value={inputData.name}
              onChange={handleInputChange}
              required
              className={`border border-gray-300 p-2 rounded mb-4 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={inputData.email}
              onChange={handleInputChange}
              required
              className={`border border-gray-300 p-2 rounded mb-4 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            />
            <textarea
              name="message"
              placeholder="Pesan"
              value={inputData.message}
              onChange={handleInputChange}
              required
              className={`border border-gray-300 p-2 rounded mb-4 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            ></textarea>
            <button
              type="submit"
              className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-yellow-400 text-black' : 'bg-blue-500 text-white'} hover:bg-opacity-75`}
            >
              Kirim
            </button>
            {confirmationMessage && <p className="mt-4 text-green-500">{confirmationMessage}</p>}
          </form>
        </Section>
        <Section title="Masukan" id="masukan" theme={theme}>
  <p className="mt-4 text-gray-900 dark:text-gray-200">
    Silakan berikan masukan Anda tentang portofolio ini. Kami menghargai setiap saran yang Anda berikan!
  </p>
  <form className="mt-4 space-y-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-800 dark:text-gray-300">Nama Anda:</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md p-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Masukkan nama Anda"
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-gray-300">Email Anda:</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md p-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Masukkan email Anda"
      />
    </div>
    <div>
      <label htmlFor="feedback" className="block text-sm font-medium text-gray-800 dark:text-gray-300">Masukan Anda:</label>
      <textarea
        id="feedback"
        name="feedback"
        required
        rows={4}
        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md p-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Tuliskan masukan Anda di sini..."
      />
    </div>
    <button
  type="submit"
  className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 dark:bg-yellow-600 dark:hover:bg-orange-500"
>
  Kirim Masukan
</button>

  </form>
</Section>
<Section title="Fitur Pencarian" id="fitur-pencarian" theme={theme}>
          <input
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`border border-gray-300 p-2 rounded mb-4 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
          />
        </Section>
         <Section title="FAQ" id="faq" theme={theme}>
  {faqData.filter(faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase())).map((faq, index) => {
    ;

    return (
      <div key={index} className="border-b border-gray-300 py-2">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="font-bold">{faq.question}</h3>
          <span className="text-xl">{isOpen ? '-' : '+'}</span>
        </div>
        <p 
          className={`mt-1 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          {faq.answer}
        </p>
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

const Section: React.FC<{ title: string; children: React.ReactNode; theme: string; id: string }> = ({ title, children, theme, id }) => {
  return (
    <div id={id} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
      <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'}`}>{title}</h2>
      {children}
    </div>
  );
};

 // Export your main app
export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
