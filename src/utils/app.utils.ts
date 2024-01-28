export const formatLatinNameDb = (name: string) => {
    return name.split(' ').join('-').toLowerCase();
}

export const formatLatinNameDisplay = (name: string) => {
    const latinName = name.split('-').join(' ');
    return capitalizeName(latinName);
}

export const capitalizeName = (name: string) => {
    const capitalizedName = name
      .split(' ')
      .map((word: string) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
    return capitalizedName;
};