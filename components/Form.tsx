"use client"

import React, { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  age: z.number().min(1, {
    message: "Age must be a positive number.",
  }),
  aadhaarCard: z.string().min(1, {
    message: "Aadhaar card file is required.",
  }),
  panCard: z.string().min(1, {
    message: "PAN card file is required.",
  }),
})

export default function FormComponent() {
  const [aadhaarUploaded, setAadhaarUploaded] = useState(false)
  const [panUploaded, setPanUploaded] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      age: 0,
      aadhaarCard: "",
      panCard: "",
    },
  })

  const onSubmit = (data:any) => {
    console.log(data)
  }

  const handleSurakshitaRedirect = (documentType: "aadhaar" | "pan") => {
    const surakshitaWindow = window.open('http://localhost:3000', 'SurakshitaUpload', 'width=600,height=400')
    
    if (surakshitaWindow) {
      setTimeout(() => {
        surakshitaWindow.postMessage({ type: documentType }, 'http://localhost:3000')
      }, 1000);  // Delay of 1 second
    }
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:3000') return

      console.log("Received message:", event.data);  // Debugging log

      const { type, fileName } = event.data
      if (type === 'aadhaar') {
        form.setValue('aadhaarCard', fileName)
        setAadhaarUploaded(true)
      } else if (type === 'pan') {
        form.setValue('panCard', fileName)
        setPanUploaded(true)
      }

      // Don't close the window immediately
      // event.source.close()
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [form])

  return (
    <div className="p-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your first name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your last name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Age" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormDescription>
                  Enter your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="aadhaarCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aadhaar Card</FormLabel>
                <FormControl>
                  <div>
                    <Button type="button" onClick={() => handleSurakshitaRedirect('aadhaar')}>
                      Upload using Surakshita
                    </Button>
                    {aadhaarUploaded && <p className="mt-2 text-sm text-green-600">File uploaded: {field.value}</p>}
                  </div>
                </FormControl>
                {!aadhaarUploaded&&<FormDescription>
                  Upload your Aadhaar card using Surakshita.
                </FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="panCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN Card</FormLabel>
                <FormControl>
                  <div>
                    <Button type="button" onClick={() => handleSurakshitaRedirect('pan')}>
                      Upload using Surakshita
                    </Button>
                    {panUploaded && <p className="mt-2 text-sm text-green-600">File uploaded: {field.value}</p>}
                  </div>
                </FormControl>
                {!panUploaded&&<FormDescription>
                  Upload your PAN card using Surakshita.
                </FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}