"use client"
import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

const TermsPage = () => {
    const router = useRouter()
    
    const termsContent = [
        {
            id: 1,
            title: "Introduction",
            content: `Welcome to CollabKaroo (the "Site") please carefully review these Terms of Service ("Terms," "Terms of Service," or "Agreement") prior to utilizing our platform or any of its services (collectively referred to as "Services"). These Terms constitute a legally binding agreement that governs your use of our website (https://collabkaroo.com) and mobile application (collectively referred to as the "Platform"/"Site"), which is created by CollabKaroo and operated by DEPSHANTA MARKETING SOLUTIONS PRIVATE LIMITED, a company incorporated under the Companies Act, 2013, having its registered office located at Plot A-18, Manjeet Farm, Near Metro Station, Uttam Nagar, New Delhi, West Delhi-110059, Delhi ("CollabKaroo").`
        },
        {
            id: 2,
            title: "Eligibility",
            content: `CollabKaroo is a marketing technology platform that enables user to connect with other user, learn through workshops, and apply & be part of campaigns (on successful approval) posted by brands. Your eligibility to use the CollabKaroo platform and its services is subject to the discretion of CollabKaroo. CollabKaroo reserves the right to determine your eligibility based on internal policies, compliance with the platform's usage guidelines, and other relevant factors. CollabKaroo reserves the right to revoke your eligibility at any time if you fail to meet the established criteria or violate any terms of this Agreement. Such revocation may result in restricted access to certain features or services, or the termination of your account.`
        },
        {
            id: 3,
            title: "Definitions",
            items: [
                '"CollabKaroo," "we," "us," or "our" refers to the company that operates this Site.',
                '"User," "you," or "your" refers to any individual or entity accessing or using the Site.',
                '"Services" refers to the services offered through the Site.',
                '"Account" refers to your user profile created on our Site to access our Services.',
                '"Applicable law" refers to all relevant statutes, enactments, acts of legislature or Parliament of India, laws, ordinances, rules, by-laws, regulations, notifications, guidelines, policies, directions, directives, and orders issued by any governmental authority, tribunal, board, or court, as well as applicable international treaties and regulations, in force at the relevant time in India.',
                '"Social Media" includes Instagram, Facebook, X (formerly known as Twitter), WhatsApp, YouTube, LinkedIn and any other social media platforms.',
                '"Marketing" Marketing is the activity, set of institutions, and processes for creating, communicating, delivering, and exchanging offerings that have value for customers, clients, partners, and society at large.',
                '"Promotion" activity that supports or encourages a brand marketing',
                '"Workshops" – educational sessions offered by us or third parties to help user monetize and grow.'
            ]
        },
        {
            id: 4,
            title: "Acceptance of Terms",
            subsections: [
                {
                    subtitle: "4.1. Acceptance:",
                    content: `By registering to use the CollabKaroo platform, you acknowledge that you have read, understood, and agree to comply with these Terms and our Privacy Policy. You also confirm that the information provided during the registration process is accurate and valid for identity verification. CollabKaroo reserves the right to restrict, suspend, or terminate your access to the platform at any time if we determine that you have violated these Terms. Furthermore, we may monitor your activity, including using technologies such as IP address tracking, to verify your geographical location and ensure compliance with applicable regulations.`
                },
                {
                    subtitle: "4.2. Compliance with Applicable Laws:",
                    content: `You agree to comply with all Applicable Laws while using the CollabKaroo platform and services. This includes adhering to all relevant statutes, regulations, guidelines, and policies issued by any governmental or regulatory authority. You shall not use the platform for any unlawful or unauthorized purpose, and any breach of such laws may result in the restriction, suspension, or termination of your account, as well as potential legal consequences. CollabKaroo reserves the right to cooperate with law enforcement agencies or regulatory authorities if required, in connection with any illegal activities involving your use of the platform.`
                }
            ]
        },
        {
            id: 5,
            title: "Account Registration",
            content: `To access certain features of our Services, you must create an Account. You agree to:`,
            items: [
                'Provide accurate, current, and complete information during the registration process.',
                'Maintain the security of your password and restrict access to your Account.',
                'Notify us immediately of any unauthorized use of your Account or any other breach of security.',
                'Be responsible for all activities that occur under your Account'
            ],
            additionalContent: `This information is collectively referred to as "CollabKaroo Account Data." The collection and use of this data are governed by our Privacy Policy, which is incorporated by reference into these Terms. You must provide accurate and updated information when prompted by the platform. Revoking permissions essential to delivering our services may result in restrictions or denial of access to certain platform features.

If CollabKaroo believes the information provided is incorrect or unreliable, we may deny or revoke access to your CollabKaroo Account. In case of any deficiencies in the provided information discovered at a later date, we reserve the right to terminate your account. CollabKaroo may periodically request updated information to ensure continued access to the platform and its services.`
        },
        {
            id: 6,
            title: "CollabKaroo Partnerships and Associations",
            content: `CollabKaroo may collaborate with various third-party partners and associates to offer additional products, services, or features through the platform. These partnerships may include financial technology providers, marketing affiliates, service vendors, and other business entities. While we strive to ensure that our partners meet the highest standards of quality and compliance, CollabKaroo does not assume responsibility for the actions, policies, or services of third parties. Any engagement or transactions between users and such third parties are subject to the terms and conditions, privacy policies, and agreements set forth by those third parties. CollabKaroo reserves the right to modify, add, or discontinue any partnerships or associations without prior notice.`
        },
        {
            id: 7,
            title: "Privacy and Data Security",
            subsections: [
                {
                    subtitle: "7.1. Our Privacy Policy:",
                    content: `The protection of your personal information is critical to us. Our Privacy Policy provides detailed information on how we handle and safeguard your data when you use the CollabKaroo platform. By using our services, you confirm that you have reviewed and agreed to our Privacy Policy.`
                },
                {
                    subtitle: "7.2. Third-Party Access:",
                    content: `CollabKaroo, along with third-party service providers, may use your data, including financial information, to enhance our services. We may also use aggregated, anonymous data for research, performance tracking, or other business purposes. This data will not include personally identifiable information unless necessary and agreed upon by you.`
                },
                {
                    subtitle: "7.3. Security Responsibility:",
                    content: `Despite all reasonable measures, you understand that internet transmissions can never be completely secure. You are responsible for securing your account credentials, mobile device, and one-time passwords (OTP) used to access the CollabKaroo platform. If you fail to take necessary precautions, you may be held responsible, within the limits imposed by law, for any loss resulting from unauthorized access to your CollabKaroo account.`
                }
            ]
        },
        {
            id: 8,
            title: "Unauthorized Use of the Platform",
            content: `If you suspect that your CollabKaroo account has been accessed without your authorization, please notify us immediately. You may contact us via email at contact.us@gobuymybills.com. Prompt notification will enable us to take swift action to minimize any potential loss or prevent unauthorized transactions on your account.`
        },
        {
            id: 9,
            title: "Third-Party Disclosures",
            content: `We may share the information you provide with third parties under the following circumstances:`,
            items: [
                'when required to complete a transaction/application;',
                'to comply with applicable laws, government requests, or court orders;',
                'with service providers who assist in data processing, customer support, records management, collections, or other operational functions;',
                'to prevent, investigate, or report unlawful activities;',
                'to authorize transactions/applications;',
                'or as otherwise allowed by law.'
            ]
        },
        {
            id: 10,
            title: "Termination",
            content: `We reserve the right to terminate the services provided on the CollabKaroo platform at any time, for any reason, and without prior notice. This includes the right to discontinue services, impose new restrictions, or modify access to certain features. Where required by law, we will notify you of any changes to the services or the termination of your account. Additionally, any pending payment/application may be cancelled in the event of service termination.`
        },
        {
            id: 11,
            title: "Opt-Out Request",
            content: `If you no longer wish to use our Platform and Services and would like to deactivate your CollabKaroo Account or unsubscribe from our mailing lists, or if you disagree with any provision of these Terms and wish to opt out of receiving our Services, please contact us at contact.us@gobuymybills.com`
        },
        {
            id: 12,
            title: "Electronic Communication",
            content: `By using our Platform, you consent to receiving communications from us electronically. We may communicate with you via email, push notifications, whatsapp and SMS. You agree that electronic agreements, notices, and other communications meet legal requirements and are considered "in writing." Ensure that your contact information (email address, etc.) is current. We will assume emails are received once they are sent to the last email address you provided us.`
        },
        {
            id: 13,
            title: "Refund Policy",
            subsections: [
                {
                    subtitle: "1. Failed Transactions:",
                    content: `If a transaction fails, CollabKaroo is not responsible for any refunds related to the transaction.`
                },
                {
                    subtitle: "2. Reversed or Reverted Transactions:",
                    content: `Refund requests may not be entertained for transactions that are reversed or reverted due to technical issues within our system or if any suspicious activity is detected.`
                },
                {
                    subtitle: "3. Response Time for Refund Requests:",
                    content: `We aim to respond to your refund requests promptly. However, CollabKaroo is not liable for any delays that are beyond our control or caused by third parties, such as merchants, who are essential to processing refunds.`
                },
                {
                    subtitle: "4. No Liability for Refund Processing:",
                    content: `CollabKaroo does not assume any liability for the processing of refund requests and cannot guarantee completion timeframes once the request is forwarded to third parties.`
                }
            ]
        },
        {
            id: 14,
            title: "Membership Fees/Premium Features Fees",
            content: `CollabKaroo may implement a mandatory membership fees and premium features fees as per the internal policies. CollabKaroo reserves the right to update these membership/premium features categories, services, and fees as needed, and will notify users of any such changes in advance. Membership fees / premium features fees are non-refundable and non-transferable. CollabKaroo reserves the right to add more features or remove some features from the membership / premium feature categories by informing the user about the change. In case of termination of account or any fraudulent activity by user, CollabKaroo reserves the right to retain the membership fees / premium features fees.`
        },
        {
            id: 15,
            title: "Brand Campaigns",
            content: `Users applying to campaigns must provide accurate data and deliver agreed content. Brands are solely responsible for campaign terms, deliverables, and payments. We act as a technology enabler, not a contracting party between user and brand. Disputes between users and brands must be resolved directly; CollabKaroo is not liable for such disputes. Selection, negotiation, and payments are managed as per each campaign's terms. CollabKaroo is not liable for any delays or default of payments for the campaigns. CollabKaroo reserves the right to take a commission and platform fees from brand/user/both for each campaign posted on the platform by the brand, for every applying or execution of campaign or both from the user.`
        },
        {
            id: 16,
            title: "Indemnity",
            content: `You agree to indemnify, defend, and hold CollabKaroo, its affiliates, officers, directors, agents, and employees harmless from any and all complaints, claims, damages, losses, costs, liabilities, and expenses, including legal fees, that arise from:`,
            items: [
                'your use of the Platform and/or Services;',
                'your breach of these Terms or the Privacy Policy;',
                'improper use of the Platform or Services; or',
                'any violation of laws or third-party rights.'
            ]
        },
        {
            id: 17,
            title: "Limitation of Liability",
            content: `You agree that your use of the Services is at your own risk. CollabKaroo is not liable for damages, including direct, indirect, incidental, or consequential damages, resulting from the use of the Services, even if we were informed about the possibility of such damages.`
        },
        {
            id: 18,
            title: "Disclaimer of Warranties",
            content: `While we strive to make the Platform and Services available, we do not guarantee their uninterrupted or error-free operation. The Platform and Services are provided on an "as is" basis without any warranties, express or implied. We are not liable for any losses caused by third-party service providers or other users. You agree that the use of the Platform is at your sole risk.`
        },
        {
            id: 19,
            title: "Obligations and Restrictions on You",
            items: [
                'No Interference with the Platform: You agree not to interfere with the Platform\'s technical systems. Any unauthorized access, introduction of viruses or bots, or tampering with our systems may result in account termination and possible legal action.',
                'Personal Use Only: You may only use the Services for personal, lawful purposes.',
                'No Illegal Use: The Platform must not be used for fraudulent activities, commercial exploitation, money laundering, or any other unlawful purposes.',
                'Provide Accurate Information: All information provided to CollabKaroo must be accurate, complete, and up-to-date. Providing false or misleading information will be a breach of these Terms, and legal action may be taken.',
                'Be Responsible: You are responsible for keeping your account credentials secure. If you suspect any unauthorized access, contact our CollabKaroo immediately.',
                'Keep the Platform Updated: Ensure you have the latest version of the Platform for optimal functionality.'
            ]
        },
        {
            id: 20,
            title: "Force Majeure",
            content: `CollabKaroo will not be held liable for any delays or losses due to events beyond our control, including but not limited to internet failures, equipment malfunctions, government regulations, natural disasters, or civil disturbances.`
        },
        {
            id: 21,
            title: "Intellectual Property",
            content: `All content on the Platform, such as images, text, graphics, and underlying code, is the intellectual property of CollabKaroo or its partners. We grant you a limited, non-transferable license to use the Platform for personal, lawful purposes only. Unauthorized duplication, distribution, or commercial use of the content is strictly prohibited.`
        },
        {
            id: 22,
            title: "Governing Law",
            content: `These Terms and any disputes arising from them will be governed by the laws of India, and the courts in Delhi will have jurisdiction over any related matters.`
        },
        {
            id: 23,
            title: "Arbitration",
            content: `Any disputes or differences arising out of or pertaining to this agreement shall first be resolved by the parties through negotiations, failing which such disputes/differences shall be referred to Sole Arbitration in accordance with the provisions of the Indian Arbitration and Conciliation Act, 1996. Such arbitration proceedings shall be conducted in English language and shall be held in Delhi. The award passed by the Arbitrator in pursuance of such Arbitration proceedings shall be binding upon the parties hereto.`
        },
        {
            id: 24,
            title: "General Provisions",
            items: [
                'Assignment: You are not permitted to assign or transfer any rights or obligations under these Terms. CollabKaroo, however, may assign or transfer its rights without restriction.',
                'Waiver: The failure to enforce any right or remedy under these Terms does not constitute a waiver of that right or remedy.',
                'Survival: Provisions relating to indemnities, limitation of liability, and governing law will remain in effect even after the termination of these Terms.',
                'Severability: If any provision of these Terms is deemed invalid or unenforceable, the remaining provisions will continue in full force and effect. Any invalid provision will be replaced by an enforceable provision that most closely reflects the original intent.'
            ]
        },
        {
            id: 25,
            title: "Regulatory Changes",
            content: `We may need to modify the Platform or Services due to changes in regulations. If such changes affect your ability to use the Platform or Services, we are not liable for any inconvenience caused.`
        },
        {
            id: 26,
            title: "Third-Party Content and Advertisements",
            content: `We may display third-party offers, products, and advertisements on the Platform. However, CollabKaroo does not endorse these third parties or their products. If you engage with third-party products or services, it is a private arrangement between you and the third party, and CollabKaroo is not responsible for any associated issues.`
        }
    ]

    return (
        <div className='mt-4 px-4 bg-[#F1F1F1] min-h-screen pb-10'>
            <div className="header flex items-center gap-x-2">
                <button onClick={() => router.back()}>
                    <ChevronLeft/>
                </button>
                <span className='font-bold'>Terms and Conditions</span>
            </div>
            
            <div className='mt-4 space-y-4'>
                {termsContent.map((section) => (
                    <div key={section.id} className='bg-white py-6 px-6 rounded-2xl'>
                        <h2 className='font-bold text-lg text-black'>
                            {section.id}. {section.title}
                        </h2>
                        
                        {section.content && (
                            <p className='mt-3 text-gray-700 leading-relaxed whitespace-pre-line'>
                                {section.content}
                            </p>
                        )}
                        
                        {section.items && (
                            <ul className='mt-3 space-y-2 list-none'>
                                {section.items.map((item, index) => (
                                    <li key={index} className='text-gray-700 leading-relaxed flex gap-2'>
                                        <span className='text-black'>•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        
                        {section.subsections && (
                            <div className='mt-4 space-y-4'>
                                {section.subsections.map((subsection, index) => (
                                    <div key={index}>
                                        <h3 className='font-semibold text-black'>
                                            {subsection.subtitle}
                                        </h3>
                                        <p className='mt-2 text-gray-700 leading-relaxed'>
                                            {subsection.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {section.additionalContent && (
                            <p className='mt-3 text-gray-700 leading-relaxed whitespace-pre-line'>
                                {section.additionalContent}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TermsPage