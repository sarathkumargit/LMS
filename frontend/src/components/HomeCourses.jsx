import React, { useState, useEffect } from 'react'
import { homeCoursesStyles } from '../assets/dummyStyles'
import coursesData from '../assets/dummyData'
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'
import { toast, Slide } from 'react-toastify'
import { useUser } from '@clerk/clerk-react'

const HomeCourses = () => {
    const navigate = useNavigate();
    const { isSignedIn } = useUser();
    const { title, course: courseFont, detail } = homeCoursesStyles.fonts;
    const visibleCourses = coursesData.slice(0, 8);

    const [userRatings, setUserRatings] = useState(() => {
        try {
            const raw = localStorage.getItem("userCourseRatings");
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    });
    const [hoverRatings, setHoverRatings] = useState({});

    useEffect(() => {
        try {
            localStorage.setItem("userCourseRatings", JSON.stringify(userRatings));
        } catch {}
    }, [userRatings]);

    const showLoginToast = () => {
        toast.error("🔒 Please login to access this course", {
            position: "top-right",
            transition: Slide,
            autoClose: 3000,
            theme: "colored",
            hideProgressBar: false,
        });
    };

    const handleCourseClick = (id) => {
        const token = localStorage.getItem("token");
        if (!token || !isSignedIn) {
            showLoginToast();
            return;
        }
        navigate(`/course/${id}`);
    };

    const handleEnrollClick = (e, courseId) => {
        e.stopPropagation();
        const token = localStorage.getItem("token");
        if (!token || !isSignedIn) {
            showLoginToast();
            return;
        }
        navigate(`/course/${courseId}`);
    };

    const handleBrowseClick = () => {
        const token = localStorage.getItem("token");
        if (!token || !isSignedIn) {
            toast.error("🔒 Please login to browse all courses", {
                position: "top-right",
                transition: Slide,
                autoClose: 3000,
                theme: "colored",
            });
            return;
        }
        navigate("/courses");
    };

    const handleSetRating = (e, courseId, rating) => {
        e.stopPropagation();
        
        const token = localStorage.getItem("token");
        if (!token || !isSignedIn) {
            toast.warning("⭐ Please login to rate courses", {
                position: "top-right",
                transition: Slide,
                autoClose: 3000,
                theme: "colored",
            });
            return;
        }
        
        setUserRatings((prev) => ({ ...prev, [courseId]: rating }));
        toast.success(`✨ You rated this course ${rating} stars!`, {
            position: "top-right",
            transition: Slide,
            autoClose: 2000,
            theme: "colored",
        });
    };

    const renderInteractiveStars = (course) => {
        const userRating = userRatings[course.id] || 0;
        const hover = hoverRatings[course.id] || 0;
        const displayRating = hover || userRating;

        return (
            <div className={homeCoursesStyles.starsContainer}>
                <div
                    className={homeCoursesStyles.interactiveStars}
                    onClick={(e) => e.stopPropagation()}
                >
                    {Array.from({ length: 5 }).map((_, i) => {
                        const idx = i + 1;
                        const filled = idx <= displayRating;

                        return (
                            <button
                                key={i}
                                onClick={(e) => handleSetRating(e, course.id, idx)}
                                onMouseEnter={() =>
                                    setHoverRatings((s) => ({ ...s, [course.id]: idx }))
                                }
                                onMouseLeave={() =>
                                    setHoverRatings((s) => ({ ...s, [course.id]: 0 }))
                                }
                                className={`${homeCoursesStyles.starButton} ${
                                    filled
                                        ? homeCoursesStyles.starButtonActive
                                        : homeCoursesStyles.starButtonInactive
                                }`}
                                style={{ background: "transparent" }}
                            >
                                <Star
                                    size={16}
                                    fill={filled ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    className={homeCoursesStyles.starIcon}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className={homeCoursesStyles.container}>
            <div className={homeCoursesStyles.mainContainer}>
                <div className={homeCoursesStyles.header}>
                    <h2 className={`${title} ${homeCoursesStyles.title}`}>
                        <Star className={homeCoursesStyles.titleIcon} />
                        Explore Top Courses
                        <Star className={homeCoursesStyles.titleIcon} />
                    </h2>
                </div>

                <div className={homeCoursesStyles.coursesGrid}>
                    {visibleCourses.map((course) => {
                        const isFree = !course.isPaid || !course.price || course.price === 0;
                        
                        return (
                            <div 
                                key={course.id} 
                                onClick={() => handleCourseClick(course.id)} 
                                className={homeCoursesStyles.courseCard}
                            >
                                <div className={homeCoursesStyles.courseContent}>
                                    <img 
                                        src={course.image} 
                                        alt={course.title} 
                                        className={homeCoursesStyles.courseImage}
                                    />
                                    <div className={homeCoursesStyles.courseInfo}>
                                        <h3 className={courseFont}>{course.title}</h3>
                                        <p className={detail}>{course.description}</p>
                                        
                                        {/* Star Rating */}
                                        {renderInteractiveStars(course)}
                                        
                                        <div className={homeCoursesStyles.courseFooter}>
                                            <span className={homeCoursesStyles.price}>
                                                {isFree ? (
                                                    <span className="text-green-600 font-bold">Free</span>
                                                ) : (
                                                    <span className="text-blue-600 font-bold">${course.price}</span>
                                                )}
                                            </span>
                                            <button 
                                                onClick={(e) => handleEnrollClick(e, course.id)}
                                                className={homeCoursesStyles.enrollButton}
                                            >
                                                {isSignedIn ? 'Enroll Now' : 'Login to Enroll'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Browse All Courses Button */}
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={handleBrowseClick}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Browse All Courses
                    </button>
                </div>
            </div>
        </div>
    );
};


export default HomeCourses;
