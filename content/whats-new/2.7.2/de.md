---
version: "2.7.2"
publishedAt: "2026-09-29"
title: "Was ist neu in Intake 2.7.2"
summary: "Auf iOS bekommen Einträge, Produkte und Rezepte Fotos: oben auf der Seite, als kleines Bild auf Heute und über iCloud auf deinen anderen Geräten. Dazu ein Bericht, der sich lesen lässt, mit Markdown-Export für einen Chat mit einer KI, Portionen bis 0,01 g für Tabletten, Nährwerte pro Portion und sechs Fehlerbehebungen. Auf Android kommen dieselben Fotos, mit verschlüsselter Sicherung in deinem Google Drive, derselbe Bericht, Tabletten und Nährwerte pro Portion sowie neun Fehlerbehebungen"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: Fotos für Einträge, Produkte und Rezepte, auf Heute und über iCloud auf allen Geräten"
  - "iOS: Das Foto von „Essen scannen“ bleibt beim Eintrag und kommt beim erneuten Eintragen mit"
  - "iOS: Der PDF-Bericht im Hochformat, mit jedem Eintrag, dazu der Bericht als Markdown"
  - "iOS: Portionen bis 0,01 g für Tabletten und Kapseln"
  - "iOS: Nährwerte pro Portion eingeben, so wie sie auf der Packung stehen"
  - "iOS: Um Mitternacht geht Heute auf den neuen Tag weiter"
  - "iOS: Sperrbildschirm, Widgets und Siri tragen in die passende Mahlzeit ein"
  - "Android: Fotos für Einträge, Produkte und Rezepte, verschlüsselt in deinem Google-Drive-Backup"
  - "Android: Das Foto von „Mahlzeit scannen“ bleibt beim Eintrag"
  - "Android: Der neue PDF-Bericht und der Bericht als Markdown"
  - "Android: Portionen bis 0,01 g und Nährwerte pro Portion"
  - "Android: Heute geht zuverlässig auf den neuen Tag, die Widgets auch"
---

## Neu auf iOS: Fotos von deinem Essen

Jeder Eintrag, jedes eigene Produkt und jedes Rezept kann jetzt ein Foto haben. Tippe auf das Feld mit dem Foto-Symbol neben dem Namen und nimm ein Foto auf oder wähle eins aus deiner Mediathek. Für die Auswahl braucht Intake keinen Zugriff auf deine Mediathek, die Auswahl des Systems gibt nur das eine Foto weiter.

![Ein Rezept mit Foto](assets/photos-de.png)

**Oben auf der Seite.** Öffnest du ein Lebensmittel mit Foto, steht das Foto oben über die ganze Breite, die Leiste liegt darüber. Ziehst du die Seite nach unten, wird das Foto größer, ein Tipp zeigt es im Vollbild. Über den Kamera-Button unten rechts auf dem Foto tauschst du es aus oder entfernst es.

**Auf Heute.** Einträge mit Foto zeigen es als kleines Bild am Anfang der Zeile. Ein Eintrag zeigt sein eigenes Foto, sonst das Foto des Produkts oder Rezepts, aus dem er stammt. So reicht ein Foto am Produkt für jeden künftigen Eintrag.

**Essen scannen.** Das Foto, mit dem Intake AI eine Mahlzeit geschätzt hat, bleibt jetzt dauerhaft beim Eintrag. Trägst du dieselbe Mahlzeit später wieder aus „Häufig“ oder einem Vorschlag ein, kommt das Foto mit. Kopierst du eine Mahlzeit auf einen anderen Tag, nehmen die Einträge ihre Fotos mit.

**Rezepte.** Rezepte zeigen ihr Foto in der Liste und oben im Rezept. Teilst du ein Rezept als Datei, reist das Foto mit, und wer es öffnet, bekommt es gleich dazu.

**Teilen.** „Bild teilen“ startet mit dem Foto des Lebensmittels, wenn es eines gibt.

**Auf allen Geräten.** Mit iCloud-Synchronisierung kommen die Fotos auf deine anderen Geräte, jedes als eigener Eintrag in deiner privaten iCloud. Unter Einstellungen, iCloud-Sync, lässt sich das Synchronisieren der Fotos pro Gerät ausschalten. Die Fotos gehen nur in deine iCloud, an keinen Server von Intake.

**Einstellungen.** Unter Einstellungen, Darstellung, Fotos schaltest du Fotos ganz ab, zeigst sie nur, wenn du ein Lebensmittel öffnest, oder blendest sie bei einzeln eingetragenen Zutaten einer Schätzung ein. Ausgeschaltete Fotos bleiben gespeichert.

## Neu auf Android: Fotos von deinem Essen

Auch auf Android können Einträge, eigene Produkte und Rezepte jetzt ein Foto haben: oben auf der Seite, als kleines Bild auf Heute, bei „Mahlzeit scannen“, beim Kopieren einer Mahlzeit, in geteilten Rezepten und in „Bild teilen“, genau wie oben beschrieben. Für die Auswahl nutzt Intake die Fotoauswahl von Android, ohne Speicherberechtigung. Unter Einstellungen, Darstellung, Fotos findest du dieselben drei Schalter wie auf iOS.

