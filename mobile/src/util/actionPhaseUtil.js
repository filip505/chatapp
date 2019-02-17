import { ERROR_PHASE, SUCCESS_PHASE, LOADING_PHASE } from '../action/api'

export function isLoading(phase) {
  return phase == LOADING_PHASE
}

export function isSuccess(phase) {
  return phase == SUCCESS_PHASE
}

export function isError(phase) {
  return phase == ERROR_PHASE
}