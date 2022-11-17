/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidHdhZ25lcjI3IiwiYSI6ImNsYWllbXc0bTAxdDAzcHFqN2E4MzJtbjQifQ.vgzKhEfcaJJqwxfp6P30fQ';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/twagner27/claihwzbi001214lj361uxvm7', // style URL
    scrollZoom: false,
    // center: [-74.5, 40], // starting position [lng, lat]
    // zoom: 9, // starting zoom
    // projection: 'globe', // display the map as a 3D globe
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //Add marker
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
