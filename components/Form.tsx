"use client"

import React, { useState } from "react"
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  const handleSurakshitaRedirect = (documentType: 'aadhaar' | 'pan') => {
    // Implement the redirection to Surakshita platform here
    // For demonstration, we'll use a timeout to simulate the process
    setTimeout(() => {
      if (documentType === 'aadhaar') {
        setAadhaarUploaded(true)
        form.setValue('aadhaarCard', 'aadhaar_file.pdf')
      } else {
        setPanUploaded(true)
        form.setValue('panCard', 'pan_file.pdf')
      }
    }, 2000)
  }

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
                <FormDescription>
                  Upload your Aadhaar card using Surakshita.
                </FormDescription>
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
                <FormDescription>
                  Upload your PAN card using Surakshita.
                </FormDescription>
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