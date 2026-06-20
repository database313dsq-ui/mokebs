

export const validateLogin = ({ username, phone_number }: { username: string, phone_number: string }) => {
    const userSplit = username.trim().split(/\s+/); 

    if (userSplit.length < 3) return "الاسم غير كامل.";

    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(phone_number)) {
        return "رقم الهاتف خاطئ، يجب أن يتكون من 11 رقماً.";
    }

    return true;
}
