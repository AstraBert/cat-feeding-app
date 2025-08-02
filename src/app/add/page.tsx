import { PushData } from '@/app/add/actions'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <form action={PushData}>
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="text"
                name='quantity'
                placeholder="1/3"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="additionalNotes">Notes</Label>
              <Input
                id="additionalNotes"
                type="text"
                name='additionalNotes'
                placeholder="He didn't eat it all, but he came back to eat it half an hour later"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="wetFood">Wet Food</Label>
              <Checkbox
                id="wetFood"
                name='wetFood'
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dryFood">Dry Food</Label>
              <Checkbox
                id="dryFood"
                name='dryFood'
              />
            </div>
          </div>
      </CardContent>
      <br />
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Add the record!
        </Button>
          <Link href={"/"}>
            <Button type="button" className="w-full" variant={"secondary"}>
            Back to the main page!
            </Button>
          </Link>
      </CardFooter>
      </form>
    </Card>
    </div>
  )
}