export type MapItemType = 'furniture' | 'container' | 'clue' | 'door' | 'trap' | 'decoration';

export interface MapItem {
  id: string;
  name: string;
  type: MapItemType;
  x: number; // percentage or grid coord
  y: number;
  description: string;
  owner?: string;
  hiddenInfo?: string;
  itemsInside?: string[];
  keyRequired?: string;
  state: 'normal' | 'locked' | 'unlocked' | 'open' | 'investigated';
  icon: string;
}

export interface Room {
  id: string;
  name: string;
  type: string;
  description: string;
  items: MapItem[];
  npcIds?: string[];
  connections?: string[]; // connected room ids
  isSecret?: boolean;
}

export interface Floor {
  id: string;
  name: string;
  level: number; // -1 basement, 0 ground, 1 first floor...
  rooms: Room[];
}

export interface Building {
  id: string;
  name: string;
  type: string; // 'manor' | 'library' | 'hospital' | 'port' | 'house'
  description: string;
  floors: Floor[];
}

export interface Street {
  id: string;
  name: string;
  buildings: Building[];
}

export interface City {
  id: string;
  name: string;
  description: string;
  streets: Street[];
}

export interface WorldProject {
  id: string;
  title: string;
  era: string; // e.g. "1925"
  style: string; // e.g. "Gotycki Horror / Lovecraft"
  description: string;
  cities: City[];
}

export interface ScheduleEntry {
  time: string; // e.g. "08:00"
  locationId: string;
  locationName: string;
  activity: string;
}

export interface NPCRelation {
  targetId: string;
  targetName: string;
  relationType: 'ally' | 'enemy' | 'cultist' | 'employer' | 'fear' | 'knows';
  description: string;
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  description: string;
  history: string;
  goals: string;
  inventory: string[];
  currentLocationId: string;
  currentLocationName: string;
  schedule: ScheduleEntry[];
  relations: NPCRelation[];
  avatar: string;
}

export type GraphNodeType = 'person' | 'place' | 'org' | 'item' | 'event';

export interface GraphNode {
  id: string;
  label: string;
  type: GraphNodeType;
  details: string;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface QuestCondition {
  type: 'has_item' | 'talked_to' | 'visited_location' | 'custom';
  targetId: string;
  targetName: string;
}

export interface QuestAction {
  type: 'open_passage' | 'reveal_clue' | 'spawn_npc' | 'custom';
  description: string;
  targetId?: string;
}

export interface QuestRule {
  id: string;
  title: string;
  description: string;
  conditions: QuestCondition[];
  actions: QuestAction[];
  isCompleted: boolean;
  isActive: boolean;
}

export interface LogEvent {
  id: string;
  time: string;
  message: string;
  type: 'info' | 'alert' | 'success' | 'ritual';
}

export interface SimulationState {
  currentTime: string;
  isRunning: boolean;
  speed: number;
}
