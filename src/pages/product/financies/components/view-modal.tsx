import { Modal, Button, Row, Col, Typography } from "antd";
import { entityPage, type EntityType } from "../config-page.const";

function formatBRL(value: number | undefined): string {
    if (value === undefined || value === null) return "-";
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface ViewModalProps {
    open: boolean;
    viewingEntity: EntityType | null;
    onClose: () => void;
    onEdit?: (entity: EntityType) => void;
    onDelete?: (entity: EntityType) => void;
}

export function ViewModal({
    open,
    viewingEntity,
    onClose,
    onEdit,
    onDelete,
}: ViewModalProps) {
    if (!viewingEntity) return null;

    return (
        <Modal
            open={open}
            title={`Visualizar ${entityPage.name}`}
            footer={
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <Button type="primary" onClick={() => viewingEntity && onEdit?.(viewingEntity)}>
                        Editar
                    </Button>
                    <Button danger onClick={() => viewingEntity && onDelete?.(viewingEntity)}>
                        Deletar
                    </Button>
                </div>
            }
            onCancel={onClose}
            destroyOnHidden
            width={600}
        >
            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={12}>
                        <Typography.Text type="secondary">Nome</Typography.Text>
                        <Typography.Paragraph strong>{viewingEntity.name}</Typography.Paragraph>
                    </Col>
                    <Col span={12}>
                        <Typography.Text type="secondary">Categoria</Typography.Text>
                        <Typography.Paragraph strong>{viewingEntity.category}</Typography.Paragraph>
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={12}>
                        <Typography.Text type="secondary">Empresa</Typography.Text>
                        <Typography.Paragraph strong>{viewingEntity.company}</Typography.Paragraph>
                    </Col>
                    <Col span={12}>
                        <Typography.Text type="secondary">Tipo de Cliente</Typography.Text>
                        <Typography.Paragraph strong>{viewingEntity.client_type}</Typography.Paragraph>
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={12}>
                        <Typography.Text type="secondary">Taxa de Juros</Typography.Text>
                        <Typography.Paragraph strong>
                            {(viewingEntity as any).interest_rate ? `${(viewingEntity as any).interest_rate}%` : "-"}
                        </Typography.Paragraph>
                    </Col>
                    <Col span={12}>
                        <Typography.Text type="secondary">Valor Máximo</Typography.Text>
                        <Typography.Paragraph strong>
                            {formatBRL((viewingEntity as any).max_amount)}
                        </Typography.Paragraph>
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={12}>
                        <Typography.Text type="secondary">Valor Mínimo</Typography.Text>
                        <Typography.Paragraph strong>
                            {formatBRL((viewingEntity as any).min_amount)}
                        </Typography.Paragraph>
                    </Col>
                </Row>

                {(viewingEntity as any).description && (
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col span={24}>
                            <Typography.Text type="secondary">Descrição</Typography.Text>
                            <Typography.Paragraph>{(viewingEntity as any).description}</Typography.Paragraph>
                        </Col>
                    </Row>
                )}
            </div>
        </Modal>
    );
}
