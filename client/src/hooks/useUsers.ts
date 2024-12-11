"use client";

import { useState } from "react";
import useSWR from "swr";

import { fetchUsers } from "@/services/userServices";

import { N_USERS_PER_PAGE } from "@/config/paginationConfig";

export const useUsers = (initialPage: number = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ["users", currentPage, ...searchTerms],
    () =>
      fetchUsers(currentPage, N_USERS_PER_PAGE, searchTerms.length > 0 ? searchTerms : undefined),
    {
      keepPreviousData: true,
      revalidateOnFocus: true,
      revalidateIfStale: true,
      dedupingInterval: 5000,
    }
  );

  const addSearchTerm = (term: string) => {
    if (term.trim() && !searchTerms.includes(term.trim())) {
      setSearchTerms([...searchTerms, term.trim()]);
      setCurrentPage(1); 
    }
  };

  const removeSearchTerm = (term: string) => {
    setSearchTerms(searchTerms.filter((t) => t !== term));
    setCurrentPage(1); 
  };

  const clearSearch = () => {
    setSearchTerms([]);
    setCurrentPage(1);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  return {
    data,
    currentPage,
    setCurrentPage,
    searchTerms,
    addSearchTerm,
    removeSearchTerm,
    clearSearch,
    isModalOpen,
    onCloseModal,
    onOpenModal,
    error,
    isError: !!error,
    isLoading,
    isValidating,
    mutate,
  };
};
