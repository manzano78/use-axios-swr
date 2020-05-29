import useSWR, {
  responseInterface as ResponseInterface,
  keyInterface as KeyInterface,
  ConfigInterface
} from 'swr'
import { useAxiosInstance } from '@manzano/axios'
import { AxiosInstance } from 'axios'

export function useAxiosSWR<
  Data = any,
  Error = any,
  Args extends any[] = any[]
>(
  key: string | null | (() => string | null),
  fn: (axiosInstance: AxiosInstance, key: string) => Promise<Data>,
  config?: ConfigInterface<Data, Error>
): ResponseInterface<Data, Error>

export function useAxiosSWR<Data = any, Error = any>(
  key: any[] | (() => any[]),
  fn: (axiosInstance: AxiosInstance, ...args: any[]) => Promise<Data>,
  config?: ConfigInterface<Data, Error>
): ResponseInterface<Data, Error>

export function useAxiosSWR<Data = any, Error = any>(
  keyInterface: KeyInterface,
  fn: (axiosInstance: AxiosInstance, ...args: any[]) => Promise<Data>,
  config?: ConfigInterface<Data, Error>
) {
  const axiosInstance = useAxiosInstance()

  const getKey = () => {
    const key =
      typeof keyInterface === 'function' ? keyInterface() : keyInterface

    if (key === null) {
      return null
    }

    return typeof key === 'string'
      ? [axiosInstance, key]
      : [axiosInstance, ...key]
  }

  return useSWR(getKey, fn, config)
}
