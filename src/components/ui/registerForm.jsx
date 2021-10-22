import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        api.professions.fetchAll().then(date => setProfessions(date));
        api.qualities.fetchAll().then(date => setQualities(date));
    }, []);

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
        },
        license: {
            isRequired: {
                message: "Вы не можете использовать наш сервис без лицензионного соглашения"
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
                value={data.profession._id}
                name="profession"
                onChange={handleChange}
                defaultOption="Chose..."
                options={professions}
                errors={errors.profession}
            />
            <RadioField
                label="Выберите пол"
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <MultiSelectField
                label="Выберите ваши качества"
                options={qualities}
                name="qualities"
                onChange={handleChange}
            />
            <CheckBoxField
                name="license"
                value={data.license}
                onChange={handleChange}
                label="Принимаете условия соглашения"
                errors={errors.license}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
