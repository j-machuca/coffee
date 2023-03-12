export const getUrlForCoffeeStores = (query, limit) => {
    const url = `https://api.foursquare.com/v3/places/search?query=${query}&limit=${limit}`;

    return url;
};

export const fetchCoffeeStores = async () => {
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: process.env.FOURSQUARE_API_KEY,
        },
    };

    const response = await fetch(getUrlForCoffeeStores("cafe", 6), options);
    const data = await response.json();

    return data.results;
};
