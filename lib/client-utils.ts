// Add util functions that should only be run in client components. Importing these in server components will throw an error.
// For more info on how to avoid poisoning your server/client components: https://www.youtube.com/watch?v=BZlwtR9pDp4
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import "client-only";
const supabase = createClientComponentClient();

export const getUserType = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return Error;
  }

  return new Promise((resolve, reject) => {
    if (!session) {
      reject(Error);
    } else {
      resolve(session.user.user_metadata.type);
    }
  });
};
