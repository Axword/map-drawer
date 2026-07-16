# Architektura Systemu — ArkhamWeaver (Cthulhu & RPG World Engine)

ArkhamWeaver to nowoczesna, komercyjna platforma webowa zaprojektowana dla Mistrzów Gry (Game Masterów) oraz twórców niezależnych gier RPG, ze szczególnym uwzględnieniem klimatów Lovecrafta, grozy gotyckiej, noir i początku XX wieku (1890–1930).

## 1. Stack Technologiczny

- **Frontend UI**: React 18+ z TypeScript, Styled Components / Tailwind CSS dla responsywnego, mrocznego, gotyckiego interfejsu (paleta: sepiowe pergaminy, głębokie crop/slate, złote akcenty).
- **Ikony i Grafika**: Lucide React, HTML5 Canvas / SVG do renderowania interaktywnych map zagnieżdżonych i siatek taktycznych.
- **Silnik Grafowy (Knowledge Graph)**: D3.js / siatka węzłów do wizualizacji relacji w stylu Obsidian (postacie, lokacje, organizacje, przedmioty, wydarzenia).
- **Stan i Persystencja**: Stan centralny zarządzany w React Context / Zustand, z automatycznym zapisem w `localStorage` oraz eksportem/importem do pliku JSON.
- **Warstwa AI / LLM (Generowanie Świata)**: Moduł symulacji promptowej zdolny do transformacji tekstu (np. "Stara willa w Arkham z 1924 roku...") na pełną strukturę danych (zagnieżdżona mapa, NPC, harmonogramy, przedmioty, powiązania).

## 2. Architektura Danych

System opiera się na spójnym modelu relacyjnym zagnieżdżonym w hierarchii przestrzennej i grafie wiedzy:

```
WorldProject
 ├── WorldConfig (nazwa, era, styl, klimat)
 ├── SpatialHierarchy (Drzewo lokacji: Świat -> Miasto -> Ulica -> Budynek -> Piętro -> Pokój -> Obiekt)
 ├── NPCRegistry (Baza postaci, harmonogramy, relacje, stany)
 ├── KnowledgeGraph (Węzły i krawędzie powiązań w stylu Obsidian)
 ├── QuestLogicEngine (Reguły JEŻELI / WTEDY, dialogi, stany questów)
 └── SimulationState (Zegar symulacji, historia wydarzeń, dziennik sesji)
```

## 3. Komponenty Główne (Moduły)

1. **Map Studio**: Obsługa zagnieżdżonych map z breadcrumbs, interaktywna siatka obiektów (meble, drzwi, wskazówki, ślady krwi).
2. **World Graph**: Wizualizacja relacji między wszystkimi elementami świata z filtrowaniem wg kategorii.
3. **Quest & Logic Engine**: Edytor logiki gry (warunki logiczne dla mechanik śledztwa i eksploracji).
4. **Simulation Engine**: Symulator upływu czasu (dni, godziny, minuty) z automatycznym przemieszczaniem NPC zgodnie z harmonogramem.
5. **AI Generator Wizard**: Moduł przetwarzania promptów opisowych na gotowe struktury kampanii.
