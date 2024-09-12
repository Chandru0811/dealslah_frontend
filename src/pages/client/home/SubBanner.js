import React, { useState } from "react";
import card1 from "../../../assets/sub_banner_2.png";
import card2 from "../../../assets/sub_banner_2.png";

function SubBanner() {
  const [datas, setDatas] = useState({
    dealData: [
      {
        id: 1,
        img: card1,
        description: "Promotion Ideas for a Logistics service business",
      },
      {
        id: 2,
        img: card2,
        description: "Beauty & Spa promotion for service business",
      },
    ],
  });

  return (
    <section>
      <div className="container-fluid">
        <div className="row p-3">
          {datas.dealData.map((deal) => (
            <div className="col-md-6 col-12" key={deal.id}>
              <div className="card h-100 sub-banner">
                <div className="overlay">
                  <img src={deal.img} alt="image" className="img-fluid" />
                  <h2 className="text-start">{deal.description}</h2>
                  <div className="text-start">
                    <button className="btn btn-info see-deals-btn">
                      See Deals
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SubBanner;
