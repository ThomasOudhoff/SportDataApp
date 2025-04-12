# ⚽ SportData App

Volg jouw favoriete voetbalteams — altijd en overal. Deze React-applicatie maakt gebruik van [TheSportsDB API](https://www.thesportsdb.com) om live data op te halen zoals teaminformatie, wedstrijden en standen.

![Homepagina](./src/Screenshots/Home/Screenshot Frondend.png)
![TeamsDetails](./src/Screenshots/TeamsDetails/Screenshot Frondend(3).png)
![TeamsList](./src/Screenshots/TeamsList/Screenshot Frondend(2).png)

---

## 📦 Benodigdheden

- Node.js (v16 of hoger)
- NPM of Yarn
- IDE zoals WebStorm of VS Code

---

## 🚀 Installatie

1. **Kloon de repository**
   ```bash
   git clone https://github.com/jouw-gebruikersnaam/sport-data-app.git
   ```

2. **Ga naar de map**
   ```bash
   cd sport-data-app
   ```

3. **Installeer de dependencies**
   ```bash
   npm install
   ```

4. **Start de applicatie**
   ```bash
   npm start
   ```

De app draait nu op `http://localhost:3000`.

---

## 👥 Testgebruikers

| Gebruikersnaam | Wachtwoord |
|----------------|------------|
| `demo1`        | `test123`  |
| `fan2024`      | `voetbal!` |

Deze gebruikers kun je gebruiken om de applicatie te testen.

---

## 🧩 Gebruikte technologieën

- React (met `useState`, `useEffect`, routing via React Router)
- TheSportsDB API
- Custom styling met CSS
- LocalStorage voor favorieten
- JWT-authenticatie

---

## 💡 Overige scripts

| Commando         | Omschrijving                       |
|------------------|------------------------------------|
| `npm run build`  | Bouw een productieversie van de app |
| `npm run lint`   | Voer een linter uit (indien ingesteld) |
| `npm test`       | Voer eventuele tests uit           |

---

## 📂 Structuur

```
src/
├── Components/
│   ├── Auth/
│   ├── Events/
│   ├── Footer/
│   ├── Home/
│   ├── Leagues/
│   ├── NavBar/
│   ├── SearchBar/
│   ├── Teams/
├── App.js
├── index.js
```

---

## 📝 Opmerkingen

- Zorg dat je API-sleutels zoals `X-Api-Key` **niet commit** naar GitHub.
- Favoriete teams worden opgeslagen in `localStorage`.
- Alleen de My Teams-pagina is beveiligd met JWT.

---

> Gemaakt als **Eindopdracht Frontend** Novi Hogeschool.