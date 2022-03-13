import axios from "axios";

const api = axios.create({});

export const getCities = async (query) =>
  await api.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?types=place&access_token=${process.env.NEXT_PUBLIC_MAP_BOX_API_KEY}`
  );

export default api;
