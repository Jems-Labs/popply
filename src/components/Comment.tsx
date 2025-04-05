
import { commentType } from "@/lib/types"
import React from "react"
import { Avatar, AvatarFallback } from "./ui/avatar"
import Link from "next/link"

const Comment = ({comment}: {comment: commentType}) => {

    return (
        <div className="p-4 border rounded-lg shadow-sm  space-y-2 w-full">
           <div className="flex items-center gap-4 cursor-pointer">
            <Avatar className="w-12 h-12">
              <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
            </Avatar>
            <Link href={`/u/${comment.user.id}`}>
              <h1 className="text-xl underline">{comment.user.name}</h1>
              <p className="text-muted-foreground">{comment.user.email}</p>
            </Link>
          </div>

            <p className="text-white px-16">{comment.text}</p>
        </div>
    )
}

export default Comment
