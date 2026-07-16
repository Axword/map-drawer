# ArkhamWeaver: Cthulhu & RPG World Engine

Profesjonalne narzędzie do tworzenia map, zarządzania bazą wiedzy oraz symulacji świata dla sesji RPG (w szczególności w klimatach Cthulhu / Lovecrafta / początku XX wieku, 1890–1930).

Zaprojektowane jako komercyjny produkt dla Mistrzów Gry (Game Masterów) oraz twórców niezależnych gier indie, łączące najlepsze cechy takich narzędzi jak Dungeon Alchemist, Wonderdraft, Obsidian, Tiled Map Editor i Foundry VTT.

## Główne Funkcje

1. **Kreator Map bez Rysowania & Generator AI**: Tworzenie map za pomocą gotowych assetów epoki 1920s lub prostego opisu tekstowego (Prompt Wizard).
2. **Mapy Zagnieżdżone (Mapa w Mapie)**: Płynna nawigacja hierarchiczna (Świat ➔ Miasto ➔ Ulica ➔ Budynek ➔ Piętro ➔ Pokój ➔ Tajne Pomieszczenie).
3. **Obiekty z Bogatymi Właściwościami**: Każdy obiekt (np. biurko profesora) posiada opis, właściciela, zamknięte szuflady, ukryte listy i klucze.
4. **System NPC i Symulacji Czasu Rzeczywistego**: Harmonogramy dnia postacie, śledzenie lokalizacji, powiadomienia i dziennik zdarzeń (Event Log).
5. **Tryb Projektowania Gry (Questy i Logika)**: Edytor reguł logicznych typu JEŻELI / WTEDY (np. znalezienie klucza + książka = otwarcie tajnego przejścia).
6. **Baza Wiedzy Świata (Graf w stylu Obsidian)**: Interaktywna sieć powiązań między postaciami, miejscami, organizacjami i artefaktami.
7. **Eksport i Import Projektów**: Pełne wsparcie dla zapisu stanu kampanii w formacie JSON oraz LocalStorage.

## Uruchomienie Projektu

```bash
# Instalacja zależności
npm install

# Uruchomienie trybu deweloperskiego
npm run dev

# Zbudowanie produkcji
npm run build
```

## Dokumentacja
Pełna dokumentacja architektoniczna i projektowa znajduje się w katalogu `docs/`:
- `docs/architecture.md` — Architektura systemowa
- `docs/ux_design.md` — Projektowanie doświadczenia użytkownika (UX/UI)
- `docs/mvp_spec.md` — Specyfikacja MVP
- `docs/roadmap.md` — Plan rozwoju produktu
