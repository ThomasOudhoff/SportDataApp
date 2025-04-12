// src/Components/FavoriteTeams/Favorite-Teams.component.js
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import "./Favorite-Teams.component.css";

function FavoriteTeams() {
    const [favoriteTeams, setFavoriteTeams] = useState([]);
    const [results, setResults] = useState({});
    const [teamDetails, setTeamDetails] = useState({});
    console.log("Eerste team:", teamDetails[133601]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteTeams")) || [];
        setFavoriteTeams(storedFavorites);

        const fetchData = async () => {
            const allResults = {};
            const allDetails = {};

            for (let teamId of storedFavorites) {
                try {
                    const resultRes = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${teamId}`);
                    const resultData = await resultRes.json();
                    allResults[teamId] = resultData.results || [];

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

            setResults(allResults);
            setTeamDetails(allDetails);
        };

        if (storedFavorites.length > 0) {
            fetchData();
        }
    }, []);

    const getForm = (teamId) => {
        const matches = results[teamId] || [];
        const teamName = teamDetails[teamId]?.name || "";

        return matches.slice(0, 5).map((match) => {
            const isHome = match.strHomeTeam === teamName;
            const homeScore = parseInt(match.intHomeScore);
            const awayScore = parseInt(match.intAwayScore);

            if (isNaN(homeScore) || isNaN(awayScore)) return 'N';
            if (homeScore === awayScore) return 'G';
            const didWin = (isHome && homeScore > awayScore) || (!isHome && awayScore > homeScore);
            return didWin ? 'W' : 'V';
        });
    };
    const toggleFavorite = (teamId) => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteTeams")) || [];

        let updatedFavorites;
        if (storedFavorites.includes(teamId)) {
            updatedFavorites = storedFavorites.filter(id => id !== teamId);
        } else {
            updatedFavorites = [...storedFavorites, teamId];
        }

        localStorage.setItem("favoriteTeams", JSON.stringify(updatedFavorites));
        setFavoriteTeams(updatedFavorites);
    };
    const handleRemoveFavorite = (teamId, teamName) => {
        const confirm = window.confirm(`Weet je zeker dat je ${teamName} uit je favorieten wilt verwijderen?`);
        if (confirm) {
            const updatedFavorites = favoriteTeams.filter(id => id !== teamId);
            localStorage.setItem("favoriteTeams", JSON.stringify(updatedFavorites));
            setFavoriteTeams(updatedFavorites);
        }
    };return (
        <div className="pageLayout">
            <div className="leftPanel scrollableContent">
                <h1>Mijn Favoriete Teams</h1>

                <div className="favorites-wrapper">
                    {favoriteTeams.map((teamId) => (
                        <div key={teamId} className="team-row">
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

                            <div className="form">
                                {getForm(teamId).map((result, idx) => (
                                    <span key={idx} className={`form-block ${result}`}>
                            {result}
                            </span>
                                ))}
                            </div>

                            <i
                                className="fas fa-star favorite-star"
                                title="Verwijder uit favorieten"
                                onClick={() => handleRemoveFavorite(teamId, teamDetails[teamId]?.name)}
                            ></i>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FavoriteTeams;



