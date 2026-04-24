import { UsersPage } from '@/pages/users/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/users')({
    component: UsersPage,
})
