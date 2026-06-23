import { deleteMokeb } from "../actions/modekActions";


interface CardType {
    id?: number;
    name: string;
    votes?: number;
    type: "mokeb" | "voter";
    setId: ({ id, name }: { id: number, name: string }) => void;
    phone_number?: string;
    onDelete?: (id: number) => void;
}

const CardAdmin = ({ id, name, votes, type, setId, phone_number, onDelete }: CardType) => {

    const ChangeId = () => {
        console.log("change")
        if (type == "mokeb") {
            id && setId({ id, name })
        }
    }

    const handleDelete = () => {
        id && onDelete?.(id as number);

    }
    return (
        <div className="mokebe-card" onClick={ChangeId}>
            <div className="flex justify-between items-center px-4! py-3!">

                <div className="mokebe-name">
                    {name}
                </div>
                <div className="mokebe-sub flex gap-2!">
                    <button className="font-bold cursor-pointer" onClick={handleDelete}>
                        حذف
                    </button>
                    <div>
                        {votes ? votes : phone_number}

                    </div>
                </div>
            </div>
        </div>
    )
}


export default CardAdmin;