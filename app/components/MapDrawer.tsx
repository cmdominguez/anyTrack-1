"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { ref, onValue } from "firebase/database";
import "leaflet/dist/leaflet.css";
import { database } from "../firebase";

var myIcon = new Icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAxlBMVEX////fICf+/v7MISftSkPeAADfISjfHSXeAA3gLjXfIyreDhneABDuTUXsR0HOLTLeFR7gKTDJAADoPDngMDjeAAfeCRX77+721NTSISbLGiHMJCnpdnj0v8DnaWrqg4TlX2H20M/xsrPtmJnwqar+9fTkT1LtVE/64+PKEhrKCRTWWVvqgYPrtbXvnJ3tjpDiP0TlWVz30tL1xsXjRkrcaWnZb3HegYPnnZ7RP0Lxrq753t3jj4/mVVjUTU/deXrQOTrUSEpkqI1RAAAMsElEQVR4nO1daXujOBKOISADPsD4ih3HcTtOJ9lMjnHv7kwyvdP7///UInEYZGGkEmApz77PTM98aNn1ukp1qQQXF4rCMPA/gFXaICIIWHMBWHUmGDBZteF3ATJRYtn1y9IIwOamzz40DH1kBeFrswPuQW1AnIUuBMFy6kEQaGg6xWyArWkUzoi3ByyCLTsPQPFMJycKlVUrgtoIC4BWDgMCnXYTBF+bHYEuFCXE1ISiAekixA5UD4Igd6ERvTipBDDUJ0zAJDW02YNQQfXR4BdPuTCU52dIJYZaKFBCRi28BbDjf1itPuQ0WKMgjUBiBybWqTpFqU2kQUAD5cvZYvX1J+foNagLpBSoBzTYRgRAU9ODXAxQda0Vxa+vRNCcjEb8QMrQ6FwfPmVRsyCNQithhaGNsUFgaOcwvi6AvcaH+erl9fn6+vr59WU1f1BYmQDHbWxebt9Q10NTz/d9z5t2J/749mWjLEsxwYzVjed1giDodOxOBoT8ade/WSlIUrB3//k8nfjIdiLk+KU0/cl0/dmcrDCIpMDG/tbyUEQlcFxnfMwQk/Ss232T8opDQH+b964f83ADx3E7rhsQuJGNogNJv/u+aU5eUQgkXbubnp9tOjcMB5cR+v0+/s8gDN0cSb93s2tUbG6IdNM/Jl5Czw4GMa8C+pdh0MlIepNv9UgolxIKjMnMbqxEeje8PKaXkXRTjsi6mcnIlsko008V+IE2QaxAFKmvQGmQ4DLRav/A0Qt+h4qWF1JKidxrP3pEbOQe+PX7gzBwbTs2TNt2gzCx3Ywj6tVjqTAYIia+TSw0POgP77mc+ySIWWI9phQnW1kxoZl9Qo5z9dqKDTSjN8i5lAJDGztZrN5UjdYrTMBUTnDpInTmlhBMFdgvxAUWUazIVI3WGijihdweFPFPWyu20ITfoIIf/jHs8GCpFtxQZYpPgTBxNyGCDpLoHlTRSzgO+mHy/5MPmITSDXHO1fsJSgni/cVDL+YYRH+ZJK52F5LCtdaLmxGXYQ+SHchNkESWAerYUYbuB4DQ39pM67uXafCS00IPCEMUBM448G+FvrPVEymyCVHiZJjF0kk1xhTdjnUn9K0tjuw+4E2YhAnWFkS+1+t2uz3PZ2sXhW+4yOqgrpCdtti/u8U26pYQRF7PeV9/rParj/W70/MYJG0njMtk/0bka9vT4b6LpRswTRR1nfXmUAPuNuugS3FEUZXsJM6pK1L2t9aENe79bBO6FMGpe0eXuLs7d1rUIO4DBPFK/17BDtXFCrsZl4QJyosia80q4XdrK/f3XMfB7bgE1qp1+avxA/csiArDIkHfLovhm07axyEEc5r3f7QqOxc2OB8lbobyMt5buWecjWOKjjt2cxrESlSoOZXgFu/CAe5YFCTt+G+nmkyzNx83ip2xTbVTxdxpG5hhFQbfv3+nbNR3Tse2WeDbgR15Gdr7Wop03zLc9bAKI4bfC34UTecVC+co2oF4J1LogWqMBoFDRacfESyqsPdSufLFxpnaEfz7FqQWwEOUiKFxRLBfsDb0xrF27IwZDJFfS3exNqy6UcTuH+1Ciyc32fvOMcEor1ErJD57ncDBfsbNM+RSYaREZiLuPTcssxju/aiy+35JVfVdPm+BvZTqG3GGT5Vw2VQ00infVpoxGSJXpY346QdjJ6RTbv+dc/lPn0VxotLZ6cqPksqQTtg83v7u2qPI2a7bjKsBt3Nepg6pDItG2uU9h/hGmylhOK2OpaIAPnwqKkDXNsIdNqq7ZvGa2dxiMfQk+t81Im7jXfukNOwXk+7eA+eHfHZZ+9C7rl9Y0LVKjJuYIdW88HgZPtD7kMD/p6gwHMKCRluNuHTCtSECMpwyGf5DWJoqUcGDn8Z7zHBQZNjl3YefExZDVDNDqcOpRIdU+2LC2zHbMxk+1stQrjWe7EOKIbe7f2Fa6eO/CgLCuvdpp1H2GnaUeDMY+rzO8JqV07iP/6aEFZcrZWVIP21li5UwuMzCYexTUcDXidi5rOLi6umPgrCwZ/oclgsvLgBvJDTIDnJJwO5wN8z2dMAnMEf5bQxTgZGenUo3mLG7R2HG0E0YcprpNSscuuZjPtjARDSMup7/tntDmGEaLWw7Cf0WTwE0Y6rwavFnTjA5JdRxRICdadAf0PuJq05nqtA2i65UAvUcgXxE1YF9eXkkqFXVTGSk3bEKzaffMhFbGkI4iU+PuJqjc1//R9WnG2/M8tc0Hz9T8dQ4h8LdpLB/3BWcHuyULegzM9q75uLPtkTnxCuO+f3wOLB1k8SmxN2/MAunyEgf/yKr1NHh7xY2UwbDjkUoGuynV+MJqih60tbtmuZonm5ANQheXODpg+DY1XSSWTW2pGQGzk7DZ06FS3NxIZ9M1gtsph3qZC1B753E7iNZP3/G/RmbJmib5lNspCrdk/q04okYBkPbQ9vjDHW39ZleFKswMlLsSdXSITnlttmTbK6DnG0xvXnYdqZlM1ORChf/OROLU7jDXjFkmakbjB3Xt962+xlOFI3ZfvtmlfIjKnw650B0GWZkkJQxrZdOWaDpxPICJ/CsyQl6RIWmqVJHPwPJLwPKa7j4uoyTaRahyoFarMLHv89NhokNNlNEzdI4kdKOgsFJYBU+VaezDaDaqZGJGupEPhjbrDPs0yo8k5+pZkgfP9gdfJ2LecBbDher8LfK76ofPNmTQe0xZ+w4hWuVPMBuxjxDEOQr0bbFOsHJ+xg+oCuswj+qv6oB8Pysu0Ix6+JrlYIMIxtdmqP2h4W4i+ziUWcUCAU3YeRHl0u6T9oGuEuYB6raE531vsIMn3gPdHICSnc5uD+A2VXihrs0QdFelqDI+jlzrIITJF0DRXvJO4dCy2/KKiIOEIKP4ueiUj1t4cVVSrTLU7gruAoldCj+87yfVmI5Q5cQXAirUO4hdYA+ELvBW80w3oSkASUopczNUdAOZg84VSImuBA995V8Gi1oWYUSS3CVqFBw0kvuVh7014G404SgoCMlT3ho5XZ6EXN2G/sEUELQfBId1jtTJ040sQmc4TJWoeCB2tk6jZ+si2nlcJ3hr+GQqJA/IzWAsxk14VlMicthTFCkqDhzs3h2sltIY5gQNJ8EWojnboa/Mg8FywguE4J/CXzDuV9HtONWoh0p8FfiSEUkPvv7eu54I4aJbZR40pGKjfxylJzOM0w04WcWhkt0wIpDiXZnmYQJrEK1rshwoDoBDwLsZJZJvlb3MGnzqM7d3IhfqsEznVRwoiQ04dzNLm+2BcFVxC/RoKqHTQlKns8zs1DneMoi5ec446W5TAmaIyXPCxOU1qDbHmPKImU4Hh8s9Gx9fD6U579GgI6mLFI4V8Mcw8VQ4UhxqouwKq32bSfKZDITLc7KqoaTfZLbsoiBD2AOBAEt0tZQkRvOSwpF2yxAuLKvT0Ke9Sc/gT14SBNs9KxJqlFV/QvtWM/aoQiaj40eF0o1qjiq0G8MZ0MRHDV6aB/rAEqTpwa9p50NrcGG5y4MA9rx4O0DzSenCQr3gIWEzP4F3DrkXkQ5G5pgo24mFhPY+OfukuzyQ1JHGlwMm3Qz6a0uyI0pgUXf0jLKtl2aYJOzQbKdHIHVaS1s2+aSVmFjdW/OMptvWT1YaapGEzRHlU1uaF+03V7ca3zyfUywskPKHvCvWhQ7+jbLFQNfNzlyMpGN/uKQQubSYXvYT1gEOYomkC7OcqRx7TEIcvRmQLupbRMlmLFsdMHRm4G6mfbxMQKEwrMoA4yfC9FQqNvbDh9oJVaHQq34RXgpUqzoH+qmQAzjPm+ni/9W3i1tRSpp5APT/CmvwlPHFApdq+TBwRu+HiieStcMHV76msdB0t0wtdOT6ZpeMaJYR25SZzM69TYSpW5VVuBoM/0d2+nJzoX8Y0jOidhOK89htOHHUMV+xFVS6IzITptt4reHkr20Gz422l1rD6VbaTNS7zHWIJS7w3NcLSwHrFvceh9IAiCGmnAjABLUJ2sGvwFdGxOFqkKbpEsDMeVOXuqSojFIvsTq7EPGHJBo5bT2ii85SPlsPRy+pJHWJkczgN/K08NAYQeL+dWqQ6rfqIkXlVqsOMOSZ9uJfEBtsjQF9SUkgHrCCy2UgAGssrRq+MNO6BsQJPno2j8R+JoCnRQIGfnUZAtqpgwQwC9i+D/UgIZDCGLQIfGVxJfmV9dz/NsALJ41IEhjAPfD6xakOYCyZo18DOyNITrpUHllyMmnfsolKaDy+pPeD+ozlH3GmfKQ7cWpz1GiGa5BN1XOD2qgPkmC6kcJWRNTPusysj+gH6A4QR1ykQwSvkIHyIwg1CpIc4C9tlcXdhjAMxv2ov8B5Mehl9x+ILgAAAAASUVORK5CYII=",
  iconSize: [20, 20],
  iconAnchor: [20, 20],
  popupAnchor: [-10, -20],
});

export default function MapDrawer() {
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geoData) => {
      console.log(geoData);
    });
    const starCountRef = ref(database, "shippings/0");

    return onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setLatitud(data.lat);
      setLongitud(data.lng);
    });
  }, []);

  return (
    <div>
      <MapContainer
        style={{ width: 400, height: 400 }}
        center={[-34.60053094260835, -58.41538690030575]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png" />
        <Marker
          icon={myIcon}
          position={[-34.60053094260835, -58.41538690030575]}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker icon={myIcon} position={[latitud, longitud]} />
      </MapContainer>
    </div>
  );
}
