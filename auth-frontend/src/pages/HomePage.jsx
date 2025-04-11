import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
    const { currentUser } = useAuth();

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Welcome to the Auth System</h1>
                <p>A full-stack authentication system built with React and Golang</p>

                {currentUser ? (
                    <div className="cta-container">
                        <p>You are logged in as <strong>{currentUser.username}</strong></p>
                        <Link to="/profile" className="btn-primary">
                            View Your Profile
                        </Link>
                    </div>
                ) : (
                    <div className="cta-container">
                        <p>Please login or register to access your profile</p>
                        <div className="cta-buttons">
                            <Link to="/login" className="btn-primary">
                                Login
                            </Link>
                            <Link to="/signup" className="btn-secondary">
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;