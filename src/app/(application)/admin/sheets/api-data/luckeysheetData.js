import randomProfile from "random-profile-generator";

const profiles =  Array.from(Array(10).keys()).map(() => {
    const profile = randomProfile.profile()
    return {
        ...profile
    }
})
export {
    profiles
}