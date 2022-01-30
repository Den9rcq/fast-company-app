import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/users";
import history from "../../utils/history";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    // Изменение данных в data
    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // Отправка данных
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(logIn({ payload: data, redirect }));
    };

    // Проверка при изменениях в data
    useEffect(() => {
        validate();
    }, [data]);

    // Конфигурация отображение ошибок
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введён не корректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            isMinCharacters: {
                message: `Пароль должен состоять минимум из 8 символов`,
                value: 8
            }
        }
    };

    const validate = () => {
        const errorsValidate = validator(data, validatorConfig);
        setErrors(errorsValidate);
        return Object.keys(errorsValidate).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                errors={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                errors={errors.password}
            />
            <CheckBoxField
                name="stayOn"
                value={data.stayOn}
                onChange={handleChange}
                label="Принимаете условия соглашения"
            >
                Оставаться в сети
            </CheckBoxField>
            <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
