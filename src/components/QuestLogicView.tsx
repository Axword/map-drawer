import React from 'react';
import { QuestRule } from '../types';
import { CheckCircle2, Circle, ShieldAlert, Sparkles, Plus } from 'lucide-react';

interface QuestLogicViewProps {
  quests: QuestRule[];
  onToggleQuest: (id: string) => void;
  onAddQuest: () => void;
}

export const QuestLogicView: React.FC<QuestLogicViewProps> = ({
  quests,
  onToggleQuest,
  onAddQuest,
}) => {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-85px)] bg-[#0b0c10] p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="bg-[#121318] border-2 border-[#3d352a] p-6 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-['Special_Elite'] text-[#b89742] uppercase tracking-widest">Dyrektywy Śledztwa // Logika Gry</span>
            <h1 className="text-xl font-['Playfair_Display'] font-black text-[#f4ecd8] mt-1">Zadania, Dowody i Wyzwalacze Zdarzeń</h1>
          </div>
          <button
            onClick={onAddQuest}
            className="bg-[#f4ecd8] hover:bg-[#e2d5bc] text-[#1a1714] border-2 border-[#3d352a] px-4 py-2 font-['Special_Elite'] text-xs font-bold uppercase tracking-wider transition shadow"
          >
            + Nowa Dyrektywa
          </button>
        </div>

        {/* Quest Case Files */}
        <div className="space-y-6">
          {quests.map((quest) => (
            <div
              key={quest.id}
              className={`bg-[#f4ecd8] text-[#1a1714] border-4 border-double p-6 shadow-2xl relative ${
                quest.isCompleted ? 'border-green-900 bg-[#e8f0e8]' : 'border-[#3d352a]'
              }`}
            >
              <div className="absolute top-4 right-4">
                <span className={`stamp-classified text-[9px] ${quest.isCompleted ? 'border-green-800 text-green-900' : ''}`}>
                  {quest.isCompleted ? 'Zamknięte' : 'Otwarte Śledztwo'}
                </span>
              </div>

              <div className="flex items-start gap-4 pr-32">
                <button
                  onClick={() => onToggleQuest(quest.id)}
                  className="mt-1 text-[#7a1c1c] hover:scale-110 transition"
                  title="Przełącz status śledztwa"
                >
                  {quest.isCompleted ? <CheckCircle2 className="w-6 h-6 text-green-800" /> : <Circle className="w-6 h-6 text-[#7a1c1c]" />}
                </button>
                <div>
                  <h3 className={`text-xl font-['Playfair_Display'] font-black ${quest.isCompleted ? 'line-through text-green-900' : 'text-[#1a1714]'}`}>
                    {quest.title}
                  </h3>
                  <p className="text-xs font-['Courier_Prime'] mt-1 leading-relaxed text-[#3d352a]">{quest.description}</p>
                </div>
              </div>

              {/* Logic Rule Condition & Action Block */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-[#3d352a]">
                {/* Condition (JEŻELI) */}
                <div className="bg-[#e9dec4] p-4 border border-[#5c4d3c] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-['Special_Elite'] text-[#7a1c1c] uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Warunek [ JEŻELI ]</span>
                  </div>
                  {quest.conditions.map((cond, idx) => (
                    <div key={idx} className="text-xs font-['Courier_Prime'] bg-[#f4ecd8] p-2 border border-[#5c4d3c]/50">
                      <span className="font-bold text-[#7a1c1c]">Typ: {cond.type}</span> → {cond.targetName}
                    </div>
                  ))}
                </div>

                {/* Action (WTEDY) */}
                <div className="bg-[#e9dec4] p-4 border border-[#5c4d3c] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-['Special_Elite'] text-green-900 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Reakcja Świata [ WTEDY ]</span>
                  </div>
                  {quest.actions.map((act, idx) => (
                    <div key={idx} className="text-xs font-['Courier_Prime'] bg-[#f4ecd8] p-2 border border-[#5c4d3c]/50">
                      <span className="font-bold text-green-900">Efekt: {act.type}</span> → {act.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
