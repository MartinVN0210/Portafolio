import React from 'react';

interface CvScreenProps {
  onBack: () => void;
}

export const CvScreen: React.FC<CvScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-[#0f0f12] overflow-hidden">
      {/* Floating toolbar */}
      <div className="cv-toolbar shrink-0 z-50 h-14 flex items-center justify-between px-4 sm:px-6 bg-[#09090b]/90 backdrop-blur-xl border-b border-[#27272a]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#a1a1aa] hover:text-[#fafafa] transition-colors cursor-pointer group"
        >
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-0.5 transition-transform text-[#a78bfa]">
            arrow_back
          </span>
          <span className="hidden sm:inline">VOLVER AL PORTAFOLIO</span>
          <span className="sm:hidden">VOLVER</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[10px] font-mono text-[#52525b] uppercase tracking-widest">
            CV — Vista Previa
          </span>
          {/* Botón convertido en enlace nativo de descarga */}
          <a
            href="/cv/CV_Martin_Villalobos_Núñez.pdf"
            download="CV_Martin_Villalobos_Núñez.pdf"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#1e1e22] border border-[#27272a] hover:border-[#52525b] text-xs font-mono text-[#a1a1aa] hover:text-[#fafafa] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#a78bfa]">download</span>
            <span>Descargar PDF</span>
          </a>
        </div>
      </div>

      {/* Visor nativo de PDF */}
      <div className="flex-1 w-full relative">
        <iframe
          src="/cv/CV_Martin_Villalobos_Núñez.pdf#toolbar=0"
          className="w-full h-full border-none"
          title="Currículum de Martín Villalobos"
        />
      </div>
    </div>
  );
};