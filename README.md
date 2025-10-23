# Evenementvergunning Website - Gemeente Deurne

Een moderne, gebruiksvriendelijke website voor het aanvragen van evenementvergunningen in gemeente Deurne.

## Features

- **Interactieve vragenlijst**: Helpt gebruikers bepalen welke vergunning ze nodig hebben
- **Uitgebreide checklist**: Ondersteunt bij het voorbereiden van de aanvraag
- **Responsive design**: Werkt op alle apparaten
- **Cloudflare Pages ready**: Eenvoudig te deployen naar Cloudflare

## Lokale ontwikkeling

1. Clone of download deze repository
2. Open `index.html` in uw browser
3. Of serveer de bestanden via een lokale server:
   ```bash
   # Met Python
   python -m http.server 8000
   
   # Met Node.js
   npx serve .
   ```

## Deployment naar Cloudflare Pages

1. Push deze code naar een Git repository (GitHub, GitLab, etc.)
2. Ga naar [Cloudflare Pages](https://pages.cloudflare.com/)
3. Verbind uw repository
4. Stel de build settings in:
   - Build command: (laat leeg)
   - Build output directory: `/` (root directory)
5. Deploy!

## Bestandsstructuur

```
/
├── index.html          # Hoofdpagina
├── styles.css          # Stijlen
├── script.js           # JavaScript functionaliteit
├── _headers            # Cloudflare security headers
└── README.md           # Deze documentatie
```

## Functionaliteiten

### Vragenlijst
- 8 vragen over het evenement
- Dynamische voortgangsbalk
- Intelligente resultaatberekening
- Ondersteuning voor single en multiple choice vragen

### Checklist
- 4 categorieën met controlepunten
- Real-time voortgangsindicator
- Interactieve checkboxes
- Overzichtelijke categorisering

### Contact
- Contactformulier
- Gemeente contactgegevens
- Responsive layout

## Technische details

- **HTML5**: Semantische markup
- **CSS3**: Moderne styling met CSS Grid en Flexbox
- **Vanilla JavaScript**: Geen externe dependencies
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG 2.1 compliant
- **Performance**: Geoptimaliseerd voor snelheid

## Browser ondersteuning

- Chrome (laatste 2 versies)
- Firefox (laatste 2 versies)
- Safari (laatste 2 versies)
- Edge (laatste 2 versies)

## Licentie

© 2024 Gemeente Deurne. Alle rechten voorbehouden.
