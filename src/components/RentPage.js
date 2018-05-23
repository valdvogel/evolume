import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const RentPage = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="about-the-author">
                    <div className="row align-center">
                        <div className="small-12 medium-4 columns">
                            <div className="img-big-wrap">
                                <img src="https://s3.us-east-2.amazonaws.com/evolumbreapp/b3.jpg" />
                            </div>
                            <div className="column small-12 large-6">
                                <h6 className="product-color-title">Colors</h6>
                                <form className="product-option-selection">
                                    <input type="radio" name="radios" value="red" id="radio1" checked />
                                    <label for="radio1" className=" dark-hollow expand"><img src="https://placehold.it/30x30" /></label>
                                    <input type="radio" name="radios" value="blue" id="radio2" />
                                    <label for="radio2" className=" dark-hollow expand"><img src="https://placehold.it/30x30" /></label>
                                    <input type="radio" name="radios" value="yellow" id="radio3" />
                                    <label for="radio3" className=" dark-hollow expand"><img src="https://placehold.it/30x30" /></label>
                                    <input type="radio" name="radios" value="orange" id="radio4" />
                                    <label for="radio4" className=" dark-hollow expand"><img src="https://placehold.it/30x30" /></label>
                                    <input type="radio" name="radios" value="green" id="radio5" />
                                    <label for="radio5" className=" dark-hollow expand"><img src="https://placehold.it/30x30" /></label>
                                </form>
                            </div>
                        </div>
                        <div className="product-details column medium-6 center-text-for-small-only">
                            <h1>Product Name</h1>
                            <p className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id magna ac quam semper.deta</p>
                            <div className="row">
                                <div className="column small-12 large-6">
                                    <h6 className="product-color-title">Colors</h6>
                                    <form className="product-option-selection">
                                        <input type="radio" name="radios" value="red" id="radio1" checked />
                                        <label for="radio1" className=" dark-hollow expand"><img src="https://placehold.it/30x30" /></label>
                                        <input type="radio" name="radios" value="blue" id="radio2" />
                                        <label for="radio2" className=" dark-hollow expand"><img src="https://placehold.it/30x30" /></label>
                                        <input type="radio" name="radios" value="yellow" id="radio3" />
                                        <label for="radio3" className=" dark-hollow expand"><img src="https://placehold.it/30x30" /></label>
                                        <input type="radio" name="radios" value="orange" id="radio4" />
                                        <label for="radio4" className=" dark-hollow expand"><img src="https://placehold.it/30x30" /></label>
                                        <input type="radio" name="radios" value="green" id="radio5" />
                                        <label for="radio5" className=" dark-hollow expand"><img src="https://placehold.it/30x30" /></label>
                                    </form>
                                </div>

                                <div className="column small-12 large-6">
                                    <h6 className="product-color-title">Size</h6>
                                    <form className="product-option-selection">
                                        <select>
                                            <option value="husker">Small</option>
                                            <option value="starbuck">Medium</option>
                                            <option value="hotdog">Large</option>
                                            <option value="apollo">X-Large</option>
                                            <option value="apollo">XX-Large</option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                            <div className="product-details-add-to-cart">
                                <p><span className="in-stock">In Stock</span> <span className="dim-text">(Only 3 left in Stock)</span></p>
                                <hr />
                                <p className="price">$19.99</p>
                                <p> <span>Qty:</span> <input className="qty" type="text" value="1" /> </p>
                                <button className="button expanded">Add to Cart</button>
                            </div>
                            <p className="shipping">Available for Free Ground Shipping Return</p>
                        </div>
                    </div>
                    <div className="small-12 medium-8 columns">
                        <h4 className="separator-left">Recursos</h4>
                        <p className="separator-left-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eum, iusto vel repudiandae, quaerat soluta sequi officia. Blanditiis atque, illo eaque sint in architecto illum nostrum repudiandae labore tenetur! Eaque impedit pariatur odio ad ipsum qui aspernatur dolorem consequuntur a molestias nisi, quae voluptatem expedita, inventore voluptatibus dolores, veritatis corporis facilis laudantium explicabo vero! Non hic quia facilis blanditiis eum.</p>
                    </div>
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
                </div>
            </div>
        </div>
    );
};

export default RentPage;