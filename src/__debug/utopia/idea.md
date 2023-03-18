

- tout est signé électroniquement
- rien n'est effacé => notion de version

---

### Outils

- FaunaDB: db graphql distribuée https://fauna.com/
- deno deploy: https://deno.com/deploy/docs/examples

### Compte citoyen

Partie la plus sensible et qui doit être la mieux gérée !

Unique par citoyen (doit être vérifié par un passeport par exemple)

Plusieurs levels de clef:

"level-0": unique - ECDSA

Définit l'identifiant premier de l'utilisateur.
C'est la paire de clef la plus sensible !
La clef privée doit être uniquement connue de l'utilisateur et doit entre sauvegardée de façon offline
(ex: papier, carte RFID, etc...) et de manière très sécurisée.
Elle ne doit être utilisée qu'en tout dernier recourt, pour bloquer définitivement un compte et ne sert à rien d'autre que ça.
Crée et signe la clef "level-1".

"level-1": unique - ECDSA

Cette paire sert à signer et générer d'autres paires de clef ("level-2").
C'est une information sensible qui doit être connue seulement de l'utilisateur et devrait être stockée sur un device indépendant (ex: clef USB, papier, etc...)
Peut être révoquée par "level-0".

"level-2": multiple

Ces paires servent pour tout autres usages:

- login
- signature
- etc...

Comme toutes les clefs, elles sont sensibles, mais peuvent être sauvegardées sur l'ordinateur de l'utilisateur ou via un questionnaire de mdp.

Elles peuvent être révoquées par "level-1", ou "level-2"

---

Questions:

- que faire en cas de perte de la clef privée ?
- que faire en cas de compromission/vol de la clef privée ?
- que faire si l'utilisateur souhaite totalement quitter le system ?
=> approche cryptomonnaies => on ne fait rien
  - ne rien faire semble non optimale
=> peut être une notion de "self-exile" 
  - on peut activer un flag une fois, qui désactive définitivement un compte via une signature de clef privée ("level-0").


---


### Doléance

- j'aimerais bien... (ex: un dos d'âne pour ralentir les voitures)


### Projet

- type: "pour/contre", "budget", "aménagement", etc...
- titre, description, auteur, sources ou articles en rapport
- peut avoir plusieurs Votes (définis plus tard)
- a un "score interne" d'activité qui le rend plus ou moins visible

### Commentaire

- auteur
- date
- message
- supporte des sources telles que: lien, fichiers, images, videos.
- modifiable avec historique (flag "delete" et editable avec version)
- lié à un projet

### Vote

- a une date de début et une date de fin
- a un algorithm de score (public)
- concerne un projet
- peut être vérifié par n'importe qui

### Algorithme de score
