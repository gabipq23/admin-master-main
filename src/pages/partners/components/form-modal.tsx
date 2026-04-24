import { useEffect } from "react";
import { Form, Input, Modal, Row, Col, Upload, Button, Select } from "antd";
import {
  useCreateEntity,
  entityPage,
  useUpdateEntity,
  type EntityType,
  type FormValues,
} from "../config-page.const";
import { UploadOutlined } from "@ant-design/icons";
import { useCompanyQuery } from "@/hooks/companies/useCompanyQuery";

interface FormModalProps {
  open: boolean;
  editingEntity: EntityType | null;
  onClose: () => void;
}

export function FormModal({ open, editingEntity, onClose }: FormModalProps) {
  const [form] = Form.useForm<FormValues>();
  const createMutation = useCreateEntity();
  const updateMutation = useUpdateEntity();

  const companuies = useCompanyQuery().data?.companies.map((company) => ({
    label: company.company_name,
    value: company.company_id,
  })) ?? [];
  const isEditing = !!editingEntity;
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (open && editingEntity) {
      form.setFieldsValue({
        ...editingEntity,
        partner_id: editingEntity.partner_id ?? undefined,
      });
    } else if (open) {
      form.resetFields();
    }
  }, [open, editingEntity, form]);

  async function handleSubmit() {
    const values = await form.validateFields();

    if (isEditing && editingEntity)
      updateMutation.mutate(
        {
          ...editingEntity,
          ...values,
          partner_id: values.partner_id,

        },
        { onSuccess: onClose },
      );
    else
      createMutation.mutate(
        {
          ...values,
          partner_id: values.partner_id ?? null,
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
      width={910}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: 16 }}
      // requiredMark="optional"
      >
        <Row gutter={16}>

          <Col span={8}>
            <Form.Item
              name="logo_url"
              label="Logo"
              rules={[{ required: true, message: "Informe o logo" }]}
            >
              <Upload> <Button icon={<UploadOutlined />}>Adicionar logo .png</Button> </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="partner_name"
              label="Razão Social"
              rules={[
                { required: true, message: "Informe a razão social" },
              ]}
            >
              <Input placeholder="Informe a razão social" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="cnpj"
              label="CNPJ"
              rules={[{ required: true, message: "Informe o CNPJ" }]}
            >
              <Input placeholder="00.000.000/0000-00" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Informe o email" },
                { type: "email", message: "Email inválido" },
              ]}
            >
              <Input placeholder="exemplo@email.com" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="telephone"
              label="Telefone"
              rules={[{ required: true, message: "Informe o telefone" }]}
            >
              <Input placeholder="(00) 00000-0000" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="manager_name"
              label="Responsável"
              rules={[{ required: true, message: "Informe o responsável" }]}
            >
              <Input placeholder="Informe o responsável" />
            </Form.Item>
          </Col>


        </Row>

        <Col span={8}>
          <Form.Item
            name="company_id"
            label="Empresa"
            rules={[{ required: true, message: "Informe a empresa" }]}
          >
            <Select placeholder="Selecione a empresa" options={companuies} />
          </Form.Item>
        </Col>
      </Form>
    </Modal >
  );
}
