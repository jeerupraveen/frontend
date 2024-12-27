import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
  return (<div className="absolute inset-0 flex items-center justify-center">
    <Card className="w-[500px] h-[300px]">
      <CardHeader>
        <CardTitle className="text-center">SIGNIN</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4 h-full text-font-red">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">email</Label>
              <Input id="name" placeholder="Enter Your Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">password</Label>
              <Input id="name" placeholder="Enter Your password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between bg-red-500">
        <Button variant="outline">Login</Button>
        <CardDescription></CardDescription>
      </CardFooter>
    </Card>
  </div>
  )
}
