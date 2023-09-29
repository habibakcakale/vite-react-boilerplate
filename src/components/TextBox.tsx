import * as React from 'react'
import { FieldError, get, useFormContext } from 'react-hook-form'
import { TextField } from '@mui/material'
import { ReactNode } from 'react'

type Maybe<T> = T | undefined | null

export function TextBox({
    name,
    label,
    multiline,
    type = 'text',
}: {
    name: string
    label: string
    multiline?: boolean
    type?: React.InputHTMLAttributes<unknown>['type']
}): ReactNode {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const error = get(errors, name) as Maybe<FieldError>
    const hasError = error != null

    return (
        <TextField
            type={type}
            fullWidth
            label={label}
            multiline={multiline}
            {...register(name)}
            error={hasError}
            helperText={error?.message}
        />
    )
}
