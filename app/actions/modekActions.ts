"use server";

import { normalizeArabic } from '@/utils/normalizeArabic';
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

interface Mokeb {
    name: string;
    image: File;
    description: string;
}

export const AddNewMokeb = async (mokeb: Mokeb) => {
    const cookiesStore = await cookies();
    const supabase = createClient(cookiesStore);

    const fileExtension = mokeb.image.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const filePath = fileName;

    const uploadImageResult = await supabase.storage.from("mwakeb").upload(filePath, mokeb.image, {cacheControl:"3153600", upsert: false});
    if (uploadImageResult.error) return "Error uploading image: " + uploadImageResult.error.message;

    const getLinkImageResult = supabase.storage.from("mwakeb").getPublicUrl(filePath, {transform: {quality: 100}});
    if (!getLinkImageResult.data?.publicUrl) return "Error getting image UR.";

    const { data, error } = await supabase.from("mwakeb").insert({
        name: mokeb.name,
        image_url: getLinkImageResult.data.publicUrl,
        description: mokeb.description,
    }).select();

    if (error) return "Error inserting mokeb: " + error.message;

    return data;

}



export const getAllMokebs = async ({ from, to }: { from: number, to: number }) => {
    const cookiesStore = await cookies();
    const supabase = createClient(cookiesStore);

    const { data, error, count } = await supabase.from("mwakeb").select("*", { count: "exact" }).range(from, to);
    if (error) return "Error fetching mokebs: " + error.message;

    return { data, count };
}


export const voteMokeb = async ({ id, name, phone_number }: { id: number, name: string, phone_number: string }) => {
    const cookiesStore = await cookies();
    const supabase = createClient(cookiesStore);

    const { data, error } = await supabase.from("votes").insert({ mwkeb_id: id, name: name, phone_number: phone_number }).select("*, mwakeb(name)").single();
    if (error) return `Error While Vote ${error.message}`

    return data;

}


export const searchMokeb = async ({ text, from, to }: { text: string, from: number, to: number }) => {
    const textNromalize = normalizeArabic(text);

    const cookiesStore = await cookies();
    const supabase = createClient(cookiesStore);

    const { data, error, count } = await supabase
        .from("mwakeb")
        .select("*", { count: "exact" })
        .range(from, to)
        .or(`name.ilike.%${text}%,name.ilike.%${textNromalize}%`);
    if (error) return `Error fetching ${text}: ` + error.message;

    return { data, count };
}


export const getAllMokebsWithVotes = async () => {
    const cookiesStore = await cookies();
    const supabase = createClient(cookiesStore);

    const { data, error } = await supabase
        .from("mwakeb")
        .select("id, name, votes(count)")
    if(error) return "Error While Get Data" + error.message;
    return data.sort((a, b) => b.votes[0].count - a.votes[0].count);

}

export const getVoters = async (id: number)=>{
    const cookiesStore = await cookies();
    const supabase = createClient(cookiesStore);

    const { data, error } = await supabase
    .from("votes")
    .select("name, phone_number")
    .eq("mwkeb_id", id)

    
    if(error) return "Error While Get Data" + error.message;
    console.log(data)
    return data;
    
}


export const deleteMokeb = async (id: number) => {
    const cookiesStore = await cookies();
    const supabase = createClient(cookiesStore);

    const { data, error } = await supabase.from("mwakeb").delete().eq("id", id);
    if (error) return "Error deleting mokeb: " + error.message;

    return true;

}


export const retractVote = async (id: number) =>{
    const cookiesStore = await cookies();
    const supabase = createClient(cookiesStore);

    const { data, error } = await supabase.from("votes").delete().eq("id", id);
    if (error) return "Error retracting vote: " + error.message;
    return true;
}