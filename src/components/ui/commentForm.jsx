import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import PropTypes from "prop-types";
import api from "../../api";

const CommentForm = ({ users, pageId }) => {
    const [data, setData] = useState({
        pageId: pageId,
        userId: "",
        content: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.comments.fetchAll().then(data => console.log(data));
    }, [data]);

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
        api.comments.add(data);
        setData({
            pageId,
            userId: "",
            content: ""
        });
    };

    // Проверка при изменениях в data
    useEffect(() => {
        validate();
    }, [data]);

    // Конфигурация отображение ошибок
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Обязательно выберите пользователя"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
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
        <div className="card mb-2">
            <div className="card-body ">
                <form onSubmit={handleSubmit}>
                    <h2>New comment</h2>
                    <SelectField
                        name="userId"
                        onChange={handleChange}
                        options={users}
                        value={data.userId}
                        defaultOption="Выберите пользователя"
                        errors={errors.userId}
                    />
                    <TextField
                        label="Сообщение"
                        type="textarea"
                        onChange={handleChange}
                        name="content"
                        value={data.content}
                        errors={errors.content}
                    />
                    <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
                        Опубликовать
                    </button>
                </form>
            </div>
        </div>
    );
};

CommentForm.propTypes = {
    users: PropTypes.array,
    pageId: PropTypes.string
};

export default CommentForm;
