import * as React from 'react';
import "./styles.css";

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div className="App">
      <div className="container">
        <div className="title">Welcome to UET Review</div>
      </div>
    </div>
  );
};

export default App;
