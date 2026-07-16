# Projektowanie UX/UI — ArkhamWeaver

## 1. Filozofia Doświadczenia Użytkownika (UX)

Narzędzie jest dedykowane **Mistrzom Gry oraz twórcom niezależnym**, którzy często nie posiadają umiejętności plastycznych ani programistycznych, lecz pragną osiągnąć profesjonalny, kinowy efekt gotyckiego horroru.

### Kluczowe zasady UX:
- **Zero rysowania (No-Drawing Required)**: Zamiast pędzli i narzędzi graficznych, użytkownik korzysta z biblioteki gotowych assetów epoki 1920s (meble z mahoniu, stare lampy naftowe, maszyny do pisania, zakrwawione biurka) oraz generatorów tekstowych/AI.
- **Hierarchia "Jedno Kliknięcie do Wnętrza"**: Płynne przechodzenie od mapy całego świata (Arkham) aż do zamkniętej szuflady w gabinecie profesora za pomocą intuicyjnego paska nawigacyjnego (Breadcrumbs) oraz map zagnieżdżonych.
- **Klimat Lovecrafta na każdym kroku**: Estymująca atmosfera lat 20. XX wieku (stary papier, ciemny mahoniowy brąz, akcenty krwistej czerwieni i złoconego mosiądzu).

## 2. Główne Widoki Interfejsu

### A) Widok Mapy (Map Studio)
- Interaktywny obszar roboczy z siatką i kafelkami tła (drewniane podłogi, dywany, kamienne posadzki).
- Panel boczny z biblioteką obiektów epoki (przeciągnij i upuść na mapę).
- Inspektor właściwości po kliknięciu na obiekt (edycja opisu, ukrytych przedmiotów, zamkniętych zamków, stanów).

### B) Widok Świata (Knowledge Graph / Obsidian-like)
- Graf powiązań wektorowych pokazujący relacje między postaciami, miejscami, kultami i artefaktami.
- Możibilidad filtrowania widoku (np. pokaż tylko powiązania z "Kultem Czarnego Słońca").

### C) Widok Scenariusza (Quest & Logic Engine)
- Wizualny edytor zasad typu **JEŻELI / ORAZ / WTEDY**.
- Przejrzyste zarządzanie celami śledztwa (Clues & Objectives).

### D) Widok Symulacji (Simulation & Time)
- Zegar symulacji (np. 14 października 1925, 23:15).
- Podgląd aktywności NPC w czasie rzeczywistym (np. "Profesor Smith zmierza do tajnego pokoju w piwnicie").

### E) Kreator AI (Prompt Wizard)
- Okno dialogowe, w którym użytkownik wpisuje prosty opis (np. "Stara willa w Arkham z 1924 roku..."), a silnik generuje pełny świat.
