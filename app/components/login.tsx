"use client";
import { validateLogin } from "@/utils/validation";
import { useState } from "react";

interface UserDataType {
    name: string;
    phone_number: string;
}

interface ChangePageType {
    newPage: "login" | "vote" | "success" | "admin";
    userData?: UserDataType;
}
interface VotePageProps {
    changePage: (params: ChangePageType) => void;
}

const LoginPage = ({ changePage }: VotePageProps) => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (username && phone) {
            const validation = validateLogin({username: username, phone_number: phone})
            if(typeof validation == "string"){
                alert(validation);
                return
            }
            if (phone == "99999999999") {
                changePage({ newPage: "admin" });
            } else {
                changePage({ newPage: "vote", userData: { name: username, phone_number: phone } });

            }
        }
    }
    return (
        <div className="scrollable-content ">
            <form id="loginPage" className="" onSubmit={handleSubmit}>
                <div className="mt-4.5">
                    <div className="input-group">
                        <label>الاسم الثلاثي للمشارك</label>
                        <i className="fas fa-user"></i>
                        <input type="text" required id="username" placeholder="أدخل اسمك الكامل" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>رقم الهاتف</label>
                        <i className="fas fa-phone"></i>
                        <input type="phone" required id="phone" placeholder="أدخل رقم الهاتف" onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <button className="btn-submit" type="submit">
                        التسجيل والمتابعة <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
                <div className="footer-text">دار سفوان القرآنية<br></br>ينتهي التصويت في اليوم السابع من محرم الحرام</div>
            </form>
        </div>
    )
}

export default LoginPage;