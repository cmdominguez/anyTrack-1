
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { ref, onValue } from "firebase/database";
import "leaflet/dist/leaflet.css";
import { database } from "../firebase";
import { Shipping } from "../interface/interfaceShipping";

let myIcon = new Icon({
  iconUrl:
    "https://github.com/MarceeloDominguez/Google_Map_RN/blob/master/assets/location.png?raw=true",
  iconSize: [19, 19],
  iconAnchor: [24, 24],
  popupAnchor: [-16, -23],
});

export default function MapDrawer() {
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);

  useEffect(() => {
    const starCountRef = ref(database, "shippings/0");

    return onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setLatitud(data.lat);
      setLongitud(data.lng);
    });
  }, []);

  return (
    <div className="flex justify-center">
      <MapContainer
        //style={{ width: 350, height: 350 }}
        className="h-56 w-full lg:w-[350px] lg:h-[350px] md:w-[350px] md:h-[350px]"
        center={[-34.60053094260835, -58.41538690030575]}
        zoom={10}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png" />
        <Marker
          icon={myIcon}
          position={[-34.60053094260835, -58.41538690030575]}
        >
          <Popup>
            Origen <br /> Palermo, Buenos Aires.
          </Popup>
        </Marker>
        <Marker icon={myIcon} position={[latitud, longitud]} />
      </MapContainer>
    </div>
  );
}
