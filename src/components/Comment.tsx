
import { commentType } from "@/lib/types"
import React from "react"

const Comment = ({comment}: {comment: commentType}) => {

    return (
        <div className="p-4 border rounded-lg shadow-sm  space-y-2 w-full">
            <div className="flex items-center gap-3">
                <div>
                    <h2 className="font-medium text-lg">{comment.user.name}</h2>
                    <p className="text-sm text-gray-500">{comment.user.email}</p>
                </div>
            </div>

            <p className="text-gray-400">{comment.text}</p>
        </div>
    )
}

export default Comment
