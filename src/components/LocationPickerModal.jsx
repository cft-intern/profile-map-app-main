import { useState, useRef, useEffect } from 'react';
import MapboxGL from 'mapbox-gl';

const LocationPickerModal = ({ isOpen, onClose, onSelectLocation }) => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(77.209); // Default longitude (New Delhi)
  const [lat, setLat] = useState(28.6139);  // Default latitude (New Delhi)
  const [zoom] = useState(9); // Default zoom level
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (isOpen && mapContainerRef.current) {
      MapboxGL.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
      const newMap = new MapboxGL.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
      });

      const newMarker = new MapboxGL.Marker({
        draggable: true
      })
        .setLngLat([lng, lat])
        .addTo(newMap);

      newMarker.on('dragend', () => {
        const { lng, lat } = newMarker.getLngLat();
        setLng(lng);
        setLat(lat);
      });

      newMap.on('moveend', () => {
        const { lng, lat } = newMap.getCenter();
        setLng(lng);
        setLat(lat);
      });

      setMap(newMap);
      setMarker(newMarker);

      return () => {
        newMap.remove();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (map && marker) {
      map.setCenter([lng, lat]);
      marker.setLngLat([lng, lat]);
    }
  }, [lng, lat, map, marker]);

  // Fetch location suggestions
  const fetchSuggestions = (query) => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MapboxGL.accessToken}`)
      .then(response => response.json())
      .then(data => {
        setSuggestions(data.features);
      })
      .catch(error => console.error('Error fetching suggestions:', error));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const [newLng, newLat] = suggestion.geometry.coordinates;
    setLng(newLng);
    setLat(newLat);
    setSuggestions([]);
    setSearchQuery(suggestion.place_name);

    // Update map center and marker position
    if (map) {
      map.setCenter([newLng, newLat]);
      marker.setLngLat([newLng, newLat]);
    }
  };

  const handleSaveLocation = () => {
    onSelectLocation({ lat, lng });
    onClose(); // Close the modal after selection
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full h-auto relative">
        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a location"
          className="mb-4 p-2 border rounded-lg w-full"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-14 left-0 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-auto z-10">
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
        
        {/* Map Container */}
        <div ref={mapContainerRef} className="w-full h-72" />

        {/* Save and Close Buttons */}
        <button
          onClick={handleSaveLocation}
          className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Location
        </button>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LocationPickerModal;
