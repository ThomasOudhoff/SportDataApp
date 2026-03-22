import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'; // Importeer Axios
import { useAuth } from "../../../Contexts/AuthContext";
import "./Favorite-Teams.component.css";

function FavoriteTeams() {
    const { favorites, toggleFavorite } = useAuth();
    const [results, setResults] = useState({});
    const [teamDetails, setTeamDetails] = useState({});

    useEffect(() => {
        const fetchSportsDbData = async (teamIds) => {
            try {
                const detailPromises = teamIds.map(async (teamId) => {
                    try {
                        const response = await axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id=${teamId}`);
                        const team = response.data.teams?.[0];
                        return {
                            teamId,
                            details: team ? { name: team.strTeam, logo: team.strBadge } : null
                        };
                    } catch (error) {
                        return { teamId, details: null };
                    }
                });

                const resultPromises = teamIds.map(async (teamId) => {
                    try {
                        const response = await axios.get(`https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${teamId}`);
                        return { teamId, results: response.data.results || [] };
                    } catch (error) {
                        return { teamId, results: [] };
                    }
                });

                const [detailResponses, resultResponses] = await Promise.all([
                    Promise.all(detailPromises),
                    Promise.all(resultPromises)
                ]);

                const allDetails = {};
                const allResults = {};

                detailResponses.forEach(({ teamId, details }) => {
                    if (details) allDetails[teamId] = details;
                });

                resultResponses.forEach(({ teamId, results }) => {
                    allResults[teamId] = results;
                });

                setTeamDetails(allDetails);
                setResults(allResults);
            } catch (err) {
                console.error("Fout bij ophalen SportsDB data met Axios:", err);
            }
        };

        if (favorites && favorites.length > 0) {
            fetchSportsDbData(favorites);
        }
    }, [favorites]);

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

    const handleRemoveFavorite = (teamId, teamName) => {
        const confirm = window.confirm(`Weet je zeker dat je ${teamName} wilt verwijderen?`);
        if (confirm) {
            toggleFavorite(teamId);
        }
    };

    return (
        <div className="pageLayout favorites-layout">
            <div className="leftPanel favorites-panel">
                <h1>Mijn Favoriete Teams</h1>
                <ul className="favorites-wrapper">
                    {favorites.length === 0 ? (
                        <p>Je hebt nog geen favoriete teams toegevoegd.</p>
                    ) : (
                        favorites.map((teamId) => (
                            <li key={teamId} className="team-row">
                                <div className="team-left">
                                    <img src={teamDetails[teamId]?.logo} alt="" className="team-logo" />
                                    <Link to={`/teams/${teamId}`} className="team-name">
                                        {teamDetails[teamId]?.name || "Laden..."}
                                    </Link>
                                </div>
                                <div className="form">
                                    {(getForm(teamId) || []).map((result, idx) => (
                                        <span key={idx} className={`form-block ${result}`}>{result}</span>
                                    ))}
                                </div>
                                <i
                                    className="fas fa-star favorite-star active"
                                    onClick={() => handleRemoveFavorite(teamId, teamDetails[teamId]?.name)}
                                ></i>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default FavoriteTeams;

