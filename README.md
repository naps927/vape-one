# Vape One Shop — site local

Site statique (HTML/CSS/JS, aucune dépendance). Ouvrir `index.html` dans un navigateur,
ou servir le dossier : `python -m http.server 4173`.

## Ce qu'il faut déposer (images)

| Fichier | État |
|---|---|
| `assets/img/logo.png` | À déposer. Tant qu'il est absent, le logo SVG (`logo.svg`) prend le relais automatiquement. |
| `assets/img/products/crown-bar-40k-strawberry-punch.webp` | En place, visuel fournisseur en pleine vignette. |
| `assets/img/products/curieux-oldies-70s-sunday-caramel.png` | En place, fond détouré. |
| `assets/img/shop/interieur.jpg` · `devanture.jpg` · `comptoir.jpg` | En place, galerie de la section « La boutique ». |
| `assets/img/products/crown-bar-sound-12k-mango-ice.webp` | En place, visuel fournisseur affiché en pleine vignette. |
| `assets/img/products/crown-bar-sound-12k-two-apple.webp` | En place, visuel fournisseur affiché en pleine vignette. |

Deux façons d'afficher une photo, selon l'image :

- **photo détourée** (fond transparent) : `image: '…'` seul → le produit flotte sur la vignette sombre ;
- **visuel avec son propre décor** : `image: '…', fit: 'cover'` → l'image remplit toute la vignette.

## Où modifier quoi

- **Numéro WhatsApp, adresse, e-mail, frais et seuil de livraison** : bloc `SHOP`
  en haut de `assets/js/products.js`.
- **Produits (prix, stock, saveurs, textes FR/AR)** : tableau `PRODUCTS` du même fichier.
  Pour ajouter une photo à un produit, ajoutez-lui une ligne
  `image: 'assets/img/products/mon-fichier.png'`.
- **Photos de la boutique et réseaux sociaux** : champs `photos`, `facebook`,
  `instagram`, `tiktok` du bloc `SHOP`. Un réseau laissé vide masque son icône ;
  si aucune photo ne charge, la section retombe sur la carte Google Maps.
- **Textes de l'interface (français et arabe)** : `assets/js/i18n.js`.
- **Couleurs et mise en page** : variables `:root` en haut de `assets/css/styles.css`.

## Fonctionnement

- Contrôle d'âge 18+ au premier accès (mémorisé dans le navigateur).
- Catalogue filtrable par catégorie, recherche et tri.
- Panier conservé d'une visite à l'autre ; le bouton « Commander sur WhatsApp »
  ouvre une conversation avec le détail de la commande et le total déjà rédigés.
- Livraison offerte à partir de 300 DH, sinon 35 DH.
- Bascule français / arabe avec passage complet en RTL.

## À vérifier avant mise en ligne

- Le prix du Crown Bar 15K (250 DH) et les stocks sont des valeurs à ajuster.
- Les pages « Mentions légales » et « Confidentialité » du pied de page sont à écrire.
