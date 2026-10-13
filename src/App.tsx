import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { DEVELOPER_PROFILE, PROJECTS } from './data/portfolioData';
import { ProjectDetailScreen } from './components/ProjectDetailScreen';
import { CvScreen } from './components/CvScreen';
import { ContactModal } from './components/ContactModal';
import { HomeScreen } from './components/HomeScreen';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. El estado del modal ahora depende de si la URL termina en #contacto
  const isContactModalOpen = location.hash === '#contacto';
  const [contactModalTab, setContactModalTab] = useState<'message' | 'profile'>('message');

  const handleOpenContactModal = (tab: 'message' | 'profile' = 'message') => {
    setContactModalTab(tab);
    // 2. En lugar de un estado, agregamos el hash al historial del navegador
    navigate(`${location.pathname}#contacto`);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (sectionId === 'inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (sectionId === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    // Evitamos hacer scroll top si el cambio fue solo abrir/cerrar el modal
    if (location.hash !== '#contacto') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background font-body text-on-surface antialiased print:h-auto print:min-h-0 print:overflow-visible print:bg-white print:text-black print:m-0 print:p-0">

      {/* HEADER GLOBAL */}
      {location.pathname === '/' && (
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant print:hidden">
          <div className="h-16 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
            <button onClick={() => handleNavigateSection('inicio')} className="font-headline font-bold text-lg tracking-tight text-on-surface hover:text-primary transition-colors whitespace-nowrap cursor-pointer bg-transparent border-none">
              Martín Villalobos
            </button>

            <div className="flex items-center gap-6 lg:gap-8">
              <nav className="hidden sm:flex items-center gap-6">
                <button onClick={() => handleNavigateSection('sobre-mi')} className="text-sm text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer">Sobre mí</button>
                <button onClick={() => handleNavigateSection('proyectos')} className="text-sm text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer">Proyectos</button>
                <button onClick={() => handleNavigateSection('contacto')} className="text-sm text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer">Contacto</button>
              </nav>
              <button onClick={() => navigate('/cv')} className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-medium rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors whitespace-nowrap shrink-0 cursor-pointer border-none">
                Ver CV
              </button>
              <button type="button" onClick={() => handleOpenContactModal('profile')} className="w-8 h-8 rounded-full bg-primary hover:bg-primary-fixed-dim flex items-center justify-center shrink-0 transition-colors cursor-pointer border-none">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* SISTEMA DE RUTAS */}
      <Routes>
        <Route path="/" element={<HomeScreen onOpenContactModal={handleOpenContactModal} />} />
        <Route path="/cv" element={<CvScreen onBack={() => navigate(-1)} />} />
        <Route path="/proyecto/:id" element={
          <ProjectDetailWrapper
            onBack={() => navigate(-1)}
            onOpenContact={() => handleOpenContactModal('message')}
          />
        } />
      </Routes>

      {/* FOOTER GLOBAL */}
      {location.pathname === '/' && (
        <footer className="w-full bg-background border-t border-outline-variant py-12 print:hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-6 text-sm text-on-surface-variant">
              <a href={DEVELOPER_PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-on-surface transition-colors">GitHub</a>
              <span className="text-outline-variant">•</span>
              <a href={`mailto:${DEVELOPER_PROFILE.email}`} className="hover:text-on-surface transition-colors">Correo electrónico</a>
            </div>
            <p className="text-xs text-secondary-fixed-dim tracking-wide">
              © 2026 Martín Villalobos. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      )}

      {/* CONTACT MODAL CONECTADO A LA URL */}
      <ContactModal
        isOpen={isContactModalOpen}
        initialTab={contactModalTab}
        onClose={() => {
          // Si el usuario hace clic en la "X", simulamos el botón Atrás para quitar el #contacto
          navigate(-1);
        }}
        onNavigateScreen={(screen, proj) => {
          // Al cambiar de ruta nativamente, el hash desaparece y el modal se cierra solo
          if (screen === 'home') navigate('/');
          else if (screen === 'cv') navigate('/cv');
          else if (screen === 'project' && proj) navigate(`/proyecto/${proj.id}`);
        }}
      />
    </div>
  );
}

// COMPONENTE WRAPPER
function ProjectDetailWrapper({ onBack, onOpenContact }: { onBack: () => void, onOpenContact: () => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    navigate('/');
    return null;
  }

  return (
    <ProjectDetailScreen
      project={project}
      onBack={onBack}
      onOpenContact={onOpenContact}
      onSelectProject={(proj) => navigate(`/proyecto/${proj.id}`, { replace: true })}
    />
  );
}