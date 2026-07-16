import React, { useState } from 'react';
import { GraphNode, GraphEdge, GraphNodeType } from '../types';
import { Network, User, MapPin, Building, Key, Calendar, Plus, Search, Sparkles } from 'lucide-react';

interface WorldGraphViewProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onAddNode: () => void;
  onAddEdge: () => void;
}

export const WorldGraphView: React.FC<WorldGraphViewProps> = ({
  nodes,
  edges,
  onAddNode,
  onAddEdge,
}) => {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(nodes[0] || null);

  const filteredNodes = nodes.filter((n) => {
    const matchesType = selectedTypeFilter === 'all' || n.type === selectedTypeFilter;
    const matchesSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase()) || n.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getNodeIcon = (type: GraphNodeType) => {
    switch (type) {
      case 'person':
        return <User className="w-4 h-4 text-[#7a1c1c]" />;
      case 'place':
        return <MapPin className="w-4 h-4 text-blue-900" />;
      case 'org':
        return <Building className="w-4 h-4 text-purple-900" />;
      case 'item':
        return <Key className="w-4 h-4 text-[#b89742]" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-red-900" />;
    }
  };

  const selectedNodeEdges = selectedNode ? edges.filter((e) => e.source === selectedNode.id || e.target === selectedNode.id) : [];

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-85px)] bg-[#0b0c10] overflow-hidden">
      {/* Sidebar: Case Ledger Index */}
      <div className="w-full md:w-80 bg-[#121318] border-r-2 border-[#3d352a] flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-['Playfair_Display'] font-black text-lg text-[#f4ecd8]">Aktowe Indeksy</span>
          </div>
          <span className="stamp-classified text-[8px] py-0 px-1.5">Tajne</span>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-[#9c8e77] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Szukaj w aktach..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="typewriter-input w-full pl-9 pr-3 py-2 text-xs"
          />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1 mb-4">
          {['all', 'person', 'place', 'org', 'item', 'event'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedTypeFilter(type)}
              className={`px-2.5 py-1 text-[10px] font-['Special_Elite'] uppercase transition ${
                selectedTypeFilter === type
                  ? 'bg-[#f4ecd8] text-[#1a1714] font-bold border border-[#3d352a]'
                  : 'bg-[#1a1c23] text-[#9c8e77] hover:text-[#f4ecd8] border border-[#3d352a]'
              }`}
            >
              {type === 'all' ? 'Wszystko' : type}
            </button>
          ))}
        </div>

        {/* Node index list */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredNodes.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-3 border cursor-pointer transition ${
                selectedNode?.id === node.id
                  ? 'bg-[#f4ecd8] text-[#1a1714] border-[#7a1c1c] shadow font-bold'
                  : 'bg-[#1a1c23] border-[#3d352a] hover:border-[#b89742] text-[#d1c7b7]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div>{getNodeIcon(node.type)}</div>
                <div>
                  <h4 className="text-xs font-['Special_Elite']">{node.label}</h4>
                  <p className="text-[10px] font-['Courier_Prime'] opacity-70 capitalize">{node.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Actions */}
        <div className="pt-4 mt-4 border-t border-[#3d352a] flex gap-2">
          <button
            onClick={onAddNode}
            className="flex-1 bg-[#1a1c23] hover:bg-[#252833] text-[#d1c7b7] border border-[#3d352a] py-2 px-2 text-[10px] font-['Special_Elite'] uppercase tracking-wider transition"
          >
            + Węzeł
          </button>
          <button
            onClick={onAddEdge}
            className="flex-1 bg-[#1a1c23] hover:bg-[#252833] text-[#d1c7b7] border border-[#3d352a] py-2 px-2 text-[10px] font-['Special_Elite'] uppercase tracking-wider transition"
          >
            + Powiązanie
          </button>
        </div>
      </div>

      {/* Main Corkboard Dossier Area */}
      <div className="flex-1 bg-[#0b0c10] p-8 overflow-y-auto relative">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#b89742_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          {/* Header */}
          <div className="bg-[#121318] border-2 border-[#3d352a] p-6 shadow-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-['Special_Elite'] text-[#b89742] uppercase tracking-widest">Tablica Śledcza // Graf Relacji</span>
              <h2 className="text-xl font-['Playfair_Display'] font-black text-[#f4ecd8] mt-1">Powiązania Sprawy Cthulhu</h2>
            </div>
            <div className="stamp-classified text-[10px]">Archiwum Arcanum</div>
          </div>

          {/* Selected Dossier Card */}
          {selectedNode && (
            <div className="bg-[#f4ecd8] text-[#1a1714] border-4 border-double border-[#3d352a] p-8 shadow-2xl space-y-6 relative">
              <div className="absolute top-4 right-4">
                <span className="stamp-classified text-xs">Poufne Dossier</span>
              </div>

              <div className="border-b-2 border-[#3d352a] pb-4 pr-32">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1a1714] text-[#f4ecd8] border border-[#b89742]">{getNodeIcon(selectedNode.type)}</div>
                  <div>
                    <h3 className="text-2xl font-['Playfair_Display'] font-black">{selectedNode.label}</h3>
                    <p className="text-xs font-['Special_Elite'] text-[#7a1c1c] uppercase tracking-wider mt-0.5">Kategoria: {selectedNode.type}</p>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-['Special_Elite'] uppercase tracking-widest text-[#5c4d3c] block mb-2">Treść Akt / Notatki Śledcze:</span>
                <p className="text-sm font-['Courier_Prime'] bg-[#e9dec4] p-4 border border-[#5c4d3c] leading-relaxed">{selectedNode.details}</p>
              </div>

              {/* Connected Edges */}
              <div>
                <span className="text-xs font-['Special_Elite'] uppercase tracking-widest text-[#7a1c1c] block mb-3">Powiązania z innymi aktami ({selectedNodeEdges.length}):</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedNodeEdges.length === 0 ? (
                    <p className="text-xs font-['Courier_Prime'] text-[#7c705d] italic">Brak bezpośrednich powiązań w kartotece.</p>
                  ) : (
                    selectedNodeEdges.map((edge) => {
                      const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                      const otherNode = nodes.find((n) => n.id === otherId);
                      return (
                        <div key={edge.id} className="bg-[#e9dec4] p-3 border border-[#5c4d3c] flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-['Special_Elite'] text-[#7a1c1c]">[{edge.label}]</span>
                            <span className="text-xs font-['Courier_Prime'] font-bold">{otherNode?.label || otherId}</span>
                          </div>
                          {otherNode && (
                            <button
                              onClick={() => setSelectedNode(otherNode)}
                              className="text-[10px] font-['Special_Elite'] text-[#7a1c1c] hover:underline"
                            >
                              Otwórz aktę
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
