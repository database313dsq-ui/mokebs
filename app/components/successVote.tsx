"use cleint"
import { CiCircleCheck } from "react-icons/ci";
import { useEffect, useState } from "react";
import RetractVoteButton from "./retractButton";
import { retractVote } from "../actions/modekActions";


interface UserDataType {
    name: string;
    phone_number: string;
}

interface ChangePageType {
    newPage: "login" | "vote" | "success" | "admin";
    userData?: UserDataType;
}
interface ChangePageProps {
    changePage: (params: ChangePageType) => void;
}


const SuccessVotePage = ({changePage}: ChangePageProps) => {
    const [name, setName] = useState<string>("")
    const [id, setId] = useState<number | null>(null)
    useEffect(() => {
        const data = localStorage.getItem("user");
        const dataJSON = data && JSON.parse(data as string);
        dataJSON && setName(dataJSON.name)
        dataJSON?.id && setId(dataJSON.id)
    }, [])

    const handleRetractVote = async () => {
        if (!id) return;
        const res = await retractVote(id);
        if (typeof res === "string") {
            alert(res);
            return;
        }
        alert("تم إلغاء صوتك بنجاح.");
        localStorage.removeItem("user");
        changePage({ newPage: "login" });
    };

    return (
        <div id="successPage">
            <div className="success-wrapper">
                <div className="success-icon flex items-center justify-center" style={{ textAlign: "center", fontSize: "3rem", color: "var(--accent-gold)", marginBottom: "10px" }}>
                    <CiCircleCheck />
                </div>
                <h2 style={{ textAlign: "center" }}>تم قبول صوتك بنجاح</h2>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "5px", textAlign: "center" }}>لقد قمت بالتصويت لصالح:</p>
                <div id="targetMokebName" style={{ background: "rgba(184, 145, 70, 0.1)", padding: "15px", borderRadius: "8px", border: "1px dashed var(--accent-gold)", color: "var(--accent-gold)", fontWeight: "bold", margin: "15px 0", textAlign: "center" }}>{name}</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center" }}>شكرًا لمشاركتك المتميزة وتقبل الله أعمالكم.</p>
                <div className="flex justify-center mt-6!">

                    {id && <RetractVoteButton onRetract={handleRetractVote} />}
                </div>
            </div>
            <div className="footer-text" style={{ "color": "var(--accent-red)", "marginTop": "30px" }}>أعظم الله أجورنا وأجوركم بمصابنا بالحسين (ع)<br></br>دار سفوان القرآنية</div>
        </div>
    )
}


export default SuccessVotePage;