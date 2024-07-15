import { supabase } from "@/app/lib/supabase"

import { useAuth } from "@/providers/AuthProvider";
import { InsertTables, UpdateTables } from "@/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useAdminorderList = ({ archived = false }) => {
    const statuses = archived ? ['Delivered'] : ['new', 'Cooking', 'Delivering'];
  
    return useQuery({
      queryKey: ['orders', { archived }],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .in('status', statuses)
        
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };
  
export const useMyorderList = () => {


    const{session}=useAuth();
    const id=session?.user.id
    return useQuery({
        
      queryKey: ['orders',{userId:id}],
      queryFn: async () => {

        if(!id) return null

        const { data, error } = await supabase
                                    .from('orders')
                                    .select('*')
                                    .eq('user_id',id)
        if (error) {
          throw new Error(error.message);
        }
        console.log(data)
        return data
      },
    });
  };

  
  export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const {session}=useAuth();
    const userId=session?.user.id;
  
    return useMutation({
      mutationFn: async (data: InsertTables<'orders'>) => {
        const { error, data: newProduct } = await supabase
          .from('orders')
          .insert({user_id:userId,...data})
          .select()
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
        console.log(newProduct)
        return newProduct;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['orders'] });
      },
    });
  };
  
 // Adjust the path to where your Supabase client is defined
  
 export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders') // Ensure the table name is correct, 'orders' instead of 'order'
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};


export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: UpdateTables<'orders'>;
    }) {
      const { error, data: updatedOrder } = await supabase
        .from('orders')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedOrder;
    },
    onSuccess: async(_,id) => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      await queryClient.invalidateQueries({ queryKey: ['orders',id] });
    },
  });
};