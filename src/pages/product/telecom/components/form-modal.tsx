import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Modal,
  Row,
  Col,
  Select,
  Button,
  Upload,
  Tooltip,
  Checkbox,
  ConfigProvider,
  Typography,
  Segmented,
} from "antd";
import ptBR from "antd/locale/pt_BR";
import {
  FilePdfOutlined,
  FileZipOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  useCreateEntity,
  entityPage,
  useUpdateEntity,
  type EntityType,
  type FormValues,
} from "../config-page.const";
import type { UploadFile } from "antd";
interface FormModalProps {
  open: boolean;
  editingEntity: EntityType | null;
  category: string;
  onClose: () => void;
}

type ExtrasTab = "non_client" | "client";
interface ExtrasGroupListProps {
  fieldName: string;
  groupPlaceholder: string;
  bonusVisible: Record<string, boolean>;
  onToggleBonus: (key: string) => void;
}

type ExtraFormItem = NonNullable<FormValues["extras_non_client"]>[number];

function prepareExtrasGroup(
  extras: ExtraFormItem[],
  prefix: "non_client" | "client",
) {
  return extras.map((extra, idx) => {
    const extraId = String(extra.id ?? `extra_${prefix}_${idx}`);

    return {
      extraId,
      files: (extra.images ?? [])
        .filter((f): f is UploadFile => typeof f !== "string" && !!f.originFileObj)
        .map((f) => f.originFileObj as File),
      payload: {
        ...extra,
        id: extraId,
        input_type:
          extra.input_type && extra.input_type !== "select"
            ? extra.input_type
            : "checkbox_group",
        images: (extra.images ?? [])
          .filter((f): f is UploadFile => typeof f !== "string")
          .filter((f) => !f.originFileObj && f.status === "done" && !!f.url)
          .map((f) => f.url!),
        options: (extra.options ?? []).map((option, optionIdx) => ({
          ...option,
          id: String(option.id ?? `option_${prefix}_${idx}_${optionIdx}`),
          price: Number(option.price ?? 0),
          bonus: option.bonus
            ? {
              ...option.bonus,
              price: Number(option.bonus.price ?? 0),
              speed: Number(option.bonus.speed ?? 0),
            }
            : undefined,
        })),
      },
    };
  });
}

function mapExistingImagesToUploadFiles(images?: string[]): UploadFile[] {
  if (!images?.length) return [];

  return images.map((url, idx) => ({
    uid: `${url}-${idx}`,
    name: url.split("/").pop() || `imagem_${idx + 1}`,
    status: "done",
    url,
  }));
}

