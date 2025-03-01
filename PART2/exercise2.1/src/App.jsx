const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
};

const Part = ({ part }) => {
  return (
    <li>
      {part.name} ({part.exercises} exercises)
    </li>
  );
};

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((s, p) => {
    console.log('what is happening', s, p);
    return s + p.exercises;
  }, 0);
  
  return <p>Total of {totalExercises} exercises</p>;
};


const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  };

  return <Course course={course} />;
};

export default App;
