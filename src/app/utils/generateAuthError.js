export function generateAuthError(error) {
    switch (error) {
        case "EMAIL_NOT_FOUND":
            return "Пользователь с таким Email не существует";
        case "INVALID_PASSWORD":
            return "Email и Password введены неккоректно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует";
        default:
            return "Слишком много запросов на вход";
    }
}
