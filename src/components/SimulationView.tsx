import React from 'react';
import { NPC, SimulationState, LogEvent } from '../types';
import { PlayCircle, Pause, SkipForward, Clock, Sparkles, User } from 'lucide-react';

interface SimulationViewProps {
  simulationState: SimulationState;
  npcs: NPC[];
  eventLogs: LogEvent[];
  onToggleSimulation: () => void;
  onStepSimulation: () => void;
}

export const SimulationView: React.FC<SimulationViewProps> = ({
  simulationState,
  npcs,
  eventLogs,
  onToggleSimulation,
  onStepSimulation,
}) => {
  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-85px)] bg-[#0b0c10] overflow-hidden">
      {/* Left Column: NPC Schedule Ledger */}
      <div className="w-full md:w-96 bg-[#121318] border-r-2 border-[#3d352a] flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-['Playfair_Display'] font-black text-lg text-[#f4ecd8]">Harmonogramy Dnia</span>
          </div>
          <span className="stamp-classified text-[8px] py-0 px-1.5">Obserwacja</span>
        </div>

        <div className="space-y-4">
          {npcs.map((npc) => (
            <div key={npc.id} className="bg-[#1a1c23] p-4 border border-[#3d352a] space-y-3">
              <div className="flex items-center gap-3">
                <img src={npc.avatar} alt={npc.name} className="w-12 h-12 object-cover border border-[#b89742]" />
                <div>
                  <h3 className="text-xs font-['Special_Elite'] text-[#f4ecd8]">{npc.name}</h3>
                  <p className="text-[10px] font-['Courier_Prime'] text-[#b89742]">{npc.role}</p>
                  <p className="text-[10px] font-['Courier_Prime'] text-[#9c8e77] mt-0.5">Miejsce: <span className="text-[#f4ecd8] font-bold">{npc.currentLocationName}</span></p>
                </div>
              </div>

              {/* Schedule Timeline */}
              <div className="space-y-1.5 pt-2 border-t border-[#3d352a]">
                <span className="text-[9px] font-['Special_Elite'] uppercase tracking-widest text-[#9c8e77]">Plan Dnia:</span>
                {npc.schedule.map((sch, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] font-['Courier_Prime'] bg-[#0b0c10] px-2.5 py-1 border border-[#3d352a]">
                    <span className="text-[#b89742] font-bold">{sch.time}</span>
                    <span className="text-[#d1c7b7] truncate max-w-[150px]" title={sch.activity}>{sch.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Time controls & Live Event Log Dossier */}
      <div className="flex-1 bg-[#0b0c10] p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Banner & Clock */}
          <div className="bg-[#121318] border-2 border-[#3d352a] p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-['Special_Elite'] text-[#b89742] uppercase tracking-widest">Zegar Symulacji Czasu Rzeczywistego</span>
              <h1 className="text-2xl font-['Playfair_Display'] font-black text-[#f4ecd8] flex items-center gap-3 mt-1">
                <Clock className="w-7 h-7 text-[#b89742]" />
                <span>{simulationState.currentTime}</span>
              </h1>
            </div>

            {/* Time Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={onToggleSimulation}
                className={`px-5 py-2.5 font-['Special_Elite'] text-xs uppercase tracking-wider font-bold transition shadow border ${
                  simulationState.isRunning
                    ? 'bg-[#7a1c1c] text-[#f4ecd8] border-[#3d352a]'
                    : 'bg-[#f4ecd8] text-[#1a1714] border-[#3d352a]'
                }`}
              >
                {simulationState.isRunning ? 'Wstrzymaj Zegar' : 'Uruchom Zegar'}
              </button>

              <button
                onClick={onStepSimulation}
                className="bg-[#1a1c23] hover:bg-[#252833] text-[#d1c7b7] border border-[#3d352a] px-4 py-2.5 font-['Special_Elite'] text-xs uppercase tracking-wider transition flex items-center gap-2"
                title="Przesuń zegar o 1 godzinę do przodu"
              >
                <SkipForward className="w-4 h-4 text-[#b89742]" />
                <span>+1 Godzina</span>
              </button>
            </div>
          </div>

          {/* Event Log Dossier */}
          <div className="bg-[#f4ecd8] text-[#1a1714] border-4 border-double border-[#3d352a] p-6 shadow-2xl space-y-4 relative">
            <div className="absolute top-4 right-4">
              <span className="stamp-classified text-[9px]">Dziennik Zdarzeń</span>
            </div>

            <div className="border-b-2 border-[#3d352a] pb-3 pr-32">
              <h3 className="font-['Playfair_Display'] font-black text-lg">Kronika Świata i Reakcje Środowiska</h3>
              <p className="text-xs font-['Courier_Prime'] text-[#5c4d3c]">Automatyczne zapisy zdarzeń w Arkham i okolicy</p>
            </div>

            <div className="space-y-2">
              {eventLogs.map((log) => (
                <div key={log.id} className="bg-[#e9dec4] p-3 border border-[#5c4d3c] flex items-start gap-3">
                  <span className="font-['Courier_Prime'] text-xs font-bold text-[#7a1c1c] pt-0.5">{log.time}</span>
                  <p className="text-xs font-['Courier_Prime'] text-[#1a1714] leading-relaxed flex-1">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
