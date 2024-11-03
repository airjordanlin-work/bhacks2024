export default function PostPreview({ post }) {
    return (
        <div className="bg-sky-400 rounded-lg p-4 m-2 shadow-md transition-transform transform hover:scale-105">
            <h4 className="font-bold text-2xl mb-2">{post.title}</h4>
            <p className="text-gray-700 mb-2">{post.content}</p>
            <p className="text-sm text-gray-500">{post.date}</p>
        </div>
    );
}

