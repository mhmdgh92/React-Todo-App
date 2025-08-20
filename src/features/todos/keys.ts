export const todosKeys = {
    all: ['todos'] as const,
    list: (userId: string, q: string) => [...todosKeys.all, { userId, q }] as const,
}
