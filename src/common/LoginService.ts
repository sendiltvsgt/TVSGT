//Save token to local storage
export const saveLoginToken = (token: string) => {
    localStorage.setItem("validatetoken", token);
};

//Remove token from local storage
export const removeLoginToken = () => {
    localStorage.removeItem("validatetoken");
}