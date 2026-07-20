# File-O-Mat / Evaluate File Formats

Dieses Skript stellt eine Reihe von Fragen, die dabei helfen, Dateiformate auf ihre Eignung zur Langzeitverfügbarkeit zu evaluieren.

Der Fragenkatalog und die Gewichtungen sind einem bash-Skript von Andreas Romeyke/[SLUB Dresden](https://git.slub-dresden.de/digital-preservation/judge_fileformats) übernommen. 

Die Web-Applikation basiert auf Mat-O-Wahl von Mathias Steudtner ([Webseite](https://www.mat-o-wahl.de/)/ [GitHub](https://github.com/msteudtn/Mat-O-Wahl)).

Es werden weder Datenbank noch PHP benötigt. Sämtliche Eingaben gehen nach Verlassen der Seite verloren.

Der Fragenkatalog liegt in Form einer Tabelle bei und kann mit jedem Textverarbeitungsprogramm leicht an eigene Bedürfnisse angepasst werden.

## Lokales Starten der Applikation

```
cd {Verzeichnis}
python3 -m http.server 8002
```

Dann im Browser [http://localhost:8002/](http://localhost:8002/) aufrufen.


- - - 


## Voraussetzungen
- einfacher Webspace
- Wissen, wie man eine Textdatei und/oder eine Tabellenkalkulation öffnet
- kein PHP oder Datenbank benötigt
- kein npm, yarn oder eine andere Paketverwaltung benötigt

## DSGVO
- Alle Daten werden innerhalb des Browsers der Nutzenden verarbeitet.
- Keine Datenerhebung auf dem Server (Ausnahme: Je nach Konfiguration Erfassung der Zugriffe durch den Webhosting-Anbieter, z.B. IP-Adresse und Uhrzeit).
- Kein Aufruf von externen Dateien (z.B. Content Delivery Network / CDN, Bootstrap, jQuery). Alle benötigten Komponenten sind eingebettet und lokal verfügbar.

## Lizenz
- GPL 3
- Quellcode, Lizenz und größere Änderungen müssen kenntlich gemacht werden.
- Änderungen, Weitergabe, sowie kommerzielle und private Nutzung erlaubt.
- Keine Garantie für Softwareschäden. 
