import { Route, Routes } from 'react-router-dom';
import Form from './Form.js';
import sizeChartImage from './sizechart.jpeg';

function Error() {
    return <h1>Oops! Page not found!</h1>;
}

function SizeChart() {
    return (
        <>
            <h1>Size Chart </h1>
            <img src={sizeChartImage} alt="Size Chart for Kaftans"></img>
        </>
    );

}


function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Form />} exact />
                <Route path="/sizeChart" element={<SizeChart />} />
                <Route component={Error} />
            </Routes>
        </main>
    )
}

export default App;