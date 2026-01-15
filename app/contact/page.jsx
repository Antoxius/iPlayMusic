"use client"
import z from "zod"
import { saveName } from "../lib/actions"
import { useActionState, useEffect, useState } from "react"

export default function FormPage() {
    const initialState = {
        data: {
            name: "",
            email: ""
        },
        success: false
    }
    const [formState, formAction, isPending] = useActionState(saveName, initialState)

    useEffect(function () {
        console.log("formState", formState)
    }, [formState])

    return (
        <form className="bg-blue-500 mx-auto max-w-3xl p-10 flex flex-col gap-6" action={formAction}>
            <label className="flex mx-auto text-black gap-2 ">
                Navn:
                <input className="bg-white text-black" type="text" name="name" defaultValue={formState.data.name} />
                {formState.success ? null : <p>{formState.error?.properties?.name?.errors}</p>}
            </label>
            <label className="flex mx-auto text-black gap-2">
                Email:
                <input className="bg-white text-black" type="email" name="email" defaultValue={formState.data.email} />
                {formState.success ? null : <p>{formState.error?.properties?.email?.errors}</p>}
            </label>
            <button type="submit" className="bg-blue-800 rounded-3xl text-white p-2 disabled:bg-gray-600" disabled={isPending}>{isPending ? "Saving..." : "Save name"}</button>
            {formState.success ? <p>Tak for din tilmelding</p> : null}
        </form>
    )
}