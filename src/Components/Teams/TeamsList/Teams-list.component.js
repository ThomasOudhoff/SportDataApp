import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Teams-list.component.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from "../../../Contexts/AuthContext";

function TeamsList() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { favorites, toggleFavorite, user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const leagueId = searchParams.get('leagueId');

    const isAuthenticated = !!user;

    useEffect(() => {
        let isMounted = true;
        const fetchTeams = async () => {
            if (!leagueId) return;

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `https://www.thesportsdb.com/api/v1/json/3/lookup_all_teams.php?id=${leagueId}`
                );

                if (isMounted && response.data && response.data.teams) {
                    setTeams(response.data.teams.map(team => ({
                        name: team.strTeam,
                        logo: team.strBadge,
                        id: team.idTeam,
                    })));
                }
            } catch (err) {
                if (isMounted) {
                    if (err.response && err.response.status === 429) {
                        setError("Te veel verzoeken. Wacht even een minuutje.");
                    } else {
                        setError("Er ging iets mis bij het ophalen van de teams.");
                    }
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchTeams();
        return () => { isMounted = false; };
    }, [leagueId]);

    const navigateTeam = (teamId) => {
        navigate(`/teams/${teamId}?leagueId=${encodeURIComponent(leagueId)}`);
    };

    if (loading) return <section className="loading-container"><p>Teams laden...</p></section>;
    if (error) return <section className="error-container"><p>{error}</p></section>;
    return (
        <main className="container">
            {loading && <p>Teams worden geladen...</p>}
            {error && <p className="error-message">{error}</p>}

            <ul className="teams-grid">
                {teams?.map((team) => (
                    <li className="item" key={team.id}>
                        <article className="teamInfo" onClick={() => navigateTeam(team.id)}>
                            <header>
                                <h2 className="teamName">{team.name}</h2>
                            </header>
                            <img src={team.logo} alt={`Logo van ${team.name}`} width="100" />
                        </article>

                        {isAuthenticated && (
                            <button
                                type="button"
                                className={`favorite-button ${favorites && favorites.includes(team.id) ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(team.id);
                                }}
                                aria-label={favorites.includes(team.id) ? "Verwijder uit favorieten" : "Voeg toe aan favorieten"}
                            >
                                <i className={`fas fa-star favoriteStar ${favorites && favorites.includes(team.id) ? 'active' : ''}`}></i>
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default TeamsList;