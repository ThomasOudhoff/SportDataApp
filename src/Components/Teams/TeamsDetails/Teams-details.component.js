import React, { useState, useEffect } from 'react';
import "./Teams-details.component.css";
import { useParams } from "react-router-dom";

function TeamsDetails() {
    const [team, setTeam] = useState({});
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id=' + id);
                const data = await response.json();
                const teamData = data.teams[0];

                setTeam({
                    name: teamData.strTeam,
                    logo: teamData.strBadge,
                    id: teamData.idTeam,
                    desc: teamData.strDescriptionEN,
                    stadium: teamData.strStadium,
                    capStadium: teamData.intStadiumCapacity,
                    webp: teamData.strWebsite,
                    fb: teamData.strFacebook,
                    twit: teamData.strTwitter,
                    ig: teamData.strInstagram,
                });
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchTeam();
    }, [id]);

    if (!team || !team.name) {
        return <p>Loading...</p>;
    }

    // Zorg dat de URL's absoluut zijn (met http/https)
    const websiteUrl = team.webp && team.webp.startsWith('http')
        ? team.webp
        : `https://${team.webp}`;

    const facebookUrl = team.fb && team.fb.startsWith('http')
        ? team.fb
        : `https://${team.fb}`;

    const twitterUrl = team.twit && team.twit.startsWith('http')
        ? team.twit
        : `https://${team.twit}`;

    const instagramUrl = team.ig && team.ig.startsWith('http')
        ? team.ig
        : `https://${team.ig}`;
    return (
        <div className="flexContainerOut">
            <div className="leftBlock">
                <div className="info">
                    <h2>{team.name}</h2>
                    <img src={team.logo} alt={team.name} width="100" />
                    <p>{team.stadium}</p>
                    <p>{"Capacity: " + team.capStadium}</p>
                </div>
                <p className="desc">{team.desc}</p>
                <div className="additionalInfo">
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe"></i>
                    </a>
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
            <div className="rightBlock">
                <p>Hallo</p>
            </div>
        </div>
    );

}

export default TeamsDetails;
