import { useMemo, useState } from "react";
import { Table } from "antd";
import type { Key } from "react";
import { TableToolbar } from "./table-toolbar";
import { FormModal } from "./form-modal";
import { DeleteConfirmModal } from "./delete-confirm-modal";
import { entityPage } from "../config-page.const";
import { useStyle } from "@/style/tableStyle";
import { ViewModal } from "./view-modal";
import { getColumns } from "./columns";
import type { IProduct } from "@/types/IProduct.type";

interface ProductsTableProps {
    data: IProduct[];
    isLoading: boolean;
    category: string;
    model?: string;
}

export function TableMain({ data, isLoading, category }: ProductsTableProps) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [searchText, setSearchText] = useState("");
    const [viewingEntity, setViewingEntity] = useState<IProduct | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingEntity, setEditingEntity] = useState<IProduct | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [entitiesToDelete, setEntitiesToDelete] = useState<IProduct[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { styles } = useStyle();

    const filteredData = useMemo(() => {
        if (!searchText) return data;
        const lower = searchText.toLowerCase();
        return data.filter((item) => item.name.toLowerCase().includes(lower));
    }, [data, searchText]);

    function handleEdit(record: IProduct) {
        setEditingEntity(record);
        setIsFormModalOpen(true);
        setIsViewModalOpen(false);
    }

    function handleView(record: IProduct) {
        setViewingEntity(record);
        setIsViewModalOpen(true);
    }

    function handleDelete(record: IProduct) {
        setIsViewModalOpen(false);
        setEntitiesToDelete([record]);
        setIsDeleteModalOpen(true);
    }

    function handleBulkDelete() {
        const selected = data.filter((u) => selectedRowKeys.includes(u.id));
        setEntitiesToDelete(selected);
        setIsDeleteModalOpen(true);
    }

    function handleCreate() {
        setEditingEntity(null);
        setIsFormModalOpen(true);
    }

    function handleFormClose() {
        setIsFormModalOpen(false);
        setEditingEntity(null);
    }

    function handleDeleteClose() {
        setIsDeleteModalOpen(false);
        setEntitiesToDelete([]);
        setSelectedRowKeys([]);
    }

    function handleViewClose() {
        setIsViewModalOpen(false);
        setViewingEntity(null);
    }

    const columns = getColumns();

    return (
        <>
            <TableToolbar
                searchText={searchText}
                onSearchChange={setSearchText}
                selectedCount={selectedRowKeys.length}
                onBulkDelete={handleBulkDelete}
                onCreate={handleCreate}
            />

            <Table
                rowKey="id"
                columns={columns}
                dataSource={filteredData}
                className={styles.customTable}
                loading={isLoading}
                rowSelection={{
                    selectedRowKeys,
                    onChange: setSelectedRowKeys,
                }}
                pagination={{
                    pageSize: 10,
                    showTotal: (total) =>
                        `Total: ${total} ${entityPage.plural.toLowerCase()}`,
                }}
                scroll={{ y: 800 }}
                onRow={(record) => ({
                    onClick: () => handleView(record),
                    style: { cursor: "pointer" },
                })}
            />

            <FormModal
                open={isFormModalOpen}
                editingEntity={editingEntity}
                category={category}

                onClose={handleFormClose}
            />

            <ViewModal
                open={isViewModalOpen}
                viewingEntity={viewingEntity}
                onClose={handleViewClose}
                onEdit={(entity: IProduct) => {
                    handleEdit(entity);
                }}
                onDelete={(entity: IProduct) => {
                    handleDelete(entity);
                }}
            />

            <DeleteConfirmModal
                open={isDeleteModalOpen}
                entitiesToDelete={entitiesToDelete}
                onClose={handleDeleteClose}
            />
        </>
    );
}
