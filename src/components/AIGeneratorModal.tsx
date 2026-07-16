import React, { useState } from 'react';
import { Sparkles, X, Wand2 } from 'lucide-react';

interface AIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => void;
}

export const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
}) => {
  const [prompt, setPrompt] = useState<string>(
    'Stara willa w Arkham z 1924 roku, deszczowa noc, trzy piętra, biblioteka, tajny pokój pod piwnicą'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGenerateClick = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onGenerate(prompt);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-[#f4ecd8] text-[#1a1714] border-4 border-double border-[#3d352a] rounded-none max-w-lg w-full p-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7a1c1c] font-bold text-lg hover:scale-110 transition"
        >
          [X]
        </button>

        <div className="absolute top-4 left-6">
          <span className="stamp-classified text-[9px]">Kreator Arcanum</span>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#1a1714] text-[#f4ecd8] border-2 border-[#b89742] flex items-center justify-center font-['Playfair_Display'] font-black text-xl">
            ℵ
          </div>
          <div>
            <h2 className="text-xl font-['Playfair_Display'] font-black">Generator Świata AI</h2>
            <p className="text-xs font-['Special_Elite'] text-[#7a1c1c]">Przekształć opis tekstowy w pełne archiwum śledztwa</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-['Special_Elite'] uppercase tracking-widest text-[#5c4d3c] block">Opis wizji (Klimat Lovecrafta):</label>
          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="typewriter-input w-full p-3 text-xs leading-relaxed"
            placeholder="np. Mroczny port w Innsmouth w 1928 roku..."
          />
        </div>

        <div className="bg-[#e9dec4] p-3 border border-[#5c4d3c] text-xs font-['Courier_Prime'] text-[#5c4d3c] space-y-1">
          <span className="font-['Special_Elite'] font-bold text-[#7a1c1c]">System wygeneruje:</span>
          <ul className="list-disc list-inside space-y-0.5 text-[#1a1714]">
            <li>Hierarchię map zagnieżdżonych</li>
            <li>Postacie NPC z harmonogramami i relacjami</li>
            <li>Przedmioty z zamkniętymi szufladami i wskazówkami</li>
            <li>Graf powiązań w bazie wiedzy</li>
          </ul>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t-2 border-[#3d352a]">
          <button
            onClick={onClose}
            className="px-4 py-2 font-['Special_Elite'] text-xs uppercase tracking-wider text-[#5c4d3c] hover:text-[#1a1714]"
          >
            Anuluj
          </button>
          <button
            onClick={handleGenerateClick}
            disabled={isGenerating}
            className="bg-[#7a1c1c] hover:bg-[#9a2525] text-[#f4ecd8] border-2 border-[#3d352a] px-6 py-2.5 font-['Special_Elite'] text-xs font-bold uppercase tracking-wider transition shadow flex items-center gap-2 disabled:opacity-50"
          >
            <Wand2 className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Przetwarzanie w archiwum...' : 'Wygeneruj Świat'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
