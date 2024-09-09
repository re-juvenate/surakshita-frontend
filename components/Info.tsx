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
                        <h1 className='text-4xl font-bold mb-4'>About Our Product</h1>
                        <p className="mb-8">
                            Our product is designed to revolutionize the way you handle your daily tasks. With cutting-edge technology and user-friendly design, it offers unparalleled performance and reliability.
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
