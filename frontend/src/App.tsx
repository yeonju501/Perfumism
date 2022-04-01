import Router from "routes/Router";
import GlobalStyle from "styles/globalstyle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "components/footer/Footer";
import styled from "styled-components";

function App() {
	return (
		<>
			<Main>
				<GlobalStyle />
				<Router />
				<ToastContainer style={{ fontSize: "1.4rem" }} />
			</Main>
			<Footer />
		</>
	);
}

export default App;

const Main = styled.main`
	min-height: 100vh;
`;
