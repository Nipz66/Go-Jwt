import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
    const { currentUser, getProfile } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfileData(data.user);
            } catch (err) {
                setError('Failed to load profile data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [getProfile]);

    if (loading) {
        return <div className="loading">Loading profile...</div>;
    }

    if (error) {
        return <div className="error-container">{error}</div>;
    }

    return (
        <div className="profile-container">
            <h1>Profile</h1>

            {profileData ? (
                <div className="profile-card">
                    <div className="profile-header">
                        <h2>Welcome, {profileData.username}!</h2>
                    </div>

                    <div className="profile-details">
                        <div className="profile-item">
                            <strong>Username:</strong> {profileData.username}
                        </div>
                        <div className="profile-item">
                            <strong>Email:</strong> {profileData.email}
                        </div>
                        <div className="profile-item">
                            <strong>Account created:</strong> {new Date(profileData.created_at).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
};

export default ProfilePage;