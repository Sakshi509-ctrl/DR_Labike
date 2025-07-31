import React from 'react';
import Header from './Header';
import Footer from './footer';

const ShippingPolicy = () => {
    return (
        <>
            <Header />
            <div className="mt-24 mb-28">
                <div className="flex justify-center items-start pt-20 bg-white pb-8">
                    <div className="w-full max-w-4xl px-8">
                        <h4 className="font-sans-serif font-semibold text-gray-900 -mb-4 mt-5 -ml-40">
                        Shipping Policy
                        </h4>
                        <div className="bg-white text-gray-600  p-8">
                            <p className="-ml-48">
                            Standard Delivery:
                            </p><br/>

                            <ul className="list-disc pl-6 mb-6 -ml-40 space-y-2">
                                <li>Estimated delivery time 3-7 business days.</li>
                                <li>All order processing occurs on business days only, which are Monday through Friday, from 9am to 4 pm IST. Orders placed on Saturdays, Sundays, holidays, or after 4 pm EST are processed the next business day. All packages are delivered Monday through Friday.</li>
                                <li>Stock items ship out within 24-48 hours, unless otherwise noted.</li>
                                <li>Large quantity purchases may add 1-3 business days to shipping. Item(s) may also be bulk packed.</li>
                                <li>Items which are made to order ship out in 5-7 business days.</li>
                                <li>Custom items can take between 5-15 business days to ship.</li>
                            </ul>

                            <p className=" -ml-48">
                            NOTE: Many of our items are drop shipped directly from the manufacturer. As such, you may receive multiple packages.<br/><br/>
                            Shipping    
                            </p>
                            <br/>

                            <ul className="list-disc pl-6 mb-6 -ml-40 space-y-2">
                                <li>Standard Courier service like DTDC is the package service used by The DrLaBike Store. Unless otherwise requested, all orders are shipped via speed post or standard courier.</li>
                                <li>Some items do require freight shipping. Freight shipping costs are charged after the item ships. Unless otherwise requested, all freight items ship via ground service.</li>
                                <li>The DrLaBike Store is not held responsible for any delays by courier may incur due to circumstances beyond their control. This would include but not limited to: weather conditions, mechanical delays, equipment failures.</li>
                                <li>The DrLaBike Store is not held responsible for any delays courier may incur due to incomplete address information, or wrong address information provided by the customer.</li>
                                <li>All packages are insured when they leave The DrLaBike Store. If a package is damaged in shipment , you should not accept the package without appropriate documentation of damage. The DrLaBike Store is not responsible for merchandise damaged in shipping.</li>
                            </ul>

                            <p className=" -ml-48">
                            Shipping Rates
                            </p>
                            <br/>
                            <ul className="list-disc pl-6 mb-6 -ml-40 space-y-2">
                                <li>We charge per courier published rates.</li>
                            </ul>

                            <p className=" -ml-48">
                            Note: We reserve the right to adjust the shipping charge if the actual rate comes back higher than originally calculated due to the dim weight of the package.
                            </p>

                            <h4 className="font-semibold text-gray-600 -mb-4 mt-5 -ml-48">
                            Canadian 
                            </h4>                
                            <br/><br/>
                        
                        <ul className="list-disc pl-6 mb-6 -ml-40 space-y-2">
                            <li>Packages ship international services to Canada</li>
                            <li>The customer is responsible for all shipping expenses as well as customs charges, taxes and fees, and duties due upon entering the destination location.</li>
                            <li>We reserve the right to adjust the shipping charge if the actual rate comes back higher than originally calculated due to the destination or DIM weight of the package.</li>
                        </ul>

                        <h4 className="font-semibold text-gray-600 -mb-4 mt-5 -ml-48">
                        International
                        </h4>
                        <br/>
                        
                        <ul className="list-disc pl-6 mb-6 -ml-40 space-y-2">
                            <li>Packages ship international services to Canada</li>
                            <li>The customer is responsible for all shipping expenses as well as customs charges, taxes and fees, and duties due upon entering the destination location.</li>
                        </ul>
                        
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <div className="w-full flex justify-center font-bold text-gray-600 mt-4 mb-4">
              <h6>Copyright © 2025 DrLaBike: Gateway to Pathology Lab Ownership | Powered by Swasthmnathan Meditech Pvt Ltd</h6>
            </div>
        </>
    );
};

export default ShippingPolicy;