'use client'; // Ensure this is a client-side component

import { useRef, useLayoutEffect } from 'react'; // UseLayoutEffect to avoid SSR issues
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

export default function Info() {
    const sectionRefs = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        sectionRefs.current.forEach((section) => {
            if (section) {
                // GSAP animation triggered on scroll
                gsap.fromTo(
                    section,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.75,
                        ease: 'power3.inOut',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        });
    }, []);

        return (
        <div className="w-full pb-5 px-16 bg-foreground text-background"> {/* Increased horizontal padding */}
            <div className="container mx-auto">
                {[
                    {
                        title: 'Intelligent PII Detection',
                        description: 'Our advanced AI algorithms scan uploaded documents and data inputs to identify potential PII, alerting users before sensitive information is shared unnecessarily.',
                        image: 'media/folder.png',
                    },
                    {
                        title: 'Smart Redaction',
                        description: 'When PII is detected, Surakshita offers intelligent redaction options, allowing users to mask or remove sensitive data while preserving document integrity.',
                        image: 'media/tool.png',
                    },
                    {
                        title: 'User-Centric Control',
                        description: 'We believe in putting control back in the hands of users. With Surakshita, you decide what information to share and when.',
                        image: 'media/share.png',
                    },
                    {
                        title: 'Compliance Made Easy',
                        description: 'Our system is designed with data protection regulations in mind, helping organizations meet their compliance obligations effortlessly.',
                        image: 'media/locker.png',
                    },
                    {
                        title: 'Seamless Integration',
                        description: 'Surakshita integrates smoothly with existing digital services, enhancing privacy without disrupting user experience.',
                        image: 'media/rocket.png',
                    },
                ].map((section, index) => (
                    <div
                        key={index}
                        ref={(el: HTMLDivElement | null) => {
                            sectionRefs.current[index] = el!;
                        }}
                        className="info-container flex mb-8">
                        <div className="w-1/2 order-1">
                            <h1 className="text-4xl font-nyxerin text-customRed font-bold mb-4">{section.title}</h1>
                            <p className="mb-8">{section.description}</p>
                        </div>
                        <div className="w-1/2 order-last">
                            <img src={section.image} alt="Product Image" className="product-image" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}