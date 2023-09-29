import { Controller, useFormContext } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'
import { ReactNode } from 'react'

export function Dropdown<Value = { label: string; value: string }>({
    name,
    label,
    options,
}: {
    name: string
    label: string
    options: readonly Value[]
}): ReactNode {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <Autocomplete
                        options={options}
                        value={field.value as Value}
                        onChange={(_, value) => {
                            field.onChange(value)
                        }}
                        onBlur={field.onBlur}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    label={label}
                                    ref={field.ref}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )
                        }}
                    />
                )
            }}
        ></Controller>
    )
}
