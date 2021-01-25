export const inputTypes = {
    email: {
        regEx: /^([a-zA-Z0-9_\-\.]+)@(ncl|newcastle).ac.uk$/,
        errorMessage: "Please enter a valid newcastle university email address.",
        helpers: ["@ncl.ac.uk", "@newcastle.ac.uk"]
    },
    text: {
        regEx: /.+/,
        errorMessage: "The field cannot be empty",
        helpers: []
    },
    password: {
        regEx: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,30})/,
        errorMessage:
            "The password must be between 8 and 30 characters long and must contain at least one lower case letter, " +
            "one upper case letter and a number",
        helpers: []
    }
}