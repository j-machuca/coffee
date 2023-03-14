import { createApi } from "unsplash-js";

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

export const getUrlForCoffeeStores = (query, limit) => {
    const url = `https://api.foursquare.com/v3/places/search?query=${query}&limit=${limit}`;

    return url;
};

const getCoffeeStoreImages = async () => {
    const photos = await unsplash.search.getPhotos({
        query: "coffee shop",
        page: 1,
        perPage: 6,
        orientation: "portrait",
    });

    const unsplashResults = photos.response.results.map(
        (result) => result.urls["small"]
    );

    return unsplashResults;
};

export const fetchCoffeeStores = async () => {
    const photos = await getCoffeeStoreImages();

    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: process.env.FOURSQUARE_API_KEY,
        },
    };

    const response = await fetch(getUrlForCoffeeStores("cafe", 6), options);
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
