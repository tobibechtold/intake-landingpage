---
version: "2.7.1"
publishedAt: "2026-09-19"
title: "Was ist neu in Intake 2.7.1"
summary: "Ein Update nur mit Fehlerbehebungen. Auf Android: Vorschläge bieten dieselben Portionen wie deine Favoriten, eine fehlgeschlagene Health-Connect-Synchronisierung verlangt keine Berechtigungen mehr, die du längst erteilt hast, und dein Alter springt am Geburtstag um"
coverImage: "./assets/cover.svg"
highlights:
  - "Android: Vorschläge bieten dieselben Portionen wie Favoriten und häufige Lebensmittel"
  - "Android: Health Connect verlangt keine Berechtigungen mehr, die längst erteilt sind"
  - "Android: Ein nicht lesbarer Health-Connect-Eintrag blockiert nicht mehr Schritte und Kalorien"
  - "Android: Dein Alter in den Einstellungen springt am Geburtstag um"
---

## Fehlerbehebungen

### Android

- Ein Lebensmittel aus den Vorschlägen bot nur „Eigene Menge“ an, während dasselbe Lebensmittel aus den Favoriten oder unter Häufig seine Portionen zeigte. Vorschläge bieten jetzt dieselben Portionen, zum Beispiel einen kleinen, mittleren oder großen Apfel oder eine Scheibe Brot.
- Health Connect: Schlug eine Synchronisierung fehl, stand in den Einstellungen „Health Connect-Berechtigungen sind erforderlich“, obwohl alle Berechtigungen erteilt waren. Sie erneut zu vergeben änderte nichts. Intake sagt jetzt, dass die Synchronisierung fehlgeschlagen ist.
- Health Connect: Ein einzelner Eintrag, den Intake nicht lesen kann, etwa ein Workout aus einer anderen App, hielt die gesamte Synchronisierung an. Schritte, Kalorien und alles andere werden jetzt trotzdem übernommen.
- Hält das Problem an, enthält „Debug-Daten exportieren“ unter Health-Connect-Aktivität jetzt den letzten Fehler. Schick mir die Datei, dann sehe ich, woran es liegt.
- Das Alter in der Übersicht der Einstellungen sprang an deinem Geburtstag nicht um. Es wird jetzt wie deine Kalorienziele aus dem Geburtsdatum berechnet.

Das komplette Changelog findest du wie immer [hier](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Vielen Dank, dass du Intake nutzt.

Tobi
