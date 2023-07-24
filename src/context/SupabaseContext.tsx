import type { SupabaseClient, User } from '@supabase/supabase-js'
import * as React from 'react'
import { SupabaseContextType } from '../types'
import { FunctionComponent, useEffect, useState } from 'react'

export const SupabaseContext = React.createContext<SupabaseContextType>({
    supabase: null,
    user: null,
})

/**
 * SupabaseContextProvider is a context provider giving access to the supabase client to child along the React tree
 *  You should pass to it an authenticated supabase client see https://supabase.io/docs/client/initializing for details
 * ```typescript
 * <SupabaseContextProvider client={supabase}>
 *    <App />
 * </SupabaseContextProvider>
 * ```
 */
export const SupabaseContextProvider: FunctionComponent<{ children: React.ReactNode, client: SupabaseClient }> = ({
    children,
    client,
}) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: { user } } = await client.auth.getUser();
                setUser(user);
            } catch (error) {
                // Handle error
            }
        };
        // fetchUser();
        const { data: listener } = client.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setUser(session?.user!)
            }
            if (event === 'SIGNED_OUT') {
                setUser(null)
            }
        })
        return () => {
            listener.subscription.unsubscribe();
        };
    }, [client])

    return (
        <SupabaseContext.Provider value={{ user, supabase: client }}>
            {children}
        </SupabaseContext.Provider>
    )
}