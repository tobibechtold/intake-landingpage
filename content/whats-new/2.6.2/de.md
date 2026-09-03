---
version: "2.6.2"
publishedAt: "2026-09-02"
title: "Was ist neu in Intake 2.6.2"
summary: "Ein neuer Button löscht deine Intake-Daten in iCloud, und das Einreichen zur Prüfung funktioniert wieder, auch aus der Bibliothek. Dazu: keine Freezes mehr beim Scannen mehrerer Produkte nacheinander, Schlagwörter überstehen die tägliche Aktualisierung der Bibliothek, Health füllt den Geburtstag aus. Auf Android: lesbares Wasser-Widget, ehrliche Einreichungen, passende PDF-Felder"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: Neu: iCloud-Daten löschen, ein Button in den iCloud-Einstellungen"
  - "iOS: Mehrere Produkte nacheinander zu scannen friert den Produktbildschirm nicht mehr ein"
  - "iOS: Zur Prüfung einreichen geht aus der Bibliothek, mit Label-Scanner, Option ohne Barcode und einer Liste, was noch fehlt"
  - "iOS: Ein eigenes Produkt einzureichen verdoppelt es nicht mehr, und es steht unter Einreichungen"
  - "iOS: Schlagwörter verschwinden nicht mehr nach der täglichen Aktualisierung der Bibliothek"
  - "iOS: Ausgeblendete häufige Lebensmittel und entfernte Favoriten kommen nicht mehr zurück"
  - "iOS: Das Onboarding übernimmt Geburtsdatum und Geschlecht wirklich aus Health"
  - "iOS: Keine Freezes mehr beim Wechsel zwischen Intake und Health"
  - "iOS: Die Abfrage beim Zurücksetzen sagt, dass iCloud-Daten bleiben, und wo du sie löschst"
  - "iOS: Enthält alle Fehlerbehebungen aus 2.6.1"
  - "Android: Das Wasser-Widget bleibt bei jedem Füllstand lesbar"
  - "Android: Gesendete Einreichungen stehen als „In Prüfung“, nicht als „nicht gesendet“"
  - "Android: Die Makro-Felder im PDF-Export passen auch an Tagen mit Workouts"
  - "Android: Zum Prüfen einreichen bei Meine Produkte schließt sich nach dem Senden und lässt sich abbrechen"
---

## Neu: iCloud-Daten löschen

In den iCloud-Einstellungen gibt es jetzt einen Button „iCloud-Daten löschen“. Er entfernt alles, was Intake in iCloud gespeichert hat: Profil, Tagebuch, Bibliothek, Rezepte, Produkte und Körpermaße. Die Daten auf deinem Gerät bleiben, und die iCloud-Synchronisierung wird ausgeschaltet, damit nichts erneut hochgeladen wird. Andere Geräte behalten ihre eigenen Kopien; wenn dort die Synchronisierung an ist, laden sie ihre Daten wieder hoch.

Der Button ist bewusst vom Zurücksetzen getrennt: Zurücksetzen leert nur dieses Gerät und sagt das jetzt auch so. Wer beides will, tippt zweimal.

## Mehrere Produkte nacheinander scannen

Ein Nutzer schrieb: Seit 2.6.1 blieben nach dem Scannen mehrerer Zutaten hintereinander die Buttons auf dem Produktbildschirm tot. Die Menge ließ sich nicht ändern, der Haken tat nichts, und nach ein paar Sekunden schloss sich der Bildschirm von selbst. Ich konnte es nach vier oder fünf Scans desselben Produkts nachstellen.

Die Ursache war nicht der Scanner. Jedes Speichern nach einem Scan schrieb die Bibliothek mehrmals auf dem Hauptthread, und ab dem dritten oder vierten Produkt stauten sich diese Schreibvorgänge, bis der Bildschirm auf keinen Tipp mehr reagieren konnte. Das Speichern läuft jetzt im Hintergrund, ein Schreibvorgang nach dem anderen, und der Bildschirm bleibt bedienbar, egal wie viele Produkte du scannst.

### iOS

- Mehrere Produkte nacheinander zu scannen konnte den Produktbildschirm sekundenlang einfrieren oder von selbst schließen. Das Speichern läuft jetzt im Hintergrund, der Bildschirm bleibt bedienbar.

## Zur Prüfung einreichen, neu gebaut

