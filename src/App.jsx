import Bar from "./components/dynamic-bar.jsx";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Explore from "./components/explore-page.jsx";
import Page from "./components/Page.jsx";
import NewPage from "./components/create.jsx";
export default function App() {
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Explore />} />
                <Route path="/scp/:SCP_ITEM" element={<Page />}/>
                <Route path="/scp/create" element={<NewPage />}/>
                <Route path="/scp/update/:SCP_ITEM" element={<NewPage />}/>
            </Routes>
        </BrowserRouter>
        </>
    ) 
}