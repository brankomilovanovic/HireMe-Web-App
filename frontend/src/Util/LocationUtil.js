export const getCityByName = (name, cities) => {
    return cities?.find(city => city?.name === name) || null;
}

