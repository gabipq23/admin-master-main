import {
    Form,
    Input,
    Row,
    Col,
    Select,
    Button,
    Upload,
    Tooltip,
    Typography,
} from "antd";
import InputTypeTooltipContent from "../../common/InputTypeTooltipContent";
import { ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";

interface ExtrasGroupListProps {
    fieldName: string;
    groupPlaceholder: string;
    bonusVisible: Record<string, boolean>;
    onToggleBonus: (key: string) => void;
}

export function ExtrasGroupList({ fieldName, groupPlaceholder, bonusVisible, onToggleBonus }: ExtrasGroupListProps) {

    return (
        <Form.List name={fieldName}>
            {(groupFields, { add: addGroup, remove: removeGroup }) => (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {groupFields.map(({ key, name, ...restField }) => (
                        <div
                            key={key}
                            style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}
                        >
                            {/* Header do grupo */}
                            <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
                                <Typography.Text strong style={{ color: "#374151" }}>
                                    Grupo {name + 1}
                                </Typography.Text>
                                <Button type="text" danger size="small" onClick={() => removeGroup(name)}>
                                    Remover grupo
                                </Button>
                            </Row>

                            {/* Campos do grupo */}
                            <Row gutter={[8, 0]}>
                                <Col span={12}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "input_type"]}
                                        label={
                                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                Tipo
                                                <Tooltip
                                                    title={<InputTypeTooltipContent />}
                                                    placement="top"
                                                    overlayStyle={{ fontSize: "12px" }}
                                                >
                                                    <span style={{ color: "#ef4444", fontSize: 12, cursor: "pointer" }}>
                                                        <ExclamationCircleOutlined />
                                                    </span>
                                                </Tooltip>
                                            </span>
                                        }
                                        rules={[{ required: true, message: "Tipo obrigatório" }]}
                                    >
                                        <Select placeholder="Selecione o tipo">
                                            <Select.Option value="radio">Radio</Select.Option>
                                            <Select.Option value="checkbox">Switch</Select.Option>
                                            <Select.Option value="checkbox_group">Grupo de Checkbox</Select.Option>
                                            <Select.Option value="select">Select</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "label"]}
                                        label="Título"
                                    >
                                        <Input placeholder={groupPlaceholder} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "description"]}
                                        label="Descrição"
                                    >
                                        <Input placeholder={groupPlaceholder} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                {...restField}
                                name={[name, "images"]}
                                label="Imagens"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                            >
                                <Upload
                                    multiple
                                    accept="image/*"
                                    beforeUpload={() => false}
                                    listType="picture-card"
                                    showUploadList={{
                                        showRemoveIcon: true,
                                        showPreviewIcon: false,
                                        showDownloadIcon: false,
                                    }}
                                    onPreview={(file) => {
                                        if (file.url) window.open(file.url, "_blank");
                                    }}
                                >
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>

                            {/* Opções */}
                            <Typography.Text strong style={{ display: "block", marginBottom: 8, color: "#374151" }}>
                                Opções
                            </Typography.Text>

                            <Form.List name={[name, "options"]}>
                                {(optionFields, { add: addOption, remove: removeOption }) => (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        {optionFields.map(({ key: optionKey, name: optionName, ...optionRest }) => {
                                            const bonusKey = `${fieldName}_${name}_${optionName}`;
                                            const isBonusVisible = bonusVisible[bonusKey];
                                            return (
                                                <div
                                                    key={optionKey}
                                                    style={{
                                                        background: "#fff",
                                                        border: "1px solid #f3f4f6",
                                                        borderRadius: 8,
                                                        padding: 12,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 8,
                                                    }}
                                                >
                                                    {/* Linha principal da opção */}
                                                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                                        <Form.Item
                                                            {...optionRest}
                                                            name={[optionName, "label"]}
                                                            style={{ flex: 1, marginBottom: 0 }}
                                                            rules={[{ required: true, message: "Título obrigatório" }]}
                                                        >
                                                            <Input placeholder="Título" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...optionRest}
                                                            name={[optionName, "price"]}
                                                            style={{ width: 120, marginBottom: 0 }}
                                                        >
                                                            <Input inputMode="decimal" placeholder="Preço" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...optionRest}
                                                            name={[optionName, "description"]}
                                                            style={{ flex: 1, marginBottom: 0 }}
                                                        >
                                                            <Input placeholder="Descrição" />
                                                        </Form.Item>
                                                        <Button
                                                            danger
                                                            size="small"
                                                            onClick={() => removeOption(optionName)}
                                                            aria-label="Remover opção"
                                                        >
                                                            ✕
                                                        </Button>
                                                    </div>

                                                    {/* Toggle bônus */}
                                                    <div>
                                                        <Button
                                                            type={isBonusVisible ? "default" : "dashed"}
                                                            size="small"
                                                            onClick={() => onToggleBonus(bonusKey)}
                                                        >
                                                            {isBonusVisible ? "Ocultar bônus" : "Adicionar bônus"}
                                                        </Button>
                                                    </div>

                                                    {/* Campos de bônus */}
                                                    {isBonusVisible && (
                                                        <div
                                                            style={{
                                                                background: "#f9fafb",
                                                                border: "1px solid #e5e7eb",
                                                                borderRadius: 8,
                                                                padding: 12,
                                                                display: "flex",
                                                                gap: 8,
                                                                flexWrap: "wrap",
                                                            }}
                                                        >
                                                            <Form.Item
                                                                {...optionRest}
                                                                name={[optionName, "bonus", "type"]}
                                                                label="Tipo do Bônus"
                                                                style={{ width: 180, marginBottom: 0 }}
                                                            >
                                                                <Input placeholder="Tipo do bônus" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...optionRest}
                                                                name={[optionName, "bonus", "speed"]}
                                                                label="Velocidade"
                                                                style={{ width: 120, marginBottom: 0 }}
                                                            >
                                                                <Input inputMode="numeric" placeholder="Velocidade" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...optionRest}
                                                                name={[optionName, "bonus", "description"]}
                                                                label="Descrição do Bônus"
                                                                style={{ flex: 1, minWidth: 140, marginBottom: 0 }}
                                                            >
                                                                <Input placeholder="Descrição" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...optionRest}
                                                                name={[optionName, "bonus", "price"]}
                                                                label="Preço do Bônus"
                                                                style={{ width: 120, marginBottom: 0 }}
                                                            >
                                                                <Input inputMode="decimal" placeholder="Preço" />
                                                            </Form.Item>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}

                                        <Button type="dashed" onClick={() => addOption()} block>
                                            + Opção
                                        </Button>
                                    </div>
                                )}
                            </Form.List>
                        </div>
                    ))}

                    <Button type="dashed" onClick={() => addGroup()} block>
                        + Adicionar Grupo
                    </Button>
                </div>
            )}
        </Form.List>
    );
}