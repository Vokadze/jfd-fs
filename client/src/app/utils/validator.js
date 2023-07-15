export function validator(data, config) {
    const errors = {};

    function validate(validatorMethod, data, config) {
        let statusValidate;
        switch (validatorMethod) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusValidate = !data;
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            }

            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }

            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }

            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }

            case "min": {
                statusValidate = data.length < config.value;
                break;
            }

            default:
                break;
        }

        if (statusValidate) return config.message;
    }

    for (const fieldName in data) {
        for (const validatorMethod in config[fieldName]) {
            const error = validate(
                validatorMethod,
                data[fieldName],
                config[fieldName][validatorMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
