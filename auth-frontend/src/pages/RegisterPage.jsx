import { Link, Navigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
    const { currentUser } = useAuth();

    // If user is already logged in, redirect to profile
    if (currentUser) {
        return <Navigate to="/profile" />;
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <RegisterForm />
                <div className="auth-footer">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="auth-link">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;