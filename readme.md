# File-O-Mat
Dieses Skript stellt eine Reihe von Fragen, die dabei helfen, Dateiformate auf ihre Eignung zur Langzeitverfügbarkeit zu evaluieren.

Der Fragenkatalog und die Gewichtungen sind aus einem bash-Skript der [SLUB Dresden ](https://git.slub-dresden.de/digital-preservation/judge_fileformats)übernommen. 

Die Web-Applikation basiert auf Mat-O-Wahl von Mathias Steudtner  ([Webseite](https://www.mat-o-wahl.de/) / [GitHub](https://github.com/msteudtn/Mat-O-Wahl))

Es werden weder Datenbank noch PHP benötigt. Sämtliche Eingaben gehen nach Verlassen der Seite verloren.

## Lokales Starten der Applikation

```
cd {Verzeichnis}
python3 -m http.server 80
```

Dann im Browser [http://localhost/](http://localhost/) aufrufen.


- - - 
- - - 


## VORAUSSETZUNG

- ein bisschen **Webspace** (ein günstiges Shared-Hosting-Paket reicht vollkommen aus)
- **kein** PHP oder MySQL / MariaDB nötig (nur optional für Statistik)
- **kein** npm, yarn oder eine andere Paketverwaltung nötig
- Wissen, wie man eine **Textdatei** und/oder eine Tabellenkalkulation öffnet

## Mat-o-Wahl und DSGVO

- Alle **Verarbeitungen** passieren **innerhalb des Browsers** des Nutzers
- **keine Datenerhebung auf dem Server** (nur optional für eine Statistik - Ausnahme: Standardmäßige Erfassung der Zugriffe durch den Webhosting-Anbieter, z.B. IP-Adresse und Uhrzeit)
- kein Aufruf von externen Dateien (z.B. Content Delivery Network / CDN, Bootstrap, jQuery, kein Social Media-Plugin) - alles inklusive 

## LIZENZ

GPL 3 (siehe Verzeichnis /SYSTEM oder http://choosealicense.com/licenses/gpl-v3/)
- Quellcode, Lizenz und größere Änderungen müssen kenntlich gemacht werden.
- Änderungen, Weitergabe, sowie kommerzielle und private Nutzung erlaubt.
- Keine Garantie für Softwareschäden. 
