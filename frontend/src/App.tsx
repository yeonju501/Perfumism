import Router from "routes/Router";
import GlobalStyle from "styles/globalstyle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<GlobalStyle />
			<Router />
			<ToastContainer style={{ fontSize: "1.4rem" }} />
		</>
	);
}

export default App;
