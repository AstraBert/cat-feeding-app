"use server"

import { createClient } from "@/utils/supabase/server"

interface ActionState {
  success?: boolean
  message?: string
  error?: string
}

export async function PushImage(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    // Extract and process form data
    const picture = formData.get("picture") as File
    const caption = formData.get("caption") as string

    // Validate required fields
    if (!picture || picture.size === 0) {
      return {
        error: "Please select a picture to upload.",
      }
    }

    // Validate file type
    if (!picture.type.startsWith("image/")) {
      return {
        error: "Please upload a valid image file (PNG, JPEG, etc.).",
      }
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (picture.size > maxSize) {
      return {
        error: "Image file is too large. Please upload an image smaller than 5MB.",
      }
    }

    // Generate unique filename
    const fileExt = picture.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `pumito/${fileName}`

    // Upload to Supabase Storage
    const supabase = await createClient()

    const { data: uploadData, error: uploadError } = await supabase.storage.from("pictures").upload(filePath, picture, {
      cacheControl: "3600",
      upsert: false,
    })


    if (uploadError) {
      console.error("Supabase upload error:", uploadError)
      return {
        error: "Sorry, we couldn't upload the image at this time. Please try again later!",
      }
    }

    const { data: urlData } = supabase.storage.from('pictures').getPublicUrl(uploadData.path)

    // Optional: Store metadata in a database table
    // You might want to create a 'pictures' table to store image metadata
    const { error: dbError } = await supabase.from("pictures").insert({
      filePath: uploadData.path,
      url: urlData.publicUrl,
      caption: caption || null,
    })

    if (dbError) {
      console.error("Database error:", dbError)
      // Note: Image was uploaded successfully, but metadata wasn't saved
      // You might want to handle this differently based on your requirements
    }

    // Return success state
    return {
      success: true,
      message: "Picture of Pumito added successfully!",
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return {
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
