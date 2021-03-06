import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import PropTypes from "prop-types";

const CommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        setData({});
    };

    // Проверка при изменениях в data
    useEffect(() => {
        validate();
    }, [data]);

    // Конфигурация отображение ошибок
    const validatorConfig = {
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
    const isValid = Object.keys(errors).length === 0 && data.content;
    return (
        <div className="card mb-2">
            <div className="card-body ">
                <form onSubmit={handleSubmit}>
                    <h2>New comment</h2>
                    <TextField
                        label="Сообщение"
                        type="textarea"
                        onChange={handleChange}
                        name="content"
                        value={data.content || ""}
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
    onSubmit: PropTypes.func
};

export default CommentForm;
