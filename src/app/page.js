import Render from "../app/component/Render-Object.jsx";
import Browser from "./component/Browser.jsx";
import css from "./page.module.css";

async function HomePage() {
  // Fetch data from the correct API route
  const res = await fetch("http://localhost:3000/api");
  const data = await res.json();
  console.log(data);
  // Display the data on the page
  return (
    <>
      <div className={css.main}>
        <h1>FileMaker Data</h1>
        <br />
        <div className={css.description}>
          <h3>Rendering col_1 and col_2 on the first record</h3>
          <p>
            <em>This was hard coded as variables in the api rote file</em>
          </p>
          <p>Column 1: {data.col_1}</p>
          <p>Column 2: {data.col_2}</p>
        </div>
        <br />
        <hr />
        <br />
        <Render object={data.thisObject} />
        <br />
        <br />
      </div>
      <Browser />
    </>
  );
}

export default HomePage;
