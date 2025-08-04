"use client"

import { useActionState } from "react"
import { PushImage } from "@/app/picture/actions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"

interface ActionState {
  success?: boolean
  message?: string
  error?: string
}

export default function AddFeedingPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(PushImage, {})

  return (
    <div className="flex items-center justify-center min-h-full p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Add a Picture</CardTitle>
          <CardDescription>Upload a picture of our beloved Pumito!</CardDescription>
        </CardHeader>

        {/* Success Banner */}
        {state.success && (
          <div className="px-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {state.message || "Picture added successfully!"}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Error Banner */}
        {state.error && (
          <div className="px-6">
            <Alert className="border-red-200 bg-red-50">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{state.error}</AlertDescription>
            </Alert>
          </div>
        )}

        <form action={formAction}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" name="picture" required disabled={isPending} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="caption">Caption</Label>
                <Input
                  id="caption"
                  type="text"
                  name="caption"
                  placeholder="Pumito doing very weird stuff (as usual)"
                  disabled={isPending}
                />
              </div>
            </div>
          </CardContent>
          <br />
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Adding the image..." : "Add the image!"}
            </Button>
            <Link href="/">
              <Button type="button" className="w-full" variant="secondary" disabled={isPending}>
                Back to the main page!
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
