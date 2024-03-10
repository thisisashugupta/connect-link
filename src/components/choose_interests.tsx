"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { serverAction } from "@/app/actions";
const interests = ['Technology', 'Books', 'Gaming', 'Computers', 'Docking', 'Ports'];

function ChooseInterests() {

  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const isSelected = (interest : string) => selectedInterests.includes(interest);

  const handleInterestToggle = (interest : string) => {
    console.log('handleInterestToggle', interest);
    
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  useEffect(() => console.log(selectedInterests), [selectedInterests]);

  const handleClick = () => {
    console.log('button clicked');
    serverAction(selectedInterests);
    console.log('server action dispatched');
    router.refresh();
  }

  return (
    <div className={`w-full p-2 hover:border-r-4 hover:border-b-2 ${selectedInterests.length >=3 ? 'border-green-500': 'border-red-500'} `}>
      <h1 className='m-2 text-xl font-mono font-semibold'>Choose Interests</h1>
      <div className='m-2'>
        {interests.map( (interest) => 
          <button key={interest} className={`mx-2 ${isSelected(interest) ? 'font-semibold text-xl border-r-4 border-b-2 hover:border-r-4 border-b-2' : 'hover:bg-blue-100/50'} hover:border-r-4 hover:border-b border-red-500 px-4 py-2`} onClick={() => handleInterestToggle(interest)}>
            {interest}
          </button>
        )}
      </div>
      <div className={`${selectedInterests.length >=3 ? 'text-green-500' : 'text-red-500'} m-2 text-xl font-mono font-semibold`}>Select atleast 3 interests to continue</div>
      <button className={`${selectedInterests.length >= 3 ? 'text-white font-bold bg-green-500 border-r-[0.4rem] border-b-[0.15rem]' : 'font-semibold bg-gray-500'} m-2 text-xl focus:border-r-0 focus:border-b-0 focus:border-t-[0.25rem] focus:border-l-[0.4rem] border-red-600 px-4 py-2`} onClick={handleClick} disabled={selectedInterests.length < 3}>Save Action</button>
    </div>
  )
}

export default ChooseInterests;