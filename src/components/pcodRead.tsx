const Readmore = () => {
   return (
       <div className='flex flex-row items-start p-5 gap-8 ml-16'> 
           <div className='flex-[2]'>
               <p className='text-3xl font-semibold mt-9 underline ml-64'>
                   PCOD Diet Chart
               </p>
               <p className='text-gray-700 mt-4'>
                   A PCOD (Polycystic Ovarian Disease) diet chart is a structured eating plan designed to balance hormones, improve insulin sensitivity, and support healthy weight management for women with PCOD. The focus is on low-GI (glycemic index) foods, anti-inflammatory ingredients, and balanced macronutrients to help regulate menstrual cycles and reduce symptoms like acne, hair fall, and fatigue.
                   <br /><br />
                   <span className='font-bold text-black text-xl'>THE DIET TYPICALLY INCLUDES:</span>
                   <ul className='list-disc list-inside'>
                       <li>Fiber-rich foods like whole grains, fruits, and vegetables</li>
                       <li>Lean proteins like fish, chicken, and beans</li>
                       <li>Healthy fats like olive oil, nuts, and seeds</li>
                       <li>Anti-inflammatory ingredients like turmeric, ginger, and garlic</li>
                   </ul>
                   <br />
                   <span className='font-bold text-black text-xl'>ITS LIMITATIONS:</span>
                   <ul className='list-disc list-inside'>
                       <li>Refined carbs (white bread, pastries, sugary drinks)</li>
                       <li>Processed foods and trans fats</li>
                       <li>High-sugar fruits (bananas, grapes)</li>
                       <li>High-fat dairy products</li>
                       <li>Alcohol and caffeine</li>
                   </ul>
                   <br />
                   <span className='font-bold text-black text-xl'>ITS BENEFITS:</span>
                   <ul className='list-disc list-inside'>
                       <li>Improved insulin sensitivity</li>
                       <li>Reduced inflammation</li>
                       <li>Better blood sugar control</li>
                       <li>Weight management</li>
                   </ul>
               </p>
           </div>

           <div className='flex-[1] flex flex-col justify-center items-start mt-24 gap-4'>
               <img 
                   src="https://www.ckbhospital.com/wp-content/uploads/2022/02/Symptoms-of-PCOD-1024x864.jpg" 
                   alt="pcod" 
                   className="w-full max-w-[350px] h-auto shadow-lg object-cover rounded-lg"
               />
               <img 
                   src="https://i.pinimg.com/originals/3f/94/ce/3f94ce87cd57837ebcb543f6de8f7e26.jpg" 
                   alt="pcod" 
                   className="w-full max-w-[350px] h-100 shadow-lg object-cover rounded-lg"
               />
           </div>
       </div>
   );
}

export default Readmore;
