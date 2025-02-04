import React, { useState, useEffect } from 'react';
import "./Teams.Module.css";
import { useNavigate } from 'react-router-dom';

function TeamsList() {
    const [teams, setTeams] = useState([]);
    //const navigate = useNavigate();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League');
                const data = await response.json();

                // Correct veldnamen gebruiken en komma toevoegen
                setTeams(data.teams.map(team => ({
                    name: team.strTeam,
                    logo: team.strTeamBadge // Correcte veldnaam
                })));
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, []);
    /* const handleClick = (team) => {
        navigate(`/team/${team.name}`);
    }; */

    return (
        <div className="container">
            {teams.map((team, index) => (
                <div className="item" key={index}>
                    <h2>{team.name}</h2>
                    <img src={team.logo} alt={team.name} width="100" />
                </div>
            ))}
        </div>
    );
}

export default TeamsList;
