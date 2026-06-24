"use client"
import { useState, useEffect } from "react";
import LoginPage from "./components/login";
import VotePage from "./components/vote";
import SuccessVotePage from "./components/successVote";
import AdminPage from "./components/admin";
import Header from "./components/header";

interface UserDataType {
  name: string;
  phone_number: string;
}

interface ChangePageType {
  newPage: "login" | "vote" | "success" | "admin";
  userData?: UserDataType;
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [page, setPage] = useState<"login" | "vote" | "success" | "admin">("login");
  const [userData, setUserData] = useState<UserDataType | undefined>({ name: "", phone_number: "" })

  const handlePageChange = ({ newPage, userData }: ChangePageType) => {
    setPage(newPage);
    if (userData) {
      setUserData(userData);
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("user");
    const dataJSON = JSON.parse(data as string);
    if (dataJSON?.isVote) {
      handlePageChange({ newPage: "success" })
    }
  }, [])

  const changeTheme = (theme: "dark" | "light")=>{
    setTheme(theme)
  }
  return (
    <div dir="rtl" data-theme={theme} className={"w-full h-full body"}>

      <div className=" overflow-y-auto! h-full">
        <div id="particles-js"></div>
        <div className="phone-container overflow-y-auto! h-full">
          <Header theme={theme} changeTheme={changeTheme}/>

          {page === "login" ? <LoginPage changePage={handlePageChange} /> : page === "admin" ? <AdminPage changePage={handlePageChange}/> : page === "vote" ? <VotePage userData={userData as UserDataType} changePage={handlePageChange} /> : <SuccessVotePage changePage={handlePageChange}/>}

          <div className="w-full flex flex-col">
              <span className="text-(--accent-gold) text-sm">بواسطة:</span>
              <span className="text-(--accent-gold) text-sm">مسلم هاشم </span>
              <span className="text-(--accent-gold) text-sm">حسين خالد</span>
          </div>
        </div>
      </div>
    </div>

  );
}
