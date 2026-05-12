import { useEffect } from "react";
import { Form, Input, Modal, Row, Col } from "antd";
import {
  entityPage,
  useUpdateEntity,
  type EntityType,
  type FormValues,
} from "../config-page.const";


interface FormModalProps {
  open: boolean;
  editingEntity: EntityType | null;
  onClose: () => void;
}

export function FormModal({ open, editingEntity, onClose }: FormModalProps) {
  const [form] = Form.useForm<FormValues>();

  const updateMutation = useUpdateEntity();

  const isEditing = !!editingEntity;
  const isPending = updateMutation.isPending;

  useEffect(() => {
    if (open && editingEntity) {
      form.setFieldsValue({
        ...editingEntity, cnpj: editingEntity.cnpj || "",
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
          cnpj: values.cnpj

        },
        { onSuccess: onClose },
      );

  }
  return (
    <Modal
      open={open}
      title={
        isEditing ? `Editar ${entityPage.name}` : ``
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
              name="cnpj"
              label="CNPJ"
              rules={[
                { min: 14, message: 'CNPJ deve ter 14 dígitos' },
                { max: 14, message: 'CNPJ deve ter 14 dígitos' },
              ]}
            >
              <Input placeholder="00.000.000/0000-00" />
            </Form.Item>
          </Col>
        </Row>


      </Form>
    </Modal >
  );
}
