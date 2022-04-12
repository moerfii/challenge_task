export const read_local_storage = (key) => {
    return localStorage.getItem(key);
}

export const save_local_storage = (key, value) => {
    localStorage.setItem(key, value);
    console.log("local storage set.")
}