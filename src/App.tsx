import React, { useState, useEffect } from 'react';
import { initialProject, initialNPCs, initialGraphNodes, initialGraphEdges, initialQuests } from './data/initialData';
import { WorldProject, NPC, GraphNode, GraphEdge, QuestRule, SimulationState, LogEvent, MapItem } from './types';
import { Header } from './components/Header';
import { MapView } from './components/MapView';
import { WorldGraphView } from './components/WorldGraphView';
import { QuestLogicView } from './components/QuestLogicView';
import { SimulationView } from './components/SimulationView';
import { AIGeneratorModal } from './components/AIGeneratorModal';
import { ObjectInspector } from './components/ObjectInspector';
import { NPCModal } from './components/NPCModal';

export function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'world' | 'quests' | 'simulation'>('map');
  const [project, setProject] = useState<WorldProject>(initialProject);
  const [npcs, setNPCs] = useState<NPC[]>(initialNPCs);
  const [nodes, setNodes] = useState<GraphNode[]>(initialGraphNodes);
  const [edges, setEdges] = useState<GraphEdge[]>(initialGraphEdges);
  const [quests, setQuests] = useState<QuestRule[]>(initialQuests);

  const [simulationState, setSimulationState] = useState<SimulationState>({
    currentTime: '1925-10-14 21:00',
    isRunning: false,
    speed: 1,
  });

  const [eventLogs, setEventLogs] = useState<LogEvent[]>([
    { id: '1', time: '20:00', message: 'Profesor William Smith rozpoczął przegląd manuskryptów w bibliotece.', type: 'info' },
    { id: '2', time: '20:30', message: 'Detektyw John Thomas zbliża się do willi od strony Miskatonic Lane.', type: 'alert' },
    { id: '3', time: '21:00', message: 'Zegar stojący w holu cicho tyka w ciemności. Deszcz bębni w okna.', type: 'ritual' }
  ]);

  // Modals state
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [selectedItemForInspect, setSelectedItemForInspect] = useState<{ item: MapItem; roomId: string } | null>(null);
  const [selectedNPCForModal, setSelectedNPCForModal] = useState<NPC | null>(null);

  // Simulation time tick effect
  useEffect(() => {
    let interval: any;
    if (simulationState.isRunning) {
      interval = setInterval(() => {
        setSimulationState((prev) => {
          // parse hour
          const [date, timeStr] = prev.currentTime.split(' ');
          const [hourStr, minStr] = timeStr.split(':');
          let hour = parseInt(hourStr, 10) + 1;
          let newDate = date;
          if (hour >= 24) {
            hour = 0;
            newDate = '1925-10-15';
          }
          const formattedHour = hour.toString().padStart(2, '0') + ':' + minStr;
          const newTime = `${newDate} ${formattedHour}`;

          // Add a simulated log
          const newLog: LogEvent = {
            id: Date.now().toString(),
            time: formattedHour,
            message: `Czas upłynął. Profesor Smith kontynuuje harmonogram. Detektyw obserwuje okolicę.`,
            type: 'info'
          };
          setEventLogs((logs) => [newLog, ...logs.slice(0, 15)]);

          return { ...prev, currentTime: newTime };
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [simulationState.isRunning]);

  // Handlers
  const handleToggleSimulation = () => {
    setSimulationState((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const handleStepSimulation = () => {
    setSimulationState((prev) => {
      const [date, timeStr] = prev.currentTime.split(' ');
      const [hourStr, minStr] = timeStr.split(':');
      let hour = parseInt(hourStr, 10) + 1;
      let newDate = date;
      if (hour >= 24) {
        hour = 0;
        newDate = '1925-10-15';
      }
      const formattedHour = hour.toString().padStart(2, '0') + ':' + minStr;
      const newTime = `${newDate} ${formattedHour}`;

      const newLog: LogEvent = {
        id: Date.now().toString(),
        time: formattedHour,
        message: `Ręczny skok czasu o 1 godzinę. Zegar wskazuje ${newTime}.`,
        type: 'success'
      };
      setEventLogs((logs) => [newLog, ...logs.slice(0, 15)]);

      return { ...prev, currentTime: newTime };
    });
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ project, npcs, nodes, edges, quests }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${project.title.toLowerCase().replace(/\s+/g, '-')}-save.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.project) setProject(parsed.project);
          if (parsed.npcs) setNPCs(parsed.npcs);
          if (parsed.nodes) setNodes(parsed.nodes);
          if (parsed.edges) setEdges(parsed.edges);
          if (parsed.quests) setQuests(parsed.quests);
          alert('Projekt został pomyślnie zaimportowany!');
        } catch (err) {
          alert('Błąd podczas parsowania pliku JSON.');
        }
      };
    }
  };

  const handleAIGenerate = (prompt: string) => {
    // Generate new project based on prompt
    const newProj: WorldProject = {
      id: 'generated-' + Date.now(),
      title: prompt.slice(0, 40) + '...',
      era: '1928',
      style: 'Lovecraftian / Noir',
      description: prompt,
      cities: [
        {
          id: 'city-gen',
          name: 'Innsmouth Harbor',
          description: 'Wygenerowane miasto rybackie spowite morską mgłą.',
          streets: [
            {
              id: 'street-gen',
              name: 'Water Street',
              buildings: [
                {
                  id: 'bldg-gen',
                  name: 'Rybacka Tawerna "Pod Dziwną Rybą"',
                  type: 'port',
                  description: 'Stara, zapuszczona tawerna w porcie.',
                  floors: [
                    {
                      id: 'floor-gen',
                      name: 'Sala Główna',
                      level: 0,
                      rooms: [
                        {
                          id: 'room-gen',
                          name: 'Główna Sala Barowa',
                          type: 'Tawerna',
                          description: 'Pachnie solą, rybami i tanią whiskey.',
                          items: [
                            {
                              id: 'item-gen-1',
                              name: 'Stary Bar',
                              type: 'container',
                              x: 50,
                              y: 50,
                              description: 'Lekko wilgotny drewniany blat.',
                              state: 'normal',
                              icon: 'FileText'
                            }
                          ],
                          npcIds: []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
    setProject(newProj);
    setEventLogs((logs) => [
      { id: Date.now().toString(), time: '22:00', message: `Wygenerowano nowy świat z promptu: "${prompt}"`, type: 'success' },
      ...logs
    ]);
  };

  const handleUpdateItem = (updatedItem: MapItem) => {
    if (!selectedItemForInspect) return;
    const roomId = selectedItemForInspect.roomId;
    setProject((prev) => {
      const cloned = JSON.parse(JSON.stringify(prev)) as WorldProject;
      // find room and update item
      for (const city of cloned.cities) {
        for (const street of city.streets) {
          for (const bldg of street.buildings) {
            for (const floor of bldg.floors) {
              for (const room of floor.rooms) {
                if (room.id === roomId) {
                  room.items = room.items.map((it) => (it.id === updatedItem.id ? updatedItem : it));
                }
              }
            }
          }
        }
      }
      return cloned;
    });
    setSelectedItemForInspect(null);
  };

  const handleToggleQuest = (id: string) => {
    setQuests((prev) => prev.map((q) => (q.id === id ? { ...q, isCompleted: !q.isCompleted } : q)));
  };

  return (
    <div className="flex flex-col min-h-screen bg-lovecraft-dark text-gray-200">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        simulationState={simulationState}
        onToggleSimulation={handleToggleSimulation}
        onStepSimulation={handleStepSimulation}
        onOpenAIGenerator={() => setIsAIModalOpen(true)}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        projectTitle={project.title}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'map' && (
          <MapView
            project={project}
            npcs={npcs}
            onSelectItem={(item, roomId) => setSelectedItemForInspect({ item, roomId })}
            onSelectNPC={(npc) => setSelectedNPCForModal(npc)}
            onAddItem={(roomId) => {
              const newItem: MapItem = {
                id: 'item-' + Date.now(),
                name: 'Nowy Obiekt / Mebel',
                type: 'furniture',
                x: 50,
                y: 50,
                description: 'Nowy element wyposażenia wnętrza.',
                state: 'normal',
                icon: 'FileText'
              };
              setProject((prev) => {
                const cloned = JSON.parse(JSON.stringify(prev)) as WorldProject;
                for (const city of cloned.cities) {
                  for (const street of city.streets) {
                    for (const bldg of street.buildings) {
                      for (const floor of bldg.floors) {
                        for (const room of floor.rooms) {
                          if (room.id === roomId) {
                            room.items.push(newItem);
                          }
                        }
                      }
                    }
                  }
                }
                return cloned;
              });
            }}
            onAddRoom={(floorId) => {
              const newRoom = {
                id: 'room-' + Date.now(),
                name: 'Nowy Pokój',
                type: 'Pokój',
                description: 'Opis nowego pomieszczenia.',
                items: [],
                isSecret: false
              };
              setProject((prev) => {
                const cloned = JSON.parse(JSON.stringify(prev)) as WorldProject;
                for (const city of cloned.cities) {
                  for (const street of city.streets) {
                    for (const bldg of street.buildings) {
                      for (const floor of bldg.floors) {
                        if (floor.id === floorId) {
                          floor.rooms.push(newRoom);
                        }
                      }
                    }
                  }
                }
                return cloned;
              });
            }}
          />
        )}

        {activeTab === 'world' && (
          <WorldGraphView
            nodes={nodes}
            edges={edges}
            onAddNode={() => {
              const newNode: GraphNode = {
                id: 'node-' + Date.now(),
                label: 'Nowy Węzeł',
                type: 'place',
                details: 'Opis nowego elementu świata.'
              };
              setNodes([...nodes, newNode]);
            }}
            onAddEdge={() => {
              if (nodes.length >= 2) {
                const newEdge: GraphEdge = {
                  id: 'edge-' + Date.now(),
                  source: nodes[0].id,
                  target: nodes[1].id,
                  label: 'powiązany'
                };
                setEdges([...edges, newEdge]);
              }
            }}
          />
        )}

        {activeTab === 'quests' && (
          <QuestLogicView
            quests={quests}
            onToggleQuest={handleToggleQuest}
            onAddQuest={() => {
              const newQ: QuestRule = {
                id: 'quest-' + Date.now(),
                title: 'Nowe Śledztwo',
                description: 'Opis zadania i celu dla graczy.',
                conditions: [{ type: 'custom', targetId: 'none', targetName: 'Warunek specjalny' }],
                actions: [{ type: 'custom', description: 'Wynik wykonania zadania' }],
                isActive: true,
                isCompleted: false
              };
              setQuests([...quests, newQ]);
            }}
          />
        )}

        {activeTab === 'simulation' && (
          <SimulationView
            simulationState={simulationState}
            npcs={npcs}
            eventLogs={eventLogs}
            onToggleSimulation={handleToggleSimulation}
            onStepSimulation={handleStepSimulation}
          />
        )}
      </main>

      <AIGeneratorModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onGenerate={handleAIGenerate}
      />

      <ObjectInspector
        item={selectedItemForInspect?.item || null}
        onClose={() => setSelectedItemForInspect(null)}
        onUpdateItem={handleUpdateItem}
      />

      <NPCModal
        npc={selectedNPCForModal}
        onClose={() => setSelectedNPCForModal(null)}
      />
    </div>
  );
}

export default App;
