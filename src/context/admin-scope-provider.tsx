import {
    createContext,
    useContext,
    useState,
    type JSX,
} from "react";

interface IAdminScopeContext {
    selectedCompanyId: number | undefined;
    selectedPartnerId: number | undefined;
    setSelectedCompanyId: (id: number | undefined) => void;
    setSelectedPartnerId: (id: number | undefined) => void;
}

const AdminScopeContext = createContext<IAdminScopeContext | null>(null);

export function AdminScopeProvider({ children }: { children: JSX.Element }) {
    const [selectedCompanyId, setSelectedCompanyId] = useState<number | undefined>(undefined);
    const [selectedPartnerId, setSelectedPartnerId] = useState<number | undefined>(undefined);

    function handleSetCompanyId(id: number | undefined) {
        setSelectedCompanyId(id);
        setSelectedPartnerId(undefined);
    }

    return (
        <AdminScopeContext.Provider
            value={{
                selectedCompanyId,
                selectedPartnerId,
                setSelectedCompanyId: handleSetCompanyId,
                setSelectedPartnerId,
            }}
        >
            {children}
        </AdminScopeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdminScope() {
    const context = useContext(AdminScopeContext);
    if (!context) throw new Error("useAdminScope must be used within an AdminScopeProvider");
    return context;
}