// Componente interno de grupos de extras (evita duplicação client/non_client)
function ExtrasGroupList({ fieldName, groupPlaceholder, bonusVisible, onToggleBonus }: ExtrasGroupListProps) {

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
                          title="x"
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
                      const bonusKey = `${fieldName}_${optionKey}`;
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

export function FormModal({ open, editingEntity, category, onClose }: FormModalProps) {
  const [form] = Form.useForm<FormValues>();
  const createMutation = useCreateEntity();
  const updateMutation = useUpdateEntity();

  const isEditing = !!editingEntity;
  const isPending = createMutation.isPending || updateMutation.isPending;
  const [activeExtrasTab, setActiveExtrasTab] = useState<ExtrasTab>("non_client");
  const [bonusVisible, setBonusVisible] = useState<Record<string, boolean>>({});

  const handleToggleBonus = (optionKey: string) => {
    setBonusVisible((prev) => ({ ...prev, [optionKey]: !prev[optionKey] }));
  };
  useEffect(() => {
    if (open && editingEntity) {
      form.setFieldsValue({
        ...editingEntity,
        company_id: editingEntity.company_id ?? undefined,
        partner_id: editingEntity.partner_id ?? undefined,
        extras_non_client: (editingEntity.extras?.non_client ?? []).map((group) => ({
          ...group,
          images: mapExistingImagesToUploadFiles(group.images),
        })),
        extras_client: (editingEntity.extras?.client ?? []).map((group) => ({
          ...group,
          images: mapExistingImagesToUploadFiles(group.images),
        })),
      });
    } else if (open) {
      form.resetFields();
    }
  }, [open, editingEntity, form]);

  async function handleSubmit() {
    const values = await form.validateFields();

    // Extrai arquivos novos de offer_conditions (originFileObj = File real)
    const conditionFiles = (values.offer_conditions ?? [])
      .filter((f) => f.originFileObj)
      .map((f) => f.originFileObj as File);

    // Extrai arquivos novos de cada detail.images, agrupados por índice
    const detailsImages = (values.details ?? [])
      .map((detail, idx) => ({
        detailIndex: idx,
        files: (detail.images ?? [])
          .filter((f): f is UploadFile => typeof f !== "string" && !!f.originFileObj)
          .map((f) => f.originFileObj as File),
      }))
      .filter((d) => d.files.length > 0);

    const extrasNonClient = values.extras_non_client ?? [];
    const extrasClient = values.extras_client ?? [];

    const normalizedExtrasNonClient = prepareExtrasGroup(extrasNonClient, "non_client");
    const normalizedExtrasClient = prepareExtrasGroup(extrasClient, "client");

    const extrasImages = [...normalizedExtrasNonClient, ...normalizedExtrasClient]
      .map((extra) => ({
        extraId: extra.extraId,
        files: extra.files,
      }))
      .filter((extra) => extra.files.length > 0);

    const rawPricing = values.pricing;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pricing: _p, extras_non_client: _nonClient, extras_client: _client, ...restValues } = values;

    const entityPayload = {
      ...restValues,
      pricing: {
        base_monthly: {
          current_price: Number(rawPricing?.base_monthly?.current_price ?? 0),
          ...(rawPricing?.base_monthly?.original_price != null && {
            original_price: Number(rawPricing.base_monthly.original_price),
          }),
        },
        installation: { current_price: Number(rawPricing?.installation?.current_price ?? 0) },
      },
      details: (values.details ?? []).map((detail) => ({
        ...detail,
        images: (detail.images ?? [])
          .filter((f): f is UploadFile => typeof f !== "string")
          .filter((f) => !f.originFileObj && f.status === "done" && !!f.url)
          .map((f) => f.url!),
      })),
      extras: {
        non_client: normalizedExtrasNonClient.map((extra) => extra.payload),
        client: normalizedExtrasClient.map((extra) => extra.payload),
      },
    };

    if (isEditing && editingEntity)
      updateMutation.mutate(
        {
          id: editingEntity.id,
          entity: {
            ...entityPayload,
            company_id: values.company_id ?? editingEntity.company_id ?? null,
            partner_id: values.partner_id ?? editingEntity.partner_id ?? null,
          },
          conditionFiles,
          detailsImages,
          extrasImages,
        },
        { onSuccess: onClose },
      );
    else
      createMutation.mutate(
        {
          entity: {
            ...entityPayload,
            category,
            company: "TIM",
            company_id: values.company_id ?? null,
            partner_id: values.partner_id ?? null,
          },
          conditionFiles,
          detailsImages,
          extrasImages,
        },
        { onSuccess: onClose },
      );
  }



  return (
    <Modal
      open={open}
      title={
        isEditing ? `Editar ${entityPage.name}` : `Novo(a) ${entityPage.name}`
      }
      okText={isEditing ? "Salvar" : "Criar"}
      cancelText="Cancelar"
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={isPending}
      destroyOnHidden
      width={940}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: 16 }}
      // requiredMark="optional"
      >
        <div className="max-h-115 overflow-y-auto scrollbar-thin">


          {/* Nome e Badge */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Nome"
                rules={[{ required: true, message: "Nome do plano é obrigatório" }]}
              >
                <Input placeholder="Digite o nome do plano" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Informações adicionais" name="badge">
                <Input placeholder="Ex: Recomendado" />
              </Form.Item>
            </Col>
          </Row>

          {/* Oferta */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Título da Oferta"
                name="offer_title"
                rules={[{ required: true, message: "Título da oferta é obrigatório" }]}
              >
                <Input placeholder="Ex: Internet para jogar sem travar" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Subtítulo da Oferta" name="offer_subtitle">
                <Input placeholder="Ex: Mais velocidade, estabilidade e benefícios" />
              </Form.Item>
            </Col>
          </Row>

          {/* Tipo de Cliente, UF e Condições */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Tipo de Cliente"
                name="client_type"
                rules={[{ required: true, message: "Tipo de cliente é obrigatório" }]}
              >
                <Select placeholder="Selecione o tipo">
                  <Select.Option value="PF">Pessoa Física (PF)</Select.Option>
                  <Select.Option value="PJ">Pessoa Jurídica (PJ)</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Condições da Oferta (PDF ou ZIP)
                    <Tooltip
                      title="Arquivos com no máximo 10MB."
                      placement="top"
                      overlayInnerStyle={{ fontSize: "12px" }}
                    >
                      <span style={{ color: "#f87171", fontSize: 12, marginLeft: 4, cursor: "pointer" }}>
                        <ExclamationCircleOutlined />
                      </span>
                    </Tooltip>
                  </>
                }
                name="offer_conditions"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              >
                <Upload
                  beforeUpload={() => false}
                  multiple
                  accept=".pdf,.zip"
                  listType="text"
                  maxCount={5}
                  showUploadList={{ showRemoveIcon: true, showPreviewIcon: false, showDownloadIcon: false }}
                  iconRender={(file) => {
                    if (file.type === "application/pdf") return <FilePdfOutlined />;
                    if (file.type === "application/zip" || file.name.endsWith(".zip"))
                      return <FileZipOutlined />;
                    return <UploadOutlined />;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Selecionar Arquivos</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          {/* Preços */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Preço Inicial (R$)" name={["pricing", "base_monthly", "original_price"]}>
                <Input inputMode="decimal" placeholder="Ex: 369,99" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Preço Atual (R$)"
                name={["pricing", "base_monthly", "current_price"]}
                rules={[{ required: true, message: "Preço atual obrigatório" }]}
              >
                <Input inputMode="decimal" placeholder="Ex: 300,99" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Instalação (R$)" name={["pricing", "installation", "current_price"]}>
                <Input inputMode="decimal" placeholder="Ex: 49,90" />
              </Form.Item>
            </Col>
          </Row>

          {/* Características do Plano */}
          <div style={{ background: "#fafafa", padding: 16, borderRadius: 8, marginBottom: 16 }}>
            <Typography.Title level={5} style={{ marginBottom: 16 }}>
              Características do Plano
            </Typography.Title>

            <Form.List name="details">
              {(fields, { add, remove }) => (
                <Row gutter={[16, 0]}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Col span={12} key={key}>
                      <div
                        style={{
                          border: "1px solid #e5e7eb",
                          borderRadius: 8,
                          padding: 16,
                          marginBottom: 16,
                        }}
                      >
                        <Row justify="space-between" align="top" style={{ marginBottom: 12 }}>
                          <Typography.Text strong style={{ color: "#374151" }}>
                            Característica {name + 1}
                          </Typography.Text>
                          <Button type="text" danger size="small" onClick={() => remove(name)}>
                            Remover
                          </Button>
                        </Row>

                        <Form.Item
                          {...restField}
                          name={[name, "title"]}
                          label="Título"
                          rules={[{ required: true, message: "Título é obrigatório" }]}
                        >
                          <Input placeholder="Ex: Velocidade" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "description"]}
                          label="Descrição"
                        >
                          <Input placeholder="Ex: 100 Mbps de download" />
                        </Form.Item>

                        <ConfigProvider
                          locale={ptBR}
                          theme={{
                            components: {
                              Checkbox: {
                                colorPrimary: "#0026d9",
                                colorPrimaryHover: "#0026d9",
                                borderRadius: 4,
                                controlInteractiveSize: 18,
                                lineWidth: 2,
                              },
                            },
                          }}
                        >
                          <Row gutter={8}>
                            <Col>
                              <Form.Item
                                {...restField}
                                name={[name, "highlight_top"]}
                                valuePropName="checked"
                                initialValue={false}
                              >
                                <Checkbox>Selo Compacto</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col>
                              <Form.Item
                                {...restField}
                                name={[name, "highlight_bottom"]}
                                valuePropName="checked"
                                initialValue={false}
                              >
                                <Checkbox>Selo Destaque</Checkbox>
                              </Form.Item>
                            </Col>
                          </Row>
                        </ConfigProvider>

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
                      </div>
                    </Col>
                  ))}

                  <Col span={24}>
                    <Button type="dashed" onClick={() => add()} block style={{ marginBottom: 16 }}>
                      + Adicionar Característica
                    </Button>
                  </Col>
                </Row>
              )}
            </Form.List>
          </div>

          {/* Extras */}
          <div style={{ background: "#fafafa", padding: 16, borderRadius: 8, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Typography.Title level={5} style={{ margin: 0 }}>
                Extras
              </Typography.Title>
              <Tooltip
                title="Se este produto não tiver diferença entre as opções de extras para cliente e não cliente, preencha apenas o cenário de Não-clientes. Se houver diferença, preencha os dois cenários."
                placement="top"
                overlayStyle={{ fontSize: "12px" }}
              >
                <span style={{ color: "#ef4444", fontSize: 12, cursor: "pointer" }}>
                  <ExclamationCircleOutlined />
                </span>
              </Tooltip>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Segmented
                value={activeExtrasTab}
                onChange={(value) => setActiveExtrasTab(value as ExtrasTab)}
                options={[
                  { label: "Para Não-clientes", value: "non_client" },
                  { label: "Para Clientes", value: "client" },
                ]}
                style={{ width: "100%" }}
              />
            </div>

            {activeExtrasTab === "non_client" && (
              <ExtrasGroupList
                fieldName="extras_non_client"
                groupPlaceholder="Ex: Deixe seu pacote mais completo"
                bonusVisible={bonusVisible}
                onToggleBonus={handleToggleBonus}
              />
            )}
            {activeExtrasTab === "client" && (
              <ExtrasGroupList
                fieldName="extras_client"
                groupPlaceholder="Ex: O dobro de canais"
                bonusVisible={bonusVisible}
                onToggleBonus={handleToggleBonus}
              />
            )}
          </div>

        </div>
      </Form>
    </Modal >
  );
}
