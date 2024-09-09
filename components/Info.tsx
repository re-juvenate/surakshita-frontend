'use client'; // Ensure this is a client-side component

import { useRef, useLayoutEffect } from 'react'; // UseLayoutEffect to avoid SSR issues
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

export default function Info() {
    const infoRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (infoRef.current) {
            // GSAP animation triggered on scroll
            gsap.fromTo(
                infoRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: infoRef.current, 
                        start: 'top 80%', 
                        toggleActions: 'play none none reverse', 
                    },
                }
            );
        }
    }, []);

    return (
        <div className="w-full pb-5 px-5 bg-foreground text-background">
            <div className="container mx-auto">
                <div ref={infoRef} className="info-container flex">
                    <div className="w-1/2">
                        <h1 className='text-4xl font-bold mb-4'>Intelligent PII Detection</h1>
                        <p className="mb-8">
                        Our advanced AI algorithms scan uploaded documents and data inputs to identify potential PII, alerting users before sensitive information is shared unnecessarily.
                        </p>
                    </div>
                    <div className="w-1/2">
                        <img src="path/to/your/image.jpg" alt="Product Image" className="product-image" />
                    </div>
                </div>

                <div ref={infoRef} className="info-container flex">
                    <div className="w-1/2">
                        <h1 className='text-4xl font-bold mb-4'>Smart Redaction</h1>
                        <p className="mb-8">
                        When PII is detected, Surakshita offers intelligent redaction options, allowing users to mask or remove sensitive data while preserving document integrity.
                        </p>
                    </div>
                    <div className="w-1/2">
                        <img src="path/to/your/image.jpg" alt="Product Image" className="product-image" />
                    </div>
                </div>

                <div ref={infoRef} className="info-container flex">
                    <div className="w-1/2">
                        <h1 className='text-4xl font-bold mb-4'>User-Centric Control</h1>
                        <p className="mb-8">
                        We believe in putting control back in the hands of users. With Surakshita, you decide what information to share and when.
                        </p>
                    </div>
                    <div className="w-1/2">
                        <img src="path/to/your/image.jpg" alt="Product Image" className="product-image" />
                    </div>
                </div>
                <div ref={infoRef} className="info-container flex">
                    <div className="w-1/2">
                        <h1 className='text-4xl font-bold mb-4'>Compliance Made Easy</h1>
                        <p className="mb-8">
                        Our system is designed with data protection regulations in mind, helping organizations meet their compliance obligations effortlessly.
                        </p>
                    </div>
                    <div className="w-1/2">
                        <img src="path/to/your/image.jpg" alt="Product Image" className="product-image" />
                    </div>
                </div>
                <div ref={infoRef} className="info-container flex">
                    <div className="w-1/2">
                        <h1 className='text-4xl font-bold mb-4'>Seamless Integration</h1>
                        <p className="mb-8">
                        Surakshita integrates smoothly with existing digital services, enhancing privacy without disrupting user experience.
                        </p>
                    </div>
                    <div className="w-1/2">
                        <img src="path/to/your/image.jpg" alt="Product Image" className="product-image" />
                    </div>
                </div>
            </div>
        </div>
    );
}
