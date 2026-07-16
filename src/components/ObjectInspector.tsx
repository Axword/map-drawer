import React from 'react';
import { MapItem } from '../types';
import { FileText, Key, Check } from 'lucide-react';

interface ObjectInspectorProps {
  item: MapItem | null;
  onClose: () => void;
  onUpdateItem: (updated: MapItem) => void;
}

export const ObjectInspector: React.FC<ObjectInspectorProps> = ({
  item,
  onClose,
  onUpdateItem,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-[#f4ecd8] text-[#1a1714] border-4 border-double border-[#3d352a] max-w-md w-full p-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7a1c1c] font-bold text-lg hover:scale-110 transition"
        >
          [X]
        </button>

        <div className="absolute top-4 left-6">
          <span className="stamp-classified text-[9px]">Akta Dowodu</span>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#1a1714] text-[#f4ecd8] border-2 border-[#b89742] flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#b89742]" />
          </div>
          <div>
            <h2 className="text-xl font-['Playfair_Display'] font-black">{item.name}</h2>
            <p className="text-xs font-['Special_Elite'] text-[#7a1c1c] uppercase tracking-wider">Typ: {item.type}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-['Special_Elite'] uppercase tracking-widest text-[#5c4d3c] block mb-1">Opis Dowodu:</label>
            <textarea
              rows={2}
              value={item.description}
              onChange={(e) => onUpdateItem({ ...item, description: e.target.value })}
              className="typewriter-input w-full p-2.5 text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-['Special_Elite'] uppercase tracking-widest text-[#5c4d3c] block mb-1">Ukryte Informacje / Ślady:</label>
            <input
              type="text"
              value={item.hiddenInfo || ''}
              onChange={(e) => onUpdateItem({ ...item, hiddenInfo: e.target.value })}
              className="typewriter-input w-full p-2.5 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-['Special_Elite'] uppercase tracking-widest text-[#5c4d3c] block mb-1">Stan Zamka:</label>
              <select
                value={item.state}
                onChange={(e) => onUpdateItem({ ...item, state: e.target.value as any })}
                className="typewriter-input w-full p-2.5 text-xs cursor-pointer"
              >
                <option value="normal">Normalny</option>
                <option value="locked">Zamknięty na klucz</option>
                <option value="unlocked">Otwarty</option>
                <option value="open">Otwarty na oścież</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-['Special_Elite'] uppercase tracking-widest text-[#5c4d3c] block mb-1">Wymagany Klucz:</label>
              <input
                type="text"
                value={item.keyRequired || 'Brak'}
                onChange={(e) => onUpdateItem({ ...item, keyRequired: e.target.value })}
                className="typewriter-input w-full p-2.5 text-xs"
              />
            </div>
          </div>

          {item.itemsInside && item.itemsInside.length > 0 && (
            <div>
              <label className="text-xs font-['Special_Elite'] uppercase tracking-widest text-[#5c4d3c] block mb-1">Przedmioty w skrytce:</label>
              <div className="bg-[#e9dec4] p-2.5 border border-[#5c4d3c] space-y-1">
                {item.itemsInside.map((subItem, idx) => (
                  <div key={idx} className="text-xs font-['Courier_Prime'] text-[#7a1c1c] flex items-center gap-2">
                    <Key className="w-3.5 h-3.5" />
                    <span>{subItem}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t-2 border-[#3d352a]">
          <button
            onClick={onClose}
            className="bg-[#7a1c1c] hover:bg-[#9a2525] text-[#f4ecd8] border-2 border-[#3d352a] px-6 py-2 font-['Special_Elite'] text-xs font-bold uppercase tracking-wider transition shadow flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Zapisz Akta</span>
          </button>
        </div>
      </div>
    </div>
  );
};
