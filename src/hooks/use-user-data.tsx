"use client"

import { api } from "~/trpc/react"



export const useUserData = () => {
  const { data, isLoading, error } = api.user.existingUser.useQuery()

  return {
    user: data,
    isLoading,
    error,
  }
}
