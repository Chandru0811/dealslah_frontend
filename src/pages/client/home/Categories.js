import React, { useState, useEffect } from 'react';
import Category1 from '../../../assets/category1.png';
import Category2 from '../../../assets/category2.png';
import Category3 from '../../../assets/category3.png';
import Category4 from '../../../assets/category4.png';
import Category5 from '../../../assets/category5.png';
import Category6 from '../../../assets/category6.png';
import Category7 from '../../../assets/category7.png';
import Category8 from '../../../assets/category8.png';
import Category9 from '../../../assets/category9.png';
import Category10 from '../../../assets/category10.png';
import Category11 from '../../../assets/category11.png';
import Category12 from '../../../assets/category12.png';
import { FaList } from 'react-icons/fa'; // Import the FaList icon
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const categories = [
    { id: 1, img: Category1, title: "Fashions" },
    { id: 2, img: Category2, title: "Cosmetics" },
    { id: 3, img: Category3, title: "Appliances" },
    { id: 4, img: Category4, title: "Mobiles" },
    { id: 5, img: Category5, title: "Electronics" },
    { id: 6, img: Category6, title: "Furnitures" },
    { id: 7, img: Category7, title: "Toys" },
    { id: 8, img: Category8, title: "Baby Care" },
    { id: 9, img: Category9, title: "Gadgets" },
    { id: 10, img: Category10, title: "Grocery" },
    { id: 11, img: Category11, title: "Stationery" },
    { id: 12, img: Category12, title: "Books" }
];

function Categories() {
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState(11);

    // Update the number of visible categories based on screen size
    useEffect(() => {
        const updateVisibleCategories = () => {
            const width = window.innerWidth;
            if (width >= 1200) {
                setVisibleCategories(11); // XL screens
            } else if (width >= 992) {
                setVisibleCategories(8);  // LG screens
            } else if (width >= 768) {
                setVisibleCategories(5);  // MD screens
            } else {
                setVisibleCategories(3);  // SM screens
            }
        };

        updateVisibleCategories();
        window.addEventListener('resize', updateVisibleCategories);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', updateVisibleCategories);
    }, []);

    const handleAllCategoriesClick = () => {
        setShowAllCategories(!showAllCategories);
    };

    return (
        <section>
            <div className='container my-4'>
                <h4 className='fw-bold'>Top Categories</h4>
                <div className='row mt-4'>
                    {categories.slice(0, visibleCategories).map((category) => (
                        <div className='col-lg-1 col-md-2 col-3 text-center' key={category.id}>
                            <div className='card categoryCard'>
                                <img
                                    src={category.img}
                                    alt={category.title}
                                    className='img-fluid p-2'
                                />
                            </div>
                            <h6 className='mt-2'>{category.title}</h6>
                        </div>
                    ))}
                    <div className='col-lg-1 col-md-2 col-3 text-center'>
                        <div className='card categoryCard' onClick={handleAllCategoriesClick} data-bs-toggle="offcanvas" data-bs-target="#offcanvasCategories" aria-controls="offcanvasCategories">
                            <FaList className='img-fluid p-2' size={60} />
                        </div>
                        <h6 className='mt-2'>All Categories</h6>
                    </div>
                </div>
            </div>

            {/* Offcanvas Component */}
            <div className={`offcanvas offcanvas-end ${showAllCategories ? 'show' : ''}`} tabIndex="-1" id="offcanvasCategories" aria-labelledby="offcanvasCategoriesLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasCategoriesLabel">All Categories</h5>
                    <button type="button" className="btn-close text-reset" onClick={handleAllCategoriesClick} aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className='row'>
                        {categories.map((category) => (
                            <div className='col-lg-3 col-md-4 col-6 text-center mb-4' key={category.id}>
                                <div className='card categoryCard'>
                                    <img
                                        src={category.img}
                                        alt={category.title}
                                        className='img-fluid p-2'
                                    />
                                </div>
                                <h6 className='mt-2'>{category.title}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Categories;