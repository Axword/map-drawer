# ArkhamWeaver: Cthulhu & RPG World Engine

Profesjonalne narzędzie do tworzenia map, zarządzania bazą wiedzy oraz symulacji świata dla sesji RPG (w szczególności w klimatach Cthulhu / Lovecrafta / początku XX wieku, 1890–1930).

Zaprojektowane jako komercyjny produkt dla Mistrzów Gry (Game Masterów) oraz twórców niezależnych gier indie, z unikalnym interfejsem inspirowanym policyjnymi aktami, starymi archiwami i maszynopisami (brak generycznych wzorców SaaS).

## Główne Funkcje

1. **Kreator Map bez Rysowania & Generator AI**: Tworzenie map za pomocą gotowych assetów epoki 1920s lub opisu tekstowego (Prompt Wizard).
2. **Mapy Zagnieżdżone (Mapa w Mapie)**: Płynna nawigacja hierarchiczna (Świat ➔ Miasto ➔ Ulica ➔ Budynek ➔ Piętro ➔ Pokój).
3. **Obiekty z Bogatymi Właściwościami**: Każdy obiekt (np. biurko profesora) posiada opis, ukryte wskazówki, zamki i przedmioty w skrytce.
4. **System NPC i Symulacja Czasu Rzeczywistego**: Harmonogramy dnia postaci, aktywny zegar i kronika zdarzeń (Event Log).
5. **Tryb Projektowania Gry (Questy i Logika)**: Edytor reguł logicznych typu JEŻELI / WTEDY.
6. **Baza Wiedzy Świata (Kartoteka Akt)**: Sieć powiązań między postaciami, miejscami, organizacjami i artefaktami.
7. **Eksport i Import Projektów**: Pełne wsparcie dla zapisu stanu kampanii w formacie JSON oraz routing SPA dla Netlify/Vercel.

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
