import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/app/lib/supabase'; // Import the 'supabase' module


export const useOrderListener=()=>{
    const queryClient=useQueryClient();

  useEffect(()=>{

    const Ordersubscription = supabase.channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'order' },
      (payload) => {
        console.log('Change received!', payload)
        queryClient.invalidateQueries({ queryKey: ['order'] });
        
      }
    )
    .subscribe()

    return ()=>{
      Ordersubscription.unsubscribe()
    }
  },[])

}


export const useUpdateSubscription=(id:Number)=>{
    const queryClient=useQueryClient();

    useEffect(()=>{
        const orders = supabase.channel('custom-update-channel')
  .on(
    'postgres_changes',
    { 
        event: 'UPDATE',
        schema: 'public',
        table: 'order' ,
        filter:`id=eq.${id}`
        },
    (payload) => {
        queryClient.invalidateQueries({ queryKey: ['order'] },id);
    }
  )
  .subscribe()

  return ()=>{
    orders.unsubscribe()
  }
    },[])

}