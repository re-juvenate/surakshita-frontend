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

export default function FilePreview() {
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [documentType, setDocumentType] = useState<string>("");

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

  const handleSubmit = () => {
    if (file && window.opener) {
      window.opener.postMessage(
        { type: documentType, fileName: file.name },
        "http://localhost:3000/company"
      );
      setUploadStatus("File information sent to main page");
      window.close();
    }
  };

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
                  </div>
                  <div>
                    <p>List of PII detected</p>
                    <p>{uploadStatus}</p>
                    <Button onClick={handleSubmit}>Submit File</Button>
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