"use client"
import { CiSearch } from "react-icons/ci";
import Card from "./card";
import { useState, useEffect } from "react";
import { getAllMokebs, searchMokeb, voteMokeb } from "../actions/modekActions";
import Pagination from "./pagination";
interface Cards {
    id: number;
    name: string;
    description?: string;
    image_url: string;
}
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
    userData: UserDataType;
}
const VotePage = ({ changePage, userData }: VotePageProps) => {
    const handleSubmit = async () => {
        if (!selectedId || !userData) {
            alert("لا يمكنك التصويت، يجب ان تختار احد المواكب.")
            return null
        }
        const res = await voteMokeb({ name: userData.name, phone_number: userData.phone_number, id: selectedId as number })
        if (typeof res == "string") {
            alert("هناك مشكلة، حاول مرة اخرى.")
        }

        const data = { isVote: true, name: res.mwakeb.name }
        const jsonString = JSON.stringify(data);
        localStorage.setItem("user", jsonString);
        changePage({ newPage: "success" });
    }
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [cards, setCards] = useState<Cards[] | null>(null);
    const [searchInput, setSearchInput] = useState<string>("")
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(1)



    const from = (page - 1) * limit;
    const to = from + limit;
    const fetchCards = async () => {

        const res = searchInput ?
            await searchMokeb({ text: searchInput, from: from, to: to })
            : await getAllMokebs({ from: from, to: to });
        if (typeof res == "string") {
            alert(res)
            return
        };
        const { data, count } = res;
        setCards(data as Cards[]);
        const total = Math.ceil(count as number / limit)
        setTotalPage(total)

    }
    useEffect(() => {
        fetchCards()
    }, [page])

    const handleCardSelect = (id: number) => {
        setSelectedId(id);
    }

    const onNext = async () => {
        setPage((prev) => prev + 1);
    }
    const onPrev = () => {
        setPage((prev) => prev - 1);
    }

    useEffect(() => {
        page === 1 ? fetchCards() : setPage(1)
    }, [searchInput])


    return (
        <div id="votePage" className="page relative w-full">

            <div className="w-full flex mb-6! items-center justify-center">
                <p className="text-center text-(--accent-gold)" >يجرى اختيار الموكب الذي تراه يستحق لقب الأجمل لهذا العام:</p>
            </div>
            <div className="search-box w-full relative">
                <CiSearch className=" text-xl absolute top-1/2 -translate-y-1/2 right-3.75" style={{ "color": "var(--accent-gold)" }} />
                <input type="text" id="searchInp" placeholder="ابحث عن الموكب هنا..." onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            <div className="mowakeb-list" id="mowakebListContainer">
                {cards?.map((card) => (
                    <Card key={card.id} Id={card.id} isSelected={selectedId === card.id} setId={handleCardSelect} cardData={card} />
                ))}
            </div>
            <div className="w-full flex items-center justify-center py-3!">

                <Pagination currentPage={page} totalPages={totalPage} onNext={onNext} onPrev={onPrev} />
            </div>
            <div className=" px-3! py-2! rounded flex items-center justify-center w-full max-w-112.5 ">

                <button onClick={handleSubmit} className="btn-submit mt-5 max-w-100" >إرسال صوتي وتأكيد الاختيار </button>

            </div>
        </div>
    )
}

export default VotePage;