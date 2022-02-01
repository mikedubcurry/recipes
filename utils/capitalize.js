export const capitalize = (str) =>
str
    .split(" ")
    .map((wd) => wd.slice(0, 1).toUpperCase() + wd.slice(1, wd.length))
    .join(" ");