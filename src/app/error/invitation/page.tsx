'use client'

import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>😭Maximum Number of Invitations Reached😭</AlertTitle>
        <AlertDescription>
          <p>We are very sorry, but the maximum number of invitation for this period has been reached🙁</p>
          <p>We encourage you to check again in a few weeks!✨</p>
        </AlertDescription>
      </Alert>
    </div>
    </div>
  )
}
