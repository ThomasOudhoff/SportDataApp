import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('pending');
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

    const projectId = 'e9857dea-c29c-44bc-8429-8451091f8df7';

    const getNoviHeaders = (token) => ({
        'novi-education-project-id': projectId,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    useEffect(() => {
        async function persistLogin() {
            const token = localStorage.getItem('token');
            const savedEmail = localStorage.getItem('user_email');
            const savedId = localStorage.getItem('user_id');

            if (token && savedEmail) {
                try {
                    setUser({
                        token: token,
                        email: savedEmail,
                        id: savedId
                    });

                    const response = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/teams', {
                        headers: getNoviHeaders(token)
                    });

                    const favIds = response.data.map(f => String(f.teamId));
                    setFavorites(favIds);
                } catch (e) {
                    logout();
                }
            }
            setStatus('done');
        }

        persistLogin();
    }, []);

    function login(token, email, userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_id', userId);

        setUser({
            token: token,
            email: email,
            id: userId
        });

        axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/teams', {
            headers: getNoviHeaders(token)
        })
            .then(res => {
                const favIds = res.data.map(f => String(f.teamId));
                setFavorites(favIds);
            })
            .catch(() => setFavorites([]));
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_id');
        setUser(null);
        setFavorites([]);
    }

    const toggleFavorite = async (teamId) => {
        setError(null);
        const isFavorite = favorites.includes(String(teamId));
        const token = localStorage.getItem('token');

        try {
            if (isFavorite) {
                const response = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/teams', {
                    headers: getNoviHeaders(token)
                });

                const itemToDelete = response.data.find(f => String(f.teamId) === String(teamId));

                if (itemToDelete) {
                    await axios.delete(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/teams/${itemToDelete.id}`, {
                        headers: getNoviHeaders(token)
                    });
                    setFavorites(prev => prev.filter(id => id !== String(teamId)));
                }
            } else {
                await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/teams',
                    {
                        teamId: String(teamId)
                    },
                    {
                        headers: getNoviHeaders(token)
                    }
                );

                setFavorites(prev => [...prev, String(teamId)]);
            }
        } catch (err) {
            setError("Het bijwerken van de favorieten is mislukt.");
        }
    };

    const contextData = {
        user,
        favorites,
        login,
        logout,
        toggleFavorite,
        status,
        error
    };

    return (
        <AuthContext.Provider value={contextData}>
            {status === 'done' ? (
                children
            ) : (
                <article className="loading-container">
                    <p>Laden...</p>
                </article>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);