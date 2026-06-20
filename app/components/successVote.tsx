"use cleint"
import { CiCircleCheck } from "react-icons/ci";
import { useEffect, useState } from "react";


const SuccessVotePage = () => {
    const [name, setName] = useState<string>("")
    useEffect(()=>{
        const data = localStorage.getItem("user");
        const dataJSON = JSON.parse(data as string);
        setName(dataJSON.name)
    },[])
    return (
        <div id="successPage">
            <div className="success-wrapper">
                <div className="success-icon flex items-center justify-center" style={{ textAlign: "center", fontSize: "3rem", color: "var(--accent-gold)", marginBottom: "10px" }}>
                    <CiCircleCheck/>
                </div>
                <h2 style={{ textAlign: "center" }}>تم قبول صوتك بنجاح</h2>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "5px", textAlign: "center" }}>لقد قمت بالتصويت لصالح:</p>
                <div id="targetMokebName" style={{ background: "rgba(184, 145, 70, 0.1)", padding: "15px", borderRadius: "8px", border: "1px dashed var(--accent-gold)", color: "var(--accent-gold)", fontWeight: "bold", margin: "15px 0", textAlign: "center" }}>{name}</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center" }}>شكرًا لمشاركتك المتميزة وتقبل الله أعمالكم.</p>
            </div>
            <div className="footer-text" style={{"color": "var(--accent-red)", "marginTop": "30px"}}>أعظم الله أجورنا وأجوركم بمصابنا بالحسين (ع)<br></br>دار سفوان القرآنية</div>
        </div>
    )
}


export default SuccessVotePage;