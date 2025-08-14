const IvfRead = () => {
    return (
        <div className="w-full p-5">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
                
                <div className="flex-[2] pl-6 pr-4">
                    <p className="text-2xl font-semibold mt-9 ml-10 underline">
                        After how many weeks IVF pregnancy is considered safe?
                    </p>

                    <p className="text-gray-700 mt-4 text-justify">
                        In an IVF (In Vitro Fertilization) pregnancy, the first few weeks are the most
                        critical because the embryo needs to successfully implant in the uterus and begin
                        healthy development. Generally, an IVF pregnancy is considered more stable and “safe”
                        after 12 weeks of gestation — the end of the first trimester.
                    </p>

                    <div className="mt-6">
                        <span className="font-bold text-black text-xl">BY THIS TIME:</span>
                        <ul className="list-disc pl-4 mt-2">
                            <li>The risk of miscarriage is significantly reduced</li>
                            <li>The baby is more likely to survive</li>
                        </ul>
                        <br />
                        <p>
                            However, every pregnancy is unique, and women who conceive through IVF may be monitored more closely than those with natural conception due to slightly higher risks of complications. Regular ultrasounds, hormone level checks, and medical follow-ups are essential throughout the pregnancy to ensure maternal and fetal health.
                            <br /><br />
                            <span className="font-bold">Important Note:</span> “Safe” does not mean risk-free — it means that the chances of miscarriage and implantation failure have reduced, but prenatal care is still crucial until delivery.
                        </p>

                        <span className="font-bold text-black text-xl mt-6 block">WHY IS THIS IMPORTANT?</span>
                        <p>Knowing when an IVF pregnancy is considered safe is crucial because:</p>
                        <ul className="list-disc pl-4 mt-2">
                            <li><span className="font-semibold font-serif">Manages Emotional Stress –</span> IVF involves months of physical, emotional, and financial investment. Understanding safe milestones helps reduce fear and uncertainty.</li>
                            <li><span className="font-semibold font-serif">Supports Better Decision-Making –</span> Parents can plan life events, travel, or work adjustments with more confidence.</li>
                            <li><span className="font-semibold font-serif">Ensures Timely Medical Monitoring –</span> Doctors can focus care during the most critical weeks, helping detect and address complications early.</li>
                            <li><span className="font-semibold font-serif">Promotes Healthy Habits –</span> Awareness encourages better nutrition, rest, and lifestyle adjustments during vulnerable stages.</li>
                            <li><span className="font-semibold font-serif">Protects Mother and Baby –</span> Informed choices lower risks and improve overall pregnancy outcomes.</li>
                        </ul>
                    </div>
                </div>

                <div className="flex-[1] flex flex-col items-center gap-4 mt-24">
                    <img
                        src="https://drniveditha.in/wp-content/uploads/2023/12/After-how-many-weeks-ivf-pregnancy-is-week-1-768x432.webp"
                        alt="IVF Pregnancy"
                        className="w-full h-[200px] shadow-lg object-cover"
                    />
                    <img
                        src="https://tse3.mm.bing.net/th/id/OIP._2ObFgdCcLpEI8dSMZldWAHaD4?pid=Api&P=0&h=180"
                        alt="IVF Pregnancy"
                        className="w-full h-[200px] shadow-lg object-cover"
                    />
                     <img
                        src="https://www.gracefertility.in/wp-content/uploads/2022/11/Precautions-After-IVF-Pregnancy--1024x606.webp"
                        alt="IVF Pregnancy"
                        className="w-full h-[200px] shadow-lg object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default IvfRead;
