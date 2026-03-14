import React, { useState, useEffect } from 'react';
import "./Teams-list.component.css";
import { useNavigate, useSearchParams } from 'react-router-dom';

function TeamsList() {
    const [teams, setTeams] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const leagueId = searchParams.get('leagueId');
    const isAuthenticated = !!localStorage.getItem("JWT");

    useEffect(() => {
        const fetchTeams = async () => {
            if (!leagueId) return;

            try {
                const response = await fetch(
                    `/api/v1/json/3/lookup_all_teams.php?id=${leagueId}`
                );
                const data = await response.json();

                if (data && data.teams) {
                    setTeams(data.teams.map(team => ({
                        name: team.strTeam,
                        logo: team.strBadge,
                        id: team.idTeam,
                    })));
                } else {
                    setTeams([]);
                }
            } catch (error) {
                setTeams([]);
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
        navigate(`/teams/${teamId}?leagueId=${encodeURIComponent(leagueId)}`);
    };

    return (
        <div className="container">
            {teams.length > 0 ? (
                teams.map((team) => (
                    <div className="item" key={team.id}>
                        <div className="teamInfo" onClick={() => navigateTeam(team.id)}>
                            <h2 className="teamName">{team.name}</h2>
                            <img src={team.logo} alt={team.name} width="100" />
                        </div>

                        {isAuthenticated && (
                            <i
                                className={`fas fa-star favoriteStar ${favorites.includes(team.id) ? 'active' : ''}`}
                                onClick={() => toggleFavorite(team.id)}
                            ></i>
                        )}
                    </div>
                ))
            ) : (
                <p>Laden van teams...</p>
            )}
        </div>
    );
}

export default TeamsList;

