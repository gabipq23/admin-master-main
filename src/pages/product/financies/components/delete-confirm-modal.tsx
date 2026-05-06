import { Modal, Typography } from "antd";
import { entityPage, useDeleteEntity } from "../config-page.const";
import type { IProduct } from "@/types/IProduct.type";

interface DeleteConfirmModalProps {
    open: boolean;
    entitiesToDelete: IProduct[];
    onClose: () => void;
}

export function DeleteConfirmModal({
    open,
    entitiesToDelete,
    onClose,
}: DeleteConfirmModalProps) {
    const deleteMutation = useDeleteEntity();

    function handleConfirm() {
        const ids = entitiesToDelete.map((u) => u.id);
        deleteMutation.mutate({ ids }, { onSuccess: onClose });
    }

    const isSingle = entitiesToDelete.length === 1;
    return (
        <Modal
            open={open}
            title="Confirmar exclusão"
            okText="Deletar"
            okButtonProps={{ danger: true }}
            cancelText="Cancelar"
            onOk={handleConfirm}
            onCancel={onClose}
            confirmLoading={deleteMutation.isPending}
        >
            {isSingle ? (
                <Typography.Text>
                    Tem certeza que deseja deletar o(a) {entityPage.name.toLowerCase()}{" "}
                    <Typography.Text strong>{entitiesToDelete[0]?.name}</Typography.Text>?
                    Esta ação não pode ser desfeita.
                </Typography.Text>
            ) : (
                <Typography.Text>
                    Tem certeza que deseja deletar{" "}
                    <Typography.Text strong>
                        {entitiesToDelete.length} {entityPage.plural.toLowerCase()}
                    </Typography.Text>
                    ? Esta ação não pode ser desfeita.
                </Typography.Text>
            )}
        </Modal>
    );
}
