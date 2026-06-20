
import { FaMoon } from "react-icons/fa6";
import { CiSun } from "react-icons/ci";

interface HeaderType {
    theme: "dark" | "light";
    changeTheme: (theme: "dark" | "light") => void;
}

const Header = ({theme,changeTheme}:HeaderType) => {
    return (
        <>
            <button className="theme-toggle" onClick={() => changeTheme(theme === "light" ? "dark" : "light")}>
                {theme === "light" ? <CiSun /> : <FaMoon />}
            </button>
            <div className="decor-top">◆ ❖ ◆</div>
            <div className="header-section">
                <h1>المسابقة السنوية الأولى</h1>
                <p>لأجمل موكب خدمي حسيني</p>
            </div>
        </>
    )
}

export default Header;