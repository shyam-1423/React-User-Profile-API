// components/UserList.jsx
import React, { useEffect, useState, useRef } from 'react';
import {
    Users,
    Heart,
    Calendar,
    Clock,
    Sparkles,
    AlertTriangle,
    RefreshCw
} from 'lucide-react';
import UserCard from './UserCard';
import '../styles/userList.scss';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const headerRef = useRef(null);

    // Enhanced mock data as fallback
    const mockUsers = [
        {
            id: 1,
            name: "Alice Johnson",
            title: "UX Designer - Frontend Developer",
            email: "alice.johnson@email.com",
            phone: "+1 (555) 123-4567",
            website: "www.alicejohnson.com",
            instagram: "@alice_designs",
            address: "San Francisco, CA",
            hobbies: ["Photography", "Hiking", "Cooking", "Reading"],
            image: null
        },
        {
            id: 2,
            name: "Bob Smith",
            title: "Music Producer - Sound Engineer",
            email: "bob.smith@email.com",
            phone: "+1 (555) 987-6543",
            website: "www.bobsmithmusic.com",
            instagram: "@bobsmith_music",
            address: "New York, NY",
            hobbies: ["Gaming", "Music Production", "Cycling"],
            image: null
        },
        {
            id: 3,
            name: "Carol Davis",
            title: "Digital Artist - Creative Director",
            email: "carol.davis@email.com",
            phone: "+1 (555) 246-8135",
            website: "www.caroldavisart.com",
            instagram: "@carol_creates",
            address: "Austin, TX",
            hobbies: ["Painting", "Yoga", "Gardening", "Travel", "Writing"],
            image: null
        },
        {
            id: 4,
            name: "David Wilson",
            title: "Software Developer - Tech Enthusiast",
            email: "david.wilson@email.com",
            phone: "+1 (555) 369-2580",
            website: "www.davidwilsontech.com",
            instagram: "@david_codes",
            address: "Seattle, WA",
            hobbies: ["Rock Climbing", "Coffee", "Tech"],
            image: null
        },
        {
            id: 5,
            name: "Emma Brown",
            title: "Fashion Designer - Brand Consultant",
            email: "emma.brown@email.com",
            phone: "+1 (555) 147-8520",
            website: "www.emmabrownfashion.com",
            instagram: "@emma_fashion",
            address: "Miami, FL",
            hobbies: ["Dancing", "Beach Volleyball", "Cooking", "Fashion"],
            image: null
        },
        {
            id: 6,
            name: "Frank Garcia",
            title: "Marketing Specialist - Content Creator",
            email: "frank.garcia@email.com",
            phone: "+1 (555) 741-9630",
            website: "www.frankgarcia.com",
            instagram: "@frank_creates",
            address: "Denver, CO",
            hobbies: ["Blogging", "Photography", "Traveling", "Fitness"],
            image: null
        }
    ];

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://user-profiles-api.onrender.com/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: AbortSignal.timeout(10000) // 10 second timeout
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                setUsers(data);
            } else {
                console.warn('API returned empty or invalid data, using mock data');
                setUsers(mockUsers);
            }
        } catch (err) {
            console.warn('API call failed:', err.message);
            setError(err.message);
            setUsers(mockUsers); // Always fallback to mock data
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [retryCount]);

    useEffect(() => {
        if (!loading && users.length > 0) {
            // Simple entrance animation
            const timer = setTimeout(() => {
                if (headerRef.current) {
                    headerRef.current.classList.add('animate-in');
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [loading, users]);

    const handleRetry = () => {
        setRetryCount(prev => prev + 1);
    };

    const totalHobbies = users.reduce((total, user) => total + (user.hobbies?.length || 0), 0);

    if (loading) {
        return (
            <div className="user-list-loading">
                <div className="loading-container">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="loading-text">Loading amazing profiles...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-list">
            {/* Header Section */}
            <header className="user-list__header" ref={headerRef}>
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-12 col-lg-8">
                            <div className="header-title">
                                <Sparkles className="sparkle-icon sparkle-left" size={32} />
                                <h1 className="main-title">User Profiles</h1>
                                <Sparkles className="sparkle-icon sparkle-right" size={32} />
                            </div>
                            <p className="subtitle">
                                Discover amazing people and their unique stories, interests, and connections
                            </p>
                            <div className="timestamp">
                                <Clock className="clock-icon" size={16} />
                                <small>Updated just now</small>
                                {error && (
                                    <button
                                        className="btn btn-link btn-sm retry-btn"
                                        onClick={handleRetry}
                                        title="Retry API call"
                                    >
                                        <RefreshCw size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <section className="user-list__stats">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10">
                            <div className="stats-card">
                                <div className="stats-grid">
                                    <div className="stat-item">
                                        <Users className="stat-icon" size={32} />
                                        <h3 className="stat-number">{users.length}</h3>
                                        <p className="stat-label">Active Profiles</p>
                                    </div>
                                    <div className="stat-item">
                                        <Heart className="stat-icon heart-icon" size={32} />
                                        <h3 className="stat-number">{totalHobbies}</h3>
                                        <p className="stat-label">Total Interests</p>
                                    </div>
                                    <div className="stat-item">
                                        <Calendar className="stat-icon calendar-icon" size={32} />
                                        <h3 className="stat-number">24/7</h3>
                                        <p className="stat-label">Active Community</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Error Alert */}
            {error && (
                <div className="container">
                    <div className="alert alert-warning error-alert" role="alert">
                        <AlertTriangle className="alert-icon" size={20} />
                        <div>
                            <strong>API Notice:</strong> Using fallback data due to API issue: {error}
                        </div>
                    </div>
                </div>
            )}

            {/* User Cards Section */}
            <section className="user-list__cards">
                <div className="container">
                    <div className="row">
                        {users.map((user, index) => (
                            <UserCard key={user.id || index} user={user} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="user-list__footer">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-12 col-md-6">
                            <div className="footer-brand">
                                <Sparkles className="footer-sparkle" size={20} />
                                <span className="brand-name">User Profiles</span>
                            </div>
                            <p className="footer-text">
                                Connecting people through shared interests and stories
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UserList;