# KongressApp

## Nutzen
Diese Applikation soll bei als Hilfsmittel an Kongressen dienen. Besucher sollen kleine Nebenvorteile erhalten wie Einsicht in das Programm, die Sprecher sowie die Sponsoren. 
Die Grundabsicht ist es jedoch, dass sie pro Vorlesung Fragen anonym per Smartphone einsenden können. 
So muss man nicht mehr aufhalten und auf das Mikrofon warten. So kann wärend der Vorlesung Zeit gewonnen werden. 
Auch können Fragen noch von der Moderation im Nachhinein beantwortet werden und die Besucher können diese online abrufen. 

### Administration
Die Administration erhält einen eigenen Benutzernamen mit Passwort. 
Zurzeit stehen dem Admin drei Seiten zur Auswahl: 
```
/admin_program /admin_speaker /admin_sponsor
```
#### Sponsoren
Im Bereich Sponsoren werden die Kongresssponsoren erfasst. Mann kan ihnen unteranderem ein Logo zuweisen, und wie lange dies angezeigt werden soll. 
So besteht die Möglichkeit, wichtigen Sponsoren mehr Anzeigezeit zugeben, als kleineren Sponsoren. 
#### Sprecher
Bei den Speakern kann man die einzelnen Speaker erfassen. Die Benutzer können so zusätzliche Information über die Sprecher einholen; 
wie beispielsweise eine kurze Beschreibung oder Kontaktdaten. 
#### Programm
Hier werden die einzelnen Events erfasst. Sie erhalten einen Titel, eine Referenz (dies dient für einen möglichst kurzen URL für die Besucher), 
einen Sprecher, einen Raum sowie Start- und Endzeit.

### Moderation
Die Moderation hat ebenfalls einen eigenen Zugang zum Backend. Die bewegt sich primär auf der Seite */keynote_mod/EVENT*.
Von daaus hat sie automatisch Zugriff auf das Keynote-Tab sowie das Q&A-Tab. 
#### Menü
In der Menüleiste hat die Moderation die Möglichkeit, die Session für Fragen zu starten und wieder zu beenden. 
Benutzer können nur Fragen einreichen, wenn die Session gestartet ist. Ihnen wird das Event dann als *live* gelistet. 
Zusätzlich sind in der Menüleiste die beiden obig angesprochenen Tabs verlinkt. 
#### Status
Es gibt vier verschiedene Bereiche für Fragen. 
* New: hier kommen alle neuen Fragen automatisch hin. Fragen können - einst hier rausbewegt - nicht mehr hier hin zurück kehren. 
* Nice: Fragen, die als gut befunden wurden, kommen in diesen Puffer-Bereich. Alle Fragen, die im Nachhinein beantwortet werden wollen, müssen in diesem Bereich gelistet sein. 
* Live: alle hier gelisteten Fragen werden auf der Keynote-Slide angezeigt. 
* Crap: erledigte oder aussortierte Fragen können hierhin bewegt werden. Es besteht die Möglichkeit, Fragen aus diesem Bereich wieder zurückzuholen. 

### Benutzersicht 
Der Benutzer hat Einsicht in die Sponsoren, die Speaker, das Programm - wo er Favoriten setzen kann und sich Events als iCal-Dateien herunterladen kann, 
um sich Benachrichtigungen einzurichten - und alle Live-Events, worüber er direkt in den Ask-Bereich gelangt. 

Für ein möglichst benutzerfreundliches Erlebnis, um einfach eine Frage einzureichen ist der Workflow wie folgt: 
Auf der Keynote-Slide wird ein kurzer URL angezeigt, wie ein Benutzer eine Frage einreichen kann. 
Dieser übernimmt der Besucher in seinem Gerät und kann direkt eine Frage eintippen und absenden. Er braucht auf diesem Weg keine der 
Menüpunkte zu verwenden. 

## Meteor Aufbau
### Technologien
Mit Meteor wird für die Datenbank MongoDB verwendet und für die Templates Blaze. 

### Dateistruktur
Die Templates des Client-Bereichs wurden ebenfalls in die drei Hauptbereiche Admin, Moderation und Benutzer aufgeteilt. 
Die jeweiligen HTML, JS und Less-Files erhalten ebenfalls eigene Unterordner, für eine bessere Übersicht. 
Die Collections sind im Import-Bereich und werden vom Server und Client je nach Bedarf importiert. 
Jede Collection besitzt ein Schema, welches sozusagen die Klassenvariabeln definiert. 

### Installierte Pakete 
Eine Liste der von Meteor automatisch installierten Pakete sowie der zusätzlichen gibt es unter *.meteor/packages* einzusehen. 

## Installation einrichten 
* Ein üblicher Git-Pull vom Rep. => ins Verzeichnis wechseln 
* Falls Meteor noch nicht installiert: *curl https://install.meteor.com/ | sh* (macOS)
* Meteor lokal ausführen: *meteor*
* Die Applikation kann nun über *http://localhost:3000* aufgerufen werden
