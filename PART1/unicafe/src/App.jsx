import { useState } from 'react';

// Componente para mostrar una línea de estadísticas
const StatisticLine = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
);

// Componente para mostrar las estadísticas
const Statistics = ({ bueno, neutral, malo }) => {
  const total = bueno + neutral + malo;
  const promedio = total === 0 ? 0 : (bueno - malo) / total;
  const promedioPositivo = total === 0 ? '0%' : `${((bueno / total) * 100).toFixed(1)}%`;

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <h1>Statistics</h1>
      <StatisticLine text="bueno" value={bueno}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="malo" value={malo}/>
      <StatisticLine text="total" value={total}/>
      <StatisticLine text="promedio" value={promedio}/>
      <StatisticLine text="positivo" value={promedioPositivo}/>
    </div>
  );
};

const App = () => {
  const [bueno, setbueno] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [malo, setmalo] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setbueno(bueno + 1)}>bueno</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setmalo(malo + 1)}>malo</button>
      <Statistics bueno={bueno} neutral={neutral} malo={malo}/>
    </div>
  );
};

export default App;
