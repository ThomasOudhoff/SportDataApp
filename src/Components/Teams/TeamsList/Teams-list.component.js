import React, { useState, useEffect } from 'react';
import "./Teams-list.component.css";
import { useNavigate, useSearchParams } from 'react-router-dom';

function TeamsList() {
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const leagueId = searchParams.get('leagueId'); 

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=' + leagueId);
                const data = await response.json();


                setTeams(data.teams.map(team => ({
                    name: team.strTeam,
                    logo: team.strBadge,
                    id: team.idTeam,
                })));
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchTeams();
    }, []);
    const navigateTeam = (teamId) => {
        navigate(`/teams/${teamId}`);
    }
    return (
        <div className="container">
            {teams.map((team, index) => (
                <div onClick={()=> navigateTeam(team.id)} className="item" key={index}>
                    <h2>{team.name}</h2>
                    <img src={team.logo} alt={team.name} width="100" />
                </div>
            ))}
        </div>
    );
}

export default TeamsList;
