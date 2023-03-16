import { createApi } from "unsplash-js";

const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

export const getUrlForCoffeeStores = (latLng, query, limit) => {
    const url = `https://api.foursquare.com/v3/places/search?ll=${latLng}&query=${query}&limit=${limit}`;

    return url;
};

const getCoffeeStoreImages = async () => {
    const photos = await unsplash.search.getPhotos({
        query: "coffee shop",
        page: 1,
        perPage: 6,
        orientation: "portrait",
    });

    const unsplashResults =
        photos.response?.results.map((result) => result.urls["small"]) || [];

    return unsplashResults;
};

export const fetchCoffeeStores = async (
    latLng = "-25.295393447502267,-57.57713094526728"
) => {
    const photos = await getCoffeeStoreImages();

    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        },
    };

    const response = await fetch(
        getUrlForCoffeeStores(latLng, "cafe", 6),
        options
    );
    const data = await response.json();

    return data.results.map((res, idx) => {
        return {
            id: res.fsq_id,
            address: res.location.address || "",
            locality: res.location.locality || "",
            name: res.name,
            imgUrl: photos.length > 0 ? photos[idx] : null,
        };
    });
};
