// src/Components/TeamsList/Teams-list.component.js
import React, { useState, useEffect } from 'react';
import "./Teams-list.component.css";
import { useNavigate, useSearchParams } from 'react-router-dom';

function TeamsList() {
    const [teams, setTeams] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const leagueId = searchParams.get('leagueId');

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=' + leagueId);
                const data = await response.json();

                setTeams(data.teams?.map(team => ({
                    name: team.strTeam,
                    logo: team.strBadge,
                    id: team.idTeam,
                })));
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchTeams();
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteTeams")) || [];
        setFavorites(storedFavorites);
    }, [leagueId]);

    const toggleFavorite = (teamId) => {
        const updated = favorites.includes(teamId)
            ? favorites.filter(id => id !== teamId)
            : [...favorites, teamId];
        setFavorites(updated);
        localStorage.setItem("favoriteTeams", JSON.stringify(updated));
    };

    const navigateTeam = (teamId) => {
        navigate(`/teams/${teamId}`);
    };
    return (
        <div className="container">
            {teams?.map((team) => (
                <div className="item" key={team.id}>
                    <div className="teamInfo" onClick={() => navigateTeam(team.id)}>
                        <h2 className="teamName">{team.name}</h2>
                        <img src={team.logo} alt={team.name} width="100"/>
                    </div>
                    <i
                        className={`fas fa-star favoriteStar ${favorites.includes(team.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(team.id)}
                        title="Markeer als favoriet"
                    ></i>
                </div>
            ))}
        </div>

    );
}

export default TeamsList;
