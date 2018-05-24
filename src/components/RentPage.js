import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const RentPage = (props) => {
    return (
        <div className="small-12 medium-8 columns">
            <div className="row align-center">
                <div className="featured-testimonials-section">
                    <div className="row columns">
                        <h1>Comentários</h1>
                    </div>
                    <div className="featured-testimonials row">
                        <div className="small-12 medium-6 columns">
                            <div className="testimonial">
                                <img className="profile-pic hide-for-small-only" src="https://unsplash.it/201/?random" />
                                <p className="featured-testimonials-quotation">Hide when guests come over instantly break out into full speed make cat go crazy. Meow mix meow meow cat things and purring. catnip.</p>
                            </div>
                        </div>
                        <div className="small-12 medium-6 columns">
                            <div className="testimonial">
                                <img className="profile-pic hide-for-small-only" src="https://unsplash.it/202/?random" />
                                <p className="featured-testimonials-quotation">Hide when guests come over instantly break out into full speed make cat go crazy. Meow mix meow meow cat things and purring. catnip.</p>
                            </div>
                        </div>
                    </div>
                    <div className="featured-testimonials row">
                        <div className="small-12 medium-6 columns">
                            <div className="testimonial">
                                <img className="profile-pic hide-for-small-only" src="https://unsplash.it/203/?random" />
                                <p className="featured-testimonials-quotation">Hide when guests come over instantly break out into full speed make cat go crazy. Meow mix meow meow cat things and purring. catnip.</p>
                            </div>
                        </div>
                        <div className="small-12 medium-6 columns">
                            <div className="testimonial">
                                <img className="profile-pic hide-for-small-only" src="https://unsplash.it/204/?random" />
                                <p className="featured-testimonials-quotation">Hide when guests come over instantly break out into full speed make cat go crazy. Meow mix meow meow cat things and purring. catnip.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentPage;