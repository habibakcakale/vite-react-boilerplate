import {
    FieldValues,
    FormProvider,
    UseFormProps,
    useForm,
} from 'react-hook-form'
import { PropsWithChildren, ReactNode, useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'

export type FormProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = Record<string, never>,
> = UseFormProps<TFieldValues, TContext> & {
    action: string
    method?: 'get' | 'post'
}

export function Form(props: PropsWithChildren<FormProps>): ReactNode {
    const form = useForm(props)
    const { mutateAsync } = useMutation({
        mutationFn: async (data: unknown) => {
            return await new HttpClient().fetch(props.action, {
                method: props.method ?? 'post',
                body: JSON.stringify(data),
            })
        },
        onError: (error: HttpError) => {
            if (error.response.detail != null) {
                form.setError('', {
                    message: error.response.detail,
                })
            }
            if (error.response.errors) {
                for (const [key, messages] of Object.entries(
                    error.response.errors,
                )) {
                    form.setError(key, {
                        message: messages.join(', '),
                    })
                }
            }
        },
    })

    const submitForm = useCallback(() => {
        form.handleSubmit(async (data) => {
            return await mutateAsync(data)
        })
    }, [form, mutateAsync])

    return (
        <FormProvider {...form}>
            <form onSubmit={submitForm}>{props.children}</form>
        </FormProvider>
    )
}

export class HttpClient {
    public async fetch<T>(url: string, init?: RequestInit): Promise<T> {
        const response = await fetch(url, {
            headers: new Headers([['Content-Type', 'application/json']]),
            ...init,
        })
        if (response.status >= 400) {
            throw new HttpError((await response.json()) as ProblemDetails)
        }

        return (await response.json()) as T
    }

    public async get<T>(url: string, init?: RequestInit): Promise<T> {
        return await this.fetch(url, {
            method: 'get',
            ...init,
        })
    }
}

export class HttpError extends Error {
    public constructor(public readonly response: ProblemDetails) {
        super()
    }
}

export class ProblemDetails {
    public readonly type?: string
    public readonly title?: string
    public readonly status?: number
    public readonly traceId?: string
    public readonly detail?: string
    public readonly errors?: Record<string, string[]>
    public readonly instance?: string
    public readonly extension?: Record<string, object>
}
