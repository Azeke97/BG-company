import { isNil } from 'lodash-es'
import { ServerResponseStatus, type ServerErrorResponse } from '~/shared/api/types'

export const isErrorResponse = <T extends ServerErrorResponse>(response: unknown): response is T => {
  return (
    typeof response === 'object' &&
    !isNil(response) &&
    'success' in response &&
    response.success !== ServerResponseStatus.Success
  )
}
