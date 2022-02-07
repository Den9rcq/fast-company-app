export const getTimeDisplay = (time) => {
    const currentTime = new Date();
    const dateTime = new Date(time);
    const dateYear = dateTime.getFullYear();
    const dateMonth = zero(dateTime.getMonth() + 1);
    const dateDay = zero(dateTime.getDay());
    const dateHours = zero(dateTime.getHours());
    const dateMinutes = zero(dateTime.getMinutes());
    const differenceTimeMinutes = (currentTime - dateTime) / 1000 / 60;

    if (differenceTimeMinutes <= 1) return "1 минуту назад";
    else if (differenceTimeMinutes > 1 && differenceTimeMinutes <= 5) return "5 минут назад";
    else if (differenceTimeMinutes > 5 && differenceTimeMinutes <= 10) return "10 минут назад";
    else if (differenceTimeMinutes > 10 && differenceTimeMinutes <= 30) return "30 минут назад";
    else if (differenceTimeMinutes > 30 && differenceTimeMinutes / 60 <= 24) return `${dateHours}:${dateMinutes}`;
    else if (differenceTimeMinutes / 60 > 24 && differenceTimeMinutes / 60 / 24 <= 365) return `${dateDay}.${dateMonth}`;
    else if (differenceTimeMinutes / 60 / 24 > 365) return `${dateDay}.${dateMonth}.${dateYear}`;
};

const zero = (number) => {
    if (number >= 1 && number < 10) {
        return `0${number}`;
    } else {
        return number;
    }
};
