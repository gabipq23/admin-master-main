import { Table } from "antd";
import { getColumns } from "./columns";
import { useUpdateEntity, useDeleteEntity, entityPage } from "../config-page.const";
import { FormModal } from "./form-modal";
import { ViewModal } from "./view-modal";
import { useStyle } from "@/style/tableStyle";
import type { IProduct } from "@/types/IProduct.type";
import { useProductTable } from "../../common/useProductTable";
import { ProductTableToolbar } from "../../common/ProductTableToolbar";
import { ProductDeleteModal } from "../../common/ProductDeleteModal";

interface ProductsTableProps {
  data: IProduct[];
  isLoading: boolean;
  category: string;
}

export function TableMain({ data, isLoading, category }: ProductsTableProps) {
  const { styles } = useStyle();
  const updateMutation = useUpdateEntity();
  const deleteMutation = useDeleteEntity();
  const columns = getColumns(updateMutation);

  const {
    selectedRowKeys,
    setSelectedRowKeys,
    searchText,
    setSearchText,
    viewingEntity,
    isViewModalOpen,
    editingEntity,
    isFormModalOpen,
    entitiesToDelete,
    isDeleteModalOpen,
    filteredData,
    handleEdit,
    handleView,
    handleDelete,
    handleBulkDelete,
    handleCreate,
    handleFormClose,
    handleDeleteClose,
    handleViewClose,
  } = useProductTable(data);

  return (
    <>
      <ProductTableToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedCount={selectedRowKeys.length}
        entityName={entityPage.name}
        entityPlural={entityPage.plural}
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
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductDeleteModal
        open={isDeleteModalOpen}
        entitiesToDelete={entitiesToDelete}
        entityName={entityPage.name}
        entityPlural={entityPage.plural}
        onClose={handleDeleteClose}
        deleteMutation={deleteMutation}
      />
    </>
  );
}
