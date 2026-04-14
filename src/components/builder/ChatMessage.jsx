export default function ChatMessage({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-1.5 text-sm leading-[1.25] ${
          isUser
            ? 'bg-[#111111] text-white'
            : 'bg-[#F3F3F3] text-[#111111]'
        }`}
      >
        {content}
      </div>
    </div>
  )
}