Das Einreichen eines Produkts zur Prüfung war gleich an mehreren Stellen kaputt, und aufgefallen ist es mir beim Testen genau dieser Version. Ein Produkt aus der Bibliothek anzulegen hatte keinen Nährwertlabel-Scanner, keinen Weg zum Einreichen und keine Option „ohne Barcode“. Ein eigenes Produkt mit einem Barcode einzureichen, den es schon gibt, hinterließ eine zweite Kopie in Meine Produkte und nichts unter Einreichungen. Und der Haken war einfach grau, ohne zu sagen, was fehlt.

All das ist behoben. Das Produktformular ist jetzt überall dasselbe und sagt dir direkt unter dem Feld, was eine Einreichung noch braucht.

### iOS

- Lege ein Produkt in der Bibliothek an und reiche es aus demselben Formular ein, mit Nährwertlabel-Scanner und einer Option „ohne Barcode“.
- Das Formular listet vor dem Senden auf, was noch fehlt, Name, Barcode oder Marke, direkt dort, wo du es ausfüllst, statt eines grauen Hakens.
- Ein Barcode, der schon in der Datenbank ist, erzeugt kein Duplikat mehr. Die App sagt es dir und öffnet stattdessen dieses Produkt zum Eintragen.
- Ein eigenes Produkt einzureichen hinterließ bisher eine zweite Kopie in Meine Produkte und nichts unter Einreichungen. Jetzt bleibt es ein Produkt, steht mit Status unter Einreichungen, und das Formular sagt dir, wenn das Senden fehlschlägt.
- Ein Produkt, das schon in Prüfung ist, lässt sich nicht ein zweites Mal einreichen. Das Formular zeigt „Prüfung ausstehend“ statt des Schalters, und das Menü in Meine Produkte lässt „Zur Prüfung einreichen“ weg, bis die Prüfung abgeschlossen ist.
- „Erstellen“ im Essen-hinzufügen-Sheet trug das Produkt ein, leerte das Formular und blieb dann stehen. Jetzt geht es nach dem Eintragen zurück zum Essen-hinzufügen-Bildschirm.

## Schlagwörter bleiben

Ein Nutzer hat gemeldet, dass alle seine Schlagwörter innerhalb von zwei Tagen zweimal verschwunden sind. Sein Debug-Log hat die Ursache gezeigt: Einmal am Tag gleicht Intake deine gespeicherten Lebensmittel mit der Datenbank ab, damit korrigierte Nährwerte bei dir ankommen. Dabei hat die App die Liste neu geschrieben und die Schlagwörter nicht mitgenommen. Dasselbe galt für häufige Lebensmittel, die du ausgeblendet hast, und für entfernte Favoriten: Nach dem Abgleich waren sie wieder da.

Alle drei überstehen den Abgleich jetzt. Wenn du davon betroffen warst, tut mir das leid. Verlorene Schlagwörter kann die App leider nicht wiederherstellen, sie liegen nur auf deinem Gerät.

### iOS

- Schlagwörter an deinen Lebensmitteln konnten nach der täglichen Aktualisierung der Bibliothek verschwinden. Sie bleiben jetzt erhalten.
- Ausgeblendete häufige Lebensmittel und entfernte Favoriten kamen nach derselben Aktualisierung zurück. Auch sie bleiben jetzt so, wie du sie eingestellt hast.

## Drei weitere Fehler aus einem Testbericht

Ein anderer Nutzer hat Intake ein paar Tage lang gründlich mit Apple Health getestet und eine Liste geschickt. Drei Punkte daraus sind hier behoben, die größeren kommen in einem eigenen Update.

### iOS

- Das Onboarding fragte Health nach Geburtsdatum und Geschlecht, hatte aber nie die Berechtigung, sie zu lesen. Das Formular blieb deshalb bei einem Standard-Geburtsjahr. Jetzt fragt Intake beide Berechtigungen ab, und die Werte kommen an.
- Ein Wechsel zu Health und zurück konnte eine zweite Aktualisierung über die noch laufende erste legen. Bei vielen Tagebuchtagen fror die App dann für Sekunden ein. Jetzt läuft eine Aktualisierung nach der anderen.
- Die Abfrage beim Zurücksetzen versprach, auch die Daten in iCloud zu löschen. Das hat die App nie getan, die Daten kamen mit der nächsten Synchronisierung zurück. Die Abfrage sagt jetzt, was wirklich passiert: Dieses Gerät wird geleert, iCloud-Daten bleiben, und sie verweist auf den neuen Button in den iCloud-Einstellungen.

## Android: Wasser-Widget, Einreichungen und PDF-Export

Drei Meldungen aus dem Feature-Voting, alle drei aus 2.6.1 und alle drei hier behoben. Danke fürs Melden.

### Android

