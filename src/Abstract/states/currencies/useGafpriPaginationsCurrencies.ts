import React, { useState } from 'react';
import { CurrenciesAttributesReturn } from './useGafpriApiCurrencies';

type State = {
  orderList: 'asc' | 'desc';

  searchTerm: string;

  currentPage: number;

  itemsPerPage: number;
};

type Actions = {

  sortCurrenciesByName: (
    currencies: CurrenciesAttributesReturn[] | null,
    order: 'asc' | 'desc'
  ) => CurrenciesAttributesReturn[] | null;

  setOrderList: (order: 'asc' | 'desc') => void;

  setSearchTerm: (value: string) => void;

  filterCurrenciesByName: (items: CurrenciesAttributesReturn[], search: string) => CurrenciesAttributesReturn[] | null;

  setCurrentPage: (value: number) => void;

  getPaginatedCurrencies: (
    currencies: CurrenciesAttributesReturn[] | null,
    page: number,
    itemsPerPage: number
  ) => CurrenciesAttributesReturn[] | null;
};

export type UseGafpriPaginationsCurrenciesReturn = {
  states: State;
  actions: Actions;
};

export function useGafpriPaginationsCurrencies(): UseGafpriPaginationsCurrenciesReturn {
  const [orderList, setOrderList] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  function sortCurrenciesByName(
    itemCurrencies: CurrenciesAttributesReturn[] | null,
    order: 'asc' | 'desc'
  ): CurrenciesAttributesReturn[] | null {
    if (itemCurrencies) {
      return itemCurrencies.slice().sort((a, b) => {
        const comparison = a.name.localeCompare(b.name, undefined, {
          sensitivity: 'base',
        });
        return order === 'asc' ? comparison : -comparison;
      });
    }
    return null;
  }

  const filterCurrenciesByName = (
    items: CurrenciesAttributesReturn[],
    search: string
  ): CurrenciesAttributesReturn[] | null => {
    if (items) {
      return items.filter((currency) =>
        currency.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return null;
  };

  const getPaginatedCurrencies = (
    itemCurrencies: CurrenciesAttributesReturn[] | null,
    page: number,
    itemPerPage: number
  ): CurrenciesAttributesReturn[] | null => {
    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    if (itemCurrencies) {
      return itemCurrencies.slice(startIndex, endIndex);
    }

    return null;
  };

  /**
   * Effects
   *
   *
   */

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  /**
   * Export
   *
   *
   */
  const states = {
    orderList,
    searchTerm,
    currentPage,
    itemsPerPage,
  };

  const actions = {
    sortCurrenciesByName,
    setOrderList,
    setSearchTerm,
    filterCurrenciesByName,
    setCurrentPage,
    getPaginatedCurrencies,
  };

  return {
    states,
    actions,
  };
}
