import React, { useState } from 'react';
import { DEVELOPER_PROFILE, PROJECTS, ProjectItem } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  initialTab?: 'message' | 'profile';
  onClose: () => void;
  onNavigateScreen: (screen: 'home' | 'cv' | 'project', project?: ProjectItem) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  initialTab = 'profile', // Cambiamos el valor por defecto a profile
  onClose,
  onNavigateScreen,
}) => {
  // Forzamos que el estado inicial siempre sea 'profile'
  const [activeTab, setActiveTab] = useState<'message' | 'profile'>('profile');

  // (Mantenemos los demás estados intactos para no perder el código)
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [inquiryType, setInquiryType] = useState<'estadia' | 'fullstack' | 'mobile' | 'ml'>('estadia');
  const [messageBody, setMessageBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  React.useEffect(() => {
    // Forzamos a que siempre se active 'profile' al abrir el modal,
    // ignorando si otra pantalla intentó abrir la pestaña de mensajes.
    setActiveTab('profile');
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSenderName('');
    setSenderEmail('');
    setMessageBody('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md print:hidden">
      <div className="w-full max-w-xl rounded-2xl border border-outline-variant bg-surface-container p-6 sm:p-8 relative shadow-2xl">

        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
          <div className="flex items-center gap-2">

            {/* === BOTÓN DESACTIVADO Y OCULTO TEMPORALMENTE === */}
            {/* 
            <button
              onClick={() => setActiveTab('message')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${activeTab === 'message'
                ? 'bg-primary text-on-primary font-medium'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
            >
              Iniciar Conversación
            </button> 
            */}

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${activeTab === 'profile'
                ? 'bg-primary text-on-primary font-medium'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
            >
              {DEVELOPER_PROFILE.devId}
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* CONTENIDO DEL MODAL */}
        {activeTab === 'message' ? (
          <div className="pt-6">
            {/* 
                Todo el código del formulario sigue aquí abajo, intacto y seguro, 
                pero como forzamos a que activeTab siempre sea 'profile', 
                el usuario nunca podrá llegar a esta sección hasta que tú lo decidas. 
             */}
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-tertiary/15 border border-tertiary/40 text-tertiary mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">check</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface">
                  Mensaje Preparado y Registrado
                </h3>
                <p className="text-xs text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  Gracias por contactar a {DEVELOPER_PROFILE.name}. Tu propuesta para{' '}
                  <span className="text-on-surface font-mono">{inquiryType.toUpperCase()}</span> ha
                  sido registrada. También puedes abrir tu cliente de correo directamente.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <a
                    href={`mailto:${DEVELOPER_PROFILE.email}?subject=Colaboración / Estadías 2026
                     - ${encodeURIComponent(
                      senderName || 'Contacto'
                    )}&body=${encodeURIComponent(messageBody)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    <span>Abrir Cliente de Correo</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-lg bg-surface-container-high border border-outline-variant text-xs font-mono text-on-surface-variant hover:text-on-surface cursor-pointer"
                  >
                    Nuevo Mensaje
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-headline font-bold text-on-surface">
                    Listo para colaborar
                  </h3>
                  <p className="mt-1 text-xs text-on-surface-variant">
                    Disponible para estadías profesionales en 2026 y proyectos de ingeniería Full-Stack, Móvil y Datos.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-secondary mb-1">
                      NOMBRE / EMPRESA
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Ej. Ana Gómez • Tech Lead"
                      className="w-full px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-xs text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-secondary mb-1">
                      CORREO DE CONTACTO
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="reclutamiento@empresa.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-xs text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-secondary mb-1.5">
                    TIPO DE OPORTUNIDAD
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        { id: 'estadia', label: 'Estadías 2026' },
                        { id: 'fullstack', label: 'Full-Stack API' },
                        { id: 'mobile', label: 'App Móvil' },
                        { id: 'ml', label: 'Datos & ML' },
                      ] as const
                    ).map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setInquiryType(opt.id)}
                        className={`px-2.5 py-2 rounded-lg text-xs font-mono border text-center transition-colors cursor-pointer ${inquiryType === opt.id
                          ? 'bg-primary/15 border-primary text-on-surface'
                          : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant'
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-secondary mb-1">
                    DETALLES DEL PROYECTO O VACANTE
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="Hola Martín, nos interesa tu perfil para estadías profesionales de Ingeniería en Software..."
                    className="w-full px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-high border border-outline-variant text-xs font-mono text-on-surface-variant hover:text-on-surface cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">content_copy</span>
                    <span>{copiedEmail ? '¡Copiado!' : DEVELOPER_PROFILE.email}</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-on-surface text-on-secondary hover:bg-on-surface-variant text-xs font-medium transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>Enviar Mensaje</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="pt-6 space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant">
              <div className="w-14 h-14 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center font-headline font-bold text-xl text-on-surface">
                MV
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-base text-on-surface">
                    {DEVELOPER_PROFILE.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-tertiary">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                    ONLINE
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5">
                  {DEVELOPER_PROFILE.headline}
                </div>
                <div className="text-[11px] font-mono text-secondary mt-1">
                  {DEVELOPER_PROFILE.stackSummary} • {DEVELOPER_PROFILE.expYear}
                </div>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-secondary uppercase mb-2.5">
                NAVEGACIÓN RÁPIDA DE PANTALLAS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => onNavigateScreen('home')}
                  className="p-3 rounded-lg bg-surface-container-high border border-outline-variant hover:border-primary text-left flex items-center justify-between text-xs text-on-surface cursor-pointer"
                >
                  <span>Vista Principal (Portafolio)</span>
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    home
                  </span>
                </button>
                <button
                  onClick={() => onNavigateScreen('cv')}
                  className="p-3 rounded-lg bg-surface-container-high border border-outline-variant hover:border-primary text-left flex items-center justify-between text-xs text-on-surface cursor-pointer"
                >
                  <span>Currículum Vitae (CV 2026)</span>
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    description
                  </span>
                </button>
                {PROJECTS.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => onNavigateScreen('project', proj)}
                    className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant hover:border-outline text-left flex items-center justify-between text-xs text-on-surface-variant hover:text-on-surface cursor-pointer"
                  >
                    <span className="truncate pr-2">Demo: {proj.title}</span>
                    <span className="material-symbols-outlined text-[15px]">
                      arrow_outward
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};