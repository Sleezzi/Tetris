import { useRouteError } from "react-router-dom";
import "../css/Error.css"
function Error() {
  if (localStorage.getItem("theme") === undefined || localStorage.getItem("theme") === null) localStorage.setItem("theme", "dark")
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  }
  const error = useRouteError();
  console.error(error);
  return <>
    <div id="error-page">
      <div>
        <h1>Oops!</h1>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  </>;
};

export default Error;