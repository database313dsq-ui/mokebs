"use client"
import Image from "next/image";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";


interface CardData{
    name: string;
    description? : string;
    image_url: string;
    id: number;
}

interface CardType{
    isSelected: boolean;
    setId: (id: number) => void;
    Id: number;
    cardData: CardData;

}

const Card = ({isSelected, setId, Id, cardData}: CardType) => {
    const handleSelect = () => {        
        setId(Id) 
    }
    return (
        <div className={`mokebe-card ${isSelected ? "selected" : ""}`} onClick={handleSelect}>
            <div>
                <Image unoptimized src={cardData.image_url} width={426} height={200} className="mokebe-img" alt="Image"/>
                <div className="mokebe-bottom-bar">
                    <div className="mokebe-info">
                        <h3 className="mokebe-name">{cardData.name}</h3>
                        <p className="mokebe-sub">{cardData.description ? cardData.description : ""}</p>
                    </div>
                    <div className="custom-radio" >{isSelected&& <FaCheck className="text-black text-sm" />}</div>

                </div>
            </div>
        </div>
    )
}

export default Card;