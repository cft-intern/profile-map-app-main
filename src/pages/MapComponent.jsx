import { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 28.6139, // Default to New Delhi
    longitude: 77.209,
    zoom: 12,
    width: '100%',
    height: '500px'
  });
  const [marker, setMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  // const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  // const mapRef = useRef();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lat = parseFloat(urlParams.get('lat'));
    const lng = parseFloat(urlParams.get('lng'));

    if (lat && lng) {
      setViewport(prevViewport => ({
        ...prevViewport,
        latitude: lat,
        longitude: lng
      }));
      setMarker({ latitude: lat, longitude: lng });
    }
  }, []);

  // Fetch address suggestions
  const fetchSuggestions = (query) => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`)
      .then(response => response.json())
      .then(data => {
        setSuggestions(data.features);
      })
      .catch(error => console.error('Error fetching suggestions:', error));
  };

  // Handle search input change
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) { // Fetch suggestions only if query length is more than 2
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    const [lng, lat] = suggestion.geometry.coordinates;
    setViewport({
      latitude: lat,
      longitude: lng,
      zoom: 12
    });
    setMarker({
      latitude: lat,
      longitude: lng
    });
    setSearchQuery(suggestion.place_name);
    setSuggestions([]);
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for an address"
          className="border p-2 rounded-lg w-full"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-auto z-10">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Map
        {...viewport}
        mapboxAccessToken={mapboxgl.accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={evt => setViewport(evt.viewState)}
        style={{ width: '100%', height: '500px' }}
      >
        {marker && <Marker latitude={marker.latitude} longitude={marker.longitude} color="red" />}
      </Map>
    </div>
  );
}

export default MapComponent;
