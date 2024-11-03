"use server";

export default async function createNewPost(title, content) {
    const p = {
        title: title,
        content: content,
        upvotes: 0,
        downvotes: 0,
    };
    return { ...p, id: "newId" };
}
