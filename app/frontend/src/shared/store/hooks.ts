import { useDispatch, useSelector } from 'react-redux'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = useDispatch.withTypes<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppSelector = useSelector.withTypes<any>()
