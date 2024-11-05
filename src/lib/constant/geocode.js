async function getFetch() {
  const fetch = (await import("node-fetch")).default;
  return fetch;
}

const geocodeAddress = async (address) => {
  const apiKey = process.env.API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const fetch = await getFetch();
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;

      return { latitude: lat, longitude: lng };
    } else {
      throw new Error("Unable to find coordinates for this address.");
    }
  } catch (err) {
    throw new Error("Geocoding API error: " + err.message);
  }
};

module.exports = { geocodeAddress };
