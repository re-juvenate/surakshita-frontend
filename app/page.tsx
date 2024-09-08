import FilePreview from "@/components/FilePreview";
import { Footer } from "@/components/Footer";
import FormComponent from "@/components/Form";
import { Hero3 } from "@/components/Hero";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import Signin from "@/components/Signin";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero3/>
      <FilePreview/>
      <Footer />
    </div>
  );
}
