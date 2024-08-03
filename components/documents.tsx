import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { PlaceholderDocument } from './placeholder-document';

export const Documents = async () => {
	auth().protect();

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  return (
    <div className="flex flex-wrap p-5 bg-gray-100 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
    

      <PlaceholderDocument />
    </div>
	)
}
