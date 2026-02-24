import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { App, AppCategory } from '../backend';

export function useGetAllApps() {
  const { actor, isFetching } = useActor();

  return useQuery<App[]>({
    queryKey: ['apps'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllApps();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAppsByCategory(category: AppCategory) {
  const { actor, isFetching } = useActor();

  return useQuery<App[]>({
    queryKey: ['apps', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAppsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchAppsByName(searchTerm: string) {
  const { actor, isFetching } = useActor();

  return useQuery<App[]>({
    queryKey: ['apps', 'search', 'name', searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm) return [];
      return actor.searchAppsByName(searchTerm);
    },
    enabled: !!actor && !isFetching && searchTerm.length > 0,
  });
}

export function useSearchAppsByDeveloper(searchTerm: string) {
  const { actor, isFetching } = useActor();

  return useQuery<App[]>({
    queryKey: ['apps', 'search', 'developer', searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm) return [];
      return actor.searchAppsByDeveloper(searchTerm);
    },
    enabled: !!actor && !isFetching && searchTerm.length > 0,
  });
}

export function useGetAppById(appId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<App | null>({
    queryKey: ['apps', 'detail', appId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAppById(appId);
    },
    enabled: !!actor && !isFetching && !!appId,
  });
}

export function useAddReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ appId, rating, comment }: { appId: string; rating: bigint; comment: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addReview(appId, rating, comment);
    },
    onSuccess: (_, variables) => {
      // Invalidate app detail and all apps queries
      queryClient.invalidateQueries({ queryKey: ['apps', 'detail', variables.appId] });
      queryClient.invalidateQueries({ queryKey: ['apps'] });
    },
  });
}
