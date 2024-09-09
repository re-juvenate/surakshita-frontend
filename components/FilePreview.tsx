"use client"

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface PIIItem {
  id: string;
  category: string;
}

export default function FilePreview() {
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [documentType, setDocumentType] = useState<string>("");
  const [PII, setPII] = useState<PIIItem[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:3000") return;

      console.log("Received message:", event.data);  // Debugging log

      const { type } = event.data;
      setDocumentType(type);
      setUploadStatus(`Received request to upload ${type} document`);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));
      setUploaded(true);
      setUploadStatus("File uploaded successfully");
    }
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);

      try {
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const piiResponse = await response.json();
          setUploadStatus("File uploaded to backend successfully");
          setPII(piiResponse.pii.map((item: any) => ({
            id: item.id,
            category: item.pii[0].category
          })));
          setUploadStatus("Choose PII's to be morphed");
        }
      } catch (error) {
        setUploadStatus("Error uploading file to backend");
      }

      if (window.opener) {
        window.opener.postMessage(
          { type: documentType, fileName: file.name },
          "http://localhost:3000/company"
        );
        setUploadStatus("File information sent to main page");
        window.close();
      }
    }
  };

  const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    if (values.items.length > 0) {
      try {
        const selectedCategories = values.items;
        console.log("Selected PII categories:", selectedCategories);

        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedPII: selectedCategories }),
        });

        if (response.ok) {
          const fileResponse = await response.json();
          setUploadStatus("PII uploaded to backend successfully");
          setFile(fileResponse.file);
          setUploadStatus("Morphed File");
          setTimeout(() => {
            window.close();
          }, 2000);
        }
      } catch (error) {
        setUploadStatus("Error uploading PII to backend");
      }
    } else {
      setUploadStatus("Please select at least one PII to morph");
    }
  }

  return (
    <>
      <div>
        {!uploaded &&
          <div className="p-20">
            <Card>
              <CardHeader>
                <CardTitle>Upload the {documentType} file</CardTitle>
                <CardDescription>Choose the PII to morph/blackout</CardDescription>
              </CardHeader>
              <CardContent>
                <Input type="file" onChange={handleFileChange} accept="image/*,application/pdf" />
                <p>{uploadStatus}</p>
              </CardContent>
            </Card>
          </div>
        }
        {uploaded &&
          <div className="p-20">
            <Card>
              <CardHeader>
                <CardTitle>File Preview</CardTitle>
                <CardDescription>Choose the PII to morph/blackout</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-10 p-2">
                  <div className="">
                    {file && file.type.startsWith('image/') && (
                      <img src={fileUrl} alt="Uploaded file" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    )}
                    {file && file.type === 'application/pdf' && (
                      <embed src={fileUrl} type="application/pdf" width="600" height="400" />
                    )}

                    <p>{uploadStatus}</p>
                    {uploadStatus !== "File uploaded to backend successfully" && (
                      <Button onClick={handleSubmit}>Submit File</Button>
                    )}

                  </div>
                  <div>
                    {<Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="items"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel className="text-base">List of PII detected</FormLabel>
                                <FormDescription>
                                  Select the PII you want to morph.
                                </FormDescription>
                              </div>
                              {PII.map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="items"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item.category)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, item.category])
                                                : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.category
                                                  )
                                                )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                          {item.category}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Submit</Button>
                      </form>
                    </Form>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        }
      </div>
    </>
  );
}