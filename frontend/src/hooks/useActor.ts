import { useInternetIdentity } from 'ic-use-internet-identity';
import { createActor, canisterId } from 'declarations/backend';
import { HttpAgent } from '@dfinity/agent';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export type BackendActor = ReturnType<typeof createActor>;

const ACTOR_QUERY_KEY = 'actor';

export function useActor() {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const actorQuery = useQuery<BackendActor>({
    queryKey: [ACTOR_QUERY_KEY, identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!identity) {
        throw new Error('No identity available');
      }

      const host = process.env.NODE_ENV === 'production' 
        ? 'https://ic0.app' 
        : 'http://127.0.0.1:4943';

      const agent = new HttpAgent({ 
        identity, 
        host 
      });

      // Only fetch root key in local development
      if (process.env.NODE_ENV !== 'production') {
        try {
          await agent.fetchRootKey();
        } catch (e) {
          console.warn('fetchRootKey failed:', e);
        }
      }

      const actor = createActor(canisterId, { agent });

      // Try to initialize auth, but don't fail if it errors
      try {
        if ('initializeAuth' in actor && typeof actor.initializeAuth === 'function') {
          await actor.initializeAuth();
        }
      } catch (e) {
        console.warn('Auth initialization warning (continuing):', e);
      }

      return actor;
    },
    staleTime: Infinity,
    enabled: !!identity,
    retry: 3,
    retryDelay: 1000,
  });

  // Invalidate other queries when actor changes
  useEffect(() => {
    if (actorQuery.data && !actorQuery.isFetching) {
      queryClient.invalidateQueries({
        predicate: (q) =>
          Array.isArray(q.queryKey) && q.queryKey[0] !== ACTOR_QUERY_KEY,
      });
    }
  }, [actorQuery.data, actorQuery.isFetching, queryClient]);

  return {
    actor: actorQuery.data ?? null,
    isFetching: actorQuery.isFetching,
    isError: actorQuery.isError,
    error: actorQuery.error,
  };
}