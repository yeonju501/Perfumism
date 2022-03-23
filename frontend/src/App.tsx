import Router from "routes/Router";
import GlobalStyle from "styles/globalstyle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "components/footer/Footer";

function App() {
	return (
		<>
			<GlobalStyle />
			<Router />
			<ToastContainer style={{ fontSize: "1.4rem" }} />
			<Footer />
		</>
	);
}

export default App;
