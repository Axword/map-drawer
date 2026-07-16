# Architektura Systemu — ArkhamWeaver (Cthulhu & RPG World Engine)

ArkhamWeaver to nowoczesna, komercyjna platforma webowa zaprojektowana dla Mistrzów Gry (Game Masterów) oraz twórców niezależnych gier RPG, ze szczególnym uwzględnieniem klimatów Lovecrafta, grozy gotyckiej, noir i początku XX wieku (1890–1930).

## 1. Stack Technologiczny

- **Frontend UI**: React 19 z TypeScript oraz Tailwind CSS v4 dla responsywnego, mrocznego, gotyckiego interfejsu w stylu policyjnych akt i archiwów (paleta: pożółkłe pergaminy `#f4ecd8`, ciemne tło archiwum `#0b0c10`, akcenty mosiężne i krwisto-czerwone stemple).
- **Ikony i Grafika**: Lucide React, stylowe ikony wektorowe oraz układ map oparty na pozycjonowaniu CSS.
- **Baza Wiedzy (Knowledge Graph)**: Przeglądarka powiązań i kartoteka powiązań między postaciami, miejscami, organizacjami i artefaktami.
- **Stan i Persystencja**: Stan centralny zarządzany w hookach `useState` w komponencie głównym `App.tsx`, z funkcjami eksportu i importu stanu kampanii do pliku JSON.
- **Warstwa Symulacji i AI**: Moduł symulacji czasu rzeczywistego (harmonogramy NPC, zegar) oraz symulator generatora promptowego (AI Prompt Wizard).

## 2. Architektura Danych

System opiera się na spójnym modelu relacyjnym zagnieżdżonym w hierarchii przestrzennej i kartotece:

```
WorldProject
 ├── WorldConfig (tytuł, era, styl, opis)
 ├── SpatialHierarchy (Drzewo lokacji: Świat -> Miasto -> Ulica -> Budynek -> Piętro -> Pokój -> Obiekt/Dowód)
 ├── NPCRegistry (Baza postaci, harmonogramy dnia, relacje)
 ├── KnowledgeGraph (Węzły i krawędzie powiązań w stylu kartoteki)
 ├── QuestLogicEngine (Reguły JEŻELI / WTEDY, questy i śledztwa)
 └── SimulationState (Zegar symulacji, historia zdarzeń w Dzienniku)
```

## 3. Komponenty Główne (Moduły)

1. **Map Studio**: Obsługa zagnieżdżonych map z selektorami kaskadowymi (Breadcrumbs), interaktywna siatka obiektów na papierowym planie.
2. **World Graph**: Kartoteka i sieć powiązań między postaciami, miejscami, kultami i wydarzeniami z filtrowaniem.
3. **Quest & Logic Engine**: Edytor zasad logicznych śledztwa i stanów zadań (JEŻELI / WTEDY).
4. **Simulation Engine**: Symulator upływu czasu (godziny, dni) z automatycznym śledzeniem harmonogramów NPC.
5. **AI Generator Wizard**: Moduł przetwarzania promptów opisowych na gotowe struktury kampanii (np. Willa w Arkham 1924).
