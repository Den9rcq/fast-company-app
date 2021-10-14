import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";

const RegisterForm = () => {
    const [data, setData] = useState({ email: "", password: "", profession: "" });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();

    useEffect(() => {
        api.professions.fetchAll().then(date => setProfessions(date));
    }, []);

    // Изменение данных в data
    const handleChange = ({ target }) => {
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
        console.log(data);
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
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
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
            <SelectField
                label="Выберите свою профессию"
                value={data.profession}
                onChange={handleChange}
                defaultOption="Chose..."
                options={professions}
                error={errors.profession}
            />
            <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
