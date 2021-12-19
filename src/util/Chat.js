export const genMessage = (senderId, roomId, content, createdAt, type) => {
    return {
        senderId: senderId,
        roomId: roomId,
        content: content,
        type: type,
        createdAt: createdAt
    }
}