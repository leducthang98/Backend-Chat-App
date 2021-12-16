export const validatePassword = (password) => {
    // Minimum eight characters, at least one letter and one number.
    let regex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)
    return regex.test(password)
}