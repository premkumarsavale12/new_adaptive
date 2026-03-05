"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Handle module resolution differences (ESM vs CJS)
const DatePickerElement = (DatePicker && DatePicker.default) || DatePicker;

export const getNextThirdFriday = () => {
    const today = new Date();
    const nextMonth = today.getUTCMonth() + 1; // Move to the next month
    const year = today.getUTCFullYear();

    // Handle year overflow (if next month is January of the next year)
    const adjustedYear = nextMonth > 11 ? year + 1 : year;
    const adjustedMonth = nextMonth % 12; // Wrap around to 0 for January

    // Start with the first day of the next month
    let firstDayOfNextMonth = new Date(Date.UTC(adjustedYear, adjustedMonth, 1));
    let firstFriday = new Date(firstDayOfNextMonth);

    // Find the first Friday of the month
    while (firstFriday.getUTCDay() !== 5) {
        firstFriday.setUTCDate(firstFriday.getUTCDate() + 1);
    }

    // Move to the third Friday
    const thirdFriday = new Date(firstFriday);
    thirdFriday.setUTCDate(firstFriday.getUTCDate() + 14);

    return thirdFriday; // Return the Date object
};

export const getNextFriday = (date = new Date()) => {
    const result = new Date(date);
    const day = result.getUTCDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday
    const diff = day <= 5 ? 5 - day : 7 - day + 5; // Days to the next Friday
    result.setUTCDate(result.getUTCDate() + diff);
    return result;
};


// Utility: Check if a date is a third Friday
export const isThirdFriday = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();

    // Start with the first day of the month
    let firstDayOfMonth = new Date(Date.UTC(year, month, 1));
    let firstFriday = new Date(firstDayOfMonth);

    // Find the first Friday of the month
    while (firstFriday.getUTCDay() !== 5) {
        firstFriday.setUTCDate(firstFriday.getUTCDate() + 1);
    }

    // Move to the third Friday
    const thirdFriday = new Date(firstFriday);
    thirdFriday.setUTCDate(firstFriday.getUTCDate() + 14);

    // Check if the input date matches the third Friday
    return (
        date.getUTCFullYear() === thirdFriday.getUTCFullYear() &&
        date.getUTCMonth() === thirdFriday.getUTCMonth() &&
        date.getUTCDate() === thirdFriday.getUTCDate()
    );
};

// export const isFriday = (date) => {
//     if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
//       console.warn('Invalid date passed to isFriday:', date);
//       return false;
//     }
//     return date.getDay() === 5; // `5` represents Friday in JavaScript's `getDay()`
//   };


export const getDefaultFriday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + ((5 - dayOfWeek + 7) % 7)); // Next Friday
    return nextFriday;
};

export const isFriday = (date) => date instanceof Date && date.getDay() === 5;

const CustomDatePicker = ({ defaultDate, onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    // Ensure the minimum selectable date is the next Friday
    const minDate = getNextFriday();

    // Sync defaultDate prop to the local state
    useEffect(() => {
        if (defaultDate) {
            const utcDate = new Date(defaultDate); // Parse UTC string to Date
            if (!isNaN(utcDate.getTime())) {
                setSelectedDate(new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate()));
            }
        }
    }, [defaultDate]);

    // Handle date selection and convert to UTC
    const handleDateChange = (date) => {
        if (date) {
            // Convert the local date to a UTC string
            const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            setSelectedDate(date);
            onDateSelect(utcDate.toISOString().split("T")[0]); // Return YYYY-MM-DD
        } else {
            setSelectedDate(null);
            onDateSelect(null);
        }
    };

    return (
        <DatePickerElement
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={minDate}
            filterDate={isFriday}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="w-[80%]"
        />
    );
};

export default CustomDatePicker;
