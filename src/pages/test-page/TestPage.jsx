import React, { useState } from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TestPage.style.css";
// Chart.js 플러그인 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
        {
            label: "Votes",
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                "#ff6384",
                "#36a2eb",
                "#ffcd56",
                "#4bc0c0",
                "#9966ff",
            ],
            borderWidth: 1,
        },
    ],
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
    },
};

const TestPage = () => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Bootstrap 테스트</h1>
            <button className="btn btn-primary mb-4">부트스트랩 버튼</button>

            <h2 className="mb-3">Chart.js 테스트</h2>
            <div style={{ maxWidth: "600px", marginBottom: "2rem" }}>
                <Bar data={chartData} options={chartOptions} />
            </div>

            <h2 className="mb-3">캘린더 테스트</h2>
            <Calendar onChange={handleDateChange} value={date} />
        </div>
    );
};

export default TestPage;
