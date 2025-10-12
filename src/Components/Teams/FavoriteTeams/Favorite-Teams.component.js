
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Favorite-Teams.component.css";

function FavoriteTeams() {
    const [favoriteTeams, setFavoriteTeams] = useState([]);
    const [results, setResults] = useState({});
    const [teamDetails, setTeamDetails] = useState({});

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteTeams")) || [];
        setFavoriteTeams(storedFavorites);

        const fetchData = async () => {
            try {
                const resultPromises = storedFavorites.map(async (teamId) => {
                    try {
                        const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${teamId}`);
                        const data = await res.json();
                        return { teamId, results: data.results || [] };
                    } catch (error) {
                        console.error(`Fout bij ophalen van resultaten voor team ID ${teamId}:`, error);
                        return { teamId, results: [] };
                    }
                });

                const detailPromises = storedFavorites.map(async (teamId) => {
                    try {
                        const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id=${teamId}`);
                        const data = await res.json();
                        const team = data.teams?.[0];
                        return {
                            teamId,
                            details: team ? { name: team.strTeam, logo: team.strBadge } : null
                        };
                    } catch (error) {
                        console.error(`Fout bij ophalen van details voor team ID ${teamId}:`, error);
                        return { teamId, details: null };
                    }
                });


                const resultResponses = await Promise.all(resultPromises);
                const detailResponses = await Promise.all(detailPromises);

                const allResults = {};
                const allDetails = {};

                resultResponses.forEach(({ teamId, results }) => {
                    allResults[teamId] = results;
                });

                detailResponses.forEach(({ teamId, details }) => {
                    if (details) {
                        allDetails[teamId] = details;
                    }
                });

                setResults(allResults);
                setTeamDetails(allDetails);
            } catch (err) {
                console.error("Fout bij ophalen data:", err);
            }
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
                <ul className="favorites-wrapper">
                    {favoriteTeams.length === 0 ? (
                        <p>
                            Je hebt nog geen favoriete teams toegevoegd.{" "}
                            <Link to="/">Ga naar de homepagina</Link> en kies vanuit je favoriete competitie je
                            teams om te volgen.
                        </p>
                    ) : (
                        favoriteTeams.map((teamId) => (

                            <li key={teamId} className="team-row">
                                <div className="team-left">
                                    <img
                                        src={teamDetails[teamId]?.logo}
                                        alt={teamDetails[teamId]?.name}
                                        className="team-logo"
                                    />
                                    {teamDetails[teamId] == undefined ? (
                                        <p>Kon team niet laden...</p>
                                    ) : (
                                        <Link to={`/teams/${teamId}`} className="team-name">
                                            {teamDetails[teamId]?.name}
                                        </Link>
                                    )}
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
                            </li>

                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default FavoriteTeams;





