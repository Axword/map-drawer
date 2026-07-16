import { WorldProject, NPC, GraphNode, GraphEdge, QuestRule } from '../types';

export const initialProject: WorldProject = {
  id: 'arkham-1925',
  title: 'Tajemnica Starej Willi w Arkham',
  era: '1925',
  style: 'Gotycki Horror & Lovecraft',
  description: 'Deszczowa noc w Nowej Anglii. W starej willi profesora Smitha skrywa się mroczny sekret Kultu Czarnego Słońca oraz starożytny rytuał.',
  cities: [
    {
      id: 'city-arkham',
      name: 'Arkham, Massachusetts',
      description: 'Kultowe uniwersyteckie miasteczko nad rzeką Miskatonic, spowite wieczną mgłą i szeptami z przeszłości.',
      streets: [
        {
          id: 'street-miskatonic',
          name: 'Miskatonic Lane',
          buildings: [
            {
              id: 'bldg-manor',
              name: 'Willa Profesora Smitha',
              type: 'manor',
              description: 'Wiktoriańska rezydencja z 1894 roku z ciemnego mahoniu i kamienia. Okna spowite bluszczem.',
              floors: [
                {
                  id: 'floor-basement',
                  name: 'Piwnica i Krypta',
                  level: -1,
                  rooms: [
                    {
                      id: 'room-cellar',
                      name: 'Stara Piwnica',
                      type: 'Przechowalnia wina i węgla',
                      description: 'Wilgotne pomieszczenie pachnące stęchlizną i starą ziemią.',
                      isSecret: false,
                      items: [
                        {
                          id: 'item-wine',
                          name: 'Stara beczka wina',
                          type: 'container',
                          x: 20,
                          y: 30,
                          description: 'Pusta beczka z 1888 roku.',
                          state: 'normal',
                          icon: 'Wine'
                        },
                        {
                          id: 'item-secret-door',
                          name: 'Kamienny Próg',
                          type: 'door',
                          x: 80,
                          y: 50,
                          description: 'Ciężka płyta podłogowa z wyrytymi dziwnymi symbolami.',
                          keyRequired: 'key-brass',
                          state: 'locked',
                          hiddenInfo: 'Prowadzi do tajnego pokoju kultu pod piwnicą.',
                          icon: 'DoorClosed'
                        }
                      ],
                      npcIds: ['npc-smith']
                    },
                    {
                      id: 'room-secret',
                      name: 'Tajne Pomieszczenie Rytuałów',
                      type: 'Krypta Kultu',
                      description: 'Ukryta komnata oświetlona zielonymi świecami. Na ścianach freski przedstawiające istotę z morskich głębin.',
                      isSecret: true,
                      items: [
                        {
                          id: 'item-altar',
                          name: 'Kamienny Ołtarz',
                          type: 'clue',
                          x: 50,
                          y: 50,
                          description: 'Ołtarz pokryty zakrzepłą substancją nieznanego pochodzenia.',
                          hiddenInfo: 'Leży tu złoty medalion Kultu Czarnego Słońca.',
                          itemsInside: ['Złoty Medalion Kultu', 'Dziennik Rytuałów'],
                          state: 'normal',
                          icon: 'Skull'
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 'floor-ground',
                  name: 'Parter',
                  level: 0,
                  rooms: [
                    {
                      id: 'room-library',
                      name: 'Biblioteka Domowa',
                      type: 'Biblioteka',
                      description: 'Ogromne regały z zakurzonymi księgami w skórzanych oprawach. W kominku dogasa ogień.',
                      items: [
                        {
                          id: 'item-desk',
                          name: 'Biurko Profesora',
                          type: 'container',
                          x: 40,
                          y: 60,
                          description: 'Mahoniowe biurko z zaciętą szufladą.',
                          owner: 'Profesor William Smith',
                          keyRequired: 'key-drawer',
                          hiddenInfo: 'W szufladzie znajduje się list z groźbami od nieznajomego.',
                          itemsInside: ['List z groźbami', 'Klucz mosiężny do piwnicy'],
                          state: 'locked',
                          icon: 'FileText'
                        },
                        {
                          id: 'item-bookshelf',
                          name: 'Stary Regał z Księgami',
                          type: 'clue',
                          x: 15,
                          y: 20,
                          description: 'Księgi dotyczące okultyzmu i historii Nowej Anglii.',
                          hiddenInfo: 'Jedna z książek (Necronomicon - fragment) odstaje od półki.',
                          state: 'normal',
                          icon: 'BookOpen'
                        }
                      ],
                      npcIds: ['npc-smith']
                    },
                    {
                      id: 'room-hall',
                      name: 'Główny Hol',
                      type: 'Wejście',
                      description: 'Przestronny przedpokój z wielkim zegarem stojącym, który zatrzymał się o 23:45.',
                      items: [
                        {
                          id: 'item-clock',
                          name: 'Zegar Stojący',
                          type: 'decoration',
                          x: 50,
                          y: 25,
                          description: 'Wskazówki na zawsze utknęły w bezruchu.',
                          state: 'normal',
                          icon: 'Clock'
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
    }
  ]
};

export const initialNPCs: NPC[] = [
  {
    id: 'npc-smith',
    name: 'Profesor William Smith',
    role: 'Profesor Archeologii Miskatonic University',
    description: 'Starszy mężczyzna o zmęczonej twarzy, w okularach w drucianych oprawkach. Ostatnio obsesyjnie bada starożytne cywilizacje.',
    history: 'Wykładał na uniwersytecie przez 30 lat. Odkrył tajemniczy artefakty podczas wyprawy do Innsmouth w 1920 roku.',
    goals: 'Ukryć przed światem prawdę o Kulcie Czarnego Słońca i dokonać ostatecznego rytuału.',
    inventory: ['Klucz do biurka', 'Złoty zegark kieszonkowy', 'Notatki z wyprawy'],
    currentLocationId: 'room-library',
    currentLocationName: 'Biblioteka Domowa',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&h=200&q=80',
    schedule: [
      { time: '08:00', locationId: 'room-library', locationName: 'Biblioteka Domowa', activity: 'Przeglądanie starożytnych manuskryptów' },
      { time: '13:00', locationId: 'room-library', locationName: 'Uniwersytet Miskatonic', activity: 'Wykład dla studentów' },
      { time: '18:00', locationId: 'room-hall', locationName: 'Willa Profesora - Hol', activity: 'Kolacja i nasłuchiwanie odgłosów z zewnątrz' },
      { time: '23:00', locationId: 'room-secret', locationName: 'Tajne Pomieszczenie Rytuałów', activity: 'Odczytywanie inkantacji Kultu' }
    ],
    relations: [
      { targetId: 'npc-cult', targetName: 'Kult Czarnego Słońca', relationType: 'cultist', description: 'Jest potajemnym przywódcą lokalnej komórki kultu.' },
      { targetId: 'npc-detective', targetName: 'Detektyw Thomas', relationType: 'enemy', description: 'Podejrzewa profesora o zaginięcia studentów.' }
    ]
  },
  {
    id: 'npc-detective',
    name: 'Detektyw John Thomas',
    role: 'Prywatny Investigator z Bostonu',
    description: 'Trzeźwo myślący detektyw w prochowcu, sceptyczny wobec zabobonów, ufający twardym dowodom.',
    history: 'Wynajęty przez zaniepokojoną rodzinę zaginionego studenta.',
    goals: 'Znaleźć dowody przestępstwa w willi profesora Smitha.',
    inventory: ['Rewolucjer Smith & Wesson', 'Notatnik', 'Latarka kieszonkowa'],
    currentLocationId: 'room-hall',
    currentLocationName: 'Główny Hol (Willa)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    schedule: [
      { time: '09:00', locationId: 'room-hall', locationName: 'Kawiarnia w Arkham', activity: 'Obserwacja willi z ukrycia' },
      { time: '14:00', locationId: 'room-hall', locationName: 'Posterunek Policji', activity: 'Konsultacja z szefem sztabu' },
      { time: '22:00', locationId: 'room-hall', locationName: 'Willa Profesora - Wokół', activity: 'Próba cichego wkroczenia do rezydencji' }
    ],
    relations: [
      { targetId: 'npc-smith', targetName: 'Profesor William Smith', relationType: 'enemy', description: 'Główny podejrzany w śledztwie.' }
    ]
  }
];

export const initialGraphNodes: GraphNode[] = [
  { id: 'node-smith', label: 'Profesor W. Smith', type: 'person', details: 'Archeolog i lider kultu.' },
  { id: 'node-thomas', label: 'Detektyw John Thomas', type: 'person', details: 'Prowadzi śledztwo w sprawie zaginionych.' },
  { id: 'node-cult', label: 'Kult Czarnego Słońca', type: 'org', details: 'Tajna organizacja czcząca istotę z głębin.' },
  { id: 'node-manor', label: 'Willa w Arkham', type: 'place', details: 'Siedziba profesora z tajną piwnicą.' },
  { id: 'node-book', label: 'Księga Rytuałów', type: 'item', details: 'Starożytny zbiór zakazanych inkantacji.' },
  { id: 'node-ritual', label: 'Rytuał pod Piwnicą', type: 'event', details: 'Odbywa się każdej nocy o północy.' }
];

export const initialGraphEdges: GraphEdge[] = [
  { id: 'e1', source: 'node-smith', target: 'node-cult', label: 'przewodzi' },
  { id: 'e2', source: 'node-smith', target: 'node-manor', label: 'zamieszkuje' },
  { id: 'e3', source: 'node-thomas', target: 'node-smith', label: 'podejrzewa' },
  { id: 'e4', source: 'node-cult', target: 'node-ritual', label: 'organizuje' },
  { id: 'e5', source: 'node-manor', target: 'node-ritual', label: 'miejsce' },
  { id: 'e6', source: 'node-smith', target: 'node-book', label: 'ukrywa' }
];

export const initialQuests: QuestRule[] = [
  {
    id: 'quest-1',
    title: 'Tajemnica Biurka Profesora',
    description: 'Znajdź klucz do biurka w bibliotece i odkryj list z groźbami.',
    conditions: [
      { type: 'has_item', targetId: 'item-desk', targetName: 'Klucz mosiężny do piwnicy' }
    ],
    actions: [
      { type: 'reveal_clue', description: 'Odblokowano dostęp do piwnicy oraz wskazówkę o tajnym przejściu.', targetId: 'item-secret-door' }
    ],
    isActive: true,
    isCompleted: false
  },
  {
    id: 'quest-2',
    title: 'Otwarcie Krypt pod Piwnicą',
    description: 'Użyj mosiężnego klucza na kamiennym progu w starej piwnicy, aby otworzyć tajne pomieszczenie.',
    conditions: [
      { type: 'visited_location', targetId: 'room-secret', targetName: 'Tajne Pomieszczenie Rytuałów' }
    ],
    actions: [
      { type: 'open_passage', description: 'Tajne drzwi do krypt zostały otwarte!', targetId: 'item-secret-door' }
    ],
    isActive: true,
    isCompleted: false
  }
];
