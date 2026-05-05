import { useEffect } from "react";
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
  onClose: () => void;
}

export function FormModal({ open, editingEntity, onClose }: FormModalProps) {
  const [form] = Form.useForm<FormValues>();
  const createMutation = useCreateEntity();
  const updateMutation = useUpdateEntity();

  const isEditing = !!editingEntity;
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (open && editingEntity) {
      form.setFieldsValue({
        ...editingEntity,
        company_id: editingEntity.company_id ?? undefined,
        partner_id: editingEntity.partner_id ?? undefined,

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

    const entityPayload = {
      ...values,
      details: (values.details ?? []).map((detail) => ({
        ...detail,
        images: (detail.images ?? [])
          .filter((f): f is UploadFile => typeof f !== "string")
          .filter((f) => !f.originFileObj && f.status === "done" && !!f.url)
          .map((f) => f.url!),
      })),
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
        },
        { onSuccess: onClose },
      );
    else
      createMutation.mutate(
        {
          entity: {
            ...entityPayload,
            company: "TIM",
            company_id: values.company_id ?? null,
            partner_id: values.partner_id ?? null,
          },
          conditionFiles,
          detailsImages,
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
        </div>
      </Form>
    </Modal >
  );
}
