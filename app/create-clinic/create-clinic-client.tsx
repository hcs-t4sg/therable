"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClinic } from './create-clinic-server';
import { redirect } from 'next/navigation';

type FormData = {
  clinicName: string;
};

export default function CreateClinicFormClient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const supabase = createClientComponentClient();

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userSession, setUserSession] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);

  // useEffect(() => {
  //   async function fetchUserSession() {
  //     const { data, user } = await supabase.auth.getSession();
  //     if (user) {
  //       setUserId(user.id)
  //     }
  //     setUserSession(data.session);
  //   }

  //   fetchUserSession();
  // }, []); // Empty dependency array to fetch session when the component mounts

  

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const userSession = await supabase.auth.getSession();
      console.log(userSession)
      // const userId = supabase.auth.admin.getUserById();

      if (userId) {
        if (data.clinicName) {
          try {
            await createClinic(data, userId);
            setSuccessMessage('Clinic created successfully');
          } catch (error) {
            setErrorMessage('Failed to create clinic');
            console.error('Error creating clinic:', error);
          }
        }
      } else {
        setErrorMessage('User ID not available');
        console.error('User ID not available');
  
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage('Error getting user session');
      console.error('Error getting user session:', error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="clinicName">Clinic Name</label>
        <input
          id="clinicName"
          type="text"
          autoComplete="off"
          {...register('clinicName')}
        />
        {errors.clinicName && <p>{errors.clinicName.message}</p>}
        <button type="submit" disabled={isLoading}>
          Create Clinic
        </button>
      </form>

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );

}
