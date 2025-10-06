"use client"
import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

const PrivacyPolicyPage = () => {
    const router = useRouter()
    
    const privacyContent = [
        {
            id: 1,
            title: "Introduction",
            content: `CollabKaroo, operated by DEPSHANTA MARKETING SOLUTIONS PRIVATE LIMITED ("we," "us," or "our"), is committed to safeguarding the privacy of users on our website and mobile application (collectively, the "Platform" or "Site"). This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our Services. By accessing or using CollabKaroo, you agree to this Privacy Policy and the Terms of Service.`
        },
        {
            id: 2,
            title: "Information We Collect",
            subsections: [
                {
                    subtitle: "2.1 Account Registration Data:",
                    content: `To access certain Platform features, users must create an account and provide accurate, current, and complete registration information. This includes, but is not limited to, your name, email address, contact details, social media information, and other identifiers relevant to account security.`
                },
                {
                    subtitle: "2.2 Transactional Data:",
                    content: `When using our services, we collect profile, niche, past experience, social profile details. This data allows us to provide the benefits associated with our Platform.`
                },
                {
                    subtitle: "2.3 Usage and Device Data:",
                    content: `We automatically collect information related to how you interact with the Platform, including IP addresses, device type, operating system, browser type, and activity logs. This data helps improve our Services and ensures compliance with our Terms of Service.`
                }
            ]
        },
        {
            id: 3,
            title: "How We Use Your Information",
            subsections: [
                {
                    subtitle: "3.1 Service Delivery and Account Management:",
                    content: `We use your data to provide and manage Platform access, track eligibility, process transactions, and offer personalized rewards/campaigns.`
                },
                {
                    subtitle: "3.2 Data for Performance Tracking and Improvement:",
                    content: `Aggregated, anonymous data may be used for analytical purposes, research, and service improvements. Individual identification is removed from aggregated data for enhanced privacy.`
                },
                {
                    subtitle: "3.3 Marketing and Communications:",
                    content: `With your consent, we may use your contact information to send you relevant updates, promotional offers, or membership/campaign-related communications.`
                }
            ]
        },
        {
            id: 4,
            title: "Data Sharing and Third-Party Disclosures",
            content: `We may share your information with third parties under these circumstances:`,
            subsections: [
                {
                    subtitle: "4.1 Service Provision:",
                    content: `We collaborate with third-party service providers who assist in processing data, supporting customers, managing records, and performing other business operations.`
                },
                {
                    subtitle: "4.2 Legal Compliance:",
                    content: `We may disclose information to comply with applicable laws, regulations, government requests, or court orders.`
                },
                {
                    subtitle: "4.3 Transaction Facilitation:",
                    content: `To complete or authorize transactions, including UPI-based payments.`
                },
                {
                    subtitle: "Security Measures:",
                    content: `For investigating or preventing unlawful activities, such as fraud or unauthorized account access.`
                }
            ]
        },
        {
            id: 5,
            title: "Data Security",
            content: `We take commercially reasonable steps to protect your information from loss, misuse, and unauthorized access, disclosure, alteration, or destruction. However, no security system is impenetrable, and we cannot guarantee the complete security of your data, whether stored in our databases or otherwise. We also cannot guarantee that your information will not be intercepted during transmission to and from (i) us, (ii) the Platform, or (iii) a Client.`,
            subsections: [
                {
                    subtitle: "5.1 Third-Party and Government Data Responsibility:",
                    content: `While we strive to ensure the security of your data within our control, we are not responsible for any data breach or unauthorized access arising from the actions or security lapses of third-party providers or government entities.`
                },
                {
                    subtitle: "5.2 Disclaimer Regarding Third-Party Data Use:",
                    content: `This Privacy Policy does not extend to the practices or policies of third parties (including platforms and clients) that may access or process your data. Any use, processing, or management of your data by third parties is governed solely by their individual policies, over which CollabKaroo has no control. CollabKaroo disclaims all responsibility for how third parties may handle your data, regardless of whether they obtained it through CollabKaroo. If you wish to exercise any data-related rights with a platform, client, or other third party, you must directly address your request to that entity, as your rights will be subject to their policies and practices. We strongly recommend that you review all terms and privacy policies for each platform, third party, and client you interact with.

Furthermore, our website and services may contain links to third-party websites. CollabKaroo has no control over these websites' content, practices, or policies (including those relating to privacy) and disclaims any responsibility for them. We encourage you to review the privacy policies and terms of service of any third-party sites you visit or third-party services and products you use.`
                }
            ]
        },
        {
            id: 6,
            title: "Data Retention",
            content: `Your data is retained as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. If you request account deletion or terminate your use of the Platform, your personal data will be deleted in accordance with our retention and data deletion internal policies.`
        },
        {
            id: 7,
            title: "Opt-Out Requests",
            content: `Users may opt out of specific data uses or unsubscribe from marketing communications. If you wish to deactivate your account or unsubscribe, please contact us at contact.us@gobuymybills.com`
        },
        {
            id: 8,
            title: "Your Rights",
            content: `Depending on applicable laws, you may have the right to access, correct, or delete your personal data, object to data processing, and request data portability. Contact us to exercise these rights.`
        },
        {
            id: 9,
            title: "Cookies and Tracking",
            content: `Our Platform uses cookies and other tracking technologies to personalize your experience, measure performance, and improve our Services. By using our Platform, you consent to the use of cookies and similar technologies as outlined in this Privacy Policy.`
        },
        {
            id: 10,
            title: "Changes to This Privacy Policy",
            content: `We may update this Privacy Policy periodically to reflect legal or service changes. Any changes will be posted on this page, and continued use of the Platform signifies acceptance of these updates.`
        },
        {
            id: 11,
            title: "Do Not Track",
            content: `While we may operate with minimal tracking to enhance user experience, we do not support a "Do Not Track" mechanism and are unable to respond to such requests.`
        },
        {
            id: 12,
            title: "Contact Us",
            content: `For any questions regarding this Privacy Policy or your data, please contact us at:

Email: contact.us@gobuymybills.com
Address: Plot A-18, Manjeet Farm, Near Metro Station, Uttam Nagar, New Delhi, West Delhi-110059, Delhi`
        }
    ]

    return (
        <div className='mt-4 px-4 bg-[#F1F1F1] min-h-screen pb-10'>
            <div className="header flex items-center gap-x-2">
                <button onClick={() => router.back()}>
                    <ChevronLeft/>
                </button>
                <span className='font-bold'>Privacy Policy</span>
            </div>
            
            <div className='mt-4 space-y-4'>
                {privacyContent.map((section) => (
                    <div key={section.id} className='bg-white py-6 px-6 rounded-2xl'>
                        <h2 className='font-bold text-lg text-black'>
                            {section.id}. {section.title}
                        </h2>
                        
                        {section.content && (
                            <p className='mt-3 text-gray-700 leading-relaxed whitespace-pre-line'>
                                {section.content}
                            </p>
                        )}
                        
                        {section.subsections && (
                            <div className='mt-4 space-y-4'>
                                {section.subsections.map((subsection, index) => (
                                    <div key={index}>
                                        <h3 className='font-semibold text-black'>
                                            {subsection.subtitle}
                                        </h3>
                                        <p className='mt-2 text-gray-700 leading-relaxed whitespace-pre-line'>
                                            {subsection.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PrivacyPolicyPage