import React from "react";
import Header from "./Header";
// 1. We put together the App component
// 2. We made sure that is is always displayed as the root component of React router application
// 3. The App component shows the Header and any other React components that are being provided by React router
const App = (props) => {
  // We want to show a header component at all times and if the app shows any children to display by ReactRouter we want to make sure that we display those as well
  // If react router is trying to make sure we show anything we can take care of that with the props.children

  return (
    // The className container helps MaterializeUI work with the row and cols
    <div className="container">
      {/* The header will be the same but the props.children will change depending on where the user navigates */}
      <Header />
      {props.children}
    </div>
  );
};

export default App;