- Das Wasser-Widget ist wieder lesbar. Das Wasser war so hell und die Linie an der Oberfläche so weiß, dass die Zeile „3/7“ darin verschwand, sobald der Füllstand sie erreichte. Das Wasser ist jetzt ein kräftigerer Blauverlauf mit einer dezenten Oberfläche, wie auf iOS, und der weiße Text bleibt bei jedem Füllstand lesbar. Die Vorschau beim Hinzufügen zeigt außerdem keine Platzhalter mehr unter dem Text, und die Vorschau von „Mahlzeit schnell erfassen“ hat im Dark Mode jetzt dunkle Kacheln statt weißer mit unsichtbarer Schrift.
- Unter Bibliothek › Einreichungen stand eine gesendete Einreichung als „Nur auf diesem Gerät; nicht gesendet“. Der Katalog nennt eine eingegangene Einreichung „submitted“, die App kannte nur ihr eigenes „pending“ und hielt alles andere für nicht gesendet. Gesendete Einreichungen stehen jetzt als „In Prüfung“.
- „Zum Prüfen einreichen“ bei Meine Produkte öffnete ein Formular ohne Rückweg: Der Pfeil zurück tat nichts, und nach dem Senden blieb das Formular einfach stehen, obwohl die Einreichung längst unterwegs war. Das Formular hatte beim Öffnen den Bildschirm darunter entfernt, statt sich darüber zu legen. Jetzt führt der Pfeil zurück zur Liste, nach dem Senden schließt sich das Formular von selbst, und die Liste bestätigt, dass die Einreichung gesendet wurde, oder sagt, dass sie nur auf diesem Gerät geblieben ist. Solange eine Einreichung in Prüfung ist, steht das Produkt als „In Prüfung“ in der Liste und lässt sich nicht ein zweites Mal einreichen.
- Ein Tipp auf ein Produkt unter Meine Produkte öffnet jetzt direkt das Bearbeiten-Formular, ohne Einreichung. Unter Einreichungen steht jedes Produkt nur noch einmal, mit dem letzten Versuch, statt einmal pro Speichern. Und eine Einreichung, die nicht rausging, heißt jetzt „Nicht gesendet“ und sagt, wie du sie erneut einreichst, statt „Nur auf diesem Gerät“, was wie eine Ablehnung klang.
- Beim Einreichen eines Produkts, dessen Barcode schon in der Datenbank ist, passierte beim Speichern nichts. Jetzt sagt ein Dialog, dass das Produkt bereits existiert, mit „Produkt öffnen“ (öffnet den Logging-Bildschirm des vorhandenen Produkts) und „Weiter bearbeiten“.
- Ein eigenes Produkt, das du zum Bearbeiten geöffnet hast und dann zur Prüfung einreichst, wurde wie ein Katalogprodukt behandelt: Der Button „Dieses Produkt hat keinen Barcode“ fehlte, und wenn das Senden fehlschlug, war deine Änderung weg. Der Button ist jetzt da, und die Änderung bleibt in jedem Fall lokal gespeichert.
- Im PDF-Export waren die Makro-Felder an Tagen mit Aktivitäten zu niedrig, und die Werte ragten aus den Feldern. Die Übersicht wächst jetzt mit dem Workout-Feld, das bis zu drei Workouts zeigt statt stumm nur das erste. Beim Durchsehen des ganzen Berichts sind noch drei Kleinigkeiten mitgegangen: Lange Notizen laufen nicht mehr aus ihrem Feld, in der Gewichtsübersicht überlappt das „kg“ nicht mehr den obersten Wert, und die Datumsspalte heißt „Datum“ statt „Zeitraum“. Ein Tag ohne Mahlzeiten sagt jetzt genau das, statt „keine Daten im Zeitraum“.

## Falls du 2.6.1 oder 2.6.0 verpasst hast

2.6.2 enthält auf iOS auch alle Fehlerbehebungen aus 2.6.1: den leeren Bildschirm nach dem Barcode-Scan, springende Suchergebnisse, den Schalter zwischen Barcode und Essen scannen, unbekannte Barcodes als neues Produkt und Zehntelgramm in den Gewichtsfeldern. Die Details stehen unter [Was ist neu in Intake 2.6.1](/whats-new/2.6.1).

Und falls du direkt von 2.5 kommst: 2.6.0 war das größte Release seit langem, mit der neuen Bibliothek, dem neu aufgebauten Essen hinzufügen und Löffeln, Tassen und Gläsern als Einheiten. Die ganze Geschichte mit Screenshots findest du unter [Was ist neu in Intake 2.6.0](/whats-new/2.6.0).

Das komplette Changelog findest du wie immer [hier](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Vielen Dank, dass du Intake nutzt.

Tobi
