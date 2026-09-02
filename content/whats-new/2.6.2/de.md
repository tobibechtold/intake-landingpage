---
version: "2.6.2"
publishedAt: "2026-09-02"
title: "Was ist neu in Intake 2.6.2"
summary: "Schlagwörter, ausgeblendete häufige Lebensmittel und entfernte Favoriten überstehen jetzt die tägliche Aktualisierung der Bibliothek"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: Schlagwörter verschwinden nicht mehr nach der täglichen Aktualisierung der Bibliothek"
  - "iOS: Ausgeblendete häufige Lebensmittel und entfernte Favoriten kommen nicht mehr zurück"
  - "iOS: Enthält alle Fehlerbehebungen aus 2.6.1"
---

## Schlagwörter bleiben

Ein Nutzer hat gemeldet, dass alle seine Schlagwörter innerhalb von zwei Tagen zweimal verschwunden sind. Sein Debug-Log hat die Ursache gezeigt: Einmal am Tag gleicht Intake deine gespeicherten Lebensmittel mit der Datenbank ab, damit korrigierte Nährwerte bei dir ankommen. Dabei hat die App die Liste neu geschrieben und die Schlagwörter nicht mitgenommen. Dasselbe galt für häufige Lebensmittel, die du ausgeblendet hast, und für entfernte Favoriten: Nach dem Abgleich waren sie wieder da.

Alle drei überstehen den Abgleich jetzt. Wenn du davon betroffen warst, tut mir das leid. Verlorene Schlagwörter kann die App leider nicht wiederherstellen, sie liegen nur auf deinem Gerät.

### iOS

- Schlagwörter an deinen Lebensmitteln konnten nach der täglichen Aktualisierung der Bibliothek verschwinden. Sie bleiben jetzt erhalten.
- Ausgeblendete häufige Lebensmittel und entfernte Favoriten kamen nach derselben Aktualisierung zurück. Auch sie bleiben jetzt so, wie du sie eingestellt hast.

## Falls du 2.6.1 oder 2.6.0 verpasst hast

2.6.2 enthält auf iOS auch alle Fehlerbehebungen aus 2.6.1: den leeren Bildschirm nach dem Barcode-Scan, springende Suchergebnisse, den Schalter zwischen Barcode und Essen scannen, unbekannte Barcodes als neues Produkt und Zehntelgramm in den Gewichtsfeldern. Die Details stehen unter [Was ist neu in Intake 2.6.1](/whats-new/2.6.1).

Und falls du direkt von 2.5 kommst: 2.6.0 war das größte Release seit langem, mit der neuen Bibliothek, dem neu aufgebauten Essen hinzufügen und Löffeln, Tassen und Gläsern als Einheiten. Die ganze Geschichte mit Screenshots findest du unter [Was ist neu in Intake 2.6.0](/whats-new/2.6.0).

Das komplette Changelog findest du wie immer [hier](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Vielen Dank, dass du Intake nutzt.

Tobi
