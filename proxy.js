import { log } from "console"
import { NextResponse } from "next/server"

export async function proxy(request){
    if (!request.cookies.has("IPM_AT")){
       console.log("Cookie not found");
       
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if(request.cookies.get("IPM_AT").value === ""){
        
       console.log("Cookie Wrong");
        return NextResponse.redirect(new URL("/login", request.url))
        
    }
}

export const config = {
    matcher: ['/playlist', '/playing/:path*', '/categories', '/featured', '/songs', '/' ]
}