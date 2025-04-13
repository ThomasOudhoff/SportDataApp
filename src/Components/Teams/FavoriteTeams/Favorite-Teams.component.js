
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Favorite-Teams.component.css";

function FavoriteTeams() {
    // State: lijst van favoriete teams uit localStorage
    const [favoriteTeams, setFavoriteTeams] = useState([]);

    // State: resultaten (laatste wedstrijden) per team
    const [results, setResults] = useState({});

    // State: teamdetails zoals naam en logo
    const [teamDetails, setTeamDetails] = useState({});

    // Ophalen van data bij laden van de component
    useEffect(() => {
        // Haal favorieten op uit localStorage
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteTeams")) || [];
        setFavoriteTeams(storedFavorites);

        const fetchData = async () => {
            const allResults = {};
            const allDetails = {};

            for (let teamId of storedFavorites) {
                try {
                    // Haal laatste wedstrijden op
                    const resultRes = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${teamId}`);
                    const resultData = await resultRes.json();
                    allResults[teamId] = resultData.results || [];

                    // Haal teamgegevens op (naam en logo)
                    const teamRes = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id=${teamId}`);
                    const teamData = await teamRes.json();
                    const team = teamData.teams?.[0];
                    if (team) {
                        allDetails[teamId] = {
                            name: team.strTeam,
                            logo: team.strBadge
                        };
                    }
                } catch (err) {
                    console.error("Fout bij ophalen data:", err);
                }
            }

            // Sla alle resultaten en details op in state
            setResults(allResults);
            setTeamDetails(allDetails);
        };

        // Start het ophalen van data als er favorieten zijn
        if (storedFavorites.length > 0) {
            fetchData();
        }
    }, []);

    // Bepaal de vorm (W/G/V) van de laatste 5 wedstrijden
    const getForm = (teamId) => {
        const matches = results[teamId] || [];
        const teamName = teamDetails[teamId]?.name || "";

        return matches.slice(0, 5).map((match) => {
            const isHome = match.strHomeTeam === teamName;
            const homeScore = parseInt(match.intHomeScore);
            const awayScore = parseInt(match.intAwayScore);

            if (isNaN(homeScore) || isNaN(awayScore)) return 'N'; // N = onbekend
            if (homeScore === awayScore) return 'G'; // Gelijkspel
            const didWin = (isHome && homeScore > awayScore) || (!isHome && awayScore > homeScore);
            return didWin ? 'W' : 'V'; // Win of Verlies
        });
    };

    // Verwijder een team uit de favorieten
    const handleRemoveFavorite = (teamId, teamName) => {
        const confirm = window.confirm(`Weet je zeker dat je ${teamName} uit je favorieten wilt verwijderen?`);
        if (confirm) {
            const updatedFavorites = favoriteTeams.filter(id => id !== teamId);
            localStorage.setItem("favoriteTeams", JSON.stringify(updatedFavorites));
            setFavoriteTeams(updatedFavorites);
        }
    };
    return (
        <div className="pageLayout favorites-layout">
            <div className="leftPanel favorites-panel">
                <h1>Mijn Favoriete Teams</h1>

                <div className="favorites-wrapper">
                    {favoriteTeams.length === 0 ? (
                        <p>
                            Je hebt nog geen favoriete teams toegevoegd.{" "}
                            <Link to="/">Ga naar de homepagina</Link> en kies vanuit je favorieten competitie je
                            favorieten teams om te volgen markeren.
                        </p>
                    ) : (
                        favoriteTeams.map((teamId) => (
                            <div key={teamId} className="team-row">
                                {/* Teamlogo en naam (klikbaar) */}
                                <div className="team-left">
                                    <img
                                        src={teamDetails[teamId]?.logo}
                                        alt={teamDetails[teamId]?.name}
                                        className="team-logo"
                                    />
                                    <Link to={`/teams/${teamId}`} className="team-name">
                                        {teamDetails[teamId]?.name}
                                    </Link>
                                </div>

                                {/* Laatste 5 resultaten */}
                                <div className="form">
                                    {getForm(teamId).map((result, idx) => (
                                        <span key={idx} className={`form-block ${result}`}>
                                    {result}
                                </span>
                                    ))}
                                </div>

                                {/* Ster om team uit favorieten te verwijderen */}
                                <i
                                    className="fas fa-star favorite-star"
                                    title="Verwijder uit favorieten"
                                    onClick={() => handleRemoveFavorite(teamId, teamDetails[teamId]?.name)}
                                ></i>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default FavoriteTeams;




