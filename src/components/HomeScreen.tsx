import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEVELOPER_PROFILE, PROJECTS, ProjectItem } from '../data/portfolioData';

interface HomeScreenProps {
    onOpenContactModal: (tab: 'message' | 'profile') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onOpenContactModal }) => {
    const navigate = useNavigate();
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'backend' | 'mobile' | 'data'>('all');

    const filteredProjects = selectedCategory === 'all'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === selectedCategory);

    const handleNavigateSection = (sectionId: string) => {
        if (sectionId === 'inicio') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const el = document.getElementById(sectionId);
            el?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    return (
        <main className="w-full pt-16 bg-background">
            <div className="flex flex-col w-full">
                {/* HERO SECTION */}
                <section id="inicio" className="relative overflow-hidden py-24 md:py-32 flex flex-col justify-center items-center text-center min-h-[600px] border-b border-outline-variant">
                    <div className="absolute inset-0 z-0 bg-transparent">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(167,139,250,0.12),rgba(9,9,11,0))] pointer-events-none" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b1a_1px,transparent_1px),linear-gradient(to_bottom,#18181b1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
                    </div>

                    <div className="relative z-10 pointer-events-auto max-w-4xl mx-auto px-6 flex flex-col items-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-on-surface to-on-surface-variant max-w-3xl leading-[1.12]">
                            Construyendo soluciones web y móviles
                        </h1>
                        <p className="mt-6 text-base sm:text-lg text-on-surface-variant font-normal max-w-2xl leading-relaxed">
                            Estudiante de Ingeniería en Software construyendo soluciones desde el backend hasta el dispositivo móvil. En busca de estadías profesionales.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            <button onClick={() => handleNavigateSection('proyectos')} className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg bg-on-surface text-on-secondary hover:bg-on-surface-variant transition-colors cursor-pointer">
                                Ver Proyectos
                            </button>
                            <a href={DEVELOPER_PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="border border-outline-variant hover:border-outline text-on-surface-variant hover:text-on-surface rounded-lg bg-surface-container/60 backdrop-blur transition-all flex items-center gap-2 px-5 py-2.5 text-sm font-medium">
                                <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN SOBRE MÍ */}
                <section id="sobre-mi" className="py-24 border-b border-outline-variant px-6 max-w-6xl mx-auto w-full">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-5">
                            <div onClick={() => onOpenContactModal('profile')} className="aspect-square rounded-2xl border border-outline-variant bg-surface-container/60 flex flex-col items-center justify-between p-8 relative overflow-hidden group cursor-pointer hover:border-outline transition-colors">
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
                                <div className="w-full flex items-center justify-between text-xs text-secondary-fixed-dim font-mono z-10">
                                    <span>DEV_ID // 084</span>
                                    <span className="inline-flex items-center gap-1.5 text-tertiary">
                                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                                        ONLINE
                                    </span>
                                </div>
                                <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                                    <div className="w-20 h-20 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center text-primary group-hover:border-primary/40 transition-colors">
                                        <span className="font-headline font-bold text-2xl tracking-tighter text-on-surface">MV</span>
                                    </div>
                                    <div className="mt-4 font-mono text-xs tracking-wider text-on-surface-variant uppercase">Martín Villalobos</div>
                                    <div className="text-[11px] text-secondary">Software Engineer</div>
                                </div>
                                <div className="w-full pt-4 border-t border-outline-variant/60 flex justify-between items-center text-[11px] text-on-surface-variant font-mono z-10">
                                    <span>STACK: FULL & MOBILE</span>
                                    <span>{DEVELOPER_PROFILE.expYear}</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-7 flex flex-col items-start">
                            <span className="text-xs uppercase tracking-widest text-primary font-mono font-medium mb-3">Trayectoria & Filosofía</span>
                            <h2 className="text-3xl font-headline font-bold text-on-surface tracking-tight mb-6">Sobre Mí</h2>
                            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">{DEVELOPER_PROFILE.aboutText}</p>
                        </div>
                    </div>
                </section>

                {/* PROYECTOS DESTACADOS */}
                <section id="proyectos" className="py-24 px-6 max-w-6xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div className="flex flex-col items-start">
                            <span className="text-xs uppercase tracking-widest text-primary font-mono font-medium mb-2">Portafolio Oficial</span>
                            <h2 className="text-3xl font-headline font-bold text-on-surface tracking-tight">Proyectos Desarrollados</h2>
                            <p className="mt-2 text-sm md:text-base text-on-surface-variant max-w-xl">Sistemas empresariales, analítica con Machine Learning y aplicaciones móviles.</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {[{ id: 'all', label: 'Todos' }, { id: 'backend', label: 'Backend & ERP' }, { id: 'mobile', label: 'Móvil' }, { id: 'data', label: 'Datos & ML' }].map((tab) => {
                                const count = tab.id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.category === tab.id).length;
                                const isActive = selectedCategory === tab.id;
                                return (
                                    <button key={tab.id} type="button" onClick={() => setSelectedCategory(tab.id as any)} className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${isActive ? 'bg-primary text-on-primary font-semibold shadow-sm' : 'bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-outline'}`}>
                                        <span>{tab.label}</span>
                                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-black/20 text-on-primary' : 'bg-surface-container-high text-secondary'}`}>{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <article key={project.id} onClick={() => navigate(`/proyecto/${project.id}`)} className="group bg-surface-container/40 border border-outline-variant hover:border-outline rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                                <div>
                                    <div className="relative w-full h-48 bg-surface-container-high overflow-hidden border-b border-outline-variant rounded-t-xl">
                                        <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent pointer-events-none" />
                                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-background/85 backdrop-blur-md border border-outline-variant text-[10px] font-mono text-secondary flex items-center gap-1 pointer-events-none shadow-sm">
                                            <span className="material-symbols-outlined text-[13px] text-primary">photo_library</span>
                                            <span>{project.screenshots.length} capturas</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">{project.title}</h3>
                                        <p className="mt-2 text-xs text-on-surface-variant leading-relaxed line-clamp-2">{project.shortDescription}</p>
                                        <div className="mt-3.5 pt-3 border-t border-outline-variant/60">
                                            <span className="text-[10px] font-mono text-secondary uppercase tracking-wider block mb-1">Problema Resuelto:</span>
                                            <p className="text-[11px] text-on-surface-variant/90 line-clamp-2 leading-relaxed">{project.technicalDetails.problemSolved}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 mt-4">
                                            {project.tags.slice(0, 4).map((tag) => <span key={tag} className="px-2 py-0.5 text-[11px] font-mono rounded bg-surface-container border border-outline-variant text-on-surface-variant">{tag}</span>)}
                                            {project.tags.length > 4 && <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-surface-container text-secondary">+{project.tags.length - 4}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 pt-0 flex items-center justify-between border-t border-outline-variant/40 mt-2 pt-3">
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-on-surface-variant group-hover:text-primary transition-colors">
                                        <span>Ver Ficha & Galería</span>
                                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                    </span>
                                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 rounded text-secondary hover:text-on-surface hover:bg-surface-container transition-colors" title="Ver en GitHub">
                                        <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* SECCIÓN CONTACTO */}
                <section id="contacto" className="py-20 px-6 max-w-4xl mx-auto w-full text-center">
                    <div className="border border-outline-variant rounded-2xl p-10 bg-surface-container/30 relative overflow-hidden">
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 blur-3xl pointer-events-none rounded-full" />
                        <div className="relative z-10 flex flex-col items-center">
                            <h2 className="text-2xl sm:text-3xl font-headline font-bold text-on-surface tracking-tight">Listo para colaborar</h2>
                            <p className="mt-3 text-sm md:text-base text-on-surface-variant max-w-lg leading-relaxed">Abierto a oportunidades de proyectos de ingeniería de software.</p>
                            <div className="mt-8 flex items-center justify-center w-full sm:w-auto">
                                <button type="button" onClick={handleCopyEmail} className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-mono text-on-surface-variant hover:text-on-surface border border-outline-variant hover:border-outline rounded-lg bg-surface-container/60 transition-colors w-full sm:w-auto cursor-pointer">
                                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                                    <span className="btn-label">{copiedEmail ? '¡Copiado!' : 'Copiar Correo'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};