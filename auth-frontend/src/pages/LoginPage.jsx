import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const { currentUser } = useAuth();

    // If user is already logged in, redirect to profile
    if (currentUser) {
        return <Navigate to="/profile" />;
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <LoginForm />
                <div className="auth-footer">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="auth-link">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;