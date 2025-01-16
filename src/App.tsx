import React from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MessageCircle,
  Code2,
  Database,
  Layout,
  Palette
} from 'lucide-react';

function useScrollTo() {
  const scrollTo = (elementId: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return scrollTo;
}

function App() {
  const scrollTo = useScrollTo();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            João Silva
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Desenvolvedor Full Stack & Web Designer
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#contact" onClick={scrollTo('contact')} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors">
              Entre em Contato
            </a>
            <a href="#about" onClick={scrollTo('about')} className="border border-blue-500 hover:bg-blue-500/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Saiba Mais
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Sobre Mim</h2>
          <div className="bg-gray-800/50 p-8 rounded-2xl">
            <p className="text-lg text-gray-300 leading-relaxed">
              Sou um desenvolvedor de sistemas apaixonado por criar experiências digitais excepcionais. 
              Com mais de 5 anos de experiência em desenvolvimento web, combino habilidades técnicas 
              com um olhar aguçado para design, entregando soluções que não só funcionam perfeitamente, 
              mas também impressionam visualmente.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Tecnologias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <TechCard icon={<Code2 className="w-8 h-8" />} title="Front-end" 
              techs={['React.js', 'Vue.js', 'Angular.js', 'HTML', 'CSS', 'Sass', 'Bootstrap']} />
            <TechCard icon={<Database className="w-8 h-8" />} title="Back-end" 
              techs={['PHP', 'MySQL', 'Oracle DB']} />
            <TechCard icon={<Layout className="w-8 h-8" />} title="Design" 
              techs={['UI/UX Design', 'Responsive Design', 'Web Design']} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Vamos Conversar?</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <ContactButton 
              icon={<Linkedin className="w-6 h-6" />}
              text="LinkedIn"
              href="https://linkedin.com/in/seuprofile"
              className="bg-[#0077B5]"
            />
            <ContactButton 
              icon={<MessageCircle className="w-6 h-6" />}
              text="WhatsApp"
              href="https://wa.me/5511999999999"
              className="bg-[#25D366]"
            />
            <ContactButton 
              icon={<Mail className="w-6 h-6" />}
              text="E-mail"
              href="mailto:seu@email.com"
              className="bg-red-500"
            />
            <ContactButton 
              icon={<Github className="w-6 h-6" />}
              text="GitHub"
              href="https://github.com/seuprofile"
              className="bg-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 border-t border-gray-800">
        <p>© 2024 João Silva. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  techs: string[];
}

function TechCard({ icon, title, techs }: TechCardProps) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {techs.map((tech) => (
          <li key={tech} className="text-gray-300">{tech}</li>
        ))}
      </ul>
    </div>
  );
}

interface ContactButtonProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  className?: string;
}

function ContactButton({ icon, text, href, className }: ContactButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity ${className}`}
    >
      {icon}
      {text}
    </a>
  );
}

export default App;