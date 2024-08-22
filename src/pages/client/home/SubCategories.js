import React from 'react';
import Fashion1 from '../../../assets/women.png';
import Fashion2 from '../../../assets/men.png';
import Fashion3 from '../../../assets/kid.png';
import Fashion4 from '../../../assets/winter.png';
import Furniture1 from '../../../assets/sofa.png';
import Furniture2 from '../../../assets/bed.png';
import Furniture3 from '../../../assets/chair.png';
import Furniture4 from '../../../assets/dressing_table.png';
import Appliance1 from '../../../assets/fridge.png';
import Appliance2 from '../../../assets/dishwasher.png';
import Appliance3 from '../../../assets/tv.png';
import Appliance4 from '../../../assets/washing_machine.png';
import Electronic1 from '../../../assets/category5.png';
import Electronic2 from '../../../assets/headphone.png';
import Electronic3 from '../../../assets/camera.png';
import Electronic4 from '../../../assets/printer.png';
import BabyCare1 from '../../../assets/diaper.png';
import BabyCare2 from '../../../assets/feeding_bottle.png';
import BabyCare3 from '../../../assets/cerelac.png';
import BabyCare4 from '../../../assets/wipes.png';
import Grocery1 from '../../../assets/dals.png';
import Grocery2 from '../../../assets/masala.png';
import Grocery3 from '../../../assets/oil.png';
import Grocery4 from '../../../assets/atta.png';

const fashions = [
    {
        id: 1,
        img: Fashion1,
        title: "Women's Wear"
    },
    {
        id: 2,
        img: Fashion2,
        title: "Men's Wear"
    },
    {
        id: 3,
        img: Fashion3,
        title: "Kid's Wear"
    },
    {
        id: 4,
        img: Fashion4,
        title: "Winter's Wear"
    }
];

const furnitures = [
    {
        id: 1,
        img: Furniture1,
        title: "Cushion Sofa"
    },
    {
        id: 2,
        img: Furniture2,
        title: "Mattress Bed"
    },
    {
        id: 3,
        img: Furniture3,
        title: "Cecsa Chair"
    },
    {
        id: 4,
        img: Furniture4,
        title: "Dressing Table"
    }
];

const appliances = [
    {
        id: 1,
        img: Appliance1,
        title: "Refridgerator"
    },
    {
        id: 2,
        img: Appliance2,
        title: "Dish Washer"
    },
    {
        id: 3,
        img: Appliance3,
        title: "Smart Television"
    },
    {
        id: 4,
        img: Appliance4,
        title: "Washing Machine"
    }
];

const electronics = [
    {
        id: 1,
        img: Electronic1,
        title: "Laptop"
    },
    {
        id: 2,
        img: Electronic2,
        title: "Earphone"
    },
    {
        id: 3,
        img: Electronic3,
        title: "Camera"
    },
    {
        id: 4,
        img: Electronic4,
        title: "Printer"
    }
];

const babycares = [
    {
        id: 1,
        img: BabyCare1,
        title: "Dry Diaper"
    },
    {
        id: 2,
        img: BabyCare2,
        title: "Feeding Bottle"
    },
    {
        id: 3,
        img: BabyCare3,
        title: "Multigrain Cerelac"
    },
    {
        id: 4,
        img: BabyCare4,
        title: "Wet Wipes"
    }
];

const groceries = [
    {
        id: 1,
        img: Grocery1,
        title: "Dal's"
    },
    {
        id: 2,
        img: Grocery2,
        title: "Masala's"
    },
    {
        id: 3,
        img: Grocery3,
        title: "Oil's"
    },
    {
        id: 4,
        img: Grocery4,
        title: "Flour's"
    }
];

function SubCategories() {
    return (
        <section>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-4 col-md-6 col-12 mb-4'>
                        <div className='card subCatCard p-3 h-100'>
                            <h4 className='fw-bold'>Fashions</h4>
                            <div className='row'>
                                {fashions.map((fashion) => (
                                    <div className='col-3 text-center' key={fashion.id}>
                                        <img
                                            src={fashion.img}
                                            alt={fashion.title}
                                            className='img-fluid'
                                        />
                                        <h6 className='mt-3'>{fashion.title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12 mb-4'>
                        <div className='card subCatCard p-3 h-100'>
                            <h4 className='fw-bold'>Furnitures</h4>
                            <div className='row'>
                                {furnitures.map((furniture) => (
                                    <div className='col-3 text-center' key={furniture.id}>
                                        <img
                                            src={furniture.img}
                                            alt={furniture.title}
                                            className='img-fluid'
                                        />
                                        <h6 className='mt-3'>{furniture.title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12 mb-4'>
                        <div className='card subCatCard p-3 h-100'>
                            <h4 className='fw-bold'>Appliances</h4>
                            <div className='row'>
                                {appliances.map((appliance) => (
                                    <div className='col-3 text-center' key={appliance.id}>
                                        <img
                                            src={appliance.img}
                                            alt={appliance.title}
                                            className='img-fluid'
                                        />
                                        <h6 className='mt-3'>{appliance.title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12 mb-4'>
                        <div className='card subCatCard p-3 h-100'>
                            <h4 className='fw-bold'>Electronics</h4>
                            <div className='row'>
                                {electronics.map((electronic) => (
                                    <div className='col-3 text-center' key={electronic.id}>
                                        <img
                                            src={electronic.img}
                                            alt={electronic.title}
                                            className='img-fluid'
                                        />
                                        <h6 className='mt-3'>{electronic.title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12 mb-4'>
                        <div className='card subCatCard p-3 h-100'>
                            <h4 className='fw-bold'>Baby Care's</h4>
                            <div className='row'>
                                {babycares.map((babycare) => (
                                    <div className='col-3 text-center' key={babycare.id}>
                                        <img
                                            src={babycare.img}
                                            alt={babycare.title}
                                            className='img-fluid'
                                        />
                                        <h6 className='mt-3'>{babycare.title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12 mb-4'>
                        <div className='card subCatCard p-3 h-100'>
                            <h4 className='fw-bold'>Groceries</h4>
                            <div className='row'>
                                {groceries.map((grocery) => (
                                    <div className='col-3 text-center' key={grocery.id}>
                                        <img
                                            src={grocery.img}
                                            alt={grocery.title}
                                            className='img-fluid'
                                        />
                                        <h6 className='mt-3'>{grocery.title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubCategories;