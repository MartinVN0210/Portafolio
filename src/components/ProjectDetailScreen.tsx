import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS, ProjectItem, ScreenshotItem } from '../data/portfolioData';

interface ProjectDetailScreenProps {
  project: ProjectItem;
  onBack: () => void;
  onOpenContact: () => void;
  // Ya no usamos onSelectProject como prop, usaremos navigate internamente.
  onSelectProject?: (project: ProjectItem) => void;
}

export const ProjectDetailScreen: React.FC<ProjectDetailScreenProps> = ({
  project,
  onBack,
  onOpenContact: _onOpenContact,
}) => {
  const navigate = useNavigate();

  // Gallery states
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Sub-navigation state: Auto-hide on scroll & manual collapse
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [isNavManuallyCollapsed, setIsNavManuallyCollapsed] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentProjectIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentProjectIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentProjectIndex + 1) % PROJECTS.length];

  // Auto-hide sub-navigation on scroll down, reveal on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY <= 60) {
            setIsNavVisible(true);
          } else {
            if (currentScrollY > lastScrollY + 8) {
              setIsNavVisible(false);
              setIsDropdownOpen(false);
            } else if (currentScrollY < lastScrollY - 8) {
              setIsNavVisible(true);
            }
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  // Reset active image index and scroll to top when project changes
  useEffect(() => {
    setActiveImageIndex(0);
    setLightboxOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % project.screenshots.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, project.screenshots.length]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // NAVEGACIÓN DE REACT ROUTER PARA CAMBIAR DE PROYECTO
  const handleSwitchProject = (targetProject: ProjectItem) => {
    navigate(`/proyecto/${targetProject.id}`);
  };

  const activeScreenshot: ScreenshotItem =
    project.screenshots[activeImageIndex] || project.screenshots[0];

  return (
    <div className="min-h-screen bg-background text-on-surface pt-20 pb-24">
      {/* Floating expand pill if manually collapsed */}
      {isNavManuallyCollapsed && (
        <div className="fixed top-20 right-4 sm:right-6 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => setIsNavManuallyCollapsed(false)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container/90 border border-outline-variant hover:border-primary text-xs font-mono text-on-surface shadow-xl backdrop-blur-md transition-all cursor-pointer hover:scale-105"
            title="Expandir barra de navegación de proyectos"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">expand_more</span>
            <span className="hidden sm:inline font-medium">Navegación</span>
            <span className="text-[10px] text-primary font-mono font-semibold">
              ({currentProjectIndex + 1}/{PROJECTS.length})
            </span>
          </button>
        </div>
      )}

      {/* Sub-navigation bar */}
      <div
        className={`border-b border-outline-variant bg-surface-container/80 backdrop-blur-md sticky top-16 z-30 transition-all duration-300 ease-in-out ${isNavVisible && !isNavManuallyCollapsed
            ? 'translate-y-0 opacity-100 shadow-sm'
            : '-translate-y-full opacity-0 pointer-events-none'
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
          {/* Volver al portafolio */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer group shrink-0 py-1 px-2 sm:px-2.5 rounded-lg hover:bg-surface-container border-none bg-transparent"
            title="Volver al portafolio principal"
          >
            <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-0.5 transition-transform text-primary">
              arrow_back
            </span>
            <span className="hidden md:inline">VOLVER AL PORTAFOLIO</span>
            <span className="md:hidden">VOLVER</span>
          </button>

          {/* Project Switcher Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Prev project */}
            <button
              onClick={() => handleSwitchProject(prevProject)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-container border border-outline-variant hover:border-outline text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              title={`Proyecto anterior: ${prevProject.title}`}
              aria-label="Proyecto anterior"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>

            {/* Current Project Dropdown Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant hover:border-primary/50 text-xs font-mono text-on-surface flex items-center gap-2 transition-all cursor-pointer max-w-[170px] sm:max-w-[260px] md:max-w-xs lg:max-w-sm"
                title="Abrir menú de proyectos"
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${project.dotColor === 'tertiary'
                      ? 'bg-tertiary'
                      : project.dotColor === 'primary'
                        ? 'bg-primary'
                        : 'bg-outline'
                    }`}
                />
                <span className="truncate font-medium text-left">{project.title}</span>
                <span className="text-[10px] text-on-surface-variant shrink-0 font-mono hidden sm:inline">
                  {currentProjectIndex + 1}/{PROJECTS.length}
                </span>
                <span
                  className={`material-symbols-outlined text-[16px] text-on-surface-variant shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-primary' : ''
                    }`}
                >
                  expand_more
                </span>
              </button>

              {/* Dropdown Menu Popup */}
              {isDropdownOpen && (
                <div className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 w-72 sm:w-80 rounded-xl bg-surface-container-high/95 backdrop-blur-xl border border-outline-variant shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/60 flex items-center justify-between mb-1">
                    <span>Proyectos ({PROJECTS.length})</span>
                    <span>Cambio rápido</span>
                  </div>
                  <div className="space-y-1 max-h-80 overflow-y-auto">
                    {PROJECTS.map((item, idx) => {
                      const isActive = item.id === project.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            handleSwitchProject(item);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between gap-2 cursor-pointer border-none ${isActive
                              ? 'bg-primary/15 text-primary font-medium border border-primary/30'
                              : 'bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                            }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dotColor === 'tertiary'
                                  ? 'bg-tertiary'
                                  : item.dotColor === 'primary'
                                    ? 'bg-primary'
                                    : 'bg-outline'
                                }`}
                            />
                            <span className="truncate">{item.title}</span>
                          </div>
                          <span className="text-[10px] text-outline shrink-0 font-mono">
                            0{idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Next project */}
            <button
              onClick={() => handleSwitchProject(nextProject)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-container border border-outline-variant hover:border-outline text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              title={`Siguiente proyecto: ${nextProject.title}`}
              aria-label="Proyecto siguiente"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>

            {/* Divider */}
            <div className="h-4 w-px bg-outline-variant mx-0.5 hidden sm:block" />

            {/* Manual Collapse Button */}
            <button
              onClick={() => setIsNavManuallyCollapsed(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-container border border-outline-variant hover:border-outline text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              title="Contraer barra para ver más espacio"
              aria-label="Contraer barra"
            >
              <span className="material-symbols-outlined text-[16px]">expand_less</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        {/* Top Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-10 border-b border-outline-variant">
          <div className="lg:col-span-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold tracking-tight text-on-surface">
              {project.title}
            </h1>

            <p className="mt-4 text-base text-on-surface-variant leading-relaxed max-w-3xl">
              {project.fullDescription}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono rounded-md bg-surface-container border border-outline-variant text-on-surface"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 bg-surface-container/50 border border-outline-variant rounded-xl p-6">
            <div className="text-xs font-mono text-secondary uppercase tracking-wider">
              Acciones &amp; Repositorio
            </div>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-on-surface text-on-secondary hover:bg-on-surface-variant text-xs font-medium transition-colors"
            >
              <span>Abrir Repositorio en GitHub</span>
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </a>
            <div className="pt-2 text-[11px] font-mono text-secondary flex items-center justify-between border-t border-outline-variant/60">
              <span>Categoría:</span>
              <span className="uppercase text-primary font-medium">{project.category}</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. SECCIÓN: GALERÍA DE CAPTURAS DEL SISTEMA */}
        {/* ========================================================================= */}
        <section className="py-12 border-b border-outline-variant">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-mono font-medium">
                Inspección Visual
              </span>
              <h2 className="text-2xl sm:text-3xl font-headline font-bold text-on-surface mt-1">
                Galería de Capturas del Sistema
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant max-w-xl">
                Vistas de la aplicación, módulos de usuario, paneles administrativos y flujos interactivos.
              </p>
            </div>
            <div className="text-xs font-mono text-secondary flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container border border-outline-variant text-on-surface">
                <span className="material-symbols-outlined text-[14px] text-primary">photo_library</span>
                <span>{activeImageIndex + 1} de {project.screenshots.length} capturas</span>
              </span>
            </div>
          </div>

          {/* Visor Principal de la Captura */}
          <div className="rounded-2xl border border-outline-variant bg-surface-container/60 overflow-hidden shadow-2xl">
            {/* Visual Header / Toolbar */}
            <div className="px-5 py-3 bg-surface-container border-b border-outline-variant flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-outline-variant" />
                <span className="text-on-surface font-semibold truncate max-w-xs sm:max-w-md">
                  {activeScreenshot.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex(
                      (prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length
                    )
                  }
                  className="p-1 rounded bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  title="Captura anterior"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev + 1) % project.screenshots.length)
                  }
                  className="p-1 rounded bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  title="Captura siguiente"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="px-2.5 py-1 rounded bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-[11px] font-mono inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                  <span className="hidden sm:inline">Ampliar</span>
                </button>
              </div>
            </div>

            {/* Contenedor de la Imagen */}
            <div
              onClick={() => setLightboxOpen(true)}
              className="relative w-full h-[320px] sm:h-[460px] md:h-[540px] bg-surface-container-lowest flex items-center justify-center p-3 sm:p-6 cursor-zoom-in group overflow-hidden"
            >
              <img
                src={activeScreenshot.url}
                alt={activeScreenshot.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-lg group-hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-background/90 border border-outline-variant text-xs font-mono text-on-surface flex items-center gap-1.5 shadow-lg">
                  <span className="material-symbols-outlined text-[14px] text-primary">fullscreen</span>
                  <span>Clic para ver en pantalla completa</span>
                </span>
              </div>
            </div>

            {/* Pie con descripción de la captura */}
            <div className="p-4 sm:p-5 bg-surface-container/90 border-t border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-headline font-semibold text-on-surface">
                  {activeScreenshot.title}
                </h4>
                <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
                  {activeScreenshot.caption}
                </p>
              </div>
              <span className="text-[11px] font-mono text-secondary shrink-0">
                Archivo: {activeScreenshot.url.split('/').pop()}
              </span>
            </div>
          </div>

          {/* Carrusel / Tira de Miniaturas */}
          <div className="mt-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
              {project.screenshots.map((shot, idx) => {
                const isSelected = idx === activeImageIndex;
                return (
                  <button
                    key={shot.url + idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-xl overflow-hidden shrink-0 border transition-all cursor-pointer text-left group bg-transparent ${isSelected
                        ? 'border-primary ring-2 ring-primary/40 shadow-md'
                        : 'border-outline-variant hover:border-outline opacity-70 hover:opacity-100'
                      }`}
                  >
                    <div className="w-24 h-16 sm:w-32 sm:h-20 bg-surface-container-high overflow-hidden">
                      <img
                        src={shot.url}
                        alt={shot.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-background/85 font-mono text-[9px] text-on-surface">
                      0{idx + 1}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. SECCIÓN: FICHA TÉCNICA Y ARQUITECTURA DEL PROYECTO */}
        {/* ========================================================================= */}
        <section className="py-12 border-b border-outline-variant">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-primary font-mono font-medium">
              Ingeniería de Software
            </span>
            <h2 className="text-2xl sm:text-3xl font-headline font-bold text-on-surface mt-1">
              Ficha Técnica &amp; Arquitectura
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant max-w-2xl">
              Desglose analítico del problema resuelto, herramientas utilizadas y patrones arquitectónicos aplicados.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: El Problema que Resuelve */}
            <div className="p-6 rounded-2xl bg-surface-container/40 border border-outline-variant flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">target</span>
                    Problema Resuelto
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-secondary">
                    ANÁLISIS
                  </span>
                </div>
                <h3 className="text-base font-headline font-semibold text-on-surface mb-3">
                  ¿Qué problemática atiende?
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {project.technicalDetails.problemSolved}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant/60 flex items-center gap-2 text-[11px] font-mono text-tertiary">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                <span>Solución probada y documentada</span>
              </div>
            </div>

            {/* Card 2: Tecnologías Clave */}
            <div className="p-6 rounded-2xl bg-surface-container/40 border border-outline-variant flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">code_blocks</span>
                    Tecnologías Clave
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-secondary">
                    STACK
                  </span>
                </div>
                <h3 className="text-base font-headline font-semibold text-on-surface mb-3">
                  Herramientas y Frameworks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technicalDetails.keyTechnologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="px-2.5 py-1.5 rounded-lg bg-surface-container border border-outline-variant flex flex-col gap-0.5"
                    >
                      <span className="text-xs font-headline font-medium text-on-surface">
                        {tech.name}
                      </span>
                      <span className="text-[10px] font-mono text-secondary">
                        {tech.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant/60 text-[11px] font-mono text-secondary">
                Total: {project.technicalDetails.keyTechnologies.length} tecnologías principales
              </div>
            </div>

            {/* Card 3: Arquitectura y Patrones de Diseño */}
            <div className="p-6 rounded-2xl bg-surface-container/40 border border-outline-variant flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">account_tree</span>
                    Arquitectura &amp; Patrones
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-secondary">
                    DISEÑO
                  </span>
                </div>
                <h3 className="text-base font-headline font-semibold text-on-surface mb-3">
                  Estructura y Patrones
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                  {project.technicalDetails.architecturePatterns}
                </p>
                <div className="space-y-2">
                  {project.technicalDetails.architecturalHighlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                      <span className="text-primary font-mono font-semibold">›</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant/60 text-[11px] font-mono text-secondary">
                Enfoque: Rendimiento y mantenibilidad
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECCIÓN: ARQUITECTURA & CÓDIGO IMPLEMENTADO */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-mono font-medium">
                Diseño de Sistemas
              </span>
              <h3 className="text-xl font-headline font-bold text-on-surface mt-1">
                Decisiones de Arquitectura
              </h3>
              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                {project.architectureSummary}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {project.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-container/40 border border-outline-variant text-xs text-on-surface-variant leading-relaxed flex items-start gap-3"
                >
                  <span className="font-mono text-primary font-semibold">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest overflow-hidden">
              <div className="px-4 py-3 bg-surface-container border-b border-outline-variant flex items-center justify-between font-mono text-xs">
                <span className="text-on-surface font-semibold">{project.codeSnippet.filename}</span>
                <div className="flex items-center gap-3">
                  <span className="text-secondary uppercase">{project.codeSnippet.language}</span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copiedCode ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedCode ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>
              <pre className="p-5 font-mono text-xs text-on-surface-variant overflow-x-auto leading-relaxed max-h-[460px]">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MODAL LIGHTBOX PANTALLA COMPLETA */}
      {/* ========================================================================= */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-on-surface font-semibold">{activeScreenshot.title}</span>
              <span className="text-secondary">
                ({activeImageIndex + 1} de {project.screenshots.length})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface transition-colors cursor-pointer"
              title="Cerrar (Esc)"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Lightbox Center Image */}
          <div className="relative flex-1 flex items-center justify-center p-2 my-2 overflow-hidden">
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex(
                  (prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length
                )
              }
              className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-surface-container/80 hover:bg-surface-container border border-outline-variant text-on-surface hover:text-primary transition-all cursor-pointer backdrop-blur-md"
              title="Anterior (Flecha izquierda)"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>

            <img
              src={activeScreenshot.url}
              alt={activeScreenshot.title}
              className="max-h-[76vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-all"
            />

            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((prev) => (prev + 1) % project.screenshots.length)
              }
              className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-surface-container/80 hover:bg-surface-container border border-outline-variant text-on-surface hover:text-primary transition-all cursor-pointer backdrop-blur-md"
              title="Siguiente (Flecha derecha)"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
            </button>
          </div>

          {/* Lightbox Footer */}
          <div className="border-t border-outline-variant/60 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-secondary">
            <p className="text-on-surface-variant max-w-2xl">{activeScreenshot.caption}</p>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Usa las teclas ← / → para navegar</span>
              <span>Esc para salir</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};