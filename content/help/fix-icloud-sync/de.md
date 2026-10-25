---
id: fix-icloud-sync
title: "iCloud-Sync reparieren"
short: "Fehlt etwas auf einem deiner Geräte, tippe in den iCloud-Einstellungen von Intake auf „Jetzt synchronisieren“. Hilft das nicht, gleicht „Alle Geräte neu abgleichen“ alles noch einmal ab, ohne etwas zu löschen."
related:
  - icloud-sync
  - delete-icloud-data
  - sync-between-devices
steps:
  - text: "Tippe auf Heute oben auf das Zahnrad und dann auf „iCloud-Sync“."
    ios:
      image: ./assets/de/ios/1.webp
  - text: "Tippe auf „Jetzt synchronisieren“. Daneben siehst du, wann zuletzt abgeglichen wurde."
    ios:
      image: ./assets/de/ios/2.webp
  - text: "Fehlt danach noch etwas, tippe auf „Alle Geräte neu abgleichen“ und bestätige."
    ios:
      image: ./assets/de/ios/3.webp
  - text: "Zur Sicherheit speichert „iCloud-Backup exportieren“ deine Daten in einer Datei."
    ios:
      image: ./assets/de/ios/4.webp
---

„Alle Geräte neu abgleichen“ schickt alles von diesem Gerät noch einmal an iCloud. Dafür brauchen alle deine Geräte Intake 2.7.4 oder neuer. Gelöscht wird nichts.

„Aus iCloud laden (Wiederherstellung)“ holt die neuesten Daten aus iCloud auf dieses Gerät. „iCloud-Backup importieren“ liest eine exportierte Datei wieder ein, neuere Daten auf dem Gerät bleiben dabei erhalten.

Steht dort „Kein iCloud-Konto angemeldet.“, melde dich in den Einstellungen deines iPhones bei iCloud an.
