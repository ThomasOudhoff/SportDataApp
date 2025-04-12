// src/Components/TeamsList/Teams-list.component.js
import React, { useState, useEffect } from 'react';
import "./Teams-list.component.css";
import { useNavigate, useSearchParams } from 'react-router-dom';

function TeamsList() {
    // State: lijst met teams in de gekozen competitie
    const [teams, setTeams] = useState([]);

    // State: lijst met favorieten (uit localStorage)
    const [favorites, setFavorites] = useState([]);

    // Hook voor navigatie naar de detailpagina van een team
    const navigate = useNavigate();

    // Haal parameters op uit de URL (bijv. ?leagueId=Premier+League)
    const [searchParams] = useSearchParams();
    const leagueId = searchParams.get('leagueId');

    // Controleert of gebruiker is ingelogd
    const isAuthenticated = !!localStorage.getItem("JWT");


    // Laad teams op basis van de leagueId wanneer de component laadt of leagueId verandert
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(
                    'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=' + leagueId
                );
                const data = await response.json();

                // Sla teams op met alleen relevante info (naam, logo, ID)
                setTeams(data.teams?.map(team => ({
                    name: team.strTeam,
                    logo: team.strBadge,
                    id: team.idTeam,
                })));
            } catch (error) {
                console.error("Fout bij ophalen van teams:", error);
            }
        };

        fetchTeams();

        // Haal favorieten uit localStorage
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteTeams")) || [];
        setFavorites(storedFavorites);
    }, [leagueId]);

    // Voeg een team toe aan of verwijder uit favorieten
    const toggleFavorite = (teamId) => {
        const updated = favorites.includes(teamId)
            ? favorites.filter(id => id !== teamId) // verwijder als al favoriet
            : [...favorites, teamId]; // voeg toe als nieuw favoriet

        setFavorites(updated);
        localStorage.setItem("favoriteTeams", JSON.stringify(updated)); // opslaan in localStorage
    };

    // Navigeer naar de detailpagina van een specifiek team
    const navigateTeam = (teamId) => {
        navigate(`/teams/${teamId}`);
    };

    return (
        <div className="container">
            {/* Toon elk team als apart blok met naam, logo en ster-icoon */}
            {teams?.map((team) => (
                <div className="item" key={team.id}>
                    <div className="teamInfo" onClick={() => navigateTeam(team.id)}>
                        <h2 className="teamName">{team.name}</h2>
                        <img src={team.logo} alt={team.name} width="100" />
                    </div>

                    {/* Ster-icoon om team als favoriet aan/uit te vinken, alleen wanner gebruiker is ingelogd*/}
                    {isAuthenticated && (
                        <i
                            className={`fas fa-star favoriteStar ${favorites.includes(team.id) ? 'active' : ''}`}
                            onClick={() => toggleFavorite(team.id)}
                            title="Markeer als favoriet"
                        ></i>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TeamsList;

