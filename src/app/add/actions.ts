'use server'

import { createClient } from '@/utils/supabase/server';

export async function PushData(formData: FormData) {
    const data = {
        quantity: formData.get('quantity') as string,
        additionalNotes: formData.get('additionalNotes') as string,
        wetFood: formData.get('wetFood') as unknown,
        dryFood: formData.get('dryFood') as unknown,
    }
    const supabase = await createClient();
    const { error } = await supabase.from("feedings").insert(data)
    if (error) {
        console.log("Sorry, we couldn't upload the record at this time, try again later!")
    }
}