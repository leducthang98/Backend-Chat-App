export const genMessage = (senderId, roomId, content, createdAt, type, isMyMessage) => {
    return {
        senderId: senderId,
        roomId: roomId,
        content: content,
        type: type,
        createdAt: createdAt,
        isMyMessage: isMyMessage
    }
}