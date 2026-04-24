import { createFileRoute, redirect } from '@tanstack/react-router'
import { LayoutMain } from '../../layout/layout-main/LayoutMain'
import { LocalStorageKeys } from '../../enums/LocalStorageKeys.enum';
import { NotFoundError } from '../../pages/errors/not-found-error';

export const Route = createFileRoute('/app')({
    component: LayoutMain,
    notFoundComponent: NotFoundError,
    beforeLoad: ({ location }) => {
        if (!localStorage.getItem(LocalStorageKeys.user))
            throw redirect({
                to: "/login",
                search: { redirect: location.href },
            });
    },
})
