"use server"

import { createClient } from "@/utils/supabase/server"

interface ActionState {
  success?: boolean
  message?: string
  error?: string
}

export async function PushData(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    // Extract and process form data
    const data = {
      quantity: formData.get("quantity") as string,
      additionalNotes: formData.get("additionalNotes") as string,
      wetFood: formData.get("wetFood") === "on", // Convert checkbox to boolean
      dryFood: formData.get("dryFood") === "on", // Convert checkbox to boolean
    }

    // Validate required fields
    if (!data.quantity) {
      return {
        error: "Please fill in all required fields.",
      }
    }

    // Validate that at least one food type is selected
    if (!data.wetFood && !data.dryFood) {
      return {
        error: "Please select at least one food type (wet or dry).",
      }
    }

    // Insert data into Supabase
    const supabase = await createClient()
    const { error } = await supabase.from("feedings").insert(data)

    if (error) {
      console.error("Supabase error:", error)
      return {
        error: "Sorry, we couldn't upload the record at this time. Please try again later!",
      }
    }

    // Return success state
    return {
      success: true,
      message: "Feeding record added successfully!",
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return {
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
