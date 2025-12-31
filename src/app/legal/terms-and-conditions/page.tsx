
import React from 'react';

export default function TermsAndConditions() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-foreground">
            <h1 className="text-3xl font-headline font-bold mb-6">Terms and Conditions</h1>
            <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
            <p className="mb-4">
                Welcome to Magancharkha! These terms and conditions outline the rules and regulations for the use of Magan Sangrahalaya Samiti's Website.
                By accessing this website we assume you accept these terms and conditions. Do not continue to use Magancharkha if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Cookies</h2>
            <p className="mb-4">
                We employ the use of cookies. By accessing Magancharkha, you agreed to use cookies in agreement with the Magan Sangrahalaya Samiti's Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">3. License</h2>
            <p className="mb-4">
                Unless otherwise stated, Magan Sangrahalaya Samiti and/or its licensors own the intellectual property rights for all material on Magancharkha. All intellectual property rights are reserved. You may access this from Magancharkha for your own personal use subjected to restrictions set in these terms and conditions.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Products</h2>
            <p className="mb-4">
                All products listed on the website, their descriptions, and their prices are subject to change from time to time without prior notice. We reserve the right, at any time, to modify, suspend, or discontinue the sale of any product or service with or without notice.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Pricing</h2>
            <p className="mb-4">
                Prices for our products are subject to change without notice. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">6. Contact Information</h2>
            <p className="mb-4">
                If you have any queries regarding any of our terms, please contact us at contact@magancharkha.com.
            </p>
        </div>
    );
}
