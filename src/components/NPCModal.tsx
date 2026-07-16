import React from 'react';
import { NPC } from '../types';

interface NPCModalProps {
  npc: NPC | null;
  onClose: () => void;
}

export const NPCModal: React.FC<NPCModalProps> = ({ npc, onClose }) => {
  if (!npc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-[#f4ecd8] text-[#1a1714] border-4 border-double border-[#3d352a] max-w-lg w-full p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7a1c1c] font-bold text-lg hover:scale-110 transition"
        >
          [X]
        </button>

        <div className="absolute top-4 left-6">
          <span className="stamp-classified text-[9px]">Kartoteka Podejrzanego</span>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <img src={npc.avatar} alt={npc.name} className="w-16 h-16 object-cover border-2 border-[#7a1c1c] shadow" />
          <div>
            <h2 className="text-2xl font-['Playfair_Display'] font-black">{npc.name}</h2>
            <p className="text-xs font-['Special_Elite'] text-[#7a1c1c] uppercase tracking-wider">{npc.role}</p>
            <p className="text-xs font-['Courier_Prime'] text-[#5c4d3c] mt-1">Obecna strefa: <span className="font-bold">{npc.currentLocationName}</span></p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-xs font-['Special_Elite'] uppercase tracking-widest text-[#5c4d3c] block mb-1">Rysopis i Historia</span>
            <p className="text-xs font-['Courier_Prime'] bg-[#e9dec4] p-3 border border-[#5c4d3c] leading-relaxed">{npc.description}</p>
          </div>

          <div>
            <span className="text-xs font-['Special_Elite'] uppercase tracking-widest text-[#7a1c1c] block mb-1">Cele i Motywacje</span>
            <p className="text-xs font-['Courier_Prime'] text-[#7a1c1c] bg-[#e9dec4] p-3 border border-[#5c4d3c] leading-relaxed">{npc.goals}</p>
          </div>

          <div>
            <span className="text-xs font-['Special_Elite'] uppercase tracking-widest text-[#5c4d3c] block mb-2">Harmonogram Dnia (Obserwacja)</span>
            <div className="space-y-1.5">
              {npc.schedule.map((sch, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-['Courier_Prime'] bg-[#e9dec4] px-3 py-2 border border-[#5c4d3c]">
                  <span className="font-bold text-[#7a1c1c]">{sch.time}</span>
                  <span className="text-[#1a1714]">{sch.activity}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-['Special_Elite'] uppercase tracking-widest text-[#5c4d3c] block mb-2">Powiązania z Aktywami i Kulty</span>
            <div className="space-y-2">
              {npc.relations.map((rel, idx) => (
                <div key={idx} className="bg-[#e9dec4] p-3 border border-[#5c4d3c] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-['Special_Elite'] font-bold text-[#1a1714]">{rel.targetName}</span>
                    <span className="text-[10px] font-['Special_Elite'] bg-[#7a1c1c] text-[#f4ecd8] px-2 py-0.5 uppercase">{rel.relationType}</span>
                  </div>
                  <p className="text-[11px] font-['Courier_Prime'] text-[#5c4d3c]">{rel.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t-2 border-[#3d352a]">
          <button
            onClick={onClose}
            className="bg-[#7a1c1c] hover:bg-[#9a2525] text-[#f4ecd8] border-2 border-[#3d352a] px-6 py-2 font-['Special_Elite'] text-xs font-bold uppercase tracking-wider transition shadow"
          >
            Zamknij Kartotekę
          </button>
        </div>
      </div>
    </div>
  );
};
