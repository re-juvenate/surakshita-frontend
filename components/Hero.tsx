import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const Hero3 = () => (
    <div className="w-full px-24 pt-10">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
                <div className="flex gap-4 flex-col">
                    <div>
                        <Badge variant="outline">We&apos;re live!</Badge>
                    </div>
                    <div className="flex gap-4 flex-col">
                        <h1 className="text-customRed font-nyxerin text-3xl md:text-5xl max-w-lg tracking-tighter text-left font-regular">
                          Surakshita
                        </h1>
                        <h2 className="text-l md:text-3xl max-w-lg tracking-tighter text-left font-regular">Your Digital Guardian</h2>
                        <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                        Navigating the digital world with your personal information at stake is risky business. Say goodbye to constant worry about your sensitive data being exposed. Surakshita aims to revolutionize digital privacy, making personal information protection effortless and robust. Our smart AI detects and shields your data, so you can engage online with confidence.

                        </p>
                    </div>
                    <div className="flex flex-row gap-4">
                        {/* <Button size="lg" className="gap-4" variant="outline">
                            Jump on a call <PhoneCall className="w-4 h-4" />
                        </Button> */}
                        <Button size="lg" className="gap-4">
                            Sign up here <MoveRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                {/* <div className="bg-muted rounded-md aspect-square"></div> */}
                <Image src="/media/hero_image.png" alt="hero image" width={450} height={450} className="bg-muted rounded-md aspect-square"/>
            </div>
        </div>
    </div>
);