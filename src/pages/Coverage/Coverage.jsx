import React, { useRef } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {
  const position = [23.685, 90.3563]; //bangladesh center lat and log
  const serviceCenters = useLoaderData();
  //   console.log(serviceCenters);
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      console.log(district, coord);
      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold  my-8">
        We are available in 64 districts
      </h2>
      {/* search */}

      <form onSubmit={handleSearch}>
        <label className="input">
          <IoMdSearch size={20} />
          <input type="search" name="location" required placeholder="Search" />
        </label>
      </form>

      {/* ❌ map code start */}

      <div className="border w-full h-[800px] my-10">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> Service Area:{' '}
                {center.covered_area.join(', ')}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        ,
      </div>
    </div>
  );
};

export default Coverage;
