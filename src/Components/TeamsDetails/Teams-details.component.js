import React, { useState, useEffect } from 'react';
import "./Teams-details.component.css";
import {useParams} from "react-router-dom";

function TeamsDetails(){
    const [team, setTeam] = useState({});
    const { id } = useParams()
    console.log(id);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id=' + id);
                const data = await response.json();

                setTeam(data.teams[0]);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchTeam();
    }, []);

    return (
        <div>
            {team.idTeam}
            Route{id};
        </div>
    )
}
export default TeamsDetails;