# Page Verbes — design

Date : 2026-10-06

## Objectif

Une page de fiches pour réviser les 30 verbes de `resource/verbes/verbes_1.pdf`
(feuille « 動詞 トレーニングA »). Même style et même usage (mobile d'abord) que
`fiches_kanji.html`.

## Périmètre

- Inclus : cartes à retourner, boutons Tout retourner / Réinitialiser / Mélanger,
  compteur, lien retour vers l'accueil, activation de la carte Verbes sur l'accueil.
- Exclus : filtres, quiz, romaji.

## Page `verbes.html`

- En-tête : sceau `動詞 ・ 復習`, titre « Verbes », sous-titre
  « Minna no Nihongo · Verbes », lien « ← Accueil » (même style que la page kanji).
- Boutons : Tout retourner, Réinitialiser, Mélanger (même comportement que la page kanji).
- Compteur : « 30 verbes ».
- Grille de cartes identique à la page kanji (retournement 3D au toucher).

### Devant de la carte

- Le dessin du verbe (`images/verbes/NN.jpg`).
- Le sens en français (ex. « acheter », « prendre (une photo) »).
- L'indication « toucher ».

### Dos de la carte

- Le groupe : « Groupe I », « Groupe II » ou « Groupe III ».
- Trois lignes étiquetées, en japonais avec furigana (`<ruby>`) sur chaque kanji :
  - `ます` — forme polie (ex. 買います)
  - `辞書` — forme dictionnaire (ex. 買う)
  - `て` — forme て (ex. 買って)
- Le complément éventuel de la feuille est affiché devant les formes, avec
  furigana : (写真を), (シャワーを), (電話を).

## Données

Tableau `VERBS` dans la page, une ligne par verbe :

```js
{n:2, g:1, fr:"acheter", obj:"", masu:"買[か]います", dict:"買[か]う", te:"買[か]って"}
```

- `n` : numéro du dessin sur la feuille (1–30), donne le fichier image.
- `g` : groupe (1, 2, 3).
- `obj` : complément optionnel, ex. `写真[しゃしん]を`.
- Notation des furigana : `漢字[よみ]` ; une fonction transforme chaque
  `X[y]` en `<ruby>X<rt>y</rt></ruby>`, où X est la suite de kanji
  qui précède immédiatement le crochet.

Les formes sont rédigées à partir des formes ます imprimées sur la feuille, pas des
réponses manuscrites (certaines sont erronées, ex. « おまる » pour 起きる).

## Dessins

- Extraits une fois du JPEG embarqué dans le PDF (3400×4679) par un script Python
  (Pillow) gardé hors du dépôt, dans le scratchpad.
- Recadrage à l'intérieur de chaque case, numéro compris ou exclu selon le rendu.
- Passage en niveaux de gris + contraste pour supprimer le fond rose.
- Largeur ~400 px, JPEG, nommés `images/verbes/01.jpg` … `30.jpg`.

## Accueil

Dans `index.html`, la carte Verbes devient un lien vers `verbes.html`
(sans badge « bientôt »).

## Le PDF source

`resource/` est ajouté à `.gitignore` : le scan complet reste en local et n'est pas
publié sur GitHub Pages. Seuls les dessins découpés le sont.

## Vérification

- Script node : le tableau `VERBS` se parse, contient 30 entrées, chaque
  `images/verbes/NN.jpg` existe.
- Relecture des 90 formes et de leurs furigana.
- Test dans Chrome (largeur mobile et bureau) : rendu des dessins et des furigana,
  retournement, Tout retourner / Réinitialiser / Mélanger, liens accueil ↔ verbes.
