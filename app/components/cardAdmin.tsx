

interface CardType {
    id?: number;
    name: string;
    votes?: number;
    type: "mokeb" | "person";
    setId: ({id, name} : {id: number, name: string}) => void;
    phone_number?: string;
}

const CardAdmin = ({ id, name, votes, type, setId, phone_number }: CardType) => {

    const ChangeId = () => {
        console.log("change")
        if (type == "mokeb") {
            id && setId({id, name})
        }
    }
    return (
        <div className="mokebe-card" onClick={ChangeId}>
            <div className="flex justify-between items-center px-4! py-3!">

                <div className="mokebe-name">
                    {name}
                </div>
                <div className="mokebe-sub">
                    {votes? votes : phone_number}
                </div>
            </div>
        </div>
    )
}


export default CardAdmin;