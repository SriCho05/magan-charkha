
import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-foreground">
            <h1 className="text-3xl font-headline font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

            <p className="mb-4">
                Magan Sangrahalaya Samiti ("we", "us", "our") values your trust and is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and share information when you visit or make a purchase from Magancharkha (the "Site").
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
                When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
                We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
                <ul className="list-disc pl-6 mt-2">
                    <li>Communicate with you;</li>
                    <li>Screen our orders for potential risk or fraud; and</li>
                    <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
                </ul>
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Sharing Your Personal Information</h2>
            <p className="mb-4">
                We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Google Analytics to help us understand how our customers use the Site.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Your Rights</h2>
            <p className="mb-4">
                If you are a resident of certain territories, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Contact Us</h2>
            <p className="mb-4">
                For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at contact@magancharkha.com or by mail using the details provided below:
                <br />
                <br />
                Magan Sangrahalaya Samiti<br />
                Kumarappa Rd, Collectors Colony,<br />
                Wardha, Maharashtra 442001, India.
            </p>
        </div>
    );
}
