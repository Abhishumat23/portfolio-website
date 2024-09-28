import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Moon, Sun, ChevronDown, Menu, X } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';

type Skill = {
  name: string;
  level: number;
};

type CircularProgressBarProps = {
  skill: Skill;
  isDarkMode: boolean;
};

const aboutText = [
  {
    id: 1,
    text: "Hello! I'm Abhishumat Singh Beniwal, a passionate Full Stack Developer with a keen interest in creating beautiful and functional web applications. With a strong foundation in both front-end and back-end technologies, I strive to build seamless user experiences that are both visually appealing and technically robust.",
  },
  {
    id: 2,
    text: "My journey in web development started 3 years ago, and since then, I've had the opportunity to work on a diverse range of projects, from small business websites to large-scale enterprise applications. I'm always excited to take on new challenges and learn emerging technologies to stay at the forefront of web development.",
  },
  {
    id: 3,
    text: "When I'm not coding, you can find me exploring new hiking trails or contributing to open-source projects. I believe in the power of community and continuous learning in the tech world.",
  },
];

const playerStyleDesktop = { height: '400px', width: '400px' }; // Size for desktop
const playerStyleMobile = { height: '250px', width: '250px' }; // Size for mobile

const AboutSection: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <section id="about" className="min-h-screen py-16 flex items-center">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <Player
            autoplay
            loop
            src="/assets/boy-waving.json" // Path to your Lottie file in the public/assets folder
            style={playerStyleDesktop} // Apply desktop style by default
            className="hidden md:block" // Visible on larger screens
          />
          <Player
            autoplay
            loop
            src="/assets/boy-waving.json" // Path to your Lottie file in the public/assets folder
            style={playerStyleMobile} // Apply mobile style
            className="block md:hidden" // Visible on mobile screens only
          />
        </div>
        <div>
          {aboutText.map((paragraph) => (
            <p key={paragraph.id} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              {paragraph.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ skill, isDarkMode }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference * (1 - skill.level / 100);

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className={`stroke-current ${isDarkMode ? 'text-gray-700' : 'text-gray-200'}`}
          strokeWidth="10"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="stroke-current text-blue-500"
          strokeWidth="10"
          strokeLinecap="round"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{skill.level}%</span>
        <span className="text-sm">{skill.name}</span>
      </div>
    </div>
  );
};

const skills: Skill[] = [
  { name: 'React', level: 90 },
  { name: 'JavaScript', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'Node.js', level: 75 },
  { name: 'CSS', level: 85 },
  { name: 'HTML', level: 90 },
];

const projects = [
  {
    title: 'DigiSwasth',
    description: 'A virtual hospital platform for patient-doctor interaction and health management.',
    image: '/images/digiswasth.png',
  },
  {
    title: 'HackOff V4.0',
    description: 'A hackathon event platform for registration, submissions, and participant management.',
    image: '/images/hackoff.png',
  },
  {
    title: 'Sociovate',
    description: 'A platform for ideathon participation, idea submission, and team collaboration.',
    image: '/images/sociovate.png',
  },
];

const Portfolio: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} bg-opacity-80 backdrop-blur-sm`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-light">Abhishumat Singh Beniwal</div>
          <div className="hidden md:flex items-center space-x-6"> {/* Hide on mobile */}
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`text-sm uppercase tracking-wider hover:text-blue-500 transition-colors ${
                  activeSection === item ? 'text-blue-500' : ''
                }`}
              >
                {item}
              </a>
            ))}
            <button onClick={toggleDarkMode} className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <div className="md:hidden flex items-center space-x-2"> {/* Show on mobile */}
            <button onClick={toggleDarkMode} className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden bg-gray-800 bg-opacity-90 text-white`}>
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={toggleMenu}
                className="block px-4 py-2 border-b border-gray-700 hover:bg-gray-700"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative">
        {/* Floating Lottie Animations */}
        <Player
          autoplay
          loop
          src="/assets/floating-ring.json"
          style={{
            height: '400px', // Default for desktop
            width: '400px',
            position: 'absolute',
            top: '25%',
            left: '35%',
          }}
          className="hidden md:block" // Visible on larger screens
        />
        <Player
          autoplay
          loop
          src="/assets/floating-ring.json"
          style={{
            height: '300px', // Adjusted for responsiveness on mobile
            width: '300px',
            position: 'absolute',
            top: '30%',
            left: '15%',
          }}
          className="block md:hidden" // Visible on mobile screens
        />
        <Player
          autoplay
          loop
          src="/assets/box-open.json"
          style={{
            height: '350px', // Default for desktop
            width: '350px',
            position: 'absolute',
            top: '10%',
            right: '10%',
          }}
          className="hidden md:block" // Visible on larger screens
        />
        <Player
          autoplay
          loop
          src="/assets/box-open.json"
          style={{
            height: '220px', // Adjusted for responsiveness on mobile
            width: '220px',
            position: 'absolute',
            top: '10%',
            right: '2%',
          }}
          className="block md:hidden" // Visible on mobile screens
        />
        <div className="text-center relative z-10">
          <motion.h1 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-5xl font-bold mb-4">
            Abhishumat Singh Beniwal
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}
          >
            Full Stack Developer & UI/UX Enthusiast
          </motion.p>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex justify-center space-x-4">
            <a href="https://github.com/Abhishumat23" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/abhishumat-singh-beniwal-200620269/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
              <Linkedin size={24} />
            </a>
            <a href="mailto:abhishumatbeniwal@gmail.com" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
              <Mail size={24} />
            </a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <ChevronDown size={32} className="animate-bounce" />
        </motion.div>
      </section>

      {/* About Section */}
      <AboutSection isDarkMode={isDarkMode} />

      <section id="skills" className="min-h-screen py-16 flex items-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
            {skills.map((skill) => (
              <CircularProgressBar key={skill.name} skill={skill} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen py-16 flex items-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Get in Touch</h2>
          <form className="max-w-lg mx-auto">
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Your Name
              </label>
              <input type="text" id="name" className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} required />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your Email
              </label>
              <input type="email" id="email" className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} required />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-sm font-medium">
                Your Message
              </label>
              <textarea id="message" rows={4} className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} required></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
