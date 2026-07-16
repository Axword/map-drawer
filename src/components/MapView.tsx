import React, { useState } from 'react';
import { WorldProject, MapItem, NPC } from '../types';
import { ChevronRight, Home, Building2, MapPin, Layers, DoorClosed, Lock, Unlock, FileText, Key, Plus, Sparkles, AlertTriangle } from 'lucide-react';

interface MapViewProps {
  project: WorldProject;
  npcs: NPC[];
  onSelectItem: (item: MapItem, roomId: string) => void;
  onSelectNPC: (npc: NPC) => void;
  onAddItem: (roomId: string) => void;
  onAddRoom: (floorId: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  project,
  npcs,
  onSelectItem,
  onSelectNPC,
  onAddItem,
  onAddRoom,
}) => {
  const [selectedCityId, setSelectedCityId] = useState<string>(project.cities[0]?.id || '');
  const [selectedStreetId, setSelectedStreetId] = useState<string>(project.cities[0]?.streets[0]?.id || '');
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>(project.cities[0]?.streets[0]?.buildings[0]?.id || '');
  const [selectedFloorId, setSelectedFloorId] = useState<string>(project.cities[0]?.streets[0]?.buildings[0]?.floors[0]?.id || '');
  const [selectedRoomId, setSelectedRoomId] = useState<string>(project.cities[0]?.streets[0]?.buildings[0]?.floors[0]?.rooms[0]?.id || '');

  const currentCity = project.cities.find((c) => c.id === selectedCityId) || project.cities[0];
  const currentStreet = currentCity?.streets.find((s) => s.id === selectedStreetId) || currentCity?.streets[0];
  const currentBuilding = currentStreet?.buildings.find((b) => b.id === selectedBuildingId) || currentStreet?.buildings[0];
  const currentFloor = currentBuilding?.floors.find((f) => f.id === selectedFloorId) || currentBuilding?.floors[0];
  const currentRoom = currentFloor?.rooms.find((r) => r.id === selectedRoomId) || currentFloor?.rooms[0];

  const roomNPCs = npcs.filter((n) => currentRoom?.npcIds?.includes(n.id) || n.currentLocationId === currentRoom?.id);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-85px)] bg-[#0b0c10] overflow-hidden">
      {/* Blueprint / Archive Breadcrumb Bar */}
      <div className="bg-[#121318] border-b-2 border-[#3d352a] px-8 py-3 flex flex-wrap items-center gap-3 text-xs font-['Special_Elite']">
        <div className="flex items-center gap-1.5 text-[#b89742]">
          <span>📁 {project.title}</span>
        </div>
        <span className="text-[#3d352a]">/</span>

        <select
          value={selectedCityId}
          onChange={(e) => {
            const city = project.cities.find((c) => c.id === e.target.value);
            if (city) {
              setSelectedCityId(city.id);
              const st = city.streets[0];
              setSelectedStreetId(st?.id || '');
              const bldg = st?.buildings[0];
              setSelectedBuildingId(bldg?.id || '');
              const fl = bldg?.floors[0];
              setSelectedFloorId(fl?.id || '');
              const rm = fl?.rooms[0];
              setSelectedRoomId(rm?.id || '');
            }
          }}
          className="typewriter-input px-2 py-1 text-xs cursor-pointer"
        >
          {project.cities.map((city) => (
            <option key={city.id} value={city.id}>Miasto: {city.name}</option>
          ))}
        </select>
        <span className="text-[#3d352a]">/</span>

        {currentCity && (
          <select
            value={selectedStreetId}
            onChange={(e) => {
              const st = currentCity.streets.find((s) => s.id === e.target.value);
              if (st) {
                setSelectedStreetId(st.id);
                const bldg = st.buildings[0];
                setSelectedBuildingId(bldg?.id || '');
                const fl = bldg?.floors[0];
                setSelectedFloorId(fl?.id || '');
                const rm = fl?.rooms[0];
                setSelectedRoomId(rm?.id || '');
              }
            }}
            className="typewriter-input px-2 py-1 text-xs cursor-pointer"
          >
            {currentCity.streets.map((st) => (
              <option key={st.id} value={st.id}>Ulica: {st.name}</option>
            ))}
          </select>
        )}
        <span className="text-[#3d352a]">/</span>

        {currentStreet && (
          <select
            value={selectedBuildingId}
            onChange={(e) => {
              const bldg = currentStreet.buildings.find((b) => b.id === e.target.value);
              if (bldg) {
                setSelectedBuildingId(bldg.id);
                const fl = bldg.floors[0];
                setSelectedFloorId(fl?.id || '');
                const rm = fl?.rooms[0];
                setSelectedRoomId(rm?.id || '');
              }
            }}
            className="typewriter-input px-2 py-1 text-xs cursor-pointer"
          >
            {currentStreet.buildings.map((bldg) => (
              <option key={bldg.id} value={bldg.id}>Budynek: {bldg.name}</option>
            ))}
          </select>
        )}
        <span className="text-[#3d352a]">/</span>

        {currentBuilding && (
          <select
            value={selectedFloorId}
            onChange={(e) => {
              const fl = currentBuilding.floors.find((f) => f.id === e.target.value);
              if (fl) {
                setSelectedFloorId(fl.id);
                const rm = fl.rooms[0];
                setSelectedRoomId(rm?.id || '');
              }
            }}
            className="typewriter-input px-2 py-1 text-xs cursor-pointer"
          >
            {currentBuilding.floors.map((fl) => (
              <option key={fl.id} value={fl.id}>Poziom: {fl.name}</option>
            ))}
          </select>
        )}
        <span className="text-[#3d352a]">/</span>

        {currentFloor && (
          <select
            value={selectedRoomId}
            onChange={(e) => setSelectedRoomId(e.target.value)}
            className="bg-[#f4ecd8] text-[#1a1714] border-2 border-[#7a1c1c] px-2.5 py-1 text-xs font-bold cursor-pointer"
          >
            {currentFloor.rooms.map((rm) => (
              <option key={rm.id} value={rm.id}>Pokój: {rm.name} {rm.isSecret ? ' [TAJNY]' : ''}</option>
            ))}
          </select>
        )}
      </div>

      {/* Main Blueprint & Dossier Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Dossier Ledger */}
        <div className="w-80 bg-[#121318] border-r-2 border-[#3d352a] flex flex-col p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-['Special_Elite'] text-[#b89742] uppercase tracking-widest">Aktualne Pomieszczenie</span>
              {currentRoom?.isSecret && <span className="stamp-classified text-[8px] py-0 px-1.5">Klasyfikowane</span>}
            </div>
            <div className="bg-[#f4ecd8] text-[#1a1714] p-4 border-2 border-[#3d352a] shadow-md space-y-2">
              <h3 className="font-['Playfair_Display'] font-black text-lg border-b border-[#3d352a] pb-1">{currentRoom?.name}</h3>
              <p className="text-xs font-['Courier_Prime'] leading-relaxed">{currentRoom?.description}</p>
              <div className="pt-2 text-[10px] font-['Special_Elite'] text-[#7a1c1c] border-t border-[#3d352a]/40 flex justify-between">
                <span>SEKTOR: {currentRoom?.type}</span>
              </div>
            </div>
          </div>

          {/* NPCs Dossier */}
          <div className="mb-6">
            <span className="text-[10px] font-['Special_Elite'] text-[#b89742] uppercase tracking-widest block mb-2">Obecne Osoby / Podejrzani</span>
            <div className="space-y-2">
              {roomNPCs.length === 0 ? (
                <p className="text-xs font-['Courier_Prime'] text-[#7c705d] italic p-3 bg-[#1a1c23] border border-[#3d352a]">Brak zarejestrowanych osób w tym sektorze.</p>
              ) : (
                roomNPCs.map((npc) => (
                  <div
                    key={npc.id}
                    onClick={() => onSelectNPC(npc)}
                    className="flex items-center gap-3 bg-[#1a1c23] p-3 border border-[#3d352a] hover:border-[#b89742] cursor-pointer transition group"
                  >
                    <img src={npc.avatar} alt={npc.name} className="w-10 h-10 object-cover border border-[#b89742]" />
                    <div>
                      <h4 className="text-xs font-['Special_Elite'] text-[#f4ecd8] group-hover:text-[#b89742]">{npc.name}</h4>
                      <p className="text-[10px] font-['Courier_Prime'] text-[#9c8e77]">{npc.role}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Archive Action Stamp Buttons */}
          <div className="mt-auto space-y-2">
            <button
              onClick={() => currentRoom && onAddItem(currentRoom.id)}
              className="w-full bg-[#f4ecd8] hover:bg-[#e2d5bc] text-[#1a1714] border-2 border-[#3d352a] py-2 px-3 text-xs font-['Special_Elite'] uppercase tracking-wider font-bold transition shadow"
            >
              + Umieść Obiekt / Dowód
            </button>
            <button
              onClick={() => currentFloor && onAddRoom(currentFloor.id)}
              className="w-full bg-[#1a1c23] hover:bg-[#252833] text-[#d1c7b7] border border-[#3d352a] py-2 px-3 text-xs font-['Special_Elite'] uppercase tracking-wider transition"
            >
              + Dodaj Pomieszczenie
            </button>
          </div>
        </div>

        {/* Center: Tactile Blueprint Floor Plan Canvas */}
        <div className="flex-1 bg-[#0b0c10] relative flex items-center justify-center p-8 overflow-auto">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#b89742_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

          {/* Physical Blueprint Paper Box */}
          <div className="w-[760px] h-[520px] bg-[#f4ecd8] text-[#1a1714] border-4 border-double border-[#3d352a] shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative p-8 flex flex-col">
            {/* Header Stamp in Room Canvas */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#3d352a]">
              <div className="flex items-center gap-3">
                <span className="font-['Playfair_Display'] font-black text-xl">{currentRoom?.name}</span>
                {currentRoom?.isSecret && <span className="stamp-classified text-[9px] py-0 px-2">Ukryta Strefa</span>}
              </div>
              <span className="text-xs font-['Special_Elite'] text-[#7a1c1c]">PLIK ARCHIWALNY // {currentBuilding?.name}</span>
            </div>

            {/* Objects Canvas Area */}
            <div className="flex-1 relative mt-4 border-2 dashed border-[#5c4d3c]/50 bg-[#e9dec4]/60 p-4 overflow-hidden">
              {currentRoom?.items.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-[#5c4d3c]">
                  <FileText className="w-10 h-10 mb-2 opacity-50 text-[#7a1c1c]" />
                  <p className="font-['Special_Elite'] text-sm">Brak zarejestrowanych przedmiotów w akcie.</p>
                  <p className="font-['Courier_Prime'] text-xs mt-1">Użyj przycisku poniżej, aby umieścić mebel lub ślad.</p>
                </div>
              ) : (
                currentRoom?.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectItem(item, currentRoom.id)}
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-[#1a1714] text-[#f4ecd8] border-2 border-[#b89742] group-hover:border-[#7a1c1c] group-hover:scale-105 flex items-center justify-center shadow-lg transition-all">
                        {item.type === 'door' ? (
                          <DoorClosed className="w-6 h-6 text-[#b89742]" />
                        ) : item.type === 'container' ? (
                          <FileText className="w-6 h-6 text-[#b89742]" />
                        ) : item.state === 'locked' ? (
                          <Lock className="w-5 h-5 text-[#7a1c1c]" />
                        ) : (
                          <Key className="w-5 h-5 text-[#b89742]" />
                        )}
                      </div>
                      <div className="mt-1 bg-[#f4ecd8] border border-[#3d352a] px-2 py-0.5 text-[10px] font-['Special_Elite'] text-[#1a1714] shadow group-hover:border-[#7a1c1c] whitespace-nowrap">
                        {item.name}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Note */}
            <div className="pt-4 border-t border-[#3d352a]/40 flex items-center justify-between text-xs font-['Courier_Prime'] text-[#5c4d3c]">
              <span>[!] Wskazówka: Kliknij ikonę dowodu/mebla na planie, aby otworzyć pieczętowane aktę.</span>
              <span className="font-['Special_Elite']">Dowodów w aktach: {currentRoom?.items.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
