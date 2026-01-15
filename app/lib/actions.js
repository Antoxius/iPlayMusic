"use server"

import z from "zod"

export async function saveName(prevState, formData) {

    console.log("prevState", prevState)

    const values = Object.fromEntries(formData)

    // validér med Zod!!
    const schema = z.object({
        name: z.string().min(1, { message: "Du skal udfylde dit navn" }).max(50),
        email: z.email()
    })

    const validated = schema.safeParse({
        name: values.name,
        email: values.email
    })

    console.log("validated", validated)

    if (!validated.success) {
        validated.data = values
        validated.error = z.treeifyError(validated.error)
        return validated
    }

    // Er der sket ændringer i formularen siden sidste submit?
    if (values.name === prevState.data.name && values.email === prevState.data.email) {
        return {
            data: values,
            success: true
        }
    }

    console.log("Kald til APIet");

    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
    }
    )

    if (!res.ok) {
        throw new Error("Fejl ved gemning af navn")
    }

    // redirect or revalidate

    return {
        data: values,
        success: res.ok
    }
}