**Im Google-Drive-Backup.** Statt über iCloud kommen deine Fotos über dein Google-Drive-Backup auf ein anderes Gerät. Sie werden mit deiner Backup-Passphrase verschlüsselt, bevor sie dein Gerät verlassen, und liegen nur in deinem eigenen Google Drive. Nach einer Wiederherstellung laden sie im Hintergrund nach. Unter Einstellungen, Backup, schaltest du „Fotos sichern“ aus, wenn nur deine Daten gesichert werden sollen.

**Wichtig bei mehreren Geräten.** Nutzt du dasselbe Google-Konto auf mehreren Android-Geräten, aktualisiere alle auf 2.7.2, bevor du dich auf das Sichern der Fotos verlässt. Ältere Versionen kennen die Fotos im Backup nicht und räumen sie weg.

## Ein Bericht, der sich lesen lässt

Der PDF-Export steht jetzt im Hochformat, mit jedem Eintrag jedes Tages, eigenen Makros pro Eintrag und den Summen vorne. Eine lange Mahlzeit geht auf der nächsten Seite mit ihrer Überschrift weiter, lange Namen stehen vollständig da, und alle Zahlen erscheinen im deutschen Format. Für einen Chat mit ChatGPT, Claude oder einer anderen KI gibt es denselben Bericht als Markdown. Auf Android genauso, unter Einstellungen, „PDF-Bericht exportieren“, „Für KI (Markdown)“.

## Tabletten und Nährwerte pro Portion

Portionen gehen bis 0,01 g hinunter, damit eine Tablette oder Kapsel ihr echtes Gewicht bekommt. Beim Anlegen eines Produkts kannst du die Werte jetzt pro Portion eingeben, pro Tablette oder pro Riegel, so wie sie auf der Packung stehen. Den Rest rechnet Intake aus. Beides gilt auf iOS und Android.

## Fehlerbehebungen

### iOS

- **Die Wochenleiste zeigt die richtigen Daten.** Nach dem Wischen zu einer anderen Woche blitzte in einer Zelle kurz das alte Datum auf. Die Daten der neuen Woche stehen jetzt sofort da.
- **Ein neuer Tag um Mitternacht.** Bleibt Intake über Mitternacht offen oder kommst du am nächsten Morgen zurück, geht Heute auf den neuen Tag weiter. Schaust du dir gerade einen älteren Tag an, bleibst du dort.
- **Schnelleinträge in Gramm.** Einen Schnelleintrag kannst du auf Gramm ändern, und er bleibt in Gramm, wenn du die Getränke-Option ausschaltest.
- **Die passende Mahlzeit aus Kurzbefehlen.** Sperrbildschirm, Widgets und Siri tragen in die Mahlzeit ein, die zur Tageszeit passt. Auf der Produktseite wählst du bei Bedarf eine andere.
- **Deine Änderungen in Häufig.** Bearbeitest du ein Produkt aus „Häufig“, zeigt die Liste deine Werte. Bereits eingetragene Einträge bleiben, wie sie sind.
- **Deine Mahlzeiten auf jedem Gerät.** Selbst angelegte Mahlzeiten bleiben auf allen deinen Geräten erhalten.

### Android

- **Ein neuer Tag, auch nach dem Aufwachen.** Kommst du am nächsten Morgen zurück, zeigt Heute sofort den neuen Tag, nicht erst nach einer Minute. Das Drehen des Geräts oder der Wechsel in den Dunkelmodus schickt dich nicht mehr von einem älteren Tag zurück auf heute, und die Widgets springen um Mitternacht auf den neuen Tag.
- **Das Widget trägt für heute ein.** Schnelles Eintragen aus dem Widget landet immer auf dem heutigen Tag.
- **Schnelleinträge bleiben, wie sie sind.** Ein unveränderter Schnelleintrag wird beim Speichern nicht mehr zu 1 g, und die Getränke-Option lässt die Menge unverändert.
- **Deine Änderungen in Favoriten und Häufig.** Bearbeitest du ein eigenes Produkt, zeigen Favoriten, Verlauf und Häufig deine neuen Werte. Bereits eingetragene Einträge bleiben, wie sie sind.
- **Tagesabhängige Ziele.** Die Auswahl „Anwenden als“ ist wieder lesbar, und eine einmalige Anpassung kommt auf Heute an, ohne dass du die tagesabhängigen Ziele erst selbst einschalten musst.
- **Kleine Nährstoffmengen.** Ein Wert wie 0,04 bei einem zusätzlichen Nährstoff wird beim erneuten Öffnen nicht mehr zu 0.
- **Produkte mit 0 kcal.** Wasser oder eine Vitamintablette lassen sich als eigenes Produkt speichern, auch ohne sie zur Prüfung einzureichen.
- **Vitamine in Vorschlägen.** Ein Vorschlag zeigt Vitamine und Mineralstoffe in der richtigen Menge. Bei kleinen Portionen wie einer Tablette standen dort bisher viel zu kleine Werte.
- **Eine Bestätigung aus jeder Liste.** Trägst du ein Rezept oder ein Lebensmittel aus Rezepte, Favoriten oder Häufig ein, siehst du jetzt die Bestätigung.

Das komplette Changelog findest du wie immer [hier](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Vielen Dank, dass du Intake nutzt.

Tobi
