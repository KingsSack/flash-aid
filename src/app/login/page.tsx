"use client";

import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center mb-2">
          <h1 className="text-5xl font-extrabold ml-3 text-foreground">
            Log in or Sign up
          </h1>
        </div>
      </header>

      <main className="w-full max-w-3xl">
        <Form>
          <Label>Email</Label>
          <Input type="text"
          name="email"/>
          <Label>Password</Label>
          <Input type="password"
        name="password"/>
          <Button className="w-full text-lg py-6" onClick={()=>{
            // add user to database
            window.location.href = "/"; // redirect to home page after login
          }}>Submit</Button>
        </Form>
      </main>

    </div>
  );
}