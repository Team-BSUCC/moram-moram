import { useQuery } from '@tanstack/react-query';

export const useGetMandalartCards = (id: string | null) => {
  return useQuery({
    queryKey: ['mandalarts-cards', id],
    queryFn: async () => {
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error('만다라트 카드 불러오기 실패');
      return res.json();
    },
  });
};
