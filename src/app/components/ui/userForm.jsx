import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory } from "react-router-dom";
import { useQuality } from "../../hooks/useQuality";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";

const UserForm = ({ user }) => {
    const [data, setData] = useState({
                                         ...user,
                                         name: user.name,
                                         email: user.email ? user.email : "",
                                         profession: user.profession,
                                         sex: user.sex,
                                         qualities: user.qualities
                                     });
    const [errors, setErrors] = useState({});
    const { professions } = useProfession();
    const history = useHistory();
    const { qualities } = useQuality();
    const { createUser } = useAuth();

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
        const newData = { ...data, qualities: data.qualities.map(q => q._id) };
        createUser(newData);
        history.push(`/users/${user._id}`);
    };

    // Проверка при изменениях в data
    useEffect(() => {
        validate();
    }, [data]);

    // Конфигурация отображение ошибок
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введён не корректно"
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
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                errors={errors.name}
            />
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                errors={errors.email}
            />
            <SelectField
                label="Выберите свою профессию"
                value={data.profession}
                onChange={handleChange}
                defaultOption="Chose..."
                options={professions}
                errors={errors.profession}
                name="profession"
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
                // defaultValue={data.qualities.map(getQuality)}
            />
            <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
                Обновить
            </button>
            <button
                className="btn btn-danger w-100 mt-3 mx-auto"
                onClick={() => history.push(`/users/${user._id}`)}
            >
                Назад
            </button>
        </form>
    );
};
UserForm.propTypes = {
    user: PropTypes.object
};

export default UserForm;
