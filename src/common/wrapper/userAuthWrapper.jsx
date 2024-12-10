/**
 * Custom React hook that handles user authentication state with NextAuth.
 * Gets session data from NextAuth and dispatches tokens and user info to Redux store.
 * Allows consuming components to access authentication state from Redux.
 */
'use client';

import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  addTokens,
  addUser,
  handleMobileScreen,
  removeTokens,
} from '../store/slices/auth';

export default function UserAuthWrapper() {
  const { data: sessionData, status } = useSession({
    required: true,
    onUnauthenticated: () => router.push('/auth/login'),
  });

  const dispatch = useDispatch();

  const router = useRouter();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        return window.innerWidth <= 768;
      };
      dispatch(handleMobileScreen(handleResize()));

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && !accessToken) {
      dispatch(
        addTokens({
          accessToken: sessionData.accessToken,
          // refreshToken: sessionData.refreshToken,
        })
      );
      dispatch(addUser(sessionData.user));
    }
    // if (status === 'unauthenticated') {
    //   dispatch(removeTokens());
    //   router.push('/auth/login');
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return null;
}
