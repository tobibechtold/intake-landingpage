---
version: "2.6.2"
publishedAt: "2026-09-02"
title: "Was ist neu in Intake 2.6.2"
summary: "Ein Button zum Löschen deiner iCloud-Daten, das Einreichen zur Prüfung funktioniert wieder, keine Freezes mehr beim Scannen mehrerer Produkte nacheinander, und Schlagwörter, die die tägliche Aktualisierung der Bibliothek überstehen. Auf Android: lesbares Wasser-Widget, ehrliche Einreichungen und ein PDF-Export, der passt"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: Neu: iCloud-Daten löschen, ein Button in den iCloud-Einstellungen"
  - "iOS: Mehrere Produkte nacheinander zu scannen friert den Produktbildschirm nicht mehr ein"
  - "iOS: Zur Prüfung einreichen funktioniert wieder, auch aus der Bibliothek"
  - "iOS: Schlagwörter, ausgeblendete Lebensmittel und entfernte Favoriten überstehen die tägliche Aktualisierung"
  - "iOS: Das Onboarding übernimmt Geburtsdatum und Geschlecht aus Health"
  - "Android: Das Wasser-Widget bleibt bei jedem Füllstand lesbar"
  - "Android: Einreichungen zeigen ihren echten Status und lassen sich aus Meine Produkte senden"
  - "Android: Der PDF-Export passt auch an Tagen mit Workouts"
---

## Neu auf iOS: iCloud-Daten löschen

In den iCloud-Einstellungen gibt es einen neuen Button „iCloud-Daten löschen“. Er entfernt alles, was Intake in iCloud gespeichert hat, und schaltet die Synchronisierung aus. Die Daten auf deinem Gerät bleiben. Das Zurücksetzen in den Dateneinstellungen leert nur dieses Gerät und sagt das jetzt auch.

## Fehlerbehebungen

### iOS

- Mehrere Produkte nacheinander zu scannen konnte den Produktbildschirm einfrieren oder von selbst schließen. Er bleibt jetzt bedienbar.
- Ein Produkt in der Bibliothek anzulegen bietet jetzt den Nährwertlabel-Scanner, eine Option „ohne Barcode“ und das Einreichen zur Prüfung, dasselbe Formular wie überall sonst.
- Vor dem Einreichen sagt dir das Formular, was noch fehlt: Name, Marke oder Barcode.
- Ein Barcode, der schon in der Datenbank ist, erzeugt kein Duplikat mehr. Die App bietet stattdessen an, dieses Produkt zu öffnen.
- Ein eigenes Produkt einzureichen hinterlässt keine zweite Kopie mehr in Meine Produkte. Es steht mit Status unter Einreichungen.
- Ein Produkt, das schon in Prüfung ist, lässt sich nicht ein zweites Mal einreichen.
- „Erstellen“ beim Essen hinzufügen kehrt nach dem Eintragen zum Essen-hinzufügen-Bildschirm zurück, statt auf dem geleerten Formular stehen zu bleiben.
- Schlagwörter an deinen Lebensmitteln verschwinden nicht mehr nach der täglichen Aktualisierung der Bibliothek. Ausgeblendete häufige Lebensmittel und entfernte Favoriten kommen auch nicht mehr zurück.
- Das Onboarding hat jetzt die Berechtigung, Geburtsdatum und Geschlecht aus Health zu lesen, statt auf einem Standard-Geburtsjahr stehen zu bleiben.
- Der Wechsel zu Health und zurück friert die App nicht mehr für Sekunden ein.
- Die Abfrage beim Zurücksetzen sagt jetzt, was passiert: Dieses Gerät wird geleert, iCloud-Daten bleiben.
- Alles aus 2.6.1 ist enthalten: der leere Bildschirm nach dem Barcode-Scan, springende Suchergebnisse, unbekannte Barcodes als neues Produkt und Zehntelgramm in den Gewichtsfeldern. Details unter [Was ist neu in Intake 2.6.1](/whats-new/2.6.1).

### Android

- Das Wasser-Widget ist bei jedem Füllstand lesbar, und seine Vorschauen zeigen keine Platzhalter und im Dark Mode keine weißen Kacheln mehr.
- Gesendete Einreichungen stehen unter Bibliothek › Einreichungen als „In Prüfung“ statt als „nicht gesendet“.
- „Zum Prüfen einreichen“ bei Meine Produkte hat einen funktionierenden Pfeil zurück, schließt sich nach dem Senden und bestätigt in der Liste, ob die Einreichung rausging. Ein Produkt in Prüfung lässt sich nicht ein zweites Mal einreichen.
- Ein Tipp auf ein Produkt unter Meine Produkte öffnet direkt das Bearbeiten-Formular. Unter Einreichungen steht jedes Produkt nur einmal, und eine Einreichung, die nicht rausging, heißt „Nicht gesendet“ mit einem Hinweis, wie du sie erneut sendest.
- Beim Einreichen eines Produkts, dessen Barcode schon existiert, sagt die App das jetzt und bietet an, das vorhandene Produkt zu öffnen.
- Eigene Produkte lassen sich ohne Barcode einreichen, und eine Änderung bleibt lokal gespeichert, auch wenn das Senden fehlschlägt.
- Im PDF-Export passen die Makro-Felder an Tagen mit Workouts, bis zu drei Workouts werden aufgelistet, lange Notizen bleiben in ihrem Feld, und das „kg“ überlappt nicht mehr den obersten Gewichtswert.

Das komplette Changelog findest du wie immer [hier](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Vielen Dank, dass du Intake nutzt.

Tobi
