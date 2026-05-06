import { Modal, Button, Row, Col, Typography, Space } from "antd";
import { WifiOutlined, DownloadOutlined } from "@ant-design/icons";
import { entityPage, type EntityType } from "../config-page.const";

type ProductOfferConditionFile = { url: string; type: string };
type ProductDetail = EntityType["details"][number];

function resolveImageUrl(value: unknown): string | null {
    if (typeof value === "string" && value.trim().length > 0) return value;
    if (!value || typeof value !== "object") return null;

    const candidate = value as {
        url?: unknown;
        thumbUrl?: unknown;
        response?: { url?: unknown };
        originFileObj?: { name?: unknown };
        name?: unknown;
    };

    if (typeof candidate.url === "string" && candidate.url.trim().length > 0) {
        return candidate.url;
    }

    if (
        candidate.response &&
        typeof candidate.response.url === "string" &&
        candidate.response.url.trim().length > 0
    ) {
        return candidate.response.url;
    }

    if (typeof candidate.thumbUrl === "string" && candidate.thumbUrl.trim().length > 0) {
        return candidate.thumbUrl;
    }

    return null;
}

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
    return (
        <Modal
            open={open}
            title={`Visualizar ${entityPage.name}`}
            footer={
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <Button
                        type="primary"
                        onClick={() => viewingEntity && onEdit?.(viewingEntity)}
                    >
                        Editar
                    </Button>
                    <Button
                        danger
                        onClick={() => viewingEntity && onDelete?.(viewingEntity)}
                    >
                        Deletar
                    </Button>
                </div>
            }
            onCancel={onClose}
            destroyOnHidden
            width={940}
        >
            <div>


                <div className="max-h-130 overflow-y-auto scrollbar-thin">

                    {/* Header do Plano */}
                    <div style={{ background: "#f5f5f5", padding: 24, borderRadius: 8, marginBottom: 24 }}>
                        {viewingEntity?.badge && (
                            <div style={{ marginBottom: 8 }}>
                                <Typography.Text strong style={{ color: "#374151" }}>
                                    {viewingEntity.badge}
                                </Typography.Text>
                            </div>
                        )}

                        <div style={{ marginBottom: 16 }}>
                            <Typography.Title level={4} style={{ marginBottom: 8 }}>
                                {viewingEntity?.name} - {viewingEntity?.client_type}
                            </Typography.Title>
                            {/* <Space wrap size={4} style={{ marginTop: 4 }}>
                            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                                Disponível em:
                            </Typography.Text>
                            {viewingEntity?.uf && viewingEntity.uf.length > 0 ? (
                                viewingEntity.uf.map((uf) => (
                                    <Tag key={uf} color="blue" style={{ fontSize: 11 }}>
                                        {uf}
                                    </Tag>
                                ))
                            ) : (
                                <Tag color="blue" style={{ fontSize: 11 }}>
                                    Todas as UFs
                                </Tag>
                            )}
                        </Space> */}
                        </div>

                        {(viewingEntity?.offer_title || viewingEntity?.offer_subtitle) && (
                            <div style={{ marginBottom: 16 }}>
                                {viewingEntity?.offer_title && (
                                    <Typography.Title level={5} style={{ marginBottom: 4 }}>
                                        <WifiOutlined style={{ color: "#3b82f6", marginRight: 8 }} />
                                        {viewingEntity.offer_title}
                                    </Typography.Title>
                                )}
                                {viewingEntity?.offer_subtitle && (
                                    <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                                        {viewingEntity.offer_subtitle}
                                    </Typography.Text>
                                )}
                            </div>
                        )}

                        {viewingEntity?.offer_conditions && viewingEntity.offer_conditions.length > 0 && (
                            <div style={{ marginTop: 16 }}>
                                <Space wrap size={8}>
                                    {viewingEntity.offer_conditions.map(
                                        (condition: ProductOfferConditionFile | string, idx: number) => {
                                            const conditionUrl =
                                                typeof condition === "string" ? condition : condition?.url;
                                            if (!conditionUrl) return null;
                                            const fileName = conditionUrl.split("/").pop() || `arquivo_${idx + 1}`;
                                            const ext = fileName.split(".").pop()?.toLowerCase();
                                            return (
                                                <a
                                                    key={idx}
                                                    href={conditionUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    download={fileName}
                                                    style={{ color: "#0026d9", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}
                                                >
                                                    <DownloadOutlined />
                                                    <span style={{ textDecoration: "underline" }}>{fileName}</span>
                                                    {typeof condition !== "string" && condition?.type
                                                        ? ` (${condition.type})`
                                                        : ext ? ` (${ext})` : ""}
                                                </a>
                                            );
                                        },
                                    )}
                                </Space>
                            </div>
                        )}
                    </div>

                    {/* Preços */}
                    <div
                        style={{
                            background: "#fff",
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            padding: 16,
                            marginBottom: 24,
                        }}
                    >
                        <Row gutter={[24, 16]}>
                            <Col xs={24} md={8} style={{ display: "flex", flexDirection: "column" }}>
                                <Typography.Text type="secondary" style={{ fontSize: 13, marginBottom: 4 }}>
                                    Preço Inicial
                                </Typography.Text>
                                <Typography.Text strong style={{ fontSize: 22, color: "#404040" }}>
                                    {formatBRL(viewingEntity?.pricing?.base_monthly?.original_price)}
                                </Typography.Text>
                            </Col>
                            <Col xs={24} md={8} style={{ display: "flex", flexDirection: "column" }}>
                                <Typography.Text type="secondary" style={{ fontSize: 13, marginBottom: 4 }}>
                                    Preço Atual
                                </Typography.Text>
                                <span style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                                    <Typography.Text strong style={{ fontSize: 28, color: "#404040" }}>
                                        {formatBRL(viewingEntity?.pricing?.base_monthly?.current_price)}
                                    </Typography.Text>
                                    <Typography.Text type="secondary" style={{ fontSize: 13, marginBottom: 4 }}>
                                        /mês
                                    </Typography.Text>
                                </span>
                            </Col>
                            {(viewingEntity?.pricing?.installation?.current_price ?? -1) >= 0 && (
                                <Col xs={24} md={8} style={{ display: "flex", flexDirection: "column" }}>
                                    <Typography.Text type="secondary" style={{ fontSize: 13, marginBottom: 4 }}>
                                        Instalação
                                    </Typography.Text>
                                    <Typography.Text strong style={{ fontSize: 22, color: "#404040" }}>
                                        {formatBRL(viewingEntity?.pricing?.installation?.current_price)}
                                    </Typography.Text>
                                </Col>
                            )}
                        </Row>
                    </div>

                    {/* Características do Plano */}
                    {viewingEntity?.details && viewingEntity.details.length > 0 && (
                        <div style={{ marginBottom: 24 }}>
                            <Typography.Title level={5} style={{ marginBottom: 16 }}>
                                Características do Plano
                            </Typography.Title>
                            <Row gutter={[16, 16]}>
                                {viewingEntity.details.map((detail: ProductDetail, index: number) => (
                                    <Col xs={24} md={12} lg={8} key={index}>
                                        <div
                                            style={{
                                                background: "#fff",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: 8,
                                                padding: 16,
                                                height: "100%",
                                            }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                                <Typography.Text strong style={{ flex: 1 }}>
                                                    {detail.title}
                                                </Typography.Text>
                                                <Space direction="vertical" size={4} style={{ marginLeft: 8, width: 64 }}>
                                                    {detail.highlight_top && (
                                                        <span
                                                            style={{
                                                                display: "block",
                                                                fontSize: 10,
                                                                textAlign: "center",
                                                                borderRadius: 4,
                                                                background: "#0026d9",
                                                                color: "#fff",
                                                                padding: "2px 8px",
                                                            }}
                                                        >
                                                            Compacto
                                                        </span>
                                                    )}
                                                    {detail.highlight_bottom && (
                                                        <span
                                                            style={{
                                                                display: "block",
                                                                fontSize: 10,
                                                                textAlign: "center",
                                                                borderRadius: 4,
                                                                background: "#0026d9",
                                                                color: "#fff",
                                                                padding: "2px 8px",
                                                            }}
                                                        >
                                                            Destaque
                                                        </span>
                                                    )}
                                                </Space>
                                            </div>

                                            <Typography.Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 12 }}>
                                                {detail.description}
                                            </Typography.Text>

                                            {Array.isArray(detail.images) && detail.images.length > 0 && (
                                                <Space wrap size={8} style={{ marginTop: 8 }}>
                                                    {detail.images.map((imageItem: unknown, idx: number) => {
                                                        const imgUrl = resolveImageUrl(imageItem);
                                                        if (!imgUrl) return null;
                                                        const imgName = imgUrl.split("/").pop() || `imagem_${idx + 1}`;
                                                        return (
                                                            <a
                                                                key={idx}
                                                                href={imgUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                download={imgName}
                                                                style={{ color: "#0026d9", display: "flex", flexDirection: "column", alignItems: "center" }}
                                                            >
                                                                <img
                                                                    src={imgUrl}
                                                                    alt={imgName}
                                                                    style={{
                                                                        width: 40,
                                                                        height: 40,
                                                                        objectFit: "cover",
                                                                        borderRadius: 4,
                                                                        border: "1px solid #e5e7eb",
                                                                        marginBottom: 4,
                                                                    }}
                                                                />
                                                            </a>
                                                        );
                                                    })}
                                                </Space>
                                            )}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}



                    {/* Extras */}
                    {(viewingEntity?.extras?.client?.length > 0 ||
                        viewingEntity?.extras?.non_client?.length > 0) && (
                            <div style={{ marginBottom: 24 }}>
                                <Typography.Title level={5} style={{ marginBottom: 16 }}>
                                    Extras
                                </Typography.Title>

                                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                                    {/* Cliente */}
                                    {viewingEntity?.extras?.client?.length > 0 && (
                                        <div>
                                            <Typography.Text strong style={{ display: "block", marginBottom: 12, fontSize: 14 }}>
                                                Cliente
                                            </Typography.Text>
                                            <Row gutter={[16, 16]}>
                                                {viewingEntity?.extras.client.map((group: any, idx: number) => (
                                                    <Col xs={24} md={12} lg={8} key={`${group.id}-${idx}`}>
                                                        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 16, height: "100%" }}>

                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                                                <Typography.Text strong style={{ flex: 1 }}>
                                                                    {group.label}
                                                                </Typography.Text>
                                                                <Typography.Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase" }}>
                                                                    {group.input_type}
                                                                </Typography.Text>
                                                            </div>

                                                            {Array.isArray(group.images) && group.images.length > 0 && (
                                                                <Space wrap size={8} style={{ marginBottom: 12 }}>
                                                                    {group.images.map((imgUrl: string, imgIdx: number) => {
                                                                        const imgName = imgUrl.split("/").pop() || `imagem_${imgIdx + 1}`;
                                                                        return (
                                                                            <a
                                                                                key={imgIdx}
                                                                                href={imgUrl}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                download={imgName}
                                                                                style={{ color: "#0026d9", display: "flex", flexDirection: "column", alignItems: "center" }}
                                                                            >
                                                                                <img
                                                                                    src={imgUrl}
                                                                                    alt={imgName}
                                                                                    style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4, border: "1px solid #e5e7eb", marginBottom: 4 }}
                                                                                />
                                                                            </a>
                                                                        );
                                                                    })}
                                                                </Space>
                                                            )}

                                                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                                                {group.options.map((option, optionIdx) => (
                                                                    <div
                                                                        key={`${option.id}-${optionIdx}`}
                                                                        style={{ border: "1px solid #f3f4f6", borderRadius: 6, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 4 }}
                                                                    >
                                                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                                                            <div>
                                                                                <Typography.Text style={{ fontSize: 13, display: "block" }}>
                                                                                    {option.label}
                                                                                </Typography.Text>
                                                                                {option.description && (
                                                                                    <Typography.Text type="secondary" style={{ fontSize: 12, display: "block" }}>
                                                                                        {option.description}
                                                                                    </Typography.Text>
                                                                                )}
                                                                            </div>
                                                                            <Typography.Text strong style={{ fontSize: 13, marginLeft: 8, whiteSpace: "nowrap" }}>
                                                                                {option.price > 0 ? formatBRL(option.price) : "-"}
                                                                            </Typography.Text>
                                                                        </div>

                                                                        {option.bonus && (
                                                                            <div style={{ marginTop: 6, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
                                                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                                                    <span style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", background: "#0026d9", color: "#fff", borderRadius: 4, padding: "2px 8px" }}>
                                                                                        Bônus
                                                                                    </span>
                                                                                    {option.bonus.type && (
                                                                                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                                                                            {option.bonus.type}
                                                                                        </Typography.Text>
                                                                                    )}
                                                                                </div>

                                                                                <Space size={16}>
                                                                                    {option.bonus.speed > 0 && (
                                                                                        <div>
                                                                                            <Typography.Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase", display: "block" }}>
                                                                                                Velocidade
                                                                                            </Typography.Text>
                                                                                            <Typography.Text style={{ fontSize: 12 }}>
                                                                                                {option.bonus.speed} Mbps
                                                                                            </Typography.Text>
                                                                                        </div>
                                                                                    )}
                                                                                    {typeof option.bonus.price !== "undefined" && (
                                                                                        <div>
                                                                                            <Typography.Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase", display: "block" }}>
                                                                                                Preço
                                                                                            </Typography.Text>
                                                                                            <Typography.Text style={{ fontSize: 12, color: "#0026d9" }}>
                                                                                                {option.bonus.price > 0 ? formatBRL(option.bonus.price) : "-"}
                                                                                            </Typography.Text>
                                                                                        </div>
                                                                                    )}
                                                                                </Space>

                                                                                {option.bonus.description && (
                                                                                    <div>
                                                                                        <Typography.Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase", display: "block" }}>
                                                                                            Descrição
                                                                                        </Typography.Text>
                                                                                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                                                                            {option.bonus.description}
                                                                                        </Typography.Text>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}

                                                                    </div>
                                                                ))}
                                                            </div>

                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    )}

                                    {/* Não Cliente */}
                                    {viewingEntity?.extras?.non_client?.length > 0 && (
                                        <div>
                                            <Typography.Text strong style={{ display: "block", marginBottom: 12, fontSize: 14 }}>
                                                Não Cliente
                                            </Typography.Text>
                                            <Row gutter={[16, 16]}>
                                                {viewingEntity?.extras.non_client.map((group: any, idx: number) => (
                                                    <Col xs={24} md={12} lg={8} key={`${group.id}-${idx}`}>
                                                        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 16, height: "100%" }}>

                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                                                <Typography.Text strong style={{ flex: 1 }}>
                                                                    {group.label}
                                                                </Typography.Text>
                                                                <Typography.Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase" }}>
                                                                    {group.input_type}
                                                                </Typography.Text>
                                                            </div>

                                                            {Array.isArray(group.images) && group.images.length > 0 && (
                                                                <Space wrap size={8} style={{ marginBottom: 12 }}>
                                                                    {group.images.map((imgUrl: string, imgIdx: number) => {
                                                                        const imgName = imgUrl.split("/").pop() || `imagem_${imgIdx + 1}`;
                                                                        return (
                                                                            <a
                                                                                key={imgIdx}
                                                                                href={imgUrl}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                download={imgName}
                                                                                style={{ color: "#0026d9", display: "flex", flexDirection: "column", alignItems: "center" }}
                                                                            >
                                                                                <img
                                                                                    src={imgUrl}
                                                                                    alt={imgName}
                                                                                    style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4, border: "1px solid #e5e7eb", marginBottom: 4 }}
                                                                                />
                                                                            </a>
                                                                        );
                                                                    })}
                                                                </Space>
                                                            )}

                                                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                                                {group.options.map((option, optionIdx) => (
                                                                    <div
                                                                        key={`${option.id}-${optionIdx}`}
                                                                        style={{ border: "1px solid #f3f4f6", borderRadius: 6, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 4 }}
                                                                    >
                                                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                                                            <div>
                                                                                <Typography.Text style={{ fontSize: 13, display: "block" }}>
                                                                                    {option.label}
                                                                                </Typography.Text>
                                                                                {option.description && (
                                                                                    <Typography.Text type="secondary" style={{ fontSize: 12, display: "block" }}>
                                                                                        {option.description}
                                                                                    </Typography.Text>
                                                                                )}
                                                                            </div>
                                                                            <Typography.Text strong style={{ fontSize: 13, marginLeft: 8, whiteSpace: "nowrap" }}>
                                                                                {option.price > 0 ? formatBRL(option.price) : "-"}
                                                                            </Typography.Text>
                                                                        </div>

                                                                        {option.bonus && (
                                                                            <div style={{ marginTop: 6, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
                                                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                                                    <span style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", background: "#0026d9", color: "#fff", borderRadius: 4, padding: "2px 8px" }}>
                                                                                        Bônus
                                                                                    </span>
                                                                                    {option.bonus.type && (
                                                                                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                                                                            {option.bonus.type}
                                                                                        </Typography.Text>
                                                                                    )}
                                                                                </div>

                                                                                <Space size={16}>
                                                                                    {option.bonus.speed > 0 && (
                                                                                        <div>
                                                                                            <Typography.Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase", display: "block" }}>
                                                                                                Velocidade
                                                                                            </Typography.Text>
                                                                                            <Typography.Text style={{ fontSize: 12 }}>
                                                                                                {option.bonus.speed} Mbps
                                                                                            </Typography.Text>
                                                                                        </div>
                                                                                    )}
                                                                                    {typeof option.bonus.price !== "undefined" && (
                                                                                        <div>
                                                                                            <Typography.Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase", display: "block" }}>
                                                                                                Preço
                                                                                            </Typography.Text>
                                                                                            <Typography.Text style={{ fontSize: 12, color: "#0026d9" }}>
                                                                                                {option.bonus.price > 0 ? formatBRL(option.bonus.price) : "-"}
                                                                                            </Typography.Text>
                                                                                        </div>
                                                                                    )}
                                                                                </Space>

                                                                                {option.bonus.description && (
                                                                                    <div>
                                                                                        <Typography.Text type="secondary" style={{ fontSize: 11, textTransform: "uppercase", display: "block" }}>
                                                                                            Descrição
                                                                                        </Typography.Text>
                                                                                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                                                                            {option.bonus.description}
                                                                                        </Typography.Text>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}

                                                                    </div>
                                                                ))}
                                                            </div>

                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}




                </div>

            </div>
        </Modal>
    );
}