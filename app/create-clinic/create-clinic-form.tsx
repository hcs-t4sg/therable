// "use client";

// import React, { useState } from "react";
// // import { useClient } from 'react-supabase';
// import { useForm } from 'react-hook-form';
// import { createServerSupabaseClient } from "@/lib/server-utils";
// import { redirect } from 'next/navigation';


// // Create supabase server component client and obtain user session from stored cookie
// const supabase = createServerSupabaseClient();
// console.log("kdlfjskldfjklasdjfklsdjfkljsdklfjalkdsf")
// console.log(supabase)
// const {
//     data: { session },
// } = await supabase.auth.getSession();

// if (!session) {
//     redirect("/login")
// }

// const userId = session.user.id;

// const userIsClinician = async (userId: string) => {
//     const { data, error } = await supabase
//       .from("clinicians")
//       .select()
//       .eq("user_id", userId);
  
//     if (error) {
//       console.error("Error checking if user is a clinician:", error);
//       return false; 
//     }
  
//     return data.length > 0;
//   };

// type FormData = {
//   clinicName: string;
// };

// const CreateClinicForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   async function generateUniqueCode() {
//     const codeLength = 16;
//     const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

//     while (true) {
//       let code = '';
//       for (let i = 0; i < codeLength; i++) {
//           code += characters.charAt(Math.floor(Math.random() * characters.length));
//       }

//       // Query the Supabase database to check for the existence of the code
//       const { data, error } = await supabase
//           .from('clinics')
//           .select('id')
//           .eq('code', code);

//       if (error) {
//           throw error;
//       }

//       if (!data || data.length === 0) {
//           return code;
//       }
//     }
//   };

//   const onSubmit = async (data: FormData) => {
//     if (!userIsClinician) {
//         // Handle the case where the user is not a clinician
//         redirect("/dashboard");
//       }
      
//     setIsLoading(true);

//     try {
//         // Generate a unique clinic code
//         const clinicCode = generateUniqueCode();
    
//         // Get the clinician's ID
//         const ownerID = session.user.id;
    
//         // Define the data to be inserted
//         const clinicData = {
//           clinic_name: data.clinicName,
//           clinic_code: clinicCode,
//           owner_id: ownerID,
//         };
    
//         // Insert the clinic data into the 'clinics' table
//         const { data: clinic, error } = await supabase
//           .from("clinics")
//           .upsert([clinicData]);
    
//         if (error) {
//           setErrorMessage(error.message);
//         } else {
//           setSuccessMessage(`Your clinic code: ${clinicCode}`);
//         }
//       } catch (error) {
//         setErrorMessage((error as Error).message);
//       } finally {
//         setIsLoading(false);
//       }
//   };

//   return (
//     <div>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <label htmlFor="clinicName">Clinic Name</label>
//             <input
//               id="clinicName"
//               type="text"
//               autoComplete="off"
//               {...register('clinicName')}
//             />
//             {errors.clinicName && <p>{errors.clinicName.message}</p>}
//           </div>
//           <button type="submit" disabled={isLoading}>
//             Create Clinic
//           </button>
//         </form>
    
//       {/* {successMessage && <p>{successMessage}</p>}
//       {errorMessage && <p>{errorMessage}</p>} */}
//     </div>
//   );
// };


// export default (CreateClinicForm);
