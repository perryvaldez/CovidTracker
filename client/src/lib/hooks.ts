import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type CustomSelectorFunc<T> = (state: RootState) => T;
export const useCustomSelector = <T> (fn: CustomSelectorFunc<T>) => useSelector(fn);
