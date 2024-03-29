import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './venueDetailStyle.css'; 

const ListVenuesDetail = () => {
    const [venue, setVenue] = useState(null);
    const { id } = useParams();

    const getVenueById = async () => {
        try {
            const response = await fetch(`http://localhost:3000/venues/${id}`);
            const jsonData = await response.json();
            setVenue(jsonData);
        } catch (err) {
            console.error("Error fetching venue data:", err.message);
        }
    }

    useEffect(() => {
        getVenueById();
    }, [id]); 

    if (!venue) {
        return <div className="venue-loading">Loading...</div>;
    }

    return (
        <div className="marquee bg-black text-white p-4">
  <div className="marquee__content" aria-hidden="false">
    <span>Tändsticksområdet • Stationen • Rådhusparken • Högskolan • Väster • Atollen • Öster • Spira •</span>
  </div>
        

        <div className="venue-detail-container">
            <div className="venue-detail-card">
                <img className="venue-detail-img" src={venue[0].img} alt={venue[0].name} />
                <div className="venue-detail-info">
                    <h2>{venue[0].name}</h2>
                    <p>{venue[0].address}</p>
                    <p>District: {venue[0].district}</p>
                    <a href={venue[0].url} target="_blank" rel="noopener noreferrer" className="venue-detail-btn">Visit Website</a>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ListVenuesDetail;
