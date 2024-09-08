"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { useState } from "react";
import { Input } from "./ui/input";
import ImagePreview from "./ImagePreview";

export default function FilePreview() {
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));
      setUploaded(true);
      uploadFile(selectedFile);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://your-api-endpoint.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <div>
        {!uploaded && <Input type="file" onChange={handleFileChange} />}
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
                    {/* Add more file type handling as needed */}
                  </div>
                  <div>
                    <p>List of PII detected</p>
                  </div>
                </div>
              </CardContent>
              {/* <CardFooter>
              <p>Card Footer</p>
            </CardFooter> */}
            </Card>
          </div>
        }
      </div>
    </>
  );
}