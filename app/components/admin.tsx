'use client';
import React, { useEffect, useState } from 'react';
import { FaUserShield, FaCloudUploadAlt } from 'react-icons/fa';
import { AddNewMokeb, deleteMokeb, getAllMokebsWithVotes, getVoters } from '../actions/modekActions';
import CardAdmin from './cardAdmin';
import EnhancedToggleSwitch from './toggleSwitch';

interface MokebType {
    name: string;
    image: File;
    description: string;
}

interface MokebDataType {
    id: number;
    name: string;
    votes: { count: number }[];
}
interface ChangePageType {
    newPage: "login" | "vote" | "success" | "admin";
}

interface VotersType {
    name: string;
    phone_number: string;
}
interface ChangePageType {
    newPage: "login" | "vote" | "success" | "admin";
}
interface PageProps {
    changePage: (params: ChangePageType) => void;
}

const AdminPage = ({ changePage }: PageProps) => {
    const [mokebData, setMokebData] = useState<MokebType>({ name: "", image: new File([], ""), description: "" });
    const [idMokebe, setIdMokebe] = useState<number | null>(null)
    const [nameMokeb, setNameMokeb] = useState<string | null>(null)
    const [cardsData, setCardsData] = useState<MokebDataType[] | VotersType[] | null>(null)
    const [isEnable, setIsEnable] = useState<boolean>(false);
    
    const setEnable = () => {
        setIsEnable(!isEnable);
    }
    const saveMokeb = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await AddNewMokeb(mokebData);
        typeof result == "string" ? alert(result) : alert("تمت اضافة الموكب بنجاح.")
        console.log(result);
    };

    const setData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, files } = e.target;
        setMokebData((prev) => ({
            ...prev,
            [id]: id === 'image' ? files?.[0] : value
        }));

    };

    const setInfo = ({ id, name }: { id: number, name: string }) => {
        setIdMokebe(id)
        setNameMokeb(name)
    }

    const fetchData = async () => {
        const res = idMokebe ? await getVoters(idMokebe) : await getAllMokebsWithVotes();
        if (typeof res == "string") {
            alert(res)
            return
        }
        idMokebe ? setCardsData(res as VotersType[]) : setCardsData(res as MokebDataType[])

    }
    useEffect(() => {
        fetchData()
    }, [idMokebe])


    const handleRest = () => {
        setCardsData(null)

        setIdMokebe(null);
        setNameMokeb(null)

    }


    const handleDelete = async (id: number) => {
        const res = await deleteMokeb(id);
        typeof res == "string" && alert(res);
        handleRest()
        alert("تم الحذف بنجاح.")
    }
    return (
        <div id="devPage" className="p-4! text-right" dir="rtl">
            {/* الكلاس dev-badge كما هو، واستبدال الـ <i> بأيقونة React */}
            <span className="dev-badge flex items-center gap-2! w-full py-3! text-[16px]!">
                <FaUserShield /> لوحة الإدارة
            </span>

            <h3 className="mb-[15px]!" style={{ color: 'var(--accent-gold)' }}>
                إدارة واضافة مواكب التطبيق
            </h3>

            <form onSubmit={saveMokeb} className="bg-white/5 p-[15px]! rounded-[10px] mb-[20px]!">
                <h4 className="mb-[10px]! text-[0.9rem]">إضافة موكب جديد</h4>

                {/* تعديل طريقة كتابة الـ input المخفي لتتوافق مع JSX */}
                <input type="hidden" id="editIndex" value="-1" />

                <div className="input-group">
                    <input
                        onChange={(e) => setData(e)}
                        type="text"
                        id="name"
                        placeholder="اسم الموكب"
                        required
                        className="p-[10px]! w-full bg-transparent border border-gray-600 rounded"
                    />
                </div>

                <div className="input-group mt-3!">
                    <input
                        onChange={(e) => setData(e)}
                        type="text"
                        id="description"
                        placeholder="وصف الخدمة"
                        className="p-[10px]! w-full bg-transparent border border-gray-600 rounded"
                    />
                </div>

                <div className="input-group mt-3! flex flex-col gap-1!">
                    <label className="text-sm text-gray-300">صورة الموكب</label>
                    <input
                        onChange={(e) => setData(e)}
                        type="file"
                        id="image"
                        accept="image/*"
                        required
                        className="p-[5px]! bg-none border-none file:ml-4! file:py-2! file:px-4! file:rounded file:border-0 file:text-sm file:bg-gray-700 file:text-white pointer-events-auto"
                    />
                </div>

                {/* الكلاس btn-submit كما هو، وتحويل onclick إلى onClick وتحديث الأيقونة */}
                <button
                    className="btn-submit mt-4! p-[10px]! text-[0.95rem] flex items-center justify-center gap-2! w-full"
                    type={"submit"}
                >
                    حفظ في القاعدة السحابية <FaCloudUploadAlt />
                </button>
            </form>
            <div className='w-full flex-col gap-4! flex items-center justify-center my-4!'>
                <EnhancedToggleSwitch isEnable={isEnable} setEnable={setEnable}/>
                <button
                    className="btn-submit w-full text-center"
                    onClick={() => changePage({ newPage: "login" })}
                    style={{ background: '#333', border: '1px solid #555' }}
                >
                    خروج
                </button>
            </div>
            <div className='flex w-full flex-col gap-2!'>

                <h4 className="mb-2.5! text-[0.9rem]" style={{ color: 'var(--accent-gold)' }}>
                    {
                        !idMokebe ? "المواكب الحالية" :
                            <div className='flex gap-5!'>
                                <button className='text-(--accent-red) font-bold cursor-pointer' onClick={handleRest}>
                                    رجوع
                                </button>
                                المصوتين لصاحب {nameMokeb}
                            </div>
                    }
                </h4>

                <div id="devMowakebList" className="min-h-[50px]! flex flex-col gap-3!">
                    {
                        !idMokebe ?
                            (cardsData as MokebDataType[])?.map((mokeb, index) => (
                                <CardAdmin
                                    key={index}
                                    id={mokeb.id}
                                    name={mokeb.name}
                                    votes={mokeb.votes?.[0]?.count ?? 0}
                                    type='mokeb'
                                    setId={setInfo}
                                    onDelete={handleDelete}
                                />
                            ))
                            :
                            (cardsData as VotersType[])?.map((voter, index) => (
                                <CardAdmin
                                    key={index}
                                    id={index}
                                    name={voter.name}
                                    phone_number={voter.phone_number}
                                    type='voter'
                                    setId={setInfo}
                                />
                            ))
                    }
                </div>
            </div>


        </div>
    );
};

export default AdminPage;