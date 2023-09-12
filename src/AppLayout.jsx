import { useContext } from "react";
import NavBar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { languageContext } from "./context/language";

function AppLayout() {
    const { language, setLanguage } = useContext(languageContext);

  return (
    <>
      <div dir={`${language == "EN" ? "ltr" : "rtl"}`}>
        <NavBar />
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
