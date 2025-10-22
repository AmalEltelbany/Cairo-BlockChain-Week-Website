import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile } from '../types';
import type { BackendActor } from './useActor';

export function useIsCurrentUserAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCurrentUserAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return await (actor as any).isCurrentUserAdmin();
    },
    enabled: !!actor && !isFetching,
    initialData: false,
  });
}

export function useUserProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ['userProfile'],
    queryFn: async () => {
      if (!actor) return null;

      // Candid opt -> [] | [UserProfile]
      const res = await actor.getUserProfile();
      if (Array.isArray(res) && res.length > 0) {
        const { name } = res[0] as any;
        return { name } as UserProfile;
      }
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      // TS types from dfx usually match the record shape; send it as-is
      await actor.saveUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
}

// Admin management hooks
export function useAdminPrincipal() {
  const { actor, isFetching } = useActor();
  return useQuery<string | null>({
    queryKey: ['adminPrincipal'],
    queryFn: async () => {
      if (!actor) return null;
      const res = await (actor as BackendActor).getAdminPrincipal();
      // Candid opt -> [] | [Principal]
      if (Array.isArray(res) && res.length > 0) {
        // dfx JS converts Principal to string automatically in many envs; fallback to toText()
        const p = res[0] as any;
        return typeof p === 'string' ? p : (p?.toText?.() ?? String(p));
      }
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInitializeAuth() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      await (actor as BackendActor).initializeAuth();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isCurrentUserAdmin'] });
      queryClient.invalidateQueries({ queryKey: ['adminPrincipal'] });
    },
  });
}

export function useTransferAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newAdminPrincipalText: string) => {
      if (!actor) throw new Error('Actor not available');
      // Agent JS expects Principal as text; declarations usually cast for us
      await (actor as any).transferAdmin(newAdminPrincipalText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPrincipal'] });
      queryClient.invalidateQueries({ queryKey: ['isCurrentUserAdmin'] });
    },
  });
}

// Data CRUD hooks
export type DataItem = { id: number; content: string; metadata: string };

export function useAllData() {
  const { actor, isFetching } = useActor();
  return useQuery<DataItem[]>({
    queryKey: ['allData'],
    queryFn: async () => {
      if (!actor) return [];
      const list = await (actor as BackendActor).getAllData();
      return list.map((d: any) => ({ id: Number(d.id), content: d.content, metadata: d.metadata }));
    },
    enabled: !!actor && !isFetching,
    initialData: [],
  });
}

export function useCreateData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { content: string; metadata: string }) => {
      if (!actor) throw new Error('Actor not available');
      const id = await (actor as BackendActor).createData(input.content, input.metadata);
      return Number(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allData'] });
    },
  });
}

export function useUpdateData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { id: number; content: string; metadata: string }) => {
      if (!actor) throw new Error('Actor not available');
      await (actor as BackendActor).updateData(BigInt(input.id) as any, input.content, input.metadata);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allData'] });
    },
  });
}

export function useDeleteData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      if (!actor) throw new Error('Actor not available');
      await (actor as BackendActor).deleteData(BigInt(id) as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allData'] });
    },
  });
}

// File storage hooks
export type FileListItem = { path: string; mimeType: string; uploadedAtNs: bigint };

export function useFileList() {
  const { actor, isFetching } = useActor();
  return useQuery<FileListItem[]>({
    queryKey: ['fileList'],
    queryFn: async () => {
      if (!actor) return [];
      const entries = await (actor as BackendActor).fileList();
      return entries.map((entry: any) => {
        const path = entry[0] as string;
        const file = entry[1] as any; // { content: blob; mimeType: text; uploadedAt: int }
        return {
          path,
          mimeType: file.mimeType as string,
          uploadedAtNs: BigInt(file.uploadedAt as any),
        } as FileListItem;
      });
    },
    enabled: !!actor && !isFetching,
    initialData: [],
  });
}

export function useFileUpload() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { path: string; mimeType: string; content: Uint8Array | ArrayBuffer }) => {
      if (!actor) throw new Error('Actor not available');
      const content = input.content instanceof Uint8Array ? input.content : new Uint8Array(input.content);
      await (actor as BackendActor).fileUpload(input.path, input.mimeType, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fileList'] });
    },
  });
}

export function useFileDelete() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (path: string) => {
      if (!actor) throw new Error('Actor not available');
      // Backend contains both deleteFile and fileDelete; prefer fileDelete
      await (actor as BackendActor).fileDelete(path);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fileList'] });
    },
  });
}
