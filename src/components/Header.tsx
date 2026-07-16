import React from 'react';
import { Compass, Network, Scroll, PlayCircle, Sparkles, Download, Upload, Clock, ShieldAlert } from 'lucide-react';
import { SimulationState } from '../types';

interface HeaderProps {
  activeTab: 'map' | 'world' | 'quests' | 'simulation';
  setActiveTab: (tab: 'map' | 'world' | 'quests' | 'simulation') => void;
  simulationState: SimulationState;
  onToggleSimulation: () => void;
  onStepSimulation: () => void;
  onOpenAIGenerator: () => void;
  onExportJSON: () => void;
  onImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  projectTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  simulationState,
  onToggleSimulation,
  onStepSimulation,
  onOpenAIGenerator,
  onExportJSON,
  onImportJSON,
  projectTitle,
}) => {
  return (
    <header className="bg-[#121318] border-b-4 border-[#3d352a] px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.9)] relative">
      {/* Decorative Archive Top Badge */}
      <div className="absolute top-0 left-8 -translate-y-1/2 bg-[#7a1c1c] text-[#f4ecd8] px-4 py-0.5 text-[10px] font-['Special_Elite'] uppercase tracking-widest border border-[#3d352a] shadow">
        Arkham Police & Miskatonic Archives // Case #1925-CC
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#f4ecd8] text-[#1a1714] border-2 border-[#b89742] flex items-center justify-center font-['Playfair_Display'] font-black text-2xl shadow-inner">
          ℵ
        </div>
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-['Special_Elite'] text-[#b89742] tracking-widest">ARKHAM WEAVER // 1925</span>
            <span className="stamp-classified text-[9px] py-0 px-2">Ściśle Tajne</span>
          </div>
          <h1 className="text-xl font-['Playfair_Display'] font-bold text-[#f4ecd8] tracking-wider mt-1">{projectTitle}</h1>
        </div>
      </div>

      {/* Physical Folder Tabs Navigation */}
      <div className="flex items-center gap-1 bg-[#1a1c23] p-1.5 border-2 border-[#3d352a]">
        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 text-xs font-['Special_Elite'] uppercase tracking-wider transition ${
            activeTab === 'map'
              ? 'bg-[#f4ecd8] text-[#1a1714] font-bold border-b-4 border-[#7a1c1c] shadow'
              : 'text-[#9c8e77] hover:text-[#f4ecd8] hover:bg-[#252833]'
          }`}
        >
          [ 01. Mapa & Architektura ]
        </button>
        <button
          onClick={() => setActiveTab('world')}
          className={`px-4 py-2 text-xs font-['Special_Elite'] uppercase tracking-wider transition ${
            activeTab === 'world'
              ? 'bg-[#f4ecd8] text-[#1a1714] font-bold border-b-4 border-[#7a1c1c] shadow'
              : 'text-[#9c8e77] hover:text-[#f4ecd8] hover:bg-[#252833]'
          }`}
        >
          [ 02. Graf Wiedzy ]
        </button>
        <button
          onClick={() => setActiveTab('quests')}
          className={`px-4 py-2 text-xs font-['Special_Elite'] uppercase tracking-wider transition ${
            activeTab === 'quests'
              ? 'bg-[#f4ecd8] text-[#1a1714] font-bold border-b-4 border-[#7a1c1c] shadow'
              : 'text-[#9c8e77] hover:text-[#f4ecd8] hover:bg-[#252833]'
          }`}
        >
          [ 03. Questy i Logika ]
        </button>
        <button
          onClick={() => setActiveTab('simulation')}
          className={`px-4 py-2 text-xs font-['Special_Elite'] uppercase tracking-wider transition ${
            activeTab === 'simulation'
              ? 'bg-[#f4ecd8] text-[#1a1714] font-bold border-b-4 border-[#7a1c1c] shadow'
              : 'text-[#9c8e77] hover:text-[#f4ecd8] hover:bg-[#252833]'
          }`}
        >
          [ 04. Symulator Czasu ]
        </button>
      </div>

      {/* Archive Controls & Clock */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#0b0c10] px-3 py-1.5 border border-[#3d352a] text-xs font-['Courier_Prime'] text-[#b89742]">
          <Clock className="w-3.5 h-3.5" />
          <span>{simulationState.currentTime}</span>
          <button
            onClick={onToggleSimulation}
            className={`w-2.5 h-2.5 rounded-full ${simulationState.isRunning ? 'bg-[#7a1c1c] animate-ping' : 'bg-[#b89742]'}`}
            title="Stan zegara symulacji"
          />
        </div>

        <button
          onClick={onOpenAIGenerator}
          className="bg-[#b89742] hover:bg-[#d4b055] text-[#0b0c10] px-4 py-2 font-['Special_Elite'] text-xs font-bold uppercase tracking-wider border border-[#f4ecd8]/40 shadow transition flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kreator AI</span>
        </button>

        <div className="flex items-center gap-1 border-l border-[#3d352a] pl-3">
          <button
            onClick={onExportJSON}
            className="p-2 text-[#9c8e77] hover:text-[#b89742] hover:bg-[#1a1c23] transition border border-transparent hover:border-[#3d352a]"
            title="Eksportuj aktę (JSON)"
          >
            <Download className="w-4 h-4" />
          </button>
          <label className="p-2 text-[#9c8e77] hover:text-[#b89742] hover:bg-[#1a1c23] transition border border-transparent hover:border-[#3d352a] cursor-pointer" title="Importuj aktę (JSON)">
            <Upload className="w-4 h-4" />
            <input type="file" accept=".json" onChange={onImportJSON} className="hidden" />
          </label>
        </div>
      </div>
    </header>
  );
};
