import home from "../locales/en/main/home.json"
import about from "../locales/en/main/about.json"
import login from "../locales/en/auth/login.json"
import register from "../locales/en/auth/register.json"
import notFound from "../locales/en/not-found.json"
import profile from "../locales/en/profile.json"

let combinedObjects = {
    ...home,
    ...about,
    ...login,
    ...register,
    ...notFound,
    ...profile
}

let translationKeys = {}

for(let key in combinedObjects) {
    translationKeys[`${key.toUpperCase()}_KEY`] = key
}


console.log(translationKeys)


// export const translationKeys = {
//     HOME_TITLE : "home_title",
//     HOME_DESCRIPTION : "home_description",
//     ABOUT_TITLE : "about_title",
//     ABOUT_DESCRIPTION_KEY
// }

export {
    combinedObjects,
    translationKeys
};