import { useState } from 'react';

export type ErrorResponseProps = {
  error: string;
  message: string;
  statusCode: number;
  success: boolean;
};

export type ValidationErrorInfo = {
  instance: Record<string, unknown>;
  message: string;
  origin: string;
  path: string;
  type: string;
  validatorArgs: unknown[];
  validatorKey: string;
  validatorName: string | null;
  value: string;
};

export type CustomErrorResponseProps = {
  errors: ValidationErrorInfo[];
  message: string;
  statusCode: number;
  success: boolean;
};

export type newErrorProps = {
  newErrorValue: unknown | ErrorResponseProps | CustomErrorResponseProps;
  functionAction: () => void;
};

export const isErrorResponse = (obj: unknown): obj is ErrorResponseProps => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'error' in obj &&
    'message' in obj &&
    'statusCode' in obj &&
    'success' in obj
  );
};

export function isCustomErrorResponse(
  obj: unknown
): obj is CustomErrorResponseProps {
  const customErrorObj = obj as CustomErrorResponseProps;

  return (
    typeof customErrorObj?.statusCode === 'number' &&
    typeof customErrorObj?.success === 'boolean' &&
    typeof customErrorObj?.message === 'string' &&
    Array.isArray(customErrorObj?.errors) &&
    customErrorObj.errors.every((error) => {
      return (
        typeof error.message === 'string' &&
        typeof error.origin === 'string' &&
        typeof error.path === 'string' &&
        typeof error.type === 'string' &&
        Array.isArray(error.validatorArgs) &&
        typeof error.validatorKey === 'string' &&
        (typeof error.validatorName === 'string' ||
          error.validatorName === null) &&
        typeof error.value === 'string' &&
        typeof error.instance === 'object' &&
        error.instance !== null
      );
    })
  );
}

type State = {
  error: string[];
};

type Actions = {
  newError: ({ newErrorValue, functionAction }: newErrorProps) => void;
  resetError: () => void;
  changeError: (value: string[]) => void;
};

export type UseGafpriErrorReturn = {
  states: State;
  actions: Actions;
};

export function useGafpriError(): UseGafpriErrorReturn {
  const [error, setError] = useState<string[]>([]);

  const changeError = (value: string[]): void => {
    setError(value);
    setTimeout(() => {
      setError([]);
    }, 5000);
  };

  const newError = ({ newErrorValue, functionAction }: newErrorProps): void => {
    if (isErrorResponse(newErrorValue)) {
      changeError([newErrorValue.message]);
      functionAction();
    } else if (isCustomErrorResponse(newErrorValue)) {
      const errorMessage = newErrorValue.errors.map((item) => {
        return item.message;
      });
      changeError(errorMessage);
      functionAction();
    } else {
      changeError([`${newErrorValue}`]);
      functionAction();
    }
  };

  const resetError = (): void => {
    setError([]);
  };

  /**
   * Export
   *
   *
   */
  const states = {
    error,
  };

  const actions = {
    newError,
    resetError,
    changeError,
  };

  return {
    states,
    actions,
  };
}